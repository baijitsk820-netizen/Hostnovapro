import { 
  AdminOrder, 
  AdminClient, 
  HostingAccount, 
  AdminDomain, 
  WebsiteProject, 
  ContactRequest, 
  SupportTicket, 
  AdminNotification 
} from "./types";

export const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: "ORD-9832",
    clientName: "Eleanor Vance",
    clientEmail: "eleanor.v@nexuscorp.io",
    serviceRequired: "Enterprise 3D Website Design & Cloud Hosting",
    budget: 45000,
    date: "2026-06-22",
    status: "pending",
    packageType: "Titanium Fusion Pack"
  },
  {
    id: "ORD-9741",
    clientName: "Marcus Thorne",
    clientEmail: "m.thorne@vanguardmedia.com",
    serviceRequired: "High-Traffic E-commerce Solution + Dedicated VM",
    budget: 65000,
    date: "2026-06-20",
    status: "completed",
    packageType: "Supernova Premium VM"
  },
  {
    id: "ORD-9512",
    clientName: "Aria Sterling",
    clientEmail: "aria@sterlingaesthetic.co",
    serviceRequired: "Luxury Brand Showcase & Auto-Scaling Hosting",
    budget: 25000,
    date: "2026-06-18",
    status: "completed",
    packageType: "Andromeda Cloud Spark"
  },
  {
    id: "ORD-9405",
    clientName: "Devon Lane",
    clientEmail: "devon@lanestudios.dev",
    serviceRequired: "Custom React Application with Spanner Integration",
    budget: 85000,
    date: "2026-06-15",
    status: "cancelled",
    packageType: "Titanium Fusion Pack"
  },
  {
    id: "ORD-9302",
    clientName: "Siddharth Mehta",
    clientEmail: "sid@mehtaventures.in",
    serviceRequired: "SaaS Dashboard Launch & Multi-Region Setup",
    budget: 120000,
    date: "2026-06-10",
    status: "completed",
    packageType: "Supernova Premium VM"
  },
  {
    id: "ORD-9290",
    clientName: "Kirsten Dunst",
    clientEmail: "kdun@indiebox.org",
    serviceRequired: "WordPress Portfolio Migration & CDN Cache Setup",
    budget: 12000,
    date: "2026-06-08",
    status: "pending",
    packageType: "Andromeda Cloud Spark"
  }
];

export const INITIAL_CLIENTS: AdminClient[] = [
  {
    id: "CLI-093",
    name: "Eleanor Vance",
    email: "eleanor.v@nexuscorp.io",
    phone: "+1 (555) 902-1240",
    company: "Nexus Corp",
    packageType: "Titanium Fusion Pack",
    status: "pending",
    createdAt: "2026-06-22"
  },
  {
    id: "CLI-085",
    name: "Marcus Thorne",
    email: "m.thorne@vanguardmedia.com",
    phone: "+1 (555) 309-8422",
    company: "Vanguard Media",
    packageType: "Supernova Premium VM",
    status: "active",
    createdAt: "2026-05-14"
  },
  {
    id: "CLI-079",
    name: "Aria Sterling",
    email: "aria@sterlingaesthetic.co",
    phone: "+44 20 7946 0958",
    company: "Sterling Aesthetic",
    packageType: "Andromeda Cloud Spark",
    status: "active",
    createdAt: "2026-04-03"
  },
  {
    id: "CLI-071",
    name: "Siddharth Mehta",
    email: "sid@mehtaventures.in",
    phone: "+91 98200 12345",
    company: "Mehta Ventures",
    packageType: "Supernova Premium VM",
    status: "active",
    createdAt: "2026-03-29"
  },
  {
    id: "CLI-064",
    name: "Devon Lane",
    email: "devon@lanestudios.dev",
    phone: "+1 (555) 441-9031",
    company: "Lane Studios",
    packageType: "Titanium Fusion Pack",
    status: "suspended",
    createdAt: "2026-02-18"
  },
  {
    id: "CLI-052",
    name: "Hiroshi Tanaka",
    email: "tanaka@zenithtokyo.jp",
    phone: "+81 3 5555 0199",
    company: "Zenith Tokyo Ltd",
    packageType: "Supernova Premium VM",
    status: "active",
    createdAt: "2026-01-10"
  }
];

