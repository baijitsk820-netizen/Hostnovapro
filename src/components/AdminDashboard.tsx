import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, ShoppingCart, Users, Server, Globe, FolderGit2, 
  FileText, CreditCard, Ticket, TrendingUp, Bot, UserPlus, Settings, 
  LogOut, Menu, X, Search, Filter, Plus, Edit, Trash2, CheckCircle2, 
  XCircle, AlertTriangle, Sparkles, Clock, ArrowUpRight, Send, Eye, 
  Copy, Mail, Phone, ShieldCheck, Check, ChevronRight, MessageSquare,
  Volume2, RefreshCw, Activity, Terminal, Bell, User, MoreVertical,
  Layers, HardDrive, Cpu, ArrowUp, ArrowDown, ExternalLink, Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import HostNovaLogo from "./HostNovaLogo";
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from "recharts";

import { db } from "../lib/firebase";
import { 
  collection, doc, getDoc, getDocs, setDoc, addDoc, 
  updateDoc, deleteDoc, onSnapshot, query, orderBy 
} from "firebase/firestore";

import { 
  INITIAL_ORDERS, INITIAL_CLIENTS, INITIAL_HOSTING, INITIAL_DOMAINS,
  INITIAL_PROJECTS, INITIAL_CONTACTS, INITIAL_TICKETS, INITIAL_NOTIFICATIONS,
  TEAM_MEMBERS, REVENUE_CHART_DATA, HOSTING_SALES_SPLIT, GENERATION_HISTORY_SEED
} from "../adminData";

