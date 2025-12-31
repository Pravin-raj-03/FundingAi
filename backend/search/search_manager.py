import requests
import os
from deep_translator import GoogleTranslator

SERP_API_KEY = "f531f90d85463add8c9aebae4389fc6317df61ef02cddc46ce56c898240afb65"

TARGET_LANGS = {
    "en": "English",
    "hi": "Hindi",
    "ta": "Tamil"
}


def translate(text, lang):
    try:
        return GoogleTranslator(source="auto", target=lang).translate(text)
    except:
        return text


def serp_search_single(query: str, lang="en", num=5):
    params = {
        "engine": "google",
        "q": query,
        "api_key": SERP_API_KEY,
        "hl": lang,  # UI language
        "gl": "in",  # geo target India
        "num": num
    }
    url = "https://serpapi.com/search"
    resp = requests.get(url, params=params)
    data = resp.json()

    out = []
    for item in data.get("organic_results", []):
        out.append({
            "title": item.get("title"),
            "snippet": item.get("snippet"),
            "link": item.get("link"),
            "language": lang,
            "source": "SerpAPI"
        })
    return out[:num]


def multi_lang_search(queries):
    all_results = []

    for lang_code in TARGET_LANGS.keys():
        for q in queries:
            # Translate into SEARCH language
            search_query = translate(q, lang_code)

            # Execute search
            results = serp_search_single(search_query, lang=lang_code, num=3)
            all_results.extend(results)

    return all_results
