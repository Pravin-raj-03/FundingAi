import json
from backend.planner.domain_planner import llm_build_queries

def test_builder():
    print("\n===== Query Builder Test =====")
    user_queries = [
        "தமிழ்நாட்டில் மின்சார வாகனத் துவக்க நிறுவனம் நிதி",
        "AI startup funding in India",
        "grants for biotech startup Tamil Nadu",
        "MSME subsidy for EV charging",
    ]

    for q in user_queries:
        print("\n🧠 User Query:", q)
        queries = llm_build_queries(q)

        print("\n🔍 Generated Search Queries:")
        for i, qs in enumerate(queries, start=1):
            print(f"{i}. {qs}")

if __name__ == "__main__":
    test_builder()