import { 
  AdminOrder, AdminClient, HostingAccount, AdminDomain, 
  WebsiteProject, ContactRequest, SupportTicket, AdminNotification 
} from "../types";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  // Navigation states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic entities states (to preserve original functionality)
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [clients, setClients] = useState<AdminClient[]>(INITIAL_CLIENTS);
  const [hostingAccounts, setHostingAccounts] = useState<HostingAccount[]>(INITIAL_HOSTING);
  const [domains, setDomains] = useState<AdminDomain[]>(INITIAL_DOMAINS);
  const [projects, setProjects] = useState<WebsiteProject[]>(INITIAL_PROJECTS);
  const [contacts, setContacts] = useState<ContactRequest[]>(INITIAL_CONTACTS);
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [notifications, setNotifications] = useState<AdminNotification[]>(INITIAL_NOTIFICATIONS);
  const [genHistory, setGenHistory] = useState(GENERATION_HISTORY_SEED);

  // UI Dropdowns & Status states
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [systemUptime, setSystemUptime] = useState("99.998%");
  const [activeConnections, setActiveConnections] = useState(1482);
  const [cpuLoad, setCpuLoad] = useState(14);
  const [ramUsage, setRamUsage] = useState(38);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Selected sub-entities for view/modals
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(INITIAL_TICKETS[0]);
  const [chatMessage, setChatMessage] = useState("");
  const [alertMsg, setAlertMsg] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  // Form editing states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingType, setEditingType] = useState<"client" | "order" | "hosting" | "domain" | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  // AI Generator state
  const [generatorForm, setGeneratorForm] = useState({
    industry: "Luxury Café & Roastery",
    theme: "Gold & Dark Espresso",
    layout: "Bento Grid Creative Portfolio"
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedResult, setGeneratedResult] = useState<any | null>(null);

  // Settings form states
  const [settingsForm, setSettingsForm] = useState({
    bizName: "HostNovaPro Enterprise",
    bizEmail: "ops@hostnovapro.com",
    smtpServer: "smtp.googlemail.com",
    smtpPort: "587",
    gatewayKey: "pk_live_51N8XvSG736G",
    apiGemini: "AIzaSyB_MockGeminiKey_2026",
    isTfaRequired: true
  });

  // Site SEO Management state
  const [seoSettings, setSeoSettings] = useState({
    siteTitle: "HostNovaPro | Premium Cloud Staging & WHMCS Suite",
    metaDescription: "Deploy high-performance client sites, automate cloud hosting staging environments, and manage WHMCS invoices in one unified administrative suite.",
    ogImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    keywords: "cloud staging, whmcs core, automated hosting, devops, saas builder",
    twitterCard: "summary_large_image",
    searchConsoleVerified: true,
  });

  const [seoPreviewTab, setSeoPreviewTab] = useState<"google" | "social" | "twitter">("google");

  const triggerAlert = (type: "success" | "error" | "info", text: string) => {
    setAlertMsg({ type, text });
    setTimeout(() => {
      setAlertMsg(null);
    }, 4000);
  };

  // Dynamic SEO Score calculation
  const getSeoScore = () => {
    let score = 0;
    
    // Title length score (Optimal: 40 - 65 chars)
    const titleLen = seoSettings.siteTitle.length;
    if (titleLen >= 40 && titleLen <= 65) score += 30;
    else if (titleLen > 0 && titleLen < 40) score += 15;
    else if (titleLen > 65 && titleLen <= 80) score += 20;
    else if (titleLen > 80) score += 10;

    // Meta description length score (Optimal: 110 - 165 chars)
    const descLen = seoSettings.metaDescription.length;
    if (descLen >= 110 && descLen <= 165) score += 30;
    else if (descLen > 0 && descLen < 110) score += 15;
    else if (descLen > 165 && descLen <= 200) score += 20;
    else if (descLen > 200) score += 10;

    // Image score
    if (seoSettings.ogImage) score += 20;

    // Keywords score
    if (seoSettings.keywords.trim()) {
      const keywordCount = seoSettings.keywords.split(",").filter(k => k.trim().length > 0).length;
      if (keywordCount >= 3) score += 20;
      else score += 10;
    }

    return score;
  };

  // Simulate server telemetry variations
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuLoad(Math.floor(10 + Math.random() * 15));
      setRamUsage(Math.floor(35 + Math.random() * 5));
      setActiveConnections(curr => curr + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Real-time Firestore synchronization & automatic seeding
  useEffect(() => {
    const existingOrderIds = new Set<string>();
    let isFirstOrders = true;

    // 1. Orders
    const unsubOrders = onSnapshot(collection(db, "admin_orders"), (snapshot) => {
      if (snapshot.empty) {
        INITIAL_ORDERS.forEach((item) => {
          setDoc(doc(db, "admin_orders", item.id), item);
        });
      } else {
        const list = snapshot.docs.map(doc => doc.data() as AdminOrder);
        setOrders(list);

        if (isFirstOrders) {
          snapshot.docs.forEach(doc => existingOrderIds.add(doc.id));
          isFirstOrders = false;
        } else {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              const newOrder = change.doc.data() as AdminOrder;
              if (!existingOrderIds.has(change.doc.id)) {
                existingOrderIds.add(change.doc.id);
                triggerAlert("success", `🔔 New Order: ${newOrder.clientName} ordered ${newOrder.packageType}!`);
              }
            }
          });
        }
      }
    });

    // 2. Clients
    const unsubClients = onSnapshot(collection(db, "admin_clients"), (snapshot) => {
      if (snapshot.empty) {
        INITIAL_CLIENTS.forEach((item) => {
          setDoc(doc(db, "admin_clients", item.id), item);
        });
      } else {
        const list = snapshot.docs.map(doc => doc.data() as AdminClient);
        setClients(list);
      }
    });

    // 3. Hosting
    const unsubHosting = onSnapshot(collection(db, "admin_hosting"), (snapshot) => {
      if (snapshot.empty) {
        INITIAL_HOSTING.forEach((item) => {
          setDoc(doc(db, "admin_hosting", item.id), item);
        });
      } else {
        const list = snapshot.docs.map(doc => doc.data() as HostingAccount);
        setHostingAccounts(list);
      }
    });

    // 4. Domains
    const unsubDomains = onSnapshot(collection(db, "admin_domains"), (snapshot) => {
      if (snapshot.empty) {
        INITIAL_DOMAINS.forEach((item) => {
          setDoc(doc(db, "admin_domains", item.id), item);
        });
      } else {
        const list = snapshot.docs.map(doc => doc.data() as AdminDomain);
        setDomains(list);
      }
    });

    // 5. Projects
    const unsubProjects = onSnapshot(collection(db, "admin_projects"), (snapshot) => {
      if (snapshot.empty) {
        INITIAL_PROJECTS.forEach((item) => {
          setDoc(doc(db, "admin_projects", item.id), item);
        });
      } else {
        const list = snapshot.docs.map(doc => doc.data() as WebsiteProject);
        setProjects(list);
      }
    });

    // 6. Contacts
    const unsubContacts = onSnapshot(collection(db, "admin_contacts"), (snapshot) => {
      if (snapshot.empty) {
        INITIAL_CONTACTS.forEach((item) => {
          setDoc(doc(db, "admin_contacts", item.id), item);
        });
      } else {
        const list = snapshot.docs.map(doc => doc.data() as ContactRequest);
        setContacts(list);
      }
    });

    const existingTicketIds = new Set<string>();
    let isFirstTickets = true;

    // 7. Tickets
    const unsubTickets = onSnapshot(collection(db, "admin_tickets"), (snapshot) => {
      if (snapshot.empty) {
        INITIAL_TICKETS.forEach((item) => {
          setDoc(doc(db, "admin_tickets", item.id), item);
        });
      } else {
        const list = snapshot.docs.map(doc => doc.data() as SupportTicket);
        setTickets(list);

        if (isFirstTickets) {
          snapshot.docs.forEach(doc => existingTicketIds.add(doc.id));
          isFirstTickets = false;
        } else {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              const newTicket = change.doc.data() as SupportTicket;
              if (!existingTicketIds.has(change.doc.id)) {
                existingTicketIds.add(change.doc.id);
                triggerAlert("info", `🔔 New Ticket: [${newTicket.id}] ${newTicket.subject}`);
              }
            }
          });
        }
      }
    });

    // 8. Notifications
    const unsubNotifications = onSnapshot(collection(db, "admin_notifications"), (snapshot) => {
      if (snapshot.empty) {
        INITIAL_NOTIFICATIONS.forEach((item) => {
          setDoc(doc(db, "admin_notifications", item.id), item);
        });
      } else {
        const list = snapshot.docs.map(doc => doc.data() as AdminNotification);
        setNotifications(list);
      }
    });

    // 9. Settings
    const unsubSettings = onSnapshot(doc(db, "admin_settings", "config"), (docSnap) => {
      if (docSnap.exists()) {
        setSettingsForm(docSnap.data() as any);
      } else {
        setDoc(doc(db, "admin_settings", "config"), {
          bizName: "HostNovaPro Enterprise",
          bizEmail: "ops@hostnovapro.com",
          smtpServer: "smtp.googlemail.com",
          smtpPort: "587",
          gatewayKey: "pk_live_51N8XvSG736G",
          apiGemini: "AIzaSyB_MockGeminiKey_2026",
          isTfaRequired: true
        });
      }
    });

    // 10. SEO Settings
    const unsubSeo = onSnapshot(doc(db, "admin_seo", "config"), (docSnap) => {
      if (docSnap.exists()) {
        setSeoSettings(docSnap.data() as any);
      } else {
        setDoc(doc(db, "admin_seo", "config"), {
          siteTitle: "HostNovaPro | Premium Cloud Staging & WHMCS Suite",
          metaDescription: "Deploy high-performance client sites, automate cloud hosting staging environments, and manage WHMCS invoices in one unified administrative suite.",
          ogImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
          keywords: "cloud staging, whmcs core, automated hosting, saas builder, devops",
          twitterCard: "summary_large_image",
          searchConsoleVerified: true,
        });
      }
    });

    return () => {
      unsubOrders();
      unsubClients();
      unsubHosting();
      unsubDomains();
      unsubProjects();
      unsubContacts();
      unsubTickets();
      unsubNotifications();
      unsubSettings();
      unsubSeo();
    };
  }, []);

  // General Search and Filter Engine
  const getFilteredData = (type: string) => {
    const query = searchQuery.toLowerCase();
    switch (type) {
      case "orders":
        return orders.filter(o => 
          (o.clientName.toLowerCase().includes(query) || o.id.toLowerCase().includes(query) || o.serviceRequired.toLowerCase().includes(query)) &&
          (statusFilter === "all" || o.status === statusFilter)
        );
      case "clients":
        return clients.filter(c => 
          (c.name.toLowerCase().includes(query) || c.email.toLowerCase().includes(query) || c.company.toLowerCase().includes(query)) &&
          (statusFilter === "all" || c.status === statusFilter)
        );
      case "hosting":
        return hostingAccounts.filter(h => 
          (h.clientName.toLowerCase().includes(query) || h.domain.toLowerCase().includes(query) || h.plan.toLowerCase().includes(query)) &&
          (statusFilter === "all" || h.status === statusFilter)
        );
      case "domains":
        return domains.filter(d => 
          d.domainName.toLowerCase().includes(query) &&
          (statusFilter === "all" || d.status === statusFilter)
        );
      case "contacts":
        return contacts.filter(c => 
          (c.name.toLowerCase().includes(query) || c.email.toLowerCase().includes(query) || c.serviceRequired.toLowerCase().includes(query)) &&
          (statusFilter === "all" || c.status === statusFilter)
        );
      case "tickets":
        return tickets.filter(t => 
          (t.clientName.toLowerCase().includes(query) || t.subject.toLowerCase().includes(query) || t.ticketId.toLowerCase().includes(query)) &&
          (statusFilter === "all" || t.status === statusFilter)
        );
      default:
        return [];
    }
  };

  // Order Actions
  const handleApproveOrder = async (id: string) => {
    try {
      await updateDoc(doc(db, "admin_orders", id), { status: "completed" });
      
      const order = orders.find(o => o.id === id);
      if (order) {
        const exists = clients.some(c => c.email === order.clientEmail);
        if (!exists) {
          const clientId = `CLI-${Math.floor(Math.random() * 1000)}`;
          const newClient: AdminClient = {
            id: clientId,
            name: order.clientName,
            email: order.clientEmail,
            phone: "+91 (987) 654-3210",
            company: order.clientName.split(" ")[0] + " Enterprise",
            packageType: order.packageType,
            status: "active",
            createdAt: new Date().toISOString().split("T")[0]
          };
          await setDoc(doc(db, "admin_clients", clientId), newClient);

          const domainName = order.clientName.toLowerCase().replace(/\s+/g, "") + ".com";
          const hostingId = `HST-${Math.floor(Math.random() * 1000)}`;
          const newHosting: HostingAccount = {
            id: hostingId,
            clientName: order.clientName,
            domain: domainName,
            plan: order.packageType,
            diskUsage: "0.1 GB / 250 GB",
            diskPercentage: 0.1,
            bandwidth: "0 GB / 8000 GB",
            bandwidthPercentage: 0,
            cpuUsage: 0,
            ramUsage: 0,
            renewalDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            status: "active"
          };
          await setDoc(doc(db, "admin_hosting", hostingId), newHosting);

          const domainId = `DOM-${Math.floor(Math.random() * 1000)}`;
          const newDomain: AdminDomain = {
            id: domainId,
            domainName,
            expiryDate: newHosting.renewalDate,
            status: "active",
            autoRenewal: true
          };
          await setDoc(doc(db, "admin_domains", domainId), newDomain);
        }
      }
      triggerAlert("success", `Order ${id} approved & Cloud Staging endpoints provisioned!`);
    } catch (err) {
      console.error(err);
      triggerAlert("error", "Failed to approve order.");
    }
  };

  const handleRejectOrder = async (id: string) => {
    try {
      await updateDoc(doc(db, "admin_orders", id), { status: "cancelled" });
      triggerAlert("info", `Order ${id} set to cancelled.`);
    } catch (err) {
      console.error(err);
      triggerAlert("error", "Failed to reject order.");
    }
  };

  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteDoc(doc(db, "admin_orders", id));
      triggerAlert("success", `Order ${id} removed from buffer.`);
    } catch (err) {
      console.error(err);
      triggerAlert("error", "Failed to delete order.");
    }
  };

  // Client Actions
  const handleSuspendClient = async (id: string) => {
    try {
      const cl = clients.find(c => c.id === id);
      if (!cl) return;
      const nextStatus = cl.status === "suspended" ? "active" : "suspended";
      await updateDoc(doc(db, "admin_clients", id), { status: nextStatus });
      triggerAlert("info", `Client account ${id} ${nextStatus === "active" ? "activated" : "suspended"}.`);
    } catch (err) {
      console.error(err);
      triggerAlert("error", "Failed to update client status.");
    }
  };

  const handleDeleteClient = async (id: string) => {
    try {
      await deleteDoc(doc(db, "admin_clients", id));
      triggerAlert("success", `Client ${id} records deleted.`);
    } catch (err) {
      console.error(err);
      triggerAlert("error", "Failed to delete client.");
    }
  };

  // Hosting Actions
  const handleSuspendHosting = async (id: string) => {
    try {
      const h = hostingAccounts.find(x => x.id === id);
      if (!h) return;
      const nextStatus = h.status === "suspended" ? "active" : "suspended";
      await updateDoc(doc(db, "admin_hosting", id), { status: nextStatus });
      triggerAlert("info", `Hosting nodes ${id} suspension state updated.`);
    } catch (err) {
      console.error(err);
      triggerAlert("error", "Failed to suspend hosting nodes.");
    }
  };

  const handleTerminateHosting = async (id: string) => {
    try {
      await updateDoc(doc(db, "admin_hosting", id), { status: "terminated", cpuUsage: 0, ramUsage: 0 });
      triggerAlert("error", `Hosting node cluster ${id} terminated.`);
    } catch (err) {
      console.error(err);
      triggerAlert("error", "Failed to terminate hosting nodes.");
    }
  };

  const handleUpgradeHosting = async (id: string) => {
    try {
      await updateDoc(doc(db, "admin_hosting", id), { plan: "Supernova Premium VM (VCPU Max Edition)", renewalDate: "2028-06-30" });
      triggerAlert("success", `Hosting parameters for ${id} scaled to Supernova Max plan.`);
    } catch (err) {
      console.error(err);
      triggerAlert("error", "Failed to upgrade hosting nodes.");
    }
  };

  const handleCreateHosting = async () => {
    try {
      const hstId = `HST-${Math.floor(Math.random() * 1000)}`;
      const newHost: HostingAccount = {
        id: hstId,
        clientName: "Express Onboarding",
        domain: "saas-launchpad.io",
        plan: "Supernova Premium VM",
        diskUsage: "14 GB / 500 GB",
        diskPercentage: 2.8,
        bandwidth: "88 GB / 10000 GB",
        bandwidthPercentage: 0.88,
        cpuUsage: 4,
        ramUsage: 16,
        renewalDate: "2027-06-25",
        status: "active"
      };
      await setDoc(doc(db, "admin_hosting", hstId), newHost);
      triggerAlert("success", "Custom WHMCS hosting workspace launched successfully.");
    } catch (err) {
      console.error(err);
      triggerAlert("error", "Failed to launch hosting workspace.");
    }
  };

  // Domain Actions
  const handleRenewDomain = async (id: string) => {
    try {
      await updateDoc(doc(db, "admin_domains", id), { status: "active", expiryDate: "2028-06-24" });
      triggerAlert("success", `Domain registry ${id} renewed for +1 Year.`);
    } catch (err) {
      console.error(err);
      triggerAlert("error", "Failed to renew domain.");
    }
  };

  const handleToggleAutoRenewal = async (id: string) => {
    try {
      const d = domains.find(x => x.id === id);
      if (!d) return;
      await updateDoc(doc(db, "admin_domains", id), { autoRenewal: !d.autoRenewal });
      triggerAlert("info", "Domain auto-renew flags updated.");
    } catch (err) {
      console.error(err);
      triggerAlert("error", "Failed to toggle domain auto-renewal.");
    }
  };

  // Project Actions
  const handleUpdateProjectStatus = async (id: string, stat: "in_progress" | "under_review" | "completed" | "delivered") => {
    try {
      const progresses = { in_progress: 35, under_review: 90, completed: 100, delivered: 100 };
      await updateDoc(doc(db, "admin_projects", id), { status: stat, progress: progresses[stat] });
      triggerAlert("success", `Project ${id} status updated to: ${stat.replace("_", " ")}`);
    } catch (err) {
      console.error(err);
      triggerAlert("error", "Failed to update project status.");
    }
  };

  // Contact Actions
  const handleReplyContact = async (id: string) => {
    try {
      await updateDoc(doc(db, "admin_contacts", id), { status: "replied" });
      triggerAlert("success", `Drafted and sent auto-quoted email reply to request ${id}.`);
    } catch (err) {
      console.error(err);
      triggerAlert("error", "Failed to update contact status.");
    }
  };

  const handleMarkContactComplete = async (id: string) => {
    try {
      await updateDoc(doc(db, "admin_contacts", id), { status: "completed" });
      triggerAlert("info", `Contact ticket ${id} marked complete.`);
    } catch (err) {
      console.error(err);
      triggerAlert("error", "Failed to update contact status.");
    }
  };

  // Ticket Live Chat Actions
  const handleSendTicketReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || !selectedTicket) return;

    try {
      const newMessage = {
        id: `msg-${Date.now()}`,
        sender: "admin" as const,
        text: chatMessage,
        timestamp: new Date().toISOString()
      };

      const nextMessages = [...selectedTicket.messages, newMessage];
      await updateDoc(doc(db, "admin_tickets", selectedTicket.id), {
        status: "pending",
        messages: nextMessages
      });

      setSelectedTicket({
        ...selectedTicket,
        status: "pending",
        messages: nextMessages
      });

      setChatMessage("");
      triggerAlert("success", "Support ticket reply transmitted secure.");
    } catch (err) {
      console.error(err);
      triggerAlert("error", "Failed to send ticket reply.");
    }
  };

  // AI Generator Simulator
  const handleAIGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenerationStep(0);
    setGeneratedResult(null);

    const steps = [
      "Provisioning safe sandbox node environment...",
      "Structuring high-fidelity " + generatorForm.layout + " layout rules...",
      "Brewing layout design matching " + generatorForm.theme + " colors...",
      "Assembling React modules and routing parameters...",
      "Compiling optimized bundle & caching to Global Edge CDN..."
    ];

    const runSteps = (stepIdx: number) => {
      if (stepIdx < steps.length) {
        setGenerationStep(stepIdx);
        setTimeout(() => runSteps(stepIdx + 1), 800);
      } else {
        setIsGenerating(false);
        const newResult = {
          id: `GEN-${Math.floor(Math.random() * 1000)}`,
          industry: generatorForm.industry,
          theme: generatorForm.theme,
          layout: generatorForm.layout,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
          status: "Generated & Active"
        };
        setGenHistory(curr => [newResult, ...curr]);
        setGeneratedResult(newResult);
        triggerAlert("success", "SaaS staging workspace compiled and ready!");
      }
    };

    runSteps(0);
  };

  // General Edit Modal handlers
  const openEditModal = (type: "client" | "order" | "hosting" | "domain", item: any) => {
    setEditingType(type);
    setEditForm({ ...item });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingType === "client") {
        await setDoc(doc(db, "admin_clients", editForm.id), editForm);
      } else if (editingType === "order") {
        await setDoc(doc(db, "admin_orders", editForm.id), editForm);
      } else if (editingType === "hosting") {
        await setDoc(doc(db, "admin_hosting", editForm.id), editForm);
      } else if (editingType === "domain") {
        await setDoc(doc(db, "admin_domains", editForm.id), editForm);
      }
      setIsEditModalOpen(false);
      triggerAlert("success", `${editingType ? editingType.toUpperCase() : "Record"} modified.`);
    } catch (err) {
      console.error(err);
      triggerAlert("error", "Failed to save record modifications.");
    }
  };

  // Notification clean handler
  const handleMarkNotificationsRead = async () => {
    try {
      const promises = notifications.map(n => {
        if (!n.read) {
          return updateDoc(doc(db, "admin_notifications", n.id), { read: true });
        }
        return Promise.resolve();
      });
      await Promise.all(promises);
      triggerAlert("info", "All system notifications marked read.");
    } catch (err) {
      console.error(err);
      triggerAlert("error", "Failed to mark notifications read.");
    }
  };

  // Settings & SEO Firestore Savers
  const handleSaveSettings = async () => {
    try {
      await setDoc(doc(db, "admin_settings", "config"), settingsForm);
      triggerAlert("success", "SaaS server config parameters updated successfully.");
    } catch (err) {
      console.error(err);
      triggerAlert("error", "Failed to save SaaS settings.");
    }
  };

  const handleSaveSeo = async () => {
    try {
      await setDoc(doc(db, "admin_seo", "config"), seoSettings);
      triggerAlert("success", "Organic meta tags updated. Live staging crawling buffer synced successfully!");
    } catch (err) {
      console.error(err);
      triggerAlert("error", "Failed to save SEO parameters.");
    }
  };

  // Quick action mock behaviors
  const handleSystemReboot = () => {
    triggerAlert("info", "Initiating rolling reboot across 18 high-retention hosting clusters...");
    setTimeout(() => {
      triggerAlert("success", "All server clusters rebooted successfully. Zero downtime recorded.");
    }, 1500);
  };

  const handleClearCache = () => {
    triggerAlert("success", "Edge CDN static cache purges processed successfully.");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased flex flex-col md:flex-row relative">
      
      {/* Global alert bar banner */}
      <AnimatePresence>
        {alertMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] px-5 py-3.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xl flex items-center space-x-3 backdrop-blur-md"
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
              alertMsg.type === "success" ? "bg-[#DCFCE7] text-[#16A34A]" :
              alertMsg.type === "error" ? "bg-red-100 text-[#EF4444]" : "bg-sky-100 text-[#0EA5E9]"
            }`}>
              {alertMsg.type === "success" ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            </div>
            <p className="text-xs font-semibold text-[#0F172A]">{alertMsg.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================== COLLAPSIBLE WHITE SIDEBAR ================== */}
      <aside 
        className={`bg-white border-r border-[#E2E8F0] h-screen sticky top-0 transition-all duration-300 hidden md:flex flex-col justify-between shrink-0 z-40 ${
          isSidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="p-5 flex flex-col space-y-7 overflow-y-auto no-scrollbar">
          {/* Header Brand */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
            {!isSidebarCollapsed ? (
              <div className="flex items-center space-x-2.5">
                <HostNovaLogo size={34} variant="icon-only" />
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm tracking-tight text-[#0F172A]">
                    HostNova<span className="text-[#16A34A] font-extrabold">Pro</span>
                  </span>
                  <span className="text-[7.5px] font-mono tracking-widest text-[#64748B] font-bold uppercase">
                    SaaS Management
                  </span>
                </div>
              </div>
            ) : (
              <HostNovaLogo size={32} variant="icon-only" className="mx-auto" />
            )}
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-lg hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer hidden md:block"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "orders", label: "Orders Pool", icon: ShoppingCart, count: orders.filter(o => o.status === "pending").length },
              { id: "clients", label: "Client Records", icon: Users },
              { id: "hosting", label: "Hosting Nodes", icon: Server },
              { id: "domains", label: "Domain Manager", icon: Globe },
              { id: "websites", label: "Staging Sites", icon: FolderGit2 },
              { id: "contacts", label: "Leads / Inquiries", icon: FileText, count: contacts.filter(c => c.status === "new").length },
              { id: "generator", label: "AI Compiler", icon: Bot },
              { id: "analytics", label: "Revenue Ledger", icon: TrendingUp },
              { id: "tickets", label: "Support Desk", icon: Ticket, count: tickets.filter(t => t.status === "open").length },
              { id: "team", label: "Staff Directory", icon: UserPlus },
              { id: "settings", label: "Server Settings", icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSearchQuery("");
                    setStatusFilter("all");
                  }}
                  className={`w-full flex items-center p-2.5 rounded-xl text-xs font-semibold transition-all group relative cursor-pointer ${
                    isActive 
                      ? "bg-[#16A34A] text-white shadow-md shadow-green-600/10" 
                      : "hover:bg-[#DCFCE7] text-[#64748B] hover:text-[#16A34A]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSidebarCollapsed ? "mx-auto" : "mr-3"}`} />
                  {!isSidebarCollapsed && (
                    <span className="truncate flex-grow text-left">{item.label}</span>
                  )}
                  {item.count && item.count > 0 && !isSidebarCollapsed && (
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? "bg-white text-[#16A34A]" : "bg-red-100 text-[#EF4444]"
                    }`}>
                      {item.count}
                    </span>
                  )}
                  {isSidebarCollapsed && item.count && item.count > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Log out */}
        <div className="p-4 border-t border-[#E2E8F0] bg-[#FAF9F6]/50">
          <button
            onClick={onLogout}
            className="w-full flex items-center p-2.5 hover:bg-red-50 text-[#EF4444] rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut className={`w-4 h-4 ${isSidebarCollapsed ? "mx-auto" : "mr-3"}`} />
            {!isSidebarCollapsed && <span className="text-left">Secure Logout</span>}
          </button>
        </div>
      </aside>

      {/* ================== MOBILE NAVBAR ================== */}
      <div className="md:hidden bg-white border-b border-[#E2E8F0] p-4 flex items-center justify-between sticky top-0 z-50 w-full">
        <div className="flex items-center space-x-2">
          <HostNovaLogo size={28} variant="icon-only" />
          <span className="font-display font-bold text-sm text-[#0F172A]">HostNovaPro</span>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="p-1.5 rounded-lg bg-slate-50 text-[#64748B] hover:text-[#0F172A] relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-lg bg-slate-50 text-[#64748B] hover:text-[#0F172A]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-[61px] left-0 right-0 bg-white border-b border-[#E2E8F0] shadow-xl z-30 p-4 space-y-3 flex flex-col"
          >
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "orders", label: "Orders Pool", icon: ShoppingCart },
              { id: "clients", label: "Client Records", icon: Users },
              { id: "hosting", label: "Hosting Nodes", icon: Server },
              { id: "domains", label: "Domain Manager", icon: Globe },
              { id: "websites", label: "Staging Sites", icon: FolderGit2 },
              { id: "contacts", label: "Leads", icon: FileText },
              { id: "generator", label: "AI Compiler", icon: Bot },
              { id: "analytics", label: "Revenue Ledger", icon: TrendingUp },
              { id: "tickets", label: "Support Desk", icon: Ticket },
              { id: "team", label: "Staff Directory", icon: UserPlus },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center p-2.5 rounded-xl text-xs font-semibold ${
                  activeTab === item.id ? "bg-[#DCFCE7] text-[#16A34A]" : "text-[#64748B]"
                }`}
              >
                <item.icon className="w-4 h-4 mr-3" />
                <span>{item.label}</span>
              </button>
            ))}
            <button
              onClick={onLogout}
              className="flex items-center p-2.5 text-[#EF4444] rounded-xl text-xs font-bold bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-3" />
              <span>Secure Logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================== MAIN CANVAS CONTAINER ================== */}
      <main className="flex-grow p-4 md:p-8 flex flex-col justify-between overflow-x-hidden min-h-screen">
        
        {/* ================== TOP NAVIGATION BAR ================== */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-6 border-b border-[#E2E8F0] mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-1">
              <span className="text-[9px] font-mono text-[#16A34A] font-bold tracking-widest uppercase bg-[#DCFCE7] px-2 py-0.5 rounded-md">
                ✦ Enterprise Stack Active ✦
              </span>
              <span className="text-xs text-[#64748B] font-medium">/ Workspace</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0F172A] mt-1 capitalize">
              {activeTab.replace("_", " ")} Workspace
            </h1>
          </div>

          {/* Quick Actions Panel, Notifications & Profile */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
            
            {/* Quick Action buttons */}
            <div className="hidden sm:flex items-center space-x-2 bg-white px-2 py-1.5 rounded-xl border border-[#E2E8F0] shadow-sm">
              <button
                onClick={handleSystemReboot}
                className="text-[11px] font-bold text-[#64748B] hover:text-[#EF4444] px-2.5 py-1 rounded-lg hover:bg-red-50 transition-colors flex items-center space-x-1"
                title="Perform diagnostics rolling reboot"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reboot Nodes</span>
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={handleClearCache}
                className="text-[11px] font-bold text-[#64748B] hover:text-[#16A34A] px-2.5 py-1 rounded-lg hover:bg-[#DCFCE7] transition-colors flex items-center space-x-1"
                title="Purge static proxy assets"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Clear Cache</span>
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => {
                  setActiveTab("generator");
                  triggerAlert("info", "Procedural website compiler activated.");
                }}
                className="text-[11px] font-bold text-[#16A34A] px-2.5 py-1 rounded-lg bg-[#DCFCE7] hover:bg-[#16A34A] hover:text-white transition-all flex items-center space-x-1"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Deploy AI Staging</span>
              </button>
            </div>

            {/* Notifications Dropdown Trigger */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsProfileOpen(false);
                }}
                className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer relative shadow-sm"
                title="System Notifications Log"
              >
                <Bell className="w-4.5 h-4.5 text-[#64748B]" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#EF4444] rounded-full animate-pulse" />
                )}
              </button>

              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-4 z-50 text-xs text-[#0F172A]"
                  >
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                      <span className="font-bold text-sm">System Alerts ({notifications.filter(n => !n.read).length})</span>
                      <button 
                        onClick={handleMarkNotificationsRead}
                        className="text-[10px] text-[#16A34A] font-bold hover:underline"
                      >
                        Mark all read
                      </button>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {notifications.map((n) => (
                        <div 
                          key={n.id} 
                          className={`p-2.5 rounded-xl border transition-all flex gap-2 ${
                            n.read 
                              ? "bg-slate-50 border-transparent opacity-70" 
                              : "bg-[#DCFCE7]/40 border-[#DCFCE7]"
                          }`}
                        >
                          <div className="mt-0.5">
                            <span className={`w-1.5 h-1.5 rounded-full block ${n.read ? "bg-slate-400" : "bg-[#16A34A]"}`} />
                          </div>
                          <div className="flex-grow">
                            <span className="font-semibold block text-[11px]">{n.title}</span>
                            <p className="text-[10px] text-[#64748B] mt-0.5 leading-normal">{n.message}</p>
                            <span className="text-[9px] font-mono text-slate-400 block mt-1">{n.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile Dropdown Trigger */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotificationOpen(false);
                }}
                className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-[#E2E8F0] hover:bg-slate-50 rounded-xl transition-all cursor-pointer shadow-sm"
              >
                <div className="w-7 h-7 rounded-lg bg-[#DCFCE7] text-[#16A34A] font-bold flex items-center justify-center text-xs">
                  A
                </div>
                <div className="text-left hidden sm:block">
                  <span className="text-xs font-bold block text-[#0F172A]">Apurva S.</span>
                  <span className="text-[9px] text-[#64748B] block font-mono">Senior Architect</span>
                </div>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-52 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-3 z-50 text-xs text-[#0F172A] space-y-2"
                  >
                    <div className="px-2 py-1.5 border-b border-slate-100">
                      <span className="font-bold block text-[#0F172A]">Apurva Sharma</span>
                      <span className="text-[10px] text-[#64748B] block truncate">ops@hostnovapro.com</span>
                    </div>
                    <button 
                      onClick={() => alert("Session parameters: Cloud-hosted secure portal token certified.")}
                      className="w-full text-left p-2 hover:bg-slate-50 rounded-lg flex items-center space-x-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                      <span>Security Key Detail</span>
                    </button>
                    <button 
                      onClick={() => {
                        setActiveTab("settings");
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left p-2 hover:bg-slate-50 rounded-lg flex items-center space-x-2"
                    >
                      <Settings className="w-4 h-4 text-[#64748B]" />
                      <span>System Settings</span>
                    </button>
                    <button 
                      onClick={onLogout}
                      className="w-full text-left p-2 hover:bg-red-50 text-[#EF4444] rounded-lg flex items-center space-x-2 font-bold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Secure Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </header>

        {/* Alert / Search Filter Row (Not shown on settings, team, analytics, generator) */}
        {!["settings", "team", "analytics", "generator", "dashboard"].includes(activeTab) && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search through ${activeTab} active database...`}
                className="w-full bg-white border border-[#E2E8F0] pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#16A34A] focus:border-[#16A34A] transition-all shadow-sm"
              />
            </div>

            <div className="flex items-center space-x-3 self-end md:self-auto">
              <Filter className="w-4 h-4 text-[#64748B]" />
              <div className="flex bg-white p-1 rounded-xl border border-[#E2E8F0] text-xs shadow-sm">
                {["all", "active", "pending", "suspended", "completed"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setStatusFilter(f)}
                    className={`px-3 py-1 rounded-lg font-bold capitalize cursor-pointer ${
                      statusFilter === f 
                        ? "bg-[#16A34A] text-white" 
                        : "text-[#64748B] hover:text-[#16A34A]"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================== TAB WORKSPACE VIEWS ================== */}
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              
              {/* ================== 1. DASHBOARD OVERVIEW TAB ================== */}
              {activeTab === "dashboard" && (
                <div className="space-y-8">
                  
                  {/* Real-time Staging Server Status / Telemetry Widgets */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm flex items-center space-x-3.5">
                      <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-[#16A34A]">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#64748B] block uppercase tracking-wider">SLA Node Uptime</span>
                        <span className="text-sm font-bold block text-green-600 font-mono">{systemUptime}</span>
                      </div>
                    </div>

                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm flex items-center space-x-3.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0EA5E9]">
                        <Globe className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#64748B] block uppercase tracking-wider">Active Socket Ingress</span>
                        <span className="text-sm font-bold block text-[#0EA5E9] font-mono">{activeConnections} / Sec</span>
                      </div>
                    </div>

                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm flex items-center space-x-3.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#F59E0B]">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div className="flex-grow">
                        <span className="text-[10px] font-bold text-[#64748B] block uppercase tracking-wider">vCPU Load Core</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-[#F59E0B] font-mono">{cpuLoad}%</span>
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#F59E0B]" style={{ width: `${cpuLoad}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm flex items-center space-x-3.5">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                        <HardDrive className="w-5 h-5" />
                      </div>
                      <div className="flex-grow">
                        <span className="text-[10px] font-bold text-[#64748B] block uppercase tracking-wider">RAM Allocation</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-purple-600 font-mono">{ramUsage}%</span>
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-600" style={{ width: `${ramUsage}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Premium Stat Cards with lift-on-hover */}
                  <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                    {[
                      { title: "Total Clients", val: clients.length, trend: "+14.8%", up: true, sub: "Month over month", icon: Users, color: "text-[#16A34A]", bg: "bg-green-50" },
                      { title: "Hosting Clusters", val: hostingAccounts.filter(h => h.status === "active").length, trend: "SLA Sync", up: true, sub: "WHMCS verified", icon: Server, color: "text-[#0EA5E9]", bg: "bg-sky-50" },
                      { title: "Staging Portals", val: projects.length, trend: "100% active", up: true, sub: "Next.js & React v18", icon: FolderGit2, color: "text-indigo-600", bg: "bg-indigo-50" },
                      { title: "Pending Orders", val: orders.filter(o => o.status === "pending").length, trend: "Requires attention", up: false, sub: "Immediate quote needed", icon: ShoppingCart, color: "text-amber-500", bg: "bg-amber-50" },
                      { title: "Monthly Revenue", val: "₹11,50,000", trend: "+24.2%", up: true, sub: "Jaipur-Bangalore enterprise", icon: CreditCard, color: "text-emerald-500", bg: "bg-emerald-50" },
                      { title: "Support Tickets", val: tickets.filter(t => t.status === "open").length, trend: "< 5m response", up: true, sub: "High Priority Active", icon: Ticket, color: "text-[#EF4444]", bg: "bg-red-50" },
                    ].map((card, i) => {
                      const Icon = card.icon;
                      return (
                        <div 
                          key={i} 
                          className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-bold text-[#64748B] block uppercase tracking-wider">
                              {card.title}
                            </span>
                            <div className={`w-7 h-7 rounded-lg ${card.bg} flex items-center justify-center`}>
                              <Icon className={`w-4 h-4 ${card.color}`} />
                            </div>
                          </div>
                          <div className="mt-4">
                            <h3 className="text-xl font-bold tracking-tight text-[#0F172A]">{card.val}</h3>
                            <div className="flex items-center space-x-1 mt-1 text-[10px]">
                              <span className={`font-bold flex items-center ${card.up ? "text-green-600" : "text-amber-600"}`}>
                                {card.up ? <ArrowUp className="w-3 h-3 mr-0.5" /> : null}
                                {card.trend}
                              </span>
                              <span className="text-[#64748B] font-medium">• {card.sub}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Analytics Grid: Revenue & Recent Activity Timeline */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Revenue Plot */}
                    <div className="lg:col-span-8 bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-base font-bold text-[#0F172A]">Revenue Trajectory & Pipeline Scale</h3>
                          <p className="text-xs text-[#64748B] mt-0.5">Rolling monthly metrics across design billing & subscription nodes.</p>
                        </div>
                        <span className="text-xs bg-[#DCFCE7] text-[#16A34A] font-bold font-mono px-2.5 py-1 rounded-full">
                          +24% Quarterly Ingress
                        </span>
                      </div>
                      
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={REVENUE_CHART_DATA}>
                            <defs>
                              <linearGradient id="colorRevGreen" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#16A34A" stopOpacity={0.25}/>
                                <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                            <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                            <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="Revenue" stroke="#16A34A" strokeWidth={3} fillOpacity={1} fill="url(#colorRevGreen)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Timeline & Active Server Monitor */}
                    <div className="lg:col-span-4 bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                          <h3 className="text-base font-bold text-[#0F172A]">Recent Operations Feed</h3>
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                        </div>

                        <div className="space-y-4 max-h-[250px] overflow-y-auto pr-1">
                          {[
                            { text: "Server cluster HST-492 storage metrics optimized.", time: "10 mins ago", type: "success" },
                            { text: "New support ticket raised by Eleanor Vance regarding Domain mapping.", time: "42 mins ago", type: "info" },
                            { text: "Staging package exported successfully for Coffee Atelier.", time: "2 hours ago", type: "success" },
                            { text: "Security diagnostics check: 0 vulnerabilities found.", time: "5 hours ago", type: "shield" },
                            { text: "System parameters: WHMCS SSL certificates renewed.", time: "1 day ago", type: "success" }
                          ].map((item, idx) => (
                            <div key={idx} className="flex space-x-3 text-xs leading-normal">
                              <div className="flex flex-col items-center">
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                                  item.type === "success" ? "bg-green-50 text-[#16A34A]" :
                                  item.type === "info" ? "bg-blue-50 text-[#0EA5E9]" : "bg-purple-50 text-purple-600"
                                }`}>
                                  {item.type === "success" ? <CheckCircle2 className="w-3.5 h-3.5" /> : 
                                   item.type === "info" ? <MessageSquare className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                                </div>
                                {idx !== 4 && <div className="w-0.5 bg-slate-100 flex-grow my-1" />}
                              </div>
                              <div className="pt-0.5">
                                <p className="text-[#0F172A] font-medium leading-relaxed">{item.text}</p>
                                <span className="text-[10px] text-[#64748B] block mt-0.5 font-mono">{item.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#E2E8F0] mt-4 flex items-center justify-between text-[10px] font-mono text-[#64748B] uppercase">
                        <span>✦ DB Connection Pool: Live</span>
                        <span>Secured (SSL)</span>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* ================== 2. ORDERS POOL TAB ================== */}
              {activeTab === "orders" && (
                <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-[#E2E8F0]">
                          <th className="p-4 font-mono font-bold text-[#64748B] uppercase tracking-wider">Order ID</th>
                          <th className="p-4 font-bold text-[#0F172A]">Client Name</th>
                          <th className="p-4 font-bold text-[#0F172A]">Service Description</th>
                          <th className="p-4 font-bold text-[#0F172A]">Budget Bracket</th>
                          <th className="p-4 font-bold text-[#0F172A]">Staging Plan</th>
                          <th className="p-4 font-bold text-[#0F172A]">Status</th>
                          <th className="p-4 font-bold text-center">Actions Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {getFilteredData("orders").map((o: any) => (
                          <tr key={o.id} className="hover:bg-[#F8FAFC] transition-colors">
                            <td className="p-4 font-mono font-bold text-[#16A34A]">{o.id}</td>
                            <td className="p-4">
                              <span className="font-bold text-[#0F172A] block">{o.clientName}</span>
                              <span className="text-[10px] text-[#64748B] font-mono block">{o.clientEmail}</span>
                            </td>
                            <td className="p-4 max-w-xs truncate font-medium text-[#64748B]">{o.serviceRequired}</td>
                            <td className="p-4 font-mono font-bold text-[#16A34A]">₹{o.budget.toLocaleString()}</td>
                            <td className="p-4">
                              <span className="px-2.5 py-1 bg-green-50 text-[#16A34A] rounded-lg text-[10px] font-bold">
                                {o.packageType}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold capitalize ${
                                o.status === "completed" ? "bg-[#DCFCE7] text-[#16A34A]" :
                                o.status === "cancelled" ? "bg-red-100 text-[#EF4444]" : "bg-amber-100 text-[#F59E0B]"
                              }`}>
                                {o.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex justify-center items-center space-x-2">
                                {o.status === "pending" && (
                                  <>
                                    <button 
                                      onClick={() => handleApproveOrder(o.id)}
                                      className="p-1.5 bg-[#DCFCE7] text-[#16A34A] rounded-lg hover:bg-[#16A34A] hover:text-white cursor-pointer transition-colors"
                                      title="Approve order & provision server staging environment"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                    <button 
                                      onClick={() => handleRejectOrder(o.id)}
                                      className="p-1.5 bg-red-100 text-[#EF4444] rounded-lg hover:bg-[#EF4444] hover:text-white cursor-pointer transition-colors"
                                      title="Cancel Order"
                                    >
                                      <XCircle className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                )}
                                <button 
                                  onClick={() => openEditModal("order", o)}
                                  className="p-1.5 bg-slate-100 text-[#64748B] rounded-lg hover:bg-[#0EA5E9] hover:text-white cursor-pointer transition-colors"
                                  title="Edit Order Data"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteOrder(o.id)}
                                  className="p-1.5 bg-red-50 text-[#EF4444] rounded-lg hover:bg-[#EF4444] hover:text-white cursor-pointer transition-colors"
                                  title="Remove order record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ================== 3. CLIENT RECORDS TAB ================== */}
              {activeTab === "clients" && (
                <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-[#E2E8F0]">
                          <th className="p-4 font-mono font-bold text-[#64748B] uppercase tracking-wider">Client ID</th>
                          <th className="p-4 font-bold text-[#0F172A]">Name & Enterprise</th>
                          <th className="p-4 font-bold text-[#0F172A]">Corporate Email</th>
                          <th className="p-4 font-bold text-[#0F172A]">Contact Phone</th>
                          <th className="p-4 font-bold text-[#0F172A]">Active Stage Tier</th>
                          <th className="p-4 font-bold text-[#0F172A]">Status</th>
                          <th className="p-4 font-bold text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {getFilteredData("clients").map((c: any) => (
                          <tr key={c.id} className="hover:bg-[#F8FAFC] transition-colors">
                            <td className="p-4 font-mono font-bold text-[#16A34A]">{c.id}</td>
                            <td className="p-4">
                              <span className="font-bold text-[#0F172A] block">{c.name}</span>
                              <span className="text-[10px] text-[#16A34A] font-mono block">{c.company}</span>
                            </td>
                            <td className="p-4 font-mono text-[#64748B]">{c.email}</td>
                            <td className="p-4 text-[#64748B]">{c.phone}</td>
                            <td className="p-4">
                              <span className="px-2.5 py-1 bg-[#DCFCE7] text-[#16A34A] rounded-lg font-bold text-[10px]">
                                {c.packageType}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold capitalize ${
                                c.status === "active" ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-red-100 text-[#EF4444]"
                              }`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex justify-center space-x-2">
                                <button 
                                  onClick={() => handleSuspendClient(c.id)}
                                  className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                                    c.status === "suspended" 
                                      ? "bg-[#DCFCE7] text-[#16A34A] hover:bg-[#16A34A] hover:text-white"
                                      : "bg-red-50 text-[#EF4444] hover:bg-[#EF4444] hover:text-white"
                                  }`}
                                >
                                  {c.status === "suspended" ? "Unsuspend" : "Suspend"}
                                </button>
                                <button 
                                  onClick={() => openEditModal("client", c)}
                                  className="p-1.5 bg-slate-100 text-[#64748B] rounded-lg hover:bg-[#0EA5E9] hover:text-white cursor-pointer transition-colors"
                                  title="Modify database record"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteClient(c.id)}
                                  className="p-1.5 bg-red-50 text-[#EF4444] rounded-lg hover:bg-[#EF4444] hover:text-white cursor-pointer transition-colors"
                                  title="Purge client index"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ================== 4. HOSTING NODES (WHMCS) TAB ================== */}
              {activeTab === "hosting" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
                    <div>
                      <h3 className="text-base font-bold text-[#0F172A]">Provisioned Staging Containers</h3>
                      <p className="text-xs text-[#64748B]">Active hosting, SSL, DNS node clusters managed via WHMCS api.</p>
                    </div>
                    <button 
                      onClick={handleCreateHosting}
                      className="px-4 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center space-x-1.5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Provision Cloud Server Node</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {getFilteredData("hosting").map((h: any) => (
                      <div 
                        key={h.id} 
                        className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                          <div>
                            <span className="text-[9px] font-mono text-[#16A34A] uppercase block font-bold bg-[#DCFCE7] px-2 py-0.5 rounded-md w-fit">
                              ACTIVE NODE ID: {h.id}
                            </span>
                            <h4 className="text-sm font-bold text-[#0F172A] mt-1.5 flex items-center">
                              {h.domain}
                              <a href={`https://${h.domain}`} target="_blank" rel="referrer" className="text-slate-400 hover:text-[#16A34A] ml-1.5">
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </h4>
                            <p className="text-[10px] text-[#64748B] mt-0.5">Staged Client: {h.clientName}</p>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-mono font-bold uppercase ${
                            h.status === "active" ? "bg-[#DCFCE7] text-[#16A34A] border border-[#DCFCE7]" : "bg-red-100 text-[#EF4444]"
                          }`}>
                            {h.status}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-[#0F172A]">{h.plan}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-[11px] font-mono">
                          <div className="space-y-1">
                            <span className="text-[#64748B] text-[10px] block">Disk Storage allocation:</span>
                            <span className="font-bold text-[#0F172A]">{h.diskUsage}</span>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#16A34A]" style={{ width: `${h.diskPercentage}%` }} />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[#64748B] text-[10px] block">SLA Bandwidth Pool:</span>
                            <span className="font-bold text-[#0F172A]">{h.bandwidth}</span>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#0EA5E9]" style={{ width: `${h.bandwidthPercentage}%` }} />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[#64748B] text-[10px] block">Dedicated CPU Load:</span>
                            <span className="font-bold text-[#0F172A]">{h.cpuUsage}%</span>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${h.cpuUsage > 50 ? "bg-amber-500" : "bg-[#16A34A]"}`} style={{ width: `${h.cpuUsage}%` }} />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[#64748B] text-[10px] block">RAM Segment allocation:</span>
                            <span className="font-bold text-[#0F172A]">{h.ramUsage}%</span>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${h.ramUsage > 50 ? "bg-amber-500" : "bg-[#16A34A]"}`} style={{ width: `${h.ramUsage}%` }} />
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100 text-[10px] font-bold">
                          <button 
                            onClick={() => handleSuspendHosting(h.id)}
                            className="px-3 py-1.5 bg-amber-50 text-[#F59E0B] rounded-lg hover:bg-[#F59E0B] hover:text-white cursor-pointer transition-colors"
                          >
                            Suspend Node
                          </button>
                          <button 
                            onClick={() => handleTerminateHosting(h.id)}
                            className="px-3 py-1.5 bg-red-50 text-[#EF4444] rounded-lg hover:bg-[#EF4444] hover:text-white cursor-pointer transition-colors"
                          >
                            Terminate Node
                          </button>
                          <button 
                            onClick={() => handleUpgradeHosting(h.id)}
                            className="px-3 py-1.5 bg-green-50 text-[#16A34A] rounded-lg hover:bg-[#16A34A] hover:text-white cursor-pointer ml-auto transition-colors"
                          >
                            Scale Parameters
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================== 5. DOMAIN MANAGER TAB ================== */}
              {activeTab === "domains" && (
                <div className="space-y-6">
                  {/* Domain Widgets */}
                  <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-[#0F172A]">Core Registries & DNS Zone Configurations</h3>
                      <p className="text-xs text-[#64748B]">Auto-renew system mapping DNS parameters immediately.</p>
                    </div>
                    <div className="flex space-x-3 text-xs font-semibold">
                      <div className="bg-[#DCFCE7] text-[#16A34A] px-4 py-2 rounded-xl flex items-center space-x-1.5">
                        <Zap className="w-4 h-4" />
                        <span>DNS Node 1: Online</span>
                      </div>
                      <div className="bg-[#DCFCE7] text-[#16A34A] px-4 py-2 rounded-xl flex items-center space-x-1.5">
                        <Zap className="w-4 h-4" />
                        <span>DNS Node 2: Online</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-[#E2E8F0]">
                            <th className="p-4 font-mono font-bold text-[#64748B] uppercase tracking-wider">Domain registry ID</th>
                            <th className="p-4 font-bold text-[#0F172A]">Mapped Domain Address</th>
                            <th className="p-4 font-bold text-[#0F172A]">Expiration Date</th>
                            <th className="p-4 font-bold text-center">DNS Zone Status</th>
                            <th className="p-4 font-bold text-center">Auto-Renewal Registry</th>
                            <th className="p-4 font-bold text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {getFilteredData("domains").map((d: any) => (
                            <tr key={d.id} className="hover:bg-[#F8FAFC] transition-colors">
                              <td className="p-4 font-mono font-bold text-[#16A34A]">{d.id}</td>
                              <td className="p-4 font-bold font-mono text-[#0F172A]">{d.domainName}</td>
                              <td className="p-4 font-mono text-[#64748B]">{d.expiryDate}</td>
                              <td className="p-4 text-center">
                                <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold capitalize ${
                                  d.status === "active" ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-red-100 text-[#EF4444]"
                                }`}>
                                  {d.status}
                                </span>
                              </td>
                              <td className="p-4 text-center">
                                <button 
                                  onClick={() => handleToggleAutoRenewal(d.id)}
                                  className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                                    d.autoRenewal 
                                      ? "bg-[#DCFCE7] text-[#16A34A] hover:bg-[#16A34A] hover:text-white" 
                                      : "bg-slate-100 text-[#64748B] hover:bg-slate-200"
                                  }`}
                                >
                                  {d.autoRenewal ? "ENABLED" : "DISABLED"}
                                </button>
                              </td>
                              <td className="p-4">
                                <div className="flex justify-center space-x-1.5">
                                  <button 
                                    onClick={() => handleRenewDomain(d.id)}
                                    className="px-2.5 py-1 bg-[#16A34A] text-white rounded-lg font-bold hover:bg-[#15803D] cursor-pointer transition-colors"
                                  >
                                    Renew +1 Year
                                  </button>
                                  <button 
                                    onClick={() => alert(`Active zone configuration records successfully loaded for ${d.domainName}. default A record pointed to fast CDN staging.`)}
                                    className="px-2.5 py-1 bg-slate-100 text-[#64748B] rounded-lg font-bold hover:bg-slate-200 cursor-pointer transition-colors"
                                  >
                                    DNS Zones
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ================== 6. STAGING SITES TAB ================== */}
              {activeTab === "websites" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((p) => (
                      <div 
                        key={p.id} 
                        className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                          <div>
                            <span className="text-[9px] font-mono text-[#16A34A] uppercase block font-bold bg-[#DCFCE7] px-2 py-0.5 rounded-md w-fit">
                              STAGING SITE ID: {p.id}
                            </span>
                            <h4 className="text-sm font-bold text-[#0F172A] mt-1.5">{p.title}</h4>
                            <p className="text-[10px] text-[#64748B] mt-0.5">Client: {p.clientName} | Vertical: {p.category}</p>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-bold capitalize tracking-wider ${
                            p.status === "delivered" ? "bg-[#DCFCE7] text-[#16A34A]" :
                            p.status === "completed" ? "bg-sky-100 text-[#0EA5E9]" : "bg-amber-100 text-[#F59E0B]"
                          }`}>
                            {p.status.replace("_", " ")}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] font-semibold">
                            <span className="text-[#64748B]">Compiler Deployment Stage Progress</span>
                            <span className="font-mono text-[#16A34A]">{p.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#16A34A]" style={{ width: `${p.progress}%` }} />
                          </div>
                        </div>

                        {/* Notes block */}
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                          <span className="text-[9px] font-mono text-[#64748B] uppercase block font-bold">Log Update Notes</span>
                          <p className="text-[10.5px] leading-relaxed mt-1 text-[#0F172A]">{p.notes}</p>
                        </div>

                        {/* Roadmap milestones */}
                        <div className="space-y-2 pt-2">
                          <span className="text-[9px] font-mono text-[#16A34A] uppercase block font-bold">Staged Milestones</span>
                          <div className="grid grid-cols-4 gap-2 text-[9px] font-mono">
                            {p.timeline.map((step, idx) => (
                              <div key={idx} className={`p-2 rounded-lg border text-center ${
                                step.done 
                                  ? "bg-[#DCFCE7] border-[#DCFCE7] text-[#16A34A]" 
                                  : "bg-slate-50 border-slate-100 opacity-60 text-[#64748B]"
                              }`}>
                                <span className="block truncate font-bold">{step.title}</span>
                                <span className="opacity-75 block mt-0.5">{step.date}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-[10px] font-bold">
                          <button 
                            onClick={() => alert(`Staging deployment endpoint live: ${p.previewUrl}`)}
                            className="text-[#16A34A] hover:underline flex items-center space-x-1 cursor-pointer"
                          >
                            <span>Staging Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>

                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleUpdateProjectStatus(p.id, "under_review")}
                              className="px-2.5 py-1 bg-amber-50 text-[#F59E0B] rounded hover:bg-[#F59E0B] hover:text-white cursor-pointer transition-colors"
                            >
                              Push to Review
                            </button>
                            <button 
                              onClick={() => handleUpdateProjectStatus(p.id, "delivered")}
                              className="px-2.5 py-1 bg-green-50 text-[#16A34A] rounded hover:bg-[#16A34A] hover:text-white cursor-pointer transition-colors"
                            >
                              Deliver Staged
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================== 7. LEADS / INQUIRIES TAB ================== */}
              {activeTab === "contacts" && (
                <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-[#E2E8F0]">
                          <th className="p-4 font-mono font-bold text-[#64748B] uppercase tracking-wider">Inquiry Date</th>
                          <th className="p-4 font-bold text-[#0F172A]">Prospect Details</th>
                          <th className="p-4 font-bold text-[#0F172A]">Message Segment</th>
                          <th className="p-4 font-bold text-[#0F172A]">Budget Cap</th>
                          <th className="p-4 font-bold text-[#0F172A]">Requested service</th>
                          <th className="p-4 font-bold text-[#0F172A]">Status</th>
                          <th className="p-4 font-bold text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {getFilteredData("contacts").map((c: any) => (
                          <tr key={c.id} className="hover:bg-[#F8FAFC] transition-colors">
                            <td className="p-4 font-mono font-bold text-[#16A34A]">{c.date}</td>
                            <td className="p-4">
                              <span className="font-bold text-[#0F172A] block">{c.name}</span>
                              <span className="text-[10px] text-[#64748B] font-mono block">{c.email}</span>
                              <span className="text-[9.5px] text-[#64748B] font-mono block">{c.phone}</span>
                            </td>
                            <td className="p-4 max-w-xs truncate italic text-[#64748B]">"{c.message}"</td>
                            <td className="p-4 font-mono font-bold text-[#16A34A]">₹{c.budget.toLocaleString()}</td>
                            <td className="p-4 font-semibold text-[#0F172A]">{c.serviceRequired}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold capitalize ${
                                c.status === "completed" ? "bg-[#DCFCE7] text-[#16A34A]" :
                                c.status === "replied" ? "bg-sky-100 text-[#0EA5E9]" : "bg-amber-100 text-[#F59E0B]"
                              }`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex justify-center space-x-2">
                                <button 
                                  onClick={() => handleReplyContact(c.id)}
                                  className="px-3 py-1.5 bg-[#16A34A] text-white rounded-lg font-bold hover:bg-[#15803D] cursor-pointer transition-colors"
                                >
                                  Quote & Reply
                                </button>
                                <button 
                                  onClick={() => handleMarkContactComplete(c.id)}
                                  className="p-1.5 bg-green-50 text-[#16A34A] rounded hover:bg-[#16A34A] hover:text-white cursor-pointer transition-colors"
                                  title="Mark Complete"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ================== 8. AI WEBSITE COMPILER TAB ================== */}
              {activeTab === "generator" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Control parameter card */}
                  <div className="lg:col-span-5 bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm space-y-6">
                    <div>
                      <h3 className="text-base font-bold text-[#0F172A]">AI Website Compiler Portal</h3>
                      <p className="text-xs text-[#64748B]">Staging layouts compiled with zero code overhead.</p>
                    </div>

                    <form onSubmit={handleAIGenerate} className="space-y-4 text-xs">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block font-bold">Business Vertical</label>
                        <select 
                          value={generatorForm.industry}
                          onChange={(e) => setGeneratorForm({ ...generatorForm, industry: e.target.value })}
                          className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs outline-none focus:ring-1 focus:ring-[#16A34A]"
                        >
                          <option>Luxury Café & Roastery</option>
                          <option>Enterprise AI Analytics Cloud</option>
                          <option>High-End Apparel Boutique</option>
                          <option>Organic Pottery & Atelier</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block font-bold">Color Theme Spec</label>
                        <select 
                          value={generatorForm.theme}
                          onChange={(e) => setGeneratorForm({ ...generatorForm, theme: e.target.value })}
                          className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs outline-none focus:ring-1 focus:ring-[#16A34A]"
                        >
                          <option>Gold & Dark Espresso</option>
                          <option>Neon Obsidian Cyberpunk</option>
                          <option>Warm Cinnamon Oatmeal</option>
                          <option>Vibrant Cobalt Pearl</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block font-bold">Interactive Layout Blueprint</label>
                        <select 
                          value={generatorForm.layout}
                          onChange={(e) => setGeneratorForm({ ...generatorForm, layout: e.target.value })}
                          className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs outline-none focus:ring-1 focus:ring-[#16A34A]"
                        >
                          <option>Bento Grid Creative Portfolio</option>
                          <option>Split Screen Minimalist landing</option>
                          <option>Interactive Cinematic Canvas</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={isGenerating}
                        className="w-full py-3 bg-[#16A34A] text-white hover:bg-[#15803D] font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md cursor-pointer disabled:opacity-50 transition-colors"
                      >
                        <Bot className="w-4 h-4" />
                        <span>{isGenerating ? "Compiling source elements..." : "Generate & Deploy Staging Mockup"}</span>
                      </button>
                    </form>

                    {/* Terminal compiler logs */}
                    {isGenerating && (
                      <div className="bg-[#0F172A] border border-[#E2E8F0] rounded-xl p-4 font-mono text-[10px] text-emerald-400 space-y-1 shadow-inner">
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                          <span>[HostNova Compiler Node v2.16]</span>
                        </div>
                        <p className="text-slate-400">STATUS: {stepsLogs[generationStep] || "Processing compilation..."}</p>
                        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mt-2">
                          <div className="h-full bg-[#16A34A] transition-all duration-300" style={{ width: `${(generationStep + 1) * 20}%` }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Built layouts preview info */}
                  <div className="lg:col-span-7 bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm space-y-6">
                    {generatedResult ? (
                      <div className="border border-green-200 bg-green-50/50 p-5 rounded-2xl space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-bold text-[#16A34A] flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Staging Layout Built successfully!</span>
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400">{generatedResult.timestamp}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-[#0F172A]">
                          <div>
                            <span className="text-[#64748B] text-[10px] block">Target Vertical</span>
                            <span>{generatedResult.industry}</span>
                          </div>
                          <div>
                            <span className="text-[#64748B] text-[10px] block">Design Palette</span>
                            <span>{generatedResult.theme}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-[#64748B] text-[10px] block">Staging Sandbox Endpoint URL</span>
                            <span className="font-mono text-[11px] block text-[#16A34A]">https://ais-dev.run.app/staging/{generatedResult.id}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2 pt-2 text-[10px] font-bold">
                          <button onClick={() => alert("Staging package components zipped and exported.")} className="px-3.5 py-1.5 bg-[#16A34A] text-white rounded-lg hover:bg-[#15803D] cursor-pointer transition-colors">
                            Export React ZIP
                          </button>
                          <button onClick={() => alert("Copied compiled layout URL to clipboard!")} className="px-3.5 py-1.5 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                            Copy Endpoint
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 border-2 border-dashed border-[#E2E8F0] rounded-2xl flex flex-col items-center justify-center text-center opacity-60">
                        <Bot className="w-10 h-10 text-[#16A34A] animate-bounce" />
                        <p className="text-xs font-semibold text-[#0F172A] mt-2.5">No active Staging layouts built.</p>
                        <p className="text-[10.5px] text-[#64748B] max-w-xs mt-0.5">Use the compiler parameters panel on the left to deploy custom mockup blocks instantly.</p>
                      </div>
                    )}

                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#16A34A] font-bold border-b border-slate-100 pb-2">Staging Build History Log</h4>
                      <div className="space-y-2">
                        {genHistory.map((item) => (
                          <div key={item.id} className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl flex justify-between items-center text-xs hover:shadow-sm transition-shadow">
                            <div>
                              <span className="font-bold text-[#0F172A] block">{item.industry}</span>
                              <span className="text-[10px] text-[#64748B] font-mono block">{item.layout} | {item.theme}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-mono text-slate-400 block">{item.timestamp}</span>
                              <span className="text-[9.5px] font-mono text-[#16A34A] font-bold uppercase mt-0.5 block">{item.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================== 9. REVENUE ANALYTICS TAB ================== */}
              {activeTab === "analytics" && (
                <div className="space-y-8">
                  {/* Revenue metrics row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
                    <div className="space-y-1">
                      <span className="text-xs text-[#64748B] font-bold block uppercase tracking-wider">Recurring Monthly Ingress</span>
                      <h4 className="text-2xl font-bold text-[#0F172A]">₹11,50,000</h4>
                      <span className="text-[10.5px] text-green-600 font-semibold">+24.2% Month-over-Month</span>
                    </div>
                    <div className="space-y-1 border-y md:border-y-0 md:border-x border-[#E2E8F0] py-4 md:py-0 md:px-6">
                      <span className="text-xs text-[#64748B] font-bold block uppercase tracking-wider">Average Customer Lifetime Value</span>
                      <h4 className="text-2xl font-bold text-[#0F172A]">₹4,50,000</h4>
                      <span className="text-[10.5px] text-green-600 font-semibold">100% Retained SLA clients</span>
                    </div>
                    <div className="space-y-1 md:pl-6">
                      <span className="text-xs text-[#64748B] font-bold block uppercase tracking-wider">Outstanding Invoices</span>
                      <h4 className="text-2xl font-bold text-[#0F172A]">₹95,000</h4>
                      <span className="text-[10.5px] text-[#64748B] font-medium">Auto-collect maps Active</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Hosting vs Domains Sales chart */}
                    <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm">
                      <h3 className="text-sm font-bold text-[#0F172A] mb-4">Enterprise Split: hosting VS Domain Registry</h3>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={REVENUE_CHART_DATA}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                            <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                            <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="HostingSales" name="Hosting Sales" fill="#16A34A" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="DomainSales" name="Domain Sales" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Orders Onboarding charts */}
                    <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm">
                      <h3 className="text-sm font-bold text-[#0F172A] mb-4">Client Onboarding Velocity</h3>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={REVENUE_CHART_DATA}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                            <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                            <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="Orders" name="Orders Closed" stroke="#16A34A" fill="#16A34A" fillOpacity={0.1} strokeWidth={2} />
                            <Area type="monotone" dataKey="Clients" name="Active Customers" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.05} strokeWidth={2} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Pie Chart Split */}
                    <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm lg:col-span-2">
                      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                          <h3 className="text-sm font-bold text-[#0F172A]">Hosting Plan Subscription Share</h3>
                          <p className="text-xs text-[#64748B] mt-0.5">Metrics segmented by WHMCS subscription tier packages.</p>
                        </div>

                        <div className="flex flex-wrap gap-4 text-xs font-mono font-bold justify-center">
                          {HOSTING_SALES_SPLIT.map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <span className="w-3.5 h-3.5 rounded-full block" style={{ backgroundColor: item.color === "#6F4E37" ? "#16A34A" : item.color === "#C19A6B" ? "#0EA5E9" : "#F59E0B" }} />
                              <span className="text-[#0F172A]">{item.name}: {item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================== 10. SUPPORT TICKET CHAT TAB ================== */}
              {activeTab === "tickets" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Tickets list */}
                  <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm p-4 space-y-3">
                    <h3 className="text-sm font-bold text-[#0F172A] pb-2 border-b border-slate-100">Active Support Incidents</h3>
                    
                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                      {getFilteredData("tickets").map((t: any) => (
                        <div 
                          key={t.id}
                          onClick={() => setSelectedTicket(t)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer text-xs ${
                            selectedTicket?.id === t.id 
                              ? "bg-[#DCFCE7]/70 border-[#DCFCE7] shadow-sm" 
                              : "bg-transparent border-[#E2E8F0] hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-mono font-bold text-[#16A34A]">{t.ticketId}</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase font-mono ${
                              t.priority === "urgent" ? "bg-red-100 text-[#EF4444]" :
                              t.priority === "high" ? "bg-amber-100 text-[#F59E0B]" : "bg-green-50 text-[#16A34A]"
                            }`}>
                              {t.priority}
                            </span>
                          </div>
                          <h4 className="font-bold mt-2 text-[#0F172A] truncate">{t.subject}</h4>
                          <div className="flex justify-between items-center mt-2 text-[10px] text-[#64748B]">
                            <span>Client: {t.clientName}</span>
                            <span className="font-mono">{t.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat Dialogue box */}
                  <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm p-6 flex flex-col justify-between h-[480px]">
                    {selectedTicket ? (
                      <>
                        <div className="border-b border-slate-100 pb-3 flex justify-between items-start">
                          <div>
                            <div className="flex items-center space-x-2 text-[10px]">
                              <span className="font-mono text-[#16A34A] font-bold uppercase">{selectedTicket.ticketId}</span>
                              <span className="text-[#64748B]">| Category: {selectedTicket.category}</span>
                            </div>
                            <h4 className="text-sm font-bold text-[#0F172A] mt-1">{selectedTicket.subject}</h4>
                            <p className="text-[10px] text-[#64748B]">Contact client: {selectedTicket.clientName} ({selectedTicket.email})</p>
                          </div>

                          <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase ${
                            selectedTicket.status === "open" ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-slate-100 text-[#64748B]"
                          }`}>
                            {selectedTicket.status}
                          </span>
                        </div>

                        {/* Stream message bubbles */}
                        <div className="flex-grow overflow-y-auto py-4 space-y-4 pr-1">
                          {selectedTicket.messages.map((m) => {
                            const isAdmin = m.sender === "admin";
                            return (
                              <div 
                                key={m.id}
                                className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
                              >
                                <div className={`p-3 rounded-2xl max-w-sm text-xs leading-relaxed border ${
                                  isAdmin 
                                    ? "bg-[#16A34A] border-[#16A34A] text-white rounded-tr-none" 
                                    : "bg-slate-50 border-[#E2E8F0] text-[#0F172A] rounded-tl-none"
                                }`}>
                                  <p className="font-semibold text-[9.5px] uppercase font-mono tracking-wider opacity-75 mb-1">
                                    {isAdmin ? "HostNovaPro Ops Support" : selectedTicket.clientName}
                                  </p>
                                  <p className="font-medium">{m.text}</p>
                                  <span className="text-[8px] font-mono opacity-60 block text-right mt-1.5">
                                    {new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Reply formulating bar */}
                        <form onSubmit={handleSendTicketReply} className="border-t border-slate-100 pt-3 flex gap-2">
                          <input
                            type="text"
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            placeholder="Formulate support reply thread..."
                            className="flex-grow bg-slate-50 border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-[#16A34A] focus:border-[#16A34A] transition-all"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-xl shadow-md cursor-pointer flex items-center justify-center shrink-0 transition-colors"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </form>
                      </>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                        <Ticket className="w-12 h-12 text-[#16A34A] animate-bounce" />
                        <p className="text-xs font-semibold text-[#0F172A] mt-2.5">No active support incident dialogue.</p>
                        <p className="text-[10.5px] text-[#64748B]">Select an open incident from the left list to begin SMTP diagnostic relay.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ================== 11. STAFF DIRECTORY TAB ================== */}
              {activeTab === "team" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
                    <div>
                      <h3 className="text-base font-bold text-[#0F172A]">Administrative Access Hierarchy</h3>
                      <p className="text-xs text-[#64748B]">Configured operational privileges and access logs.</p>
                    </div>
                    <button 
                      onClick={() => alert("Enterprise multi-seat license required to add secondary team members.")}
                      className="px-4 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center space-x-1.5 transition-colors"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Invite Staff Operator</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {TEAM_MEMBERS.map((member) => (
                      <div 
                        key={member.id} 
                        className="bg-white border border-[#E2E8F0] p-5 rounded-2xl text-center space-y-3 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] block" />
                          <span className="text-[8px] font-mono uppercase tracking-wider text-[#16A34A] font-bold">{member.status}</span>
                        </div>

                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-[#16A34A]/25 p-0.5 shadow-sm"
                        />

                        <div>
                          <h4 className="text-sm font-bold text-[#0F172A]">{member.name}</h4>
                          <span className="text-[10px] text-[#16A34A] font-mono uppercase tracking-wider font-bold block mt-0.5">{member.role}</span>
                          <span className="text-[10px] text-[#64748B] block mt-1 font-mono truncate">{member.email}</span>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex justify-center space-x-2 text-[10px] font-bold">
                          <button onClick={() => alert(`Configured privilege level for ${member.name}: Full diagnostics.`)} className="px-2.5 py-1.5 bg-green-50 text-[#16A34A] rounded-lg hover:bg-[#16A34A] hover:text-white cursor-pointer transition-colors">
                            Privileges
                          </button>
                          <button onClick={() => alert(`Audit Logs fetched. Zero security anomalies recorded for keys of ${member.name}.`)} className="px-2.5 py-1.5 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                            Telemetry logs
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================== 12. SERVER SETTINGS TAB ================== */}
              {activeTab === "settings" && (
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-8 max-w-4xl mx-auto">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-base font-bold text-[#0F172A]">SaaS Server Config Specifications</h3>
                    <p className="text-xs text-[#64748B]">Update database secure keys, live mail server APIs, and Stripe parameters.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#0F172A] font-medium">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-[#64748B] uppercase block font-bold">Business Entity Name</label>
                      <input
                        type="text"
                        value={settingsForm.bizName}
                        onChange={(e) => setSettingsForm({ ...settingsForm, bizName: e.target.value })}
                        className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2.5 outline-none focus:ring-1 focus:ring-[#16A34A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-[#64748B] uppercase block font-bold">SMTP Server Gateway Host</label>
                      <input
                        type="text"
                        value={settingsForm.smtpServer}
                        onChange={(e) => setSettingsForm({ ...settingsForm, smtpServer: e.target.value })}
                        className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2.5 outline-none focus:ring-1 focus:ring-[#16A34A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-[#64748B] uppercase block font-bold">SMTP TLS Port</label>
                      <input
                        type="text"
                        value={settingsForm.smtpPort}
                        onChange={(e) => setSettingsForm({ ...settingsForm, smtpPort: e.target.value })}
                        className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2.5 outline-none focus:ring-1 focus:ring-[#16A34A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-[#64748B] uppercase block font-bold">Stripe Live Gateway Key</label>
                      <input
                        type="text"
                        value={settingsForm.gatewayKey}
                        onChange={(e) => setSettingsForm({ ...settingsForm, gatewayKey: e.target.value })}
                        className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2.5 outline-none focus:ring-1 focus:ring-[#16A34A] font-mono text-[#16A34A]"
                      />
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[10px] font-mono text-[#64748B] uppercase block font-bold">Gemini API Platform Secret Token</label>
                      <input
                        type="password"
                        value={settingsForm.apiGemini}
                        onChange={(e) => setSettingsForm({ ...settingsForm, apiGemini: e.target.value })}
                        className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2.5 outline-none focus:ring-1 focus:ring-[#16A34A] font-mono text-[#16A34A]"
                      />
                    </div>

                    <div className="md:col-span-2 p-4 bg-[#DCFCE7]/40 rounded-xl border border-[#DCFCE7] flex justify-between items-center mt-2 shadow-sm">
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-[#0F172A] block">Enforce 2FA Security on Admin Access</span>
                        <span className="text-[10px] text-[#64748B] block">Protects diagnostic WHMCS operations logs with multi-factor verification.</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setSettingsForm({ ...settingsForm, isTfaRequired: !settingsForm.isTfaRequired })}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
                          settingsForm.isTfaRequired ? "bg-[#16A34A] text-white" : "bg-slate-200 text-[#64748B]"
                        }`}
                      >
                        {settingsForm.isTfaRequired ? "ENABLED" : "DISABLED"}
                      </button>
                    </div>

                    <div className="md:col-span-2 pt-2 flex justify-start">
                      <button
                        type="button"
                        onClick={handleSaveSettings}
                        className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-[#E2E8F0] rounded-xl font-bold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-sm text-slate-800 text-xs"
                      >
                        <Settings className="w-3.5 h-3.5 text-[#16A34A]" />
                        <span>Save Server Settings</span>
                      </button>
                    </div>
                  </div>

                  {/* Site SEO Management Widget */}
                  <div className="border-t border-slate-100 pt-8 mt-8 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
                          <h3 className="text-base font-bold text-[#0F172A]">Site SEO Management</h3>
                        </div>
                        <p className="text-xs text-[#64748B] mt-0.5">Configure organic search indexing metadata, crawler instructions, and custom social Graph tags.</p>
                      </div>
                      <div className="flex items-center space-x-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 shadow-sm">
                        <span className="text-[10px] font-mono text-[#64748B] uppercase font-bold">SEO Health Index:</span>
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                          getSeoScore() >= 90 ? "bg-[#DCFCE7] text-[#16A34A]" :
                          getSeoScore() >= 70 ? "bg-amber-100 text-[#F59E0B]" : "bg-red-50 text-[#EF4444]"
                        }`}>
                          {getSeoScore()}/100
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* SEO Fields inputs (7 cols on large screens) */}
                      <div className="lg:col-span-7 space-y-5 text-xs text-[#0F172A] font-medium">
                        
                        {/* Site Title */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] font-mono text-[#64748B] uppercase block font-bold">Site Meta Title</label>
                            <span className={`text-[10px] font-mono font-bold ${
                              seoSettings.siteTitle.length >= 40 && seoSettings.siteTitle.length <= 65
                                ? "text-[#16A34A]"
                                : "text-[#F59E0B]"
                            }`}>
                              {seoSettings.siteTitle.length} / 60 characters {seoSettings.siteTitle.length >= 40 && seoSettings.siteTitle.length <= 65 ? " (Optimal)" : " (Target: 40-65)"}
                            </span>
                          </div>
                          <input
                            type="text"
                            value={seoSettings.siteTitle}
                            onChange={(e) => setSeoSettings({ ...seoSettings, siteTitle: e.target.value })}
                            placeholder="e.g. HostNovaPro | Premium Cloud Staging"
                            className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2.5 outline-none focus:ring-1 focus:ring-[#16A34A]"
                          />
                        </div>

                        {/* Meta Description */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] font-mono text-[#64748B] uppercase block font-bold">Meta Description</label>
                            <span className={`text-[10px] font-mono font-bold ${
                              seoSettings.metaDescription.length >= 110 && seoSettings.metaDescription.length <= 165
                                ? "text-[#16A34A]"
                                : "text-[#F59E0B]"
                            }`}>
                              {seoSettings.metaDescription.length} / 160 characters {seoSettings.metaDescription.length >= 110 && seoSettings.metaDescription.length <= 165 ? " (Optimal)" : " (Target: 110-165)"}
                            </span>
                          </div>
                          <textarea
                            rows={3}
                            value={seoSettings.metaDescription}
                            onChange={(e) => setSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
                            placeholder="e.g. Deploy high-performance client sites, automate cloud hosting staging environments, and manage WHMCS invoices in one unified administrative suite."
                            className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2.5 outline-none focus:ring-1 focus:ring-[#16A34A] leading-relaxed resize-none"
                          />
                        </div>

                        {/* Meta Keywords */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-[#64748B] uppercase block font-bold">Organic Search Keywords (Comma-separated)</label>
                          <input
                            type="text"
                            value={seoSettings.keywords}
                            onChange={(e) => setSeoSettings({ ...seoSettings, keywords: e.target.value })}
                            placeholder="e.g. whmcs core, automated hosting, nextjs staging"
                            className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2.5 outline-none focus:ring-1 focus:ring-[#16A34A] font-mono"
                          />
                        </div>

                        {/* Social Image URL */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-[#64748B] uppercase block font-bold">Open Graph Social Image URL</label>
                          <input
                            type="text"
                            value={seoSettings.ogImage}
                            onChange={(e) => setSeoSettings({ ...seoSettings, ogImage: e.target.value })}
                            placeholder="e.g. https://images.unsplash.com/photo-..."
                            className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2.5 outline-none focus:ring-1 focus:ring-[#16A34A] font-mono"
                          />

                          {/* Image Presets Selector Grid */}
                          <div className="space-y-1.5">
                            <span className="text-[9.5px] font-mono text-[#64748B] block font-semibold uppercase tracking-wider">Select Pre-curated Social Sharing Image Preset:</span>
                            <div className="grid grid-cols-4 gap-2.5">
                              {[
                                {
                                  name: "Tech Abstract",
                                  url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
                                  thumb: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150&auto=format&fit=crop"
                                },
                                {
                                  name: "Cyber Server",
                                  url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
                                  thumb: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=150&auto=format&fit=crop"
                                },
                                {
                                  name: "Minimal Workplace",
                                  url: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=800&auto=format&fit=crop",
                                  thumb: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=150&auto=format&fit=crop"
                                },
                                {
                                  name: "Neon Terminal",
                                  url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
                                  thumb: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=150&auto=format&fit=crop"
                                }
                              ].map((preset, idx) => {
                                const isSelected = seoSettings.ogImage === preset.url;
                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setSeoSettings({ ...seoSettings, ogImage: preset.url })}
                                    className={`relative rounded-lg overflow-hidden h-12 border-2 transition-all group ${
                                      isSelected ? "border-[#16A34A] scale-[1.03] shadow-md" : "border-transparent hover:border-slate-300"
                                    }`}
                                    title={preset.name}
                                  >
                                    <img 
                                      src={preset.thumb} 
                                      alt={preset.name} 
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                                    />
                                    {isSelected && (
                                      <div className="absolute inset-0 bg-[#16A34A]/10 flex items-center justify-center">
                                        <div className="bg-[#16A34A] text-white p-0.5 rounded-full">
                                          <Check className="w-2.5 h-2.5" />
                                        </div>
                                      </div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Save SEO Button */}
                        <div className="pt-2 flex justify-start">
                          <button
                            type="button"
                            onClick={handleSaveSeo}
                            className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-[#E2E8F0] rounded-xl font-bold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-sm text-slate-800 text-xs"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
                            <span>Save SEO Parameters</span>
                          </button>
                        </div>

                      </div>

                      {/* Live SEO Preview Pane (5 cols on large screens) */}
                      <div className="lg:col-span-5 flex flex-col justify-between">
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                            <span className="text-[10px] font-mono text-[#64748B] uppercase block font-bold">Real-time Crawler Preview</span>
                            
                            {/* Selector tabs */}
                            <div className="flex bg-slate-100 p-0.5 rounded-lg text-[9px] font-bold">
                              {[
                                { id: "google", label: "Google" },
                                { id: "social", label: "Social Card" },
                                { id: "twitter", label: "X Card" }
                              ].map((t) => (
                                <button
                                  key={t.id}
                                  type="button"
                                  onClick={() => setSeoPreviewTab(t.id as any)}
                                  className={`px-2 py-1 rounded-md transition-all ${
                                    seoPreviewTab === t.id 
                                      ? "bg-white text-[#0F172A] shadow-sm" 
                                      : "text-[#64748B] hover:text-[#0F172A]"
                                  }`}
                                >
                                  {t.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Dynamic Mock Viewports */}
                          <div className="bg-slate-50 border border-[#E2E8F0] rounded-2xl p-4 min-h-[170px] flex items-center justify-center">
                            
                            {seoPreviewTab === "google" && (
                              <div className="w-full text-left space-y-1.5">
                                <div className="flex items-center space-x-2 text-[10.5px]">
                                  <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[7px] font-bold text-slate-600 font-mono">H</div>
                                  <div className="flex flex-col">
                                    <span className="text-[#202124] font-normal leading-none text-[11px]">HostNovaPro</span>
                                    <span className="text-slate-500 text-[9px] leading-none mt-0.5">https://hostnovapro.com</span>
                                  </div>
                                </div>
                                <h4 className="text-[#1a0dab] hover:underline text-sm font-medium leading-snug cursor-pointer line-clamp-1">
                                  {seoSettings.siteTitle || "Untitled Page"}
                                </h4>
                                <p className="text-[#4d5156] text-[11px] leading-relaxed line-clamp-3">
                                  {seoSettings.metaDescription || "No site description provided. Google crawler will auto-extract textual fragments from body markup."}
                                </p>
                              </div>
                            )}

                            {seoPreviewTab === "social" && (
                              <div className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col text-left">
                                <div className="aspect-[1.91/1] w-full bg-slate-100 relative overflow-hidden">
                                  {seoSettings.ogImage ? (
                                    <img 
                                      src={seoSettings.ogImage} 
                                      alt="Open Graph Share Preset" 
                                      className="w-full h-full object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center opacity-40">
                                      <Globe className="w-8 h-8 text-slate-400" />
                                      <span className="text-[9px] font-mono mt-1">Image Placeholder</span>
                                    </div>
                                  )}
                                </div>
                                <div className="p-3 bg-slate-50 border-t border-slate-100 space-y-0.5">
                                  <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold tracking-wider">HOSTNOVAPRO.COM</span>
                                  <h4 className="text-[11.5px] font-bold text-[#0F172A] line-clamp-1">{seoSettings.siteTitle}</h4>
                                  <p className="text-[10px] text-slate-500 line-clamp-1 leading-normal">{seoSettings.metaDescription}</p>
                                </div>
                              </div>
                            )}

                            {seoPreviewTab === "twitter" && (
                              <div className="w-full bg-black text-white rounded-xl overflow-hidden shadow-sm flex flex-col text-left border border-zinc-800">
                                <div className="aspect-[1.91/1] w-full bg-zinc-900 relative overflow-hidden">
                                  {seoSettings.ogImage ? (
                                    <img 
                                      src={seoSettings.ogImage} 
                                      alt="Twitter Share Preset" 
                                      className="w-full h-full object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center opacity-30">
                                      <Globe className="w-8 h-8 text-zinc-600" />
                                      <span className="text-[9px] font-mono mt-1 text-zinc-400">Image Placeholder</span>
                                    </div>
                                  )}
                                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-mono uppercase font-bold text-zinc-200">
                                    hostnovapro.com
                                  </div>
                                </div>
                                <div className="p-2.5 bg-black space-y-0.5 border-t border-zinc-900">
                                  <h4 className="text-[11px] font-bold text-white line-clamp-1">{seoSettings.siteTitle}</h4>
                                  <p className="text-[10px] text-zinc-400 line-clamp-1 leading-normal">{seoSettings.metaDescription}</p>
                                </div>
                              </div>
                            )}

                          </div>
                        </div>

                        {/* Diagnostics checklist */}
                        <div className="bg-slate-50 rounded-2xl p-4 border border-[#E2E8F0] space-y-2 mt-4">
                          <span className="text-[9.5px] font-mono text-[#64748B] uppercase block font-bold tracking-wider">Diagnostics Checklist</span>
                          
                          <div className="space-y-1.5 text-[10.5px]">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-600 flex items-center">
                                <CheckCircle2 className={`w-3.5 h-3.5 mr-1.5 shrink-0 ${seoSettings.siteTitle.length >= 40 && seoSettings.siteTitle.length <= 65 ? "text-green-500" : "text-amber-500"}`} />
                                Title Length optimal
                              </span>
                              <span className="font-mono text-slate-500">{seoSettings.siteTitle.length} / 60</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-slate-600 flex items-center">
                                <CheckCircle2 className={`w-3.5 h-3.5 mr-1.5 shrink-0 ${seoSettings.metaDescription.length >= 110 && seoSettings.metaDescription.length <= 165 ? "text-green-500" : "text-amber-500"}`} />
                                Meta Description Length optimal
                              </span>
                              <span className="font-mono text-slate-500">{seoSettings.metaDescription.length} / 160</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-slate-600 flex items-center">
                                <CheckCircle2 className={`w-3.5 h-3.5 mr-1.5 shrink-0 ${seoSettings.ogImage ? "text-green-500" : "text-amber-500"}`} />
                                Open Graph Graphic Active
                              </span>
                              <span className="font-mono text-slate-500">{seoSettings.ogImage ? "Active" : "None"}</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-slate-600 flex items-center">
                                <CheckCircle2 className={`w-3.5 h-3.5 mr-1.5 shrink-0 ${seoSettings.keywords.trim() ? "text-green-500" : "text-amber-500"}`} />
                                Keyword Density Index
                              </span>
                              <span className="font-mono text-slate-500">{seoSettings.keywords.split(",").filter(Boolean).length} tags</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button 
                      onClick={() => triggerAlert("success", "SaaS server config parameters updated successfully.")}
                      className="px-6 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-colors"
                    >
                      Save Configuration Specs
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer info brand */}
        <footer className="pt-10 border-t border-[#E2E8F0] text-center text-[10px] font-mono text-[#64748B] mt-8">
          <span>© 2026 HostNovaPro Web Solutions Ltd. All rights reserved. WHMCS Control Interface v5.1. Secured with SSL.</span>
        </footer>
      </main>

      {/* ================== GENERAL RECORD MODIFY DIALOG MODAL ================== */}
      <AnimatePresence>
        {isEditModalOpen && editForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#E2E8F0] p-6 rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden text-xs text-[#0F172A]"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-sm font-bold font-display uppercase tracking-wider text-[#16A34A]">
                  Modify {editingType ? editingType.toUpperCase() : "Record"} File
                </h3>
                <button onClick={() => setIsEditModalOpen(false)} className="text-[#64748B] hover:text-[#0F172A] cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                {editingType === "client" && (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-[#64748B] block font-bold">Client Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-[#16A34A]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-[#64748B] block font-bold">Company Name</label>
                      <input
                        type="text"
                        value={editForm.company}
                        onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                        className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-[#16A34A]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-[#64748B] block font-bold">Email Address</label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-[#16A34A] font-mono"
                      />
                    </div>
                  </>
                )}

                {editingType === "order" && (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-[#64748B] block font-bold">Service Required</label>
                      <input
                        type="text"
                        value={editForm.serviceRequired}
                        onChange={(e) => setEditForm({ ...editForm, serviceRequired: e.target.value })}
                        className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-[#16A34A]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-[#64748B] block font-bold">Budget (INR)</label>
                      <input
                        type="number"
                        value={editForm.budget}
                        onChange={(e) => setEditForm({ ...editForm, budget: parseInt(e.target.value) || 0 })}
                        className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-[#16A34A] font-mono"
                      />
                    </div>
                  </>
                )}

                {editingType === "hosting" && (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-[#64748B] block font-bold">Domain Registry</label>
                      <input
                        type="text"
                        value={editForm.domain}
                        onChange={(e) => setEditForm({ ...editForm, domain: e.target.value })}
                        className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-[#16A34A] font-mono"
                      />
                    </div>
                  </>
                )}

                <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                  <button 
                    type="button" 
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 border border-[#E2E8F0] text-[#64748B] rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-xl shadow-md cursor-pointer transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

const stepsLogs = [
  "Provisioning safe sandbox node environment...",
  "Structuring high-fidelity custom grid rules...",
  "Brewing design palettes matching custom guidelines...",
  "Assembling React modules and routing parameters...",
  "Compiling optimized bundle & caching to Global Edge CDN..."
];
