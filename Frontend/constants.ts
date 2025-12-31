import { FundingItem, ChatSession } from './types';

export const MOCK_FUNDING_DATA: FundingItem[] = [
  // GOVERNMENT SCHEMES
  {
    id: '1',
    title: "TN Electric Vehicle Subsidy Scheme",
    amount: "₹1,50,000",
    amountValue: 150000,
    stage: "Govt Subsidy",
    location: "Tamil Nadu, India",
    investor: "Government of Tamil Nadu",
    evidence_url: "https://investingintamilnadu.com/ev-policy.pdf",
    tags: ["Subsidy", "EV", "Govt", "Green Energy", "Automotive"],
    type: 'Govt',
    deadline: "2024-12-31",
    description: "Capital subsidy for EV manufacturing and purchase incentives for commercial vehicles."
  },
  {
    id: 'ev-2',
    title: "FAME II India Scheme",
    amount: "₹1,00,00,000",
    amountValue: 10000000,
    stage: "Growth",
    location: "Pan India",
    investor: "Dept of Heavy Industry",
    evidence_url: "#",
    tags: ["Subsidy", "EV", "Govt", "Infrastructure"],
    type: 'Govt',
    deadline: "2025-03-31",
    description: "Faster Adoption and Manufacturing of Hybrid and Electric Vehicles (FAME II) scheme for charging infrastructure and fleet incentives."
  },
  {
    id: 'ev-3',
    title: "Karnataka EV Policy Grant",
    amount: "₹50,00,000",
    amountValue: 5000000,
    stage: "Seed",
    location: "Karnataka, India",
    investor: "Govt of Karnataka",
    evidence_url: "#",
    tags: ["Grant", "EV", "R&D", "Bangalore"],
    type: 'Govt',
    deadline: "2024-10-15",
    description: "Incentives for EV component manufacturing and R&D startups in Karnataka."
  },
  {
    id: 'ev-4',
    title: "Maharashtra EV Promotion",
    amount: "₹25,00,000",
    amountValue: 2500000,
    stage: "Early Stage",
    location: "Maharashtra, India",
    investor: "Maharashtra Govt",
    evidence_url: "#",
    tags: ["Subsidy", "EV", "Manufacturing"],
    type: 'Subsidy',
    deadline: "Rolling"
  },
  {
    id: '2',
    title: "Startup India Seed Fund Scheme (SISFS)",
    amount: "₹20,00,000",
    amountValue: 2000000,
    stage: "Seed",
    location: "Pan India",
    investor: "DPIIT, Govt of India",
    evidence_url: "https://seedfund.startupindia.gov.in",
    tags: ["Seed", "Tech", "Govt", "Early Stage", "General"],
    type: 'Govt',
    deadline: "2025-03-31",
    description: "Financial assistance to startups for proof of concept, prototype development, product trials, market entry and commercialization."
  },
  {
    id: '4',
    title: "NIDHI-PRAYAS Grant",
    amount: "₹10,00,000",
    amountValue: 1000000,
    stage: "Pre-Incubation",
    location: "Pan India",
    investor: "DST (Dept of Science & Tech)",
    evidence_url: "#",
    tags: ["Grant", "DeepTech", "Hardware", "Prototyping"],
    type: 'Govt',
    deadline: "2024-09-30",
    description: "Promoting and Accelerating Young and Aspiring technology entrepreneurs (PRAYAS) is a pre-incubation grant."
  },
  {
    id: '7',
    title: "Karnataka ELEVATE 100",
    amount: "₹50,00,000",
    amountValue: 5000000,
    stage: "Grant",
    location: "Karnataka, India",
    investor: "Govt of Karnataka",
    evidence_url: "#",
    tags: ["Grant", "Tech", "Innovation", "Bangalore"],
    type: 'Govt',
    deadline: "2024-08-15",
    description: "Grant-in-aid for innovative startups in Karnataka to scale up their operations."
  },
  {
    id: '8',
    title: "BIRAC BIG Grant",
    amount: "₹50,00,000",
    amountValue: 5000000,
    stage: "Idea-to-POC",
    location: "Pan India",
    investor: "BIRAC",
    evidence_url: "#",
    tags: ["Grant", "BioTech", "HealthTech", "Life Sciences"],
    type: 'Govt',
    deadline: "2024-07-30",
    description: "Biotechnology Ignition Grant (BIG) scheme for entrepreneurs and startups in the biotech sector."
  },
  {
    id: '13',
    title: "Kerala Startup Mission (KSUM) Innovation Grant",
    amount: "₹12,00,000",
    amountValue: 1200000,
    stage: "Early Stage",
    location: "Kerala, India",
    investor: "Kerala Govt",
    evidence_url: "#",
    tags: ["Grant", "Kerala", "Innovation", "Product Dev"],
    type: 'Govt',
    deadline: "Open Round"
  },
  {
    id: '19',
    title: "T-Hub T-Fund",
    amount: "₹1,00,00,000",
    amountValue: 10000000,
    stage: "Seed",
    location: "Telangana, India",
    investor: "Telangana Govt",
    evidence_url: "#",
    tags: ["Equity", "Telangana", "Growth"],
    type: 'Govt',
    deadline: "Rolling"
  },

  // VC & PRIVATE EQUITY
  {
    id: '3',
    title: "Sequoia Surge Cohort 10",
    amount: "₹12,00,00,000",
    amountValue: 120000000,
    stage: "Pre-Series A",
    location: "Bangalore, India",
    investor: "Sequoia Capital",
    evidence_url: "#",
    tags: ["VC", "SaaS", "High Growth", "Accelerator"],
    type: 'VC',
    deadline: "2024-06-15",
    description: "Rapid-scale up program for early stage startups in India and SE Asia."
  },
  {
    id: '9',
    title: "Accel Atoms 4.0",
    amount: "₹4,00,00,000",
    amountValue: 40000000,
    stage: "Pre-Seed",
    location: "Remote / India",
    investor: "Accel",
    evidence_url: "#",
    tags: ["VC", "AI", "Industry 5.0", "Pre-Seed"],
    type: 'VC',
    deadline: "2024-10-01",
    description: "Sector-focused pre-seed program for AI and Bharat founders."
  },
  {
    id: '10',
    title: "Blume Ventures Fund IV",
    amount: "₹15,00,00,000",
    amountValue: 150000000,
    stage: "Series A",
    location: "Mumbai, India",
    investor: "Blume Ventures",
    evidence_url: "#",
    tags: ["VC", "DeepTech", "Consumer Tech", "B2B"],
    type: 'VC',
    deadline: "Rolling"
  },
  {
    id: '14',
    title: "Y Combinator W25",
    amount: "₹4,10,00,000",
    amountValue: 41000000,
    stage: "Pre-Seed",
    location: "Global (Remote)",
    investor: "Y Combinator",
    evidence_url: "#",
    tags: ["Accelerator", "Global", "USD", "Tech"],
    type: 'VC',
    deadline: "2024-11-20"
  },
  {
    id: '15',
    title: "Omidyar Network India",
    amount: "₹5,00,00,000",
    amountValue: 50000000,
    stage: "Seed",
    location: "Pan India",
    investor: "Omidyar Network",
    evidence_url: "#",
    tags: ["VC", "Impact", "EdTech", "FinTech"],
    type: 'VC',
    deadline: "Rolling"
  },

  // ANGEL & NETWORKS
  {
    id: '5',
    title: "Angel Network DeepTech Fund",
    amount: "₹1,00,00,000",
    amountValue: 10000000,
    stage: "Angel Round",
    location: "Hyderabad, India",
    investor: "Hyderabad Angels",
    evidence_url: "#",
    tags: ["Angel", "AI/ML", "DeepTech"],
    type: 'Angel',
    deadline: "2024-08-20"
  },
  {
    id: '11',
    title: "Indian Angel Network (IAN) Fund",
    amount: "₹2,50,00,000",
    amountValue: 25000000,
    stage: "Seed",
    location: "Delhi NCR, India",
    investor: "IAN",
    evidence_url: "#",
    tags: ["Angel", "Network", "Sector Agnostic"],
    type: 'Angel',
    deadline: "Rolling"
  },
  {
    id: '16',
    title: "Mumbai Angels Network",
    amount: "₹1,50,00,000",
    amountValue: 15000000,
    stage: "Seed",
    location: "Mumbai, India",
    investor: "Mumbai Angels",
    evidence_url: "#",
    tags: ["Angel", "Equity", "Consumer"],
    type: 'Angel',
    deadline: "Rolling"
  },

  // SUBSIDIES & GRANTS (Specific)
  {
    id: '6',
    title: "Women Entrepreneurship Subsidy",
    amount: "₹10,00,000",
    amountValue: 1000000,
    stage: "Subsidy",
    location: "Karnataka, India",
    investor: "State Govt",
    evidence_url: "#",
    tags: ["Subsidy", "Women", "SME"],
    type: 'Subsidy',
    deadline: "2024-11-01",
    description: "Special subsidy for women-owned manufacturing enterprises in industrial areas."
  },
  {
    id: '12',
    title: "Gujarat Industrial Policy Subsidy",
    amount: "₹25,00,000",
    amountValue: 2500000,
    stage: "Growth",
    location: "Gujarat, India",
    investor: "Gujarat Govt",
    evidence_url: "#",
    tags: ["Subsidy", "Manufacturing", "Textile", "Chemicals"],
    type: 'Subsidy',
    deadline: "2025-01-01"
  },
  {
    id: '17',
    title: "Maharashtra Agribusiness Network (Magnet)",
    amount: "₹60,00,000",
    amountValue: 6000000,
    stage: "Grant",
    location: "Maharashtra, India",
    investor: "ADB & Maharashtra Govt",
    evidence_url: "#",
    tags: ["Grant", "AgriTech", "Food Processing"],
    type: 'Govt',
    deadline: "2024-12-15"
  },
  {
    id: '18',
    title: "Drone PLI Scheme",
    amount: "₹1,00,00,000",
    amountValue: 10000000,
    stage: "Growth",
    location: "Pan India",
    investor: "Ministry of Civil Aviation",
    evidence_url: "#",
    tags: ["Subsidy", "Drones", "Defence", "PLI"],
    type: 'Govt',
    deadline: "2024-09-01"
  },
  {
    id: '20',
    title: "Cisco LaunchPad",
    amount: "Non-Dilutive",
    amountValue: 0,
    stage: "Accelerator",
    location: "Bangalore",
    investor: "Cisco",
    evidence_url: "#",
    tags: ["Accelerator", "B2B", "DeepTech"],
    type: 'VC',
    deadline: "Applications Open"
  }
];

