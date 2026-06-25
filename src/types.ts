export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
  priceText: string;
}

export interface WebsitePreview {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  features: string[];
  liveUrlText: string;
  num?: string;
  conceptSub?: string;
  colors?: string[];
  mockTitle?: string;
  imageUrl?: string;
  mockNav?: string[];
  mockAction?: string;
  mockFeatures?: string[];
  technologies?: string[];
  longDescription?: string;
  challenge?: string;
  solution?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  description: string;
  features: { text: string; included: boolean }[];
  popular: boolean;
  deliveryTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  review: string;
  rating: number;
  avatarUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface AdminOrder {
  id: string;
  clientName: string;
  clientEmail: string;
  serviceRequired: string;
  budget: number;
  date: string;
  status: "pending" | "completed" | "cancelled";
  packageType: string;
}

export interface AdminClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  packageType: string;
  status: "active" | "suspended" | "pending";
  createdAt: string;
}

export interface HostingAccount {
  id: string;
  clientName: string;
  domain: string;
  plan: string;
  diskUsage: string; // e.g. "15GB / 50GB"
  diskPercentage: number;
  bandwidth: string; // e.g. "250GB / 1000GB"
  bandwidthPercentage: number;
  cpuUsage: number; // e.g. 15 (percentage)
  ramUsage: number; // e.g. 35 (percentage)
  renewalDate: string;
  status: "active" | "suspended" | "terminated";
}

export interface AdminDomain {
  id: string;
  domainName: string;
  expiryDate: string;
  status: "active" | "expired" | "pending_transfer";
  autoRenewal: boolean;
}

export interface WebsiteProject {
  id: string;
  title: string;
  clientName: string;
  category: string;
  status: "in_progress" | "under_review" | "completed" | "delivered";
  progress: number; // percentage
  timeline: { title: string; date: string; done: boolean }[];
  notes: string;
  previewUrl?: string;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceRequired: string;
  budget: number;
  message: string;
  status: "new" | "replied" | "completed";
  date: string;
}

export interface TicketMessage {
  id: string;
  sender: "admin" | "client";
  text: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  ticketId: string; // e.g. "#TKT-8930"
  subject: string;
  clientName: string;
  email: string;
  status: "open" | "pending" | "resolved";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  date: string;
  messages: TicketMessage[];
}

export interface AdminNotification {
  id: string;
  type: "order" | "client" | "contact" | "payment" | "ticket";
  title: string;
  message: string;
  date: string;
  read: boolean;
}

