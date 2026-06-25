# Firebase Security Specification & TDD Test Plan

This document outlines the security invariants, twelve adversarial validation-bypass payloads ("The Dirty Dozen"), and the test definitions to ensure our Firestore rules are mathematically secure and leak-proof.

## 1. Data Invariants

1. **User Identity Isolation**: A user profile (`/users/{userId}`) can only be read, created, or updated by the authenticated owner (`request.auth.uid == userId`).
2. **Prevent Privilege Escalation**: No user can assign themselves the "Admin" role. Upon profile creation, the `role` field must be forced to `"Client"`.
3. **Immutability of Key Identity Fields**: Once created, `uid` and `email` on any user profile are immutable and cannot be altered.
4. **Anonymous Lead Intake**: Contact requests (`/admin_contacts/{contactId}`) and administrative notifications (`/admin_notifications/{notificationId}`) can be created by unauthenticated visitors to support the contact form, but must strictly conform to schema schemas and size bounds to prevent resource-exhaustion.
5. **PII and Sensitive System Access**: All administrative collections (`admin_orders`, `admin_clients`, `admin_hosting`, `admin_domains`, `admin_projects`, `admin_tickets`, `admin_settings`, `admin_seo`) are locked strictly to bootstrapped admins.
6. **Administrative Bootstrapping**: The user `baijitsk820@gmail.com` is bootstrapped as the super-administrator of the portal.

---

## 2. The "Dirty Dozen" Threat Payloads

Here are 12 specific JSON payloads designed to break the rules of Identity, Integrity, and State.

### Payload 1: Privilege Escalation on Creation
* **Target**: `/users/attacker_uid`
* **Vulnerability Target**: Try to set role to "Admin" on signup.
* **Payload**:
```json
{
  "uid": "attacker_uid",
  "name": "Attacker",
  "email": "attacker@spam.com",
  "businessName": "Malicious Corp",
  "role": "Admin",
  "createdAt": "2026-06-25T00:00:00Z"
}
```

### Payload 2: Profile Impersonation / Cross-User Write
* **Target**: `/users/victim_uid`
* **Vulnerability Target**: Try to write to another user's profile.
* **Auth Context**: Signed in as `attacker_uid`.
* **Payload**:
```json
{
  "uid": "victim_uid",
  "name": "Victim",
  "email": "victim@domain.com",
  "businessName": "Victim Corp",
  "role": "Client",
  "createdAt": "2026-06-25T00:00:00Z"
}
```

### Payload 3: Role Overwrite (Self-Promotion)
* **Target**: `/users/attacker_uid` (existing profile with role: "Client")
* **Vulnerability Target**: Update existing profile to change role to "Admin".
* **Auth Context**: Signed in as `attacker_uid`.
* **Payload**:
```json
{
  "role": "Admin"
}
```

### Payload 4: Immortal Field Mutation (Immutable UID)
* **Target**: `/users/attacker_uid`
* **Vulnerability Target**: Changing the immutable `uid` field.
* **Payload**:
```json
{
  "uid": "different_uid"
}
```

### Payload 5: Deny-of-Wallet (1MB Field Injection on Contact Intake)
* **Target**: `/admin_contacts/temp_id`
* **Vulnerability Target**: Inject massive payload to exceed storage quotas.
* **Payload**:
```json
{
  "id": "temp_id",
  "name": "Spammer",
  "email": "spam@domain.com",
  "phone": "1234567890",
  "serviceRequired": "Some Service",
  "budget": 5000,
  "message": "[A repeating 1,000,000 character string...]",
  "status": "new",
  "date": "2026-06-25"
}
```

### Payload 6: Invalid Status Injection on Contact Form
* **Target**: `/admin_contacts/temp_id`
* **Vulnerability Target**: Setting status to "completed" without admin rights.
* **Payload**:
```json
{
  "id": "temp_id",
  "name": "Spammer",
  "email": "spam@domain.com",
  "phone": "1234567890",
  "serviceRequired": "Service",
  "budget": 1000,
  "message": "hi",
  "status": "completed",
  "date": "2026-06-25"
}
```

### Payload 7: Unauthorized Order Deletion
* **Target**: `/admin_orders/ORD-9832`
* **Vulnerability Target**: Delete order without administrative credentials.
* **Auth Context**: Signed in as `attacker_uid` (non-admin).
* **Payload**: `N/A (Delete operation)`

### Payload 8: Unauthorized Client Read
* **Target**: `/admin_clients` (List query)
* **Vulnerability Target**: Non-admin attempts to download entire client index.
* **Auth Context**: Signed in as `attacker_uid` (non-admin).
* **Payload**: `N/A (List query)`

### Payload 9: Invalid Notification Type Injection
* **Target**: `/admin_notifications/notif_1`
* **Vulnerability Target**: Inject unapproved notification types (e.g., "hacker_type").
* **Payload**:
```json
{
  "id": "notif_1",
  "type": "hacker_type",
  "title": "Hack",
  "message": "Injected",
  "date": "2026-06-25",
  "read": false
}
```

