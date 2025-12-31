import subprocess
import json

import subprocess

import trafilatura
import requests

def fetch_web_content(url):
    try:
        downloaded = trafilatura.fetch_url(url)
        if downloaded:
            extracted = trafilatura.extract(downloaded)
            return extracted or ""
        return ""
    except Exception as e:
        print("Fetch error:", e)
        return ""


