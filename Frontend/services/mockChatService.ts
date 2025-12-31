import { FundingItem, ChatMessage } from '../types';
import { MOCK_FUNDING_DATA } from '../constants';

// Simulate AI processing time
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const processMockChat = async (query: string, history: ChatMessage[] = []): Promise<{ text: string; data: FundingItem[] }> => {
  // Variable thinking time between 1s and 2s for responsiveness
  const thinkingTime = 1000 + Math.random() * 1000;
  await delay(thinkingTime);

  const lowerQuery = query.toLowerCase().trim();
  
  // 1. Handle "hi" greeting
  if (lowerQuery === 'hi' || lowerQuery === 'hello') {
    return {
      text: "Hello! I'm your Funding Intelligence AI. \n\nI can help you find startup funding. Ask me about **EV startups**, **AgriTech grants**, or **Seed funding in Bangalore**.",
      data: []
    };
  }

  // 2. Handle context refinement ("in tn" or "in tamil nadu")
  const isRefinement = lowerQuery === 'in tn' || lowerQuery === 'in tamil nadu';
  
  if (isRefinement && history.length > 0) {
      // Look at the previous user message to understand context
      const lastUserMessage = [...history].reverse().find(m => m.role === 'user' && m.text.toLowerCase() !== lowerQuery);
      
      if (lastUserMessage) {
          const contextText = lastUserMessage.text.toLowerCase();
          
          // Check if previous context was about EV
          if (contextText.includes('ev') || contextText.includes('electric')) {
              const tnEvResults = MOCK_FUNDING_DATA.filter(item => 
                  item.location.toLowerCase().includes('tamil nadu') && 
                  (item.tags.includes('EV') || item.title.includes('Electric'))
              );
              
              if (tnEvResults.length > 0) {
                  return {
                      text: `Narrowing down to **Tamil Nadu**: I found the specific EV subsidy scheme you are looking for.`,
                      data: tnEvResults
                  };
              }
          }
      }
  }

  // 3. Robust keyword matching (Standard Search)
  const results = MOCK_FUNDING_DATA.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(lowerQuery);
    const tagMatch = item.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    const locationMatch = item.location.toLowerCase().includes(lowerQuery);
    const typeMatch = item.type.toLowerCase() === lowerQuery; 

    // Contextual matches
    let contextMatch = false;
    if (lowerQuery.includes('ev') || lowerQuery.includes('electric')) {
        contextMatch = item.tags.includes('EV') || item.title.includes('Electric');
    } else if (lowerQuery.includes('woman') || lowerQuery.includes('women') || lowerQuery.includes('female')) {
        contextMatch = item.tags.some(t => t.toLowerCase().includes('woman') || t.toLowerCase().includes('women'));
    } else if (lowerQuery.includes('agri') || lowerQuery.includes('farm')) {
        contextMatch = item.tags.some(t => t.toLowerCase().includes('agri'));
    }

    return titleMatch || tagMatch || locationMatch || typeMatch || contextMatch;
  });

  if (results.length > 0) {
    const count = results.length;
    let responseText = `I found **${count} funding opportunities** matching your request.`;
    
    // Custom response for "ev startups" or similar broad queries
    if (lowerQuery.includes('ev') || lowerQuery.includes('electric')) {
         responseText = `I found **${count} EV-related funding opportunities** across India, including Central Govt schemes and state-specific policies. \n\nYou can refine this by asking for a specific state, like **"in TN"** or **"in Karnataka"**.`;
    } 
    else if (lowerQuery.includes('eligibility')) {
        responseText += `\n\nBased on your query, I've checked the eligibility criteria. These schemes are currently **active**.`;
    } else {
        responseText += `\n\nI've analyzed the database and these seem to be the best fit.`;
    }

    return {
      text: responseText,
      data: results
    };
  }

  // Fallback
  return {
    text: "I searched our global database but couldn't find exact matches for that specific query. \n\n**Suggestions:**\n- Try broader terms like **'Tech Grants'**.\n- Search by location, e.g., **'Funding in Karnataka'**.",
    data: []
  };
};