export const INITIAL_HOSTING: HostingAccount[] = [
  {
    id: "HST-401",
    clientName: "Marcus Thorne",
    domain: "vanguardmedia.com",
    plan: "Supernova Premium VM (Dedicated VCPU)",
    diskUsage: "142 GB / 500 GB",
    diskPercentage: 28.4,
    bandwidth: "4.2 TB / 10 TB",
    bandwidthPercentage: 42.0,
    cpuUsage: 14,
    ramUsage: 48,
    renewalDate: "2027-05-14",
    status: "active"
  },
  {
    id: "HST-402",
    clientName: "Aria Sterling",
    domain: "sterlingaesthetic.co",
    plan: "Andromeda Cloud Spark (Auto-Scale Shared)",
    diskUsage: "18.5 GB / 50 GB",
    diskPercentage: 37.0,
    bandwidth: "189 GB / 500 GB",
    bandwidthPercentage: 37.8,
    cpuUsage: 3,
    ramUsage: 22,
    renewalDate: "2027-04-03",
    status: "active"
  },
  {
    id: "HST-403",
    clientName: "Hiroshi Tanaka",
    domain: "zenithtokyo.jp",
    plan: "Supernova Premium VM (Dedicated VCPU)",
    diskUsage: "298 GB / 500 GB",
    diskPercentage: 59.6,
    bandwidth: "8.1 TB / 10 TB",
    bandwidthPercentage: 81.0,
    cpuUsage: 68,
    ramUsage: 82,
    renewalDate: "2027-01-10",
    status: "active"
  },
  {
    id: "HST-404",
    clientName: "Devon Lane",
    domain: "lanestudios.dev",
    plan: "Titanium Fusion Pack (Web + Host Suite)",
    diskUsage: "85 GB / 200 GB",
    diskPercentage: 42.5,
    bandwidth: "1.2 TB / 4 TB",
    bandwidthPercentage: 30.0,
    cpuUsage: 0,
    ramUsage: 0,
    renewalDate: "2027-02-18",
    status: "suspended"
  }
];

export const INITIAL_DOMAINS: AdminDomain[] = [
  {
    id: "DOM-011",
    domainName: "vanguardmedia.com",
    expiryDate: "2027-05-14",
    status: "active",
    autoRenewal: true
  },
  {
    id: "DOM-012",
    domainName: "sterlingaesthetic.co",
    expiryDate: "2027-04-03",
    status: "active",
    autoRenewal: true
  },
  {
    id: "DOM-013",
    domainName: "zenithtokyo.jp",
    expiryDate: "2027-01-10",
    status: "active",
    autoRenewal: false
  },
  {
    id: "DOM-014",
    domainName: "lanestudios.dev",
    expiryDate: "2026-08-18",
    status: "pending_transfer",
    autoRenewal: true
  },
  {
    id: "DOM-015",
    domainName: "nexuscorp.io",
    expiryDate: "2026-06-22",
    status: "expired",
    autoRenewal: false
  }
];

export const INITIAL_PROJECTS: WebsiteProject[] = [
  {
    id: "PRJ-501",
    title: "Nexus Brand Re-Architecting",
    clientName: "Eleanor Vance",
    category: "3D Corporate Site",
    status: "in_progress",
    progress: 35,
    timeline: [
      { title: "Brand Identity Discovery", date: "2026-06-22", done: true },
      { title: "3D Blender Scene Layout", date: "2026-06-28", done: false },
      { title: "Tailwind Integration Staging", date: "2026-07-05", done: false },
      { title: "Client Delivery & Launch", date: "2026-07-15", done: false }
    ],
    notes: "Awaiting final high-fidelity 3D assets of corporate towers from team designers.",
    previewUrl: "https://nexuscorp.io"
  },
  {
    id: "PRJ-502",
    title: "Sterling Fine Arts Storefront",
    clientName: "Aria Sterling",
    category: "E-Commerce",
    status: "under_review",
    progress: 90,
    timeline: [
      { title: "Database Architecture", date: "2026-04-10", done: true },
      { title: "Stripe Gateway Integration", date: "2026-05-02", done: true },
      { title: "UX Fine-Tuning & Typography", date: "2026-06-15", done: true },
      { title: "Review Approval Cycle", date: "2026-06-25", done: false }
    ],
    notes: "Client requested minor font changes on hero headers to enhance luxury look.",
    previewUrl: "https://sterlingaesthetic.co"
  },
  {
    id: "PRJ-503",
    title: "Mehta Finance Portal",
    clientName: "Siddharth Mehta",
    category: "SaaS Dashboard",
    status: "delivered",
    progress: 100,
    timeline: [
      { title: "Wireframing & Spec Sheets", date: "2026-03-30", done: true },
      { title: "Interactive Canvas Coding", date: "2026-04-20", done: true },
      { title: "Secured Firebase DB Auth", date: "2026-05-18", done: true },
      { title: "Production Live Deploy", date: "2026-06-05", done: true }
    ],
    notes: "Delivered successfully. 50% post-launch milestone invoiced and cleared by Mehta Corp.",
    previewUrl: "https://mehtaventures.in"
  },
  {
    id: "PRJ-504",
    title: "Zenith Real-Time Inventory",
    clientName: "Hiroshi Tanaka",
    category: "Custom Web Application",
    status: "completed",
    progress: 100,
    timeline: [
      { title: "System Architecture Mapping", date: "2026-01-15", done: true },
      { title: "Express Server Development", date: "2026-02-28", done: true },
      { title: "WebSockets & Graphing UI", date: "2026-04-14", done: true },
      { title: "Final Security Audit Passed", date: "2026-06-12", done: true }
    ],
    notes: "Passed full penetration test. Staged on secure client subdomains, ready for official launch next week.",
    previewUrl: "https://zenithtokyo.jp"
  }
];

