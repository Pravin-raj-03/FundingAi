import subprocess
import json

MODEL = "deepseek-r1:7b"  # or "llama3.1-mini"

def get_domain_strategy(user_query: str):
    prompt = f"""
You are a funding intelligence agent. Analyze the user query and respond in JSON only.

Decide:
- focus_domains: websites that should be prioritized (government, funding bodies etc.)
- avoid_domains: sources to exclude if bias or wrong side of info (VC funding news vs subsidy info)
- intent_type: "subsidy", "investment_for_startup", 
               "investment_in_startup", "government_scheme", 
               "grants_for_startups", "unknown"
- regions: like India, Tamil Nadu, Bangalore etc.
- languages: ["en"], or include local languages if query contains them.

Query: "{user_query}"

Respond only valid JSON object with keys exactly:
["intent_type", "regions", "languages", "focus_domains", "avoid_domains"]
"""

    result = subprocess.run(
        ["ollama", "run", MODEL],
        input=prompt.encode("utf-8"),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )

    output = result.stdout.decode("utf-8").strip()

    try:
        return json.loads(output)
    except:
        print("⚠️ Strategy Model Output Invalid, Raw:", output)
        return {
            "intent_type": "unknown",
            "regions": ["India"],
            "languages": ["en"],
            "focus_domains": [],
            "avoid_domains": []
        }
