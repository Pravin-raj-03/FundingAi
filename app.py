from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.templating import Jinja2Templates
from backend.planner.funding_query_rewriter import rewrite_for_funding
from backend.translation.translator import translate_to_english
from backend.planner.domain_planner import llm_build_queries
from backend.fetch.fetch_manager import extract_from_url
from backend.search.search_manager import multi_lang_search
from backend.ranker.funding_classifier import classify_funding_intent  # NEW

app = FastAPI()
templates = Jinja2Templates(directory="ui/templates")


@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/search")
def search(q: str):
    print("\n================ NEW RANKED SEARCH ================")

    translated = translate_to_english(q)
    funding_query = rewrite_for_funding(translated)
    queries = llm_build_queries(funding_query)

    web_results = multi_lang_search(queries)

    ranked_results = []

    for item in web_results:
        intel = extract_from_url(item.get("link", ""))
        if not intel:
            continue

        # merge extracted intel into item
        item.update(intel)

        # compute info score
        score = 0
        reason = []

        if item.get("amount"):
            score += 3
            reason.append("Has funding amount")

        if item.get("investors"):
            score += 3
            reason.append("Mentions investors")

        if item.get("stage"):
            score += 3
            reason.append("Startup stage found")

        if item.get("sector"):
            score += 2
            reason.append("Sector identified")

        if item.get("location"):
            score += 3
            reason.append("Location present")

        if item.get("date"):
            score += 4
            reason.append("Date included")

        conf = item.get("confidence", 0)
        score += conf * 2
        if conf > 0:
            reason.append(f"High confidence score ({conf})")

        item["info_score"] = score
        item["reasoning"] = ", ".join(reason) if reason else "Weak funding signal"

        ranked_results.append(item)

    # Sort by strongest evidence
    ranked_results.sort(key=lambda x: x["info_score"], reverse=True)

    # Keep Top 10 result
    top_results = ranked_results[:10]

    return {
        "query": q,
        "translated": translated,
        "total_hits": len(ranked_results),
        "top_funded_results": top_results,
        "explanation": "Ranked by strength of funding evidence"
    }


