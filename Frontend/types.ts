export interface FundingItem {
  id: string;
  title: string;
  amount: string;
  amountValue: number; // For sorting/filtering
  stage: string;
  location: string;
  investor: string;
  evidence_url: string;
  tags: string[];
  type: 'Govt' | 'VC' | 'Angel' | 'Subsidy';
  deadline?: string;
  description?: string;
}

export interface InvestorProfile {
  name: string;
  type: string;
  ticketSize: string;
  focusAreas: string[];
  recentExits: string[];
  redFlags: string[];
  acceptanceRate: string;
}

export interface FilterState {
  minAmount: number;
  region: string;
  investorType: string;
  verifiedOnly: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  data?: FundingItem[]; // Attach funding cards to messages
  isLoading?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: number; // timestamp
  isStarred: boolean;
  messages: ChatMessage[];
}

export type Language = 'en' | 'ta' | 'hi' | 'te';