export const MOCK_CHAT_SESSIONS: ChatSession[] = [
  {
    id: 'session-1',
    title: "EV Subsidy Eligibility in TN",
    createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    isStarred: true,
    messages: [
      { id: '1', role: 'user', text: "What is the EV subsidy in Tamil Nadu?" },
      { id: '2', role: 'model', text: "The **Tamil Nadu EV Policy** offers subsidies up to **₹1.5 Lakhs** for commercial EVs and tax exemptions for private EV buyers. You also get 100% road tax exemption till 2025. I've found a relevant scheme below.", data: [MOCK_FUNDING_DATA[0]] }
    ]
  },
  {
    id: 'session-2',
    title: "SaaS Valuation Metrics",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
    isStarred: false,
    messages: [
      { id: '1', role: 'user', text: "How do VCs value SaaS startups?" },
      { id: '2', role: 'model', text: "VCs typically look at **ARR (Annual Recurring Revenue)** multiples, varying from 5x to 20x based on growth rate (Year-over-Year), Net Revenue Retention (NRR), and Churn rate. \n\nKey Metrics:\n- **CAC**: Customer Acquisition Cost\n- **LTV**: Lifetime Value\n- **Rule of 40**: Growth % + Profit % > 40" }
    ]
  },
  {
    id: 'session-3',
    title: "Biotech Grants in India",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
    isStarred: true,
    messages: [
      { id: '1', role: 'user', text: "Are there any grants for Biotech startups?" },
      { id: '2', role: 'model', text: "Yes, BIRAC (Biotechnology Industry Research Assistance Council) is the primary agency. The **BIG Grant** is the most popular one for early-stage ideas.", data: [MOCK_FUNDING_DATA[7]] }
    ]
  },
  {
    id: 'session-4',
    title: "Startup India Registration",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
    isStarred: false,
    messages: [
      { id: '1', role: 'user', text: "How to register for Startup India?" },
      { id: '2', role: 'model', text: "To register:\n1. Incorporate your business (LLP or Pvt Ltd).\n2. Register on the Startup India portal.\n3. Upload documents (PAN, Incorporation Certificate).\n4. Apply for DPIIT recognition to avail tax benefits and the Seed Fund Scheme.", data: [MOCK_FUNDING_DATA[4]] }
    ]
  }
];

export const STATES = [
  "All Regions",
  "Pan India",
  "Tamil Nadu",
  "Karnataka",
  "Maharashtra",
  "Delhi NCR",
  "Telangana",
  "Kerala",
  "Gujarat",
  "Global"
];

export const INVESTOR_TYPES = [
  "All Types",
  "Govt",
  "VC",
  "Angel",
  "Subsidy"
];