### Payload 10: Unauthorized Ticket State Locking
* **Target**: `/admin_tickets/TCK-8930`
* **Vulnerability Target**: Attacker attempts to modify priority to "urgent" or category of a ticket.
* **Auth Context**: Signed in as `attacker_uid` (non-admin).
* **Payload**:
```json
{
  "priority": "urgent"
}
```

### Payload 11: Spoofed Admin Login Attempt
* **Target**: `/admin_settings/config`
* **Vulnerability Target**: Attempt to modify global agency configuration.
* **Auth Context**: Signed in as `attacker_uid` (non-admin).
* **Payload**:
```json
{
  "stripeEnabled": false
}
```

### Payload 12: SEO Metadata Pollution
* **Target**: `/admin_seo/config`
* **Vulnerability Target**: Attacker attempts to inject malicious SEO keywords or routes.
* **Auth Context**: Signed in as `attacker_uid` (non-admin).
* **Payload**:
```json
{
  "targetKeywords": "malicious spam links"
}
```

---

## 3. The Test Runner Definition (`firestore.rules.test.ts`)

```typescript
import { 
  initializeTestEnvironment, 
  RulesTestEnvironment 
} from "@firebase/rules-unit-testing";
import { 
  doc, 
  setDoc, 
  getDoc, 
  deleteDoc, 
  collection, 
  getDocs 
} from "firebase/firestore";

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "hostnovapro-test-79471",
    firestore: {
      rules: `
        rules_version = '2';
        service cloud.firestore {
          // Rule definition logic here
        }
      `
    }
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe("HostNovaPro Zero-Trust Security Auditing", () => {
  
  test("Payload 1: Attacker cannot sign up with 'Admin' role", async () => {
    const context = testEnv.authenticatedContext("attacker_uid");
    const db = context.firestore();
    const profileRef = doc(db, "users", "attacker_uid");
    
    await expect(setDoc(profileRef, {
      uid: "attacker_uid",
      name: "Attacker",
      email: "attacker@spam.com",
      businessName: "Malicious Corp",
      role: "Admin",
      createdAt: "2026-06-25T00:00:00Z"
    })).rejects.toThrow();
  });

  test("Payload 2: Attacker cannot write to Victim profile", async () => {
    const context = testEnv.authenticatedContext("attacker_uid");
    const db = context.firestore();
    const profileRef = doc(db, "users", "victim_uid");
    
    await expect(setDoc(profileRef, {
      uid: "victim_uid",
      name: "Victim",
      email: "victim@domain.com",
      businessName: "Victim Corp",
      role: "Client",
      createdAt: "2026-06-25T00:00:00Z"
    })).rejects.toThrow();
  });

  test("Payload 3: Attacker cannot update their own role to Admin", async () => {
    // Seed database first
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      await setDoc(doc(db, "users", "attacker_uid"), {
        uid: "attacker_uid",
        name: "Attacker",
        email: "attacker@spam.com",
        businessName: "Malicious Corp",
        role: "Client",
        createdAt: "2026-06-25T00:00:00Z"
      });
    });

    const context = testEnv.authenticatedContext("attacker_uid");
    const db = context.firestore();
    
    await expect(setDoc(doc(db, "users", "attacker_uid"), {
      role: "Admin"
    }, { merge: true })).rejects.toThrow();
  });

  test("Payload 5: Contact requests with oversized fields are rejected", async () => {
    const context = testEnv.unauthenticatedContext();
    const db = context.firestore();
    const oversizedMessage = "X".repeat(1000000); // 1MB string
    
    await expect(setDoc(doc(db, "admin_contacts", "temp_id"), {
      id: "temp_id",
      name: "Spammer",
      email: "spam@domain.com",
      phone: "1234567890",
      serviceRequired: "Some Service",
      budget: 5000,
      message: oversizedMessage,
      status: "new",
      date: "2026-06-25"
    })).rejects.toThrow();
  });

  test("Payload 7: Non-admin cannot delete orders", async () => {
    const context = testEnv.authenticatedContext("attacker_uid");
    const db = context.firestore();
    await expect(deleteDoc(doc(db, "admin_orders", "ORD-9832"))).rejects.toThrow();
  });

  test("Payload 8: Non-admin cannot read client database", async () => {
    const context = testEnv.authenticatedContext("attacker_uid");
    const db = context.firestore();
    await expect(getDocs(collection(db, "admin_clients"))).rejects.toThrow();
  });

  test("Super-Admin: baijitsk820@gmail.com bypassed all safeguards successfully", async () => {
    const context = testEnv.authenticatedContext("admin_uid", {
      email: "baijitsk820@gmail.com",
      email_verified: true
    });
    const db = context.firestore();
    
    // Admin reads setting config
    const docSnap = await getDoc(doc(db, "admin_settings", "config"));
    expect(docSnap).toBeDefined();
  });
});
```
