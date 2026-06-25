import { useState, useEffect } from "react";
import { 
  auth, 
  db, 
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  signInWithPopup,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  User,
  handleFirestoreError,
  OperationType
} from "../lib/firebase";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  businessName: string;
  role: string;
  createdAt: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch or create Firestore profile
        try {
          let profileDoc;
          try {
            profileDoc = await getDoc(doc(db, "users", currentUser.uid));
          } catch (err) {
            handleFirestoreError(err, OperationType.GET, `users/${currentUser.uid}`);
            return;
          }

          if (profileDoc && profileDoc.exists()) {
            setProfile(profileDoc.data() as UserProfile);
          } else {
            // Profile does not exist yet (e.g., if Google login just occurred)
            const newProfile: UserProfile = {
              uid: currentUser.uid,
              name: currentUser.displayName || "Client Partner",
              email: currentUser.email || "",
              businessName: "Business Entity",
              role: "Client",
              createdAt: new Date().toISOString(),
            };
            try {
              await setDoc(doc(db, "users", currentUser.uid), newProfile);
            } catch (err) {
              handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.uid}`);
            }
            setProfile(newProfile);
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Email/Password Signup
  const signUpWithEmail = async (email: string, password: string, name: string, businessName: string) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = userCredential.user;

      // Create Firestore profile
      const newProfile: UserProfile = {
        uid: currentUser.uid,
        name,
        email,
        businessName: businessName || "Enterprise Client",
        role: "Client",
        createdAt: new Date().toISOString(),
      };

      try {
        await setDoc(doc(db, "users", currentUser.uid), newProfile);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `users/${currentUser.uid}`);
      }
      setProfile(newProfile);

      // Send verification email
      await sendEmailVerification(currentUser);
      
      setLoading(false);
      return currentUser;
    } catch (err: any) {
      setLoading(false);
      let message = "Failed to sign up.";
      if (err.code === "auth/email-already-in-use") {
        message = "This email is already registered.";
      } else if (err.code === "auth/invalid-email") {
        message = "Invalid email address format.";
      } else if (err.code === "auth/weak-password") {
        message = "The password is too weak.";
      } else {
        message = err.message || message;
      }
      setError(message);
      throw new Error(message);
    }
  };

  // Email/Password Login
  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return userCredential.user;
    } catch (err: any) {
      setLoading(false);
      let message = "Invalid email or password.";
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        message = "Incorrect email or password combination.";
      } else if (err.code === "auth/invalid-credential") {
        message = "Invalid credentials. Please verify your details.";
      } else {
        message = err.message || message;
      }
      setError(message);
      throw new Error(message);
    }
  };

  // Google Login
  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const currentUser = userCredential.user;

      // Check if profile exists
      let profileDoc;
      try {
        profileDoc = await getDoc(doc(db, "users", currentUser.uid));
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, `users/${currentUser.uid}`);
      }

      if (profileDoc && !profileDoc.exists()) {
        const newProfile: UserProfile = {
          uid: currentUser.uid,
          name: currentUser.displayName || "Google Partner",
          email: currentUser.email || "",
          businessName: "Google Workspace Partner",
          role: "Client",
          createdAt: new Date().toISOString(),
        };
        try {
          await setDoc(doc(db, "users", currentUser.uid), newProfile);
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, `users/${currentUser.uid}`);
        }
        setProfile(newProfile);
      } else if (profileDoc) {
        setProfile(profileDoc.data() as UserProfile);
      }
      
      setLoading(false);
      return currentUser;
    } catch (err: any) {
      setLoading(false);
      let message = "Google authentication canceled or failed.";
      if (err.code === "auth/popup-closed-by-user") {
        message = "Google login popup closed before completion.";
      } else {
        message = err.message || message;
      }
      setError(message);
      throw new Error(message);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
      setProfile(null);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Failed to log out.");
    }
  };

  // Resend Verification Email
  const resendVerification = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
      } catch (err: any) {
        throw new Error(err.message || "Failed to send verification email.");
      }
    }
  };

  // Force reload/refresh auth state (useful to check verification state)
  const refreshAuth = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setUser({ ...auth.currentUser });
    }
  };

  return {
    user,
    profile,
    loading,
    error,
    signUpWithEmail,
    loginWithEmail,
    loginWithGoogle,
    logout,
    resendVerification,
    refreshAuth,
    setError
  };
}
