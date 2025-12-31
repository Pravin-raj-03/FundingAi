from backend.fetch.pdf_fetcher import download_pdf, extract_text_from_pdf
from backend.fetch.article_fetcher import fetch_web_content
from backend.extract.ai_extractor import extract_funding_intel

def extract_from_url(url):
    if url.lower().endswith(".pdf"):
        path = download_pdf(url)
        if not path:
            return None
        text = extract_text_from_pdf(path)
    else:
        text = fetch_web_content(url)

    if not text:
        return None

    intel = extract_funding_intel(text)
    intel["evidence_url"] = url
    return intel
