import { InvestorProfile } from '../types';

// Mock service to simulate document analysis without actual API calls

export const analyzeDocumentMock = async (base64Image: string, mimeType: string): Promise<string> => {
    // Simulate network delay for "AI Processing" - reduced to 2s
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Randomize results slightly for "realism" or return a standard success case
    const mockResponses = [
        {
            title: "Detected: National Bio-Entrepreneurship Grant",
            amount: "₹50,00,000",
            investor: "BIRAC & DBT",
            tags: ["BioTech", "Life Sciences", "Grant", "Govt"],
            summary: "A competitive grant scheme identifying and nurturing biotech entrepreneurs for novel ideas with commercial potential. Eligibility requires proof of concept."
        },
        {
            title: "Extracted: MSME Technology Upgradation Scheme",
            amount: "₹15,00,000",
            investor: "Ministry of MSME",
            tags: ["MSME", "Technology", "Subsidy", "Manufacturing"],
            summary: "Credit linked capital subsidy for technology upgradation (CLCSS). Provides 15% subsidy for additional investment in plant and machinery."
        },
        {
            title: "Scanned: Women in Tech Accelerator",
            amount: "₹25,00,000",
            investor: "Global Tech Foundation",
            tags: ["Women", "Accelerator", "Equity Free", "Global"],
            summary: "An equity-free grant program designed to support women-led technology startups scaling into international markets."
        }
    ];

    // Pick a random response
    const result = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    
    return JSON.stringify(result);
};

export const analyzeUrlMock = async (url: string): Promise<string> => {
    // Simulate crawling delay - reduced to 2.5s
    await new Promise(resolve => setTimeout(resolve, 2500));

    const mockResponses = [
        {
            title: "Web Extracted: PM FME Scheme",
            amount: "₹10,00,000",
            investor: "MoFPI",
            tags: ["Food Processing", "Micro Enterprise", "Subsidy"],
            summary: "PM Formalisation of Micro food processing Enterprises (PMFME) Scheme. Credit linked subsidy @ 35% of eligible project cost with a ceiling of ₹10 Lakhs."
        },
        {
            title: "Web Extracted: Atal New India Challenge",
            amount: "₹1,00,00,000",
            investor: "AIM, NITI Aayog",
            tags: ["Grant", "DeepTech", "Innovation"],
            summary: "Grant-in-aid of up to ₹1 Crore for startups solving challenges in sectors like Rail, Space, and Agriculture."
        },
        {
            title: "Web Extracted: Solar Power Subsidy 2024",
            amount: "₹20,00,000",
            investor: "MNRE",
            tags: ["Solar", "Green Energy", "Subsidy", "Govt"],
            summary: "Central Financial Assistance (CFA) for residential rooftop solar consumers. 30% subsidy for systems up to 3kW."
        }
    ];

    const result = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    return JSON.stringify(result);
};

export const analyzeInvestorMock = async (name: string): Promise<InvestorProfile> => {
    // Reduced to 1.2s
    await new Promise(resolve => setTimeout(resolve, 1200));

    return {
        name: name,
        type: "Venture Capital",
        ticketSize: "$500k - $5M",
        focusAreas: ["SaaS", "FinTech", "DeepTech", "AI"],
        recentExits: ["Freshworks", "Unacademy", "Razorpay"],
        redFlags: ["Requires Board Seat", "Long Due Diligence (4+ months)"],
        acceptanceRate: "1.2%"
    };
};