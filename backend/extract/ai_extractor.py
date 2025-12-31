import subprocess
import json
import re

def run_llama(prompt):
    result = subprocess.run(
        ["ollama", "run", "llama3.1"],
        input=prompt.encode("utf-8"),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    return result.stdout.decode("utf-8", errors="ignore")


def extract_funding_intel(text: str):
    prompt = f"""
Extract structured startup funding data from this text.
Return ONLY valid JSON. Do not add explanation.

Fields:
startup, amount, stage, investors, date, sector, location

TEXT:
{text[:4000]}
"""
    output = run_llama(prompt)

    match = re.search(r"\{.*\}", output, re.DOTALL)
    print("LLAMA OUTPUT →\n", output)

    try:
        return json.loads(match.group(0))
    except Exception as e:
        print("JSON extraction failed:", e)
        print("Model Output:", output)
        return {
            "startup": None,
            "amount": None,
            "stage": None,
            "investors": [],
            "date": None,
            "sector": None,
            "location": None
        }
