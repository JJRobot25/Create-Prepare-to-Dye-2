#!/usr/bin/env python3
# /// script
# dependencies = ["requests"]
# ///
"""Check modpack rank on Modrinth."""

import os
import re
import sys
import requests

def main():
    name = os.environ.get("NAME", "Prepare to Dye")
    limit = 100
    total_items = 1000

    print(f"Searching for: {name}")
    print()

    for offset in range(0, total_items, limit):
        print(f"Fetching offset {offset}...")

        response = requests.get(
            "https://api.modrinth.com/v2/search",
            params={
                "limit": limit,
                "offset": offset,
                "facets": '[["project_type:modpack"]]',
            },
        )
        data = response.json()

        if offset == 0:
            print(f"Total modpacks on Modrinth: {data.get('total_hits', 'unknown')}")
            print()

        for idx, hit in enumerate(data.get("hits", [])):
            rank = offset + idx
            title = hit.get("title", "")
            if name.lower() in title.lower():
                print(f"Found: {rank}: {title}")
                print()
                print(f"Rank found: {rank}")
                return rank

    print()
    print("Modpack not found in search results")
    return None


if __name__ == "__main__":
    result = main()
    sys.exit(0 if result is not None else 1)
