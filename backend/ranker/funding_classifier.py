import subprocess
import json

def classify_funding_intent(title, snippet):
    text = f"{title}. {snippet}"

    prompt = f"""
Classify whether this text implies startup FUNDING news.

Return ONLY one of these JSON values:
{{"intent": "funding"}} or {{"intent": "other"}}

TEXT:
{text}
"""

    result = subprocess.run(
        ["ollama", "run", "llama3.1"],
        input=prompt.encode("utf-8"),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    response = result.stdout.decode("utf-8", errors="ignore").strip()
    
    return "funding" in response.lower()
