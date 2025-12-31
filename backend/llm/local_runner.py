from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

import json
import langid

from backend.translation.translator import translate_to_english
from backend.fetch.fetch_manager import extract_from_url
from backend.extract.ai_extractor import extract_funding_intel

# Your existing imports (kept for fallback)
from backend.planner.funding_query_rewriter import rewrite_for_funding
from backend.planner.domain_planner import build_search_queries
from backend.search.search_manager import multi_lang_search
from backend.ranker.funding_classifier import classify_funding_intent


app = FastAPI()
templates = Jinja2Templates(directory="ui/templates")


def is_english(text: str):
    lang, _ = langid.classify(text)
    return lang == "en"


def llm_get_best_funding_links(query: str):
    """Ask local LLM to directly provide the best funding URLs."""
    prompt = f"""
    Task: Return ONLY the top 5 most relevant URLs
    containing verified funding related news for:

    "{query}"

    Rules:
    - Prioritize: investment news, startup funding databases,
      official portals, investor announcements
    - NO blogs, NO spam, NO PDFs, NO job listings
    - Format output strictly as JSON array:
      ["url1", "url2", ...]
    """

    from backend.llm.local_runner import run_llm  # your llama call wrapper

    try:
        output = run_llm(prompt)
        print("LLM URL SELECTOR OUTPUT:", output)
        # extract json safely
        arr = json.loads(output.strip())
        return arr if isinstance(arr, list) else []
    except:
        return []


@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/search")
def search(q: str):
    print("\n================= NEW SEARCH =================")
    print("Query:", q)

    translated = translate_to_english(q)
    print("Translated:", translated)

    # FAST PATH FOR ENGLISH QUERY 🚀
    if is_english(translated):
        print("⚡ FAST MODE: English LLM-based link selection activated!")

        links = llm_get_best_funding_links(translated)
        fast_results = []

        for link in links:
            intel = extract_from_url(link)
            if intel:
                fast_results.append({
                    "url": link,
                    **intel,
                    "confidence": 1.0,
                    "reason": "Selected by LLM based on funding likelihood"
                })

        # Sort: Best funded first
        fast_results = sorted(
            fast_results,
            key=lambda x: 1 if x.get("amount") else 0,
            reverse=True
        )

        return {
            "query": q,
            "translated": translated,
            "mode": "fast_llm_mode",
            "results": fast_results[:10]
        }

    # 🌍 FALLBACK PIPELINE — For Tamil/Other languages
    print("🌍 Standard multilingual search mode")

    funding_query = rewrite_for_funding(translated)
    searches = build_search_queries(funding_query)
    search_results = multi_lang_search(searches)

    final_results = []
    for item in search_results:
        if classify_funding_intent(item.get("title", ""), item.get("snippet", "")):
            intel = extract_from_url(item["link"])
            item["funding"] = intel
            final_results.append(item)

    return {
        "query": q,
        "translated": translated,
        "mode": "global_web_mode",
        "results": final_results[:10]
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=False)
