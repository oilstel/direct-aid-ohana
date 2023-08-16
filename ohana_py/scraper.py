from bs4 import BeautifulSoup
import json
import requests

url = 'https://docs.google.com/spreadsheets/d/1lExatubPl6zvsDcy4qUd3Sv1PvvKrzMhUyOzaKuId0o/htmlview'
html = requests.get(url).text
soup = BeautifulSoup(html, "lxml")

tables = soup.find_all("table")

master_data = []

for table in tables:
    rows = table.find_all("tr")[3:]  # Skip the first 3 rows

    # Construct the list of dictionaries for this table
    table_data = []
    for row in rows:
        cells = row.find_all("td")
        
        # Define a mapping for the column names to our desired object names
        col_mapping = {
            0: "familyName",
            1: "donationLink",
            2: "Description"
        }
        
        values = {
            "family_name": cells[0].text,
            "donation_link": ''.join(str(link) for link in cells[1].find_all('a')),
            "description": cells[2].text if len(cells) > 2 else None
        }

        table_data.append(values)

    master_data.append(table_data)

# Serialize to JSON and write to a file called db.json
with open("ohana.json", "w", encoding="utf-8") as f:
    json.dump(master_data, f, ensure_ascii=False, indent=4)
