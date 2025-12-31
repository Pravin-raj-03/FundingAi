import subprocess

def rewrite_for_funding(query: str) -> str:
    prompt = f"""
Rewrite the query to find **funding SOURCES** available to startups,
not news about funding raised by other companies.

Focus on:
- government startup schemes
- grants
- subsidies
- incubators / accelerators
- VC programs accepting applications

Include terms: apply, scheme, funding support, grant, subsidy,
eligibility, registration, India, Tamil Nadu (if relevant).

Return only the rewritten query.

Input: "{query}"
Output:
"""

    result = subprocess.run(
        ["ollama", "run", "llama3.1-mini"],
        input=prompt.encode("utf-8"),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )

    rewritten = result.stdout.decode("utf-8", errors="ignore").strip()
    return rewritten if rewritten else query