export const INITIAL_CONTACTS: ContactRequest[] = [
  {
    id: "CON-701",
    name: "Charlotte Laurent",
    email: "charlotte@lumiereparis.fr",
    phone: "+33 1 42 27 78 55",
    serviceRequired: "High-End Fashion Portfolio with 3D Mockups",
    budget: 35000,
    message: "Bonjour! We are looking to create a highly sophisticated website showcasing our autumn dress line. We need three-dimensional floating apparel items that users can tilt with their mouse just like your premium Three.js hero. Please get back to us with availability.",
    status: "new",
    date: "2026-06-24"
  },
  {
    id: "CON-702",
    name: "Robert Downey",
    email: "robert@rdmedia.us",
    phone: "+1 (310) 904-8931",
    serviceRequired: "Dedicated VPS Hosting + Domain Management",
    budget: 15000,
    message: "Hi HostNovaPro, I am migrating 18 active business sites from GoDaddy because their speeds are disappointing. We need a reliable Supernova Premium plan with 100% SSD and excellent SLA. Let's schedule a call this Friday.",
    status: "replied",
    date: "2026-06-21"
  },
  {
    id: "CON-703",
    name: "Ananya Iyer",
    email: "ananya@iyerdigital.in",
    phone: "+91 91100 98765",
    serviceRequired: "Titanium Fusion Web Package",
    budget: 50000,
    message: "We need an end-to-end launch of our fintech landing page, custom blog, and premium web design with auto-renewing SSL domains. Your coffee-inspired design aesthetic is beautiful, we want that exact luxurious feel.",
    status: "completed",
    date: "2026-06-14"
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: "TCK-8930",
    ticketId: "#TKT-8930",
    subject: "Latency Spike on Tokyo DB Nodes",
    clientName: "Hiroshi Tanaka",
    email: "tanaka@zenithtokyo.jp",
    status: "open",
    priority: "urgent",
    category: "Technical Support",
    date: "2026-06-24",
    messages: [
      {
        id: "msg-1",
        sender: "client",
        text: "Since 2:00 PM UTC, our PostgreSQL transactions from Japanese instances are experiencing about a 400ms delay. Is there a localized routing problem in Asian CDN clusters?",
        timestamp: "2026-06-24T14:15:00Z"
      },
      {
        id: "msg-2",
        sender: "admin",
        text: "Hello Hiroshi, we are currently investigating. It seems our upstream fiber channel near Tokyo had a minor rerouting event. We are spinning up localized replicas to lower query latency. Hang tight!",
        timestamp: "2026-06-24T14:22:00Z"
      },
      {
        id: "msg-3",
        sender: "client",
        text: "Thanks for the swift update, appreciate the real-time feedback. Let us know once the replication is complete.",
        timestamp: "2026-06-24T14:30:00Z"
      }
    ]
  },
  {
    id: "TCK-8812",
    ticketId: "#TKT-8812",
    subject: "Requesting Upgrade to Dedicated CPU Plan",
    clientName: "Aria Sterling",
    email: "aria@sterlingaesthetic.co",
    status: "pending",
    priority: "medium",
    category: "Billing & Sales",
    date: "2026-06-23",
    messages: [
      {
        id: "msg-4",
        sender: "client",
        text: "We are anticipating a large influx of visitors next week due to a Vogue feature. Can we dynamically upgrade our Andromeda Shared Cloud plan to the Supernova Premium VM with dedicated resources?",
        timestamp: "2026-06-23T09:10:00Z"
      },
      {
        id: "msg-5",
        sender: "admin",
        text: "Absolutely, Aria! We can upgrade your hosting seamlessly without taking your database offline. There will be no downtime. I will prepare an invoice for the difference. Shall we proceed?",
        timestamp: "2026-06-23T10:45:00Z"
      }
    ]
  },
  {
    id: "TCK-8722",
    ticketId: "#TKT-8722",
    subject: "DNS Records and TXT DKIM Verification",
    clientName: "Marcus Thorne",
    email: "m.thorne@vanguardmedia.com",
    status: "resolved",
    priority: "low",
    category: "DNS / Domains",
    date: "2026-06-19",
    messages: [
      {
        id: "msg-6",
        sender: "client",
        text: "We need help setting up the Google Workspace DKIM TXT record. Is it possible to edit raw DNS entries inside the panel?",
        timestamp: "2026-06-19T11:00:00Z"
      },
      {
        id: "msg-7",
        sender: "admin",
        text: "Hi Marcus, yes! You can navigate to 'Domain Management', select vanguardmedia.com, and click 'Manage DNS' to insert TXT, CNAME, or MX values directly. I've also verified and added the standard DKIM key for you.",
        timestamp: "2026-06-19T11:20:00Z"
      },
      {
        id: "msg-8",
        sender: "client",
        text: "Incredible. Verified and email delivery is perfectly green now. Thank you so much!",
        timestamp: "2026-06-19T12:05:00Z"
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  {
    id: "NOT-001",
    type: "order",
    title: "New Premium Fusion Order",
    message: "Eleanor Vance placed an order ORD-9832 worth ₹45,000 for Nexus Corp.",
    date: "10 mins ago",
    read: false
  },
  {
    id: "NOT-002",
    type: "ticket",
    title: "Urgent Latency Support Ticket",
    message: "Hiroshi Tanaka opened Ticket #TKT-8930 regarding localized database spikes.",
    date: "1 hour ago",
    read: false
  },
  {
    id: "NOT-003",
    type: "contact",
    title: "New Staging Consultation Request",
    message: "Charlotte Laurent submitted a design bid of ₹35,000 from Paris.",
    date: "4 hours ago",
    read: false
  },
  {
    id: "NOT-004",
    type: "payment",
    title: "Subscription Renewal Completed",
    message: "vanguardmedia.com domain & VM host bill cleared successfully (₹65,000).",
    date: "1 day ago",
    read: true
  },
  {
    id: "NOT-005",
    type: "client",
    title: "New Corporate Client Registered",
    message: "Mehta Ventures setup their profile successfully on the portal.",
    date: "2 days ago",
    read: true
  }
];

export const TEAM_MEMBERS = [
  {
    id: "TM-01",
    name: "Alex Mercer",
    role: "Lead 3D & WebGL Architect",
    email: "alex@hostnovapro.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    status: "active"
  },
  {
    id: "TM-02",
    name: "Sarah Jenkins",
    role: "Senior Cloud Infrastructure Lead",
    email: "sarah@hostnovapro.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    status: "active"
  },
  {
    id: "TM-03",
    name: "Kabir Roy",
    role: "AI Integration specialist",
    email: "kabir@hostnovapro.com",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    status: "away"
  },
  {
    id: "TM-04",
    name: "Diana Prince",
    role: "Enterprise Support Manager",
    email: "diana@hostnovapro.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    status: "active"
  }
];

// RECHARTS ANALYTICS SEED
export const REVENUE_CHART_DATA = [
  { month: "Jan", Revenue: 340000, Orders: 8, Clients: 12, HostingSales: 180000, DomainSales: 50000 },
  { month: "Feb", Revenue: 410000, Orders: 12, Clients: 18, HostingSales: 220000, DomainSales: 70000 },
  { month: "Mar", Revenue: 580000, Orders: 19, Clients: 25, HostingSales: 310000, DomainSales: 110000 },
  { month: "Apr", Revenue: 710000, Orders: 24, Clients: 32, HostingSales: 380000, DomainSales: 140000 },
  { month: "May", Revenue: 890000, Orders: 31, Clients: 45, HostingSales: 490000, DomainSales: 180000 },
  { month: "Jun", Revenue: 1150000, Orders: 42, Clients: 62, HostingSales: 630000, DomainSales: 240000 }
];

export const HOSTING_SALES_SPLIT = [
  { name: "Supernova Premium VM", value: 55, color: "#6F4E37" },
  { name: "Titanium Fusion Suite", value: 30, color: "#8B5E3C" },
  { name: "Andromeda Cloud Spark", value: 15, color: "#C19A6B" }
];

export const GENERATION_HISTORY_SEED = [
  {
    id: "GEN-01",
    industry: "Luxury Café & Roastery",
    theme: "Gold & Dark Espresso",
    layout: "Bento Grid Creative Portfolio",
    timestamp: "2026-06-24 18:32",
    status: "Generated & Active"
  },
  {
    id: "GEN-02",
    industry: "Venture Capitalist Fund",
    theme: "Clean Swiss Minimalist White",
    layout: "Split Screen Modern Card Hero",
    timestamp: "2026-06-23 10:14",
    status: "Exported ZIP"
  },
  {
    id: "GEN-03",
    industry: "E-Commerce Ceramic Studio",
    theme: "Organic Oatmeal Terracotta",
    layout: "Masonry Storefront Grid",
    timestamp: "2026-06-20 14:02",
    status: "Generated & Active"
  }
];
