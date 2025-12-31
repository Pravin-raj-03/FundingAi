import re

def parse_amount_to_number(amount_str):
    if not amount_str:
        return None

    s = amount_str.lower().replace(",", "").strip()

    multipliers = {
        "m": 1_000_000,
        "mn": 1_000_000,
        "cr": 10_000_000,
        "crore": 10_000_000,
        "b": 1_000_000_000,
        "bn": 1_000_000_000
    }

    match = re.match(r"([\d\.]+)\s*([a-z]*)", s)
    if not match:
        return None

    num = float(match.group(1))
    suffix = match.group(2)

    return int(num * multipliers.get(suffix, 1))
