from bs4 import BeautifulSoup
from urllib.parse import urlparse, urlunparse
import json
import requests

url = 'https://docs.google.com/spreadsheets/d/1lExatubPl6zvsDcy4qUd3Sv1PvvKrzMhUyOzaKuId0o/htmlview'
html = requests.get(url).text
soup = BeautifulSoup(html, "lxml")

tables = soup.find_all("table")
master_data = []

for table in tables:
    rows = table.find_all("tr")[3:]  # Skip the first 3 rows
    table_data = []

    for row in rows:
        cells = row.find_all("td")
        
        # Process all <a> tags in the cell
        links = cells[1].find_all('a')
        cleaned_urls = []
        
        for link_tag in links:
            # Remove the unwanted prefix from the href attribute
            cleaned_href = link_tag['href'].replace('https://www.google.com/url?q=', '')

            # Split at the first '&' and take the first part
            cleaned_href = cleaned_href.split('&')[0]

            # Remove query string from the URL
            parsed_url = urlparse(cleaned_href)
            cleaned_url = urlunparse([parsed_url.scheme, parsed_url.netloc, parsed_url.path, '', '', ''])

            cleaned_urls.append(cleaned_url)

        values = {
            "family_name": cells[0].text,
            "donation_links": cleaned_urls,
            "description": cells[2].text if len(cells) > 2 else None
        }

        table_data.append(values)
    master_data.append(table_data)

# Serialize to JSON and write to a file called ohana.json
with open("ohana.json", "w", encoding="utf-8") as f:
    json.dump(master_data, f, ensure_ascii=False, indent=4)
