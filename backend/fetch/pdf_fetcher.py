import requests
import os
from unstructured.partition.pdf import partition_pdf

def download_pdf(url, save_path="temp/download.pdf"):
    try:
        response = requests.get(url)
        with open(save_path, "wb") as f:
            f.write(response.content)
        return save_path
    except Exception:
        return None


def extract_text_from_pdf(file_path: str) -> str:
    try:
        elements = partition_pdf(file_path)
        text = "\n".join([el.text for el in elements if hasattr(el, "text")])
        return text
    except:
        return ""
