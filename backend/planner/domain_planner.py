import subprocess, json

MODEL = "llama3.1-mini"

def llm_build_queries(user_query: str):
    prompt = f"""
You are a multisource startup funding search planner.

Goal:
Generate diverse, high-quality search queries that maximize finding:
- startup funding eligibility
- government subsidies and grants
- accelerators, incubators
- official schemes and policies
- investment opportunities for the user's startup

RULES:
• Must prioritize results in India.
• Include relevant government domains: (.gov.in, tn.gov.in, msme, startupindia.gov.in)
• Include PDF search when Govt info expected.
• Include local language if needed.

Input Query:
"{user_query}"

Output: JSON list of top 10-15 search queries.
"""

    result = subprocess.run(
        ["ollama", "run", MODEL],
        input=prompt.encode(),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )

    out = result.stdout.decode().strip()

    try:
        return json.loads(out)
    except:
        print("⚠️ BAD LLM Query Output → RAW:", out)
        # fallback minimal search
        return [user_query + " India funding"]
