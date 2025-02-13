import os
import requests
from bs4 import BeautifulSoup
import re


def get_rank(skill):
    ranks = ["e", "d", "c", "b", "a", "s"]
    return ranks[min(skill // 20, 5)]


def parse_time_to_seconds(time_str):
    time_units = {"segundo": 1, "minuto": 60, "hora": 3600, "dia": 86400}
    total_seconds = 0
    matches = re.findall(
        r"(\d+)\s*(segundo|segundos|minuto|minutos|hora|horas|dia|dias)",
        time_str,
        re.IGNORECASE,
    )
    for value, unit in matches:
        unit = unit.lower().rstrip("s")  # Remove plural
        total_seconds += int(value) * time_units[unit]
    return total_seconds


def extract_data_from_table(table_rows):
    recipes = []
    for i in range(0, len(table_rows), 4):
        name_td, skill_td, time_td, ingredients_td = table_rows[i : i + 4]

        # Nome e imagem principal
        name_quantity_text = name_td.text.strip()
        match = re.match(r"^(.*?)(?:\((\d+)x\))?$", name_quantity_text)
        if match:
            name = match.group(1).strip()
            result = int(match.group(2)) if match.group(2) else 1
        else:
            name = name_quantity_text
            result = 1
        img_url = "https://wiki.pokexgames.com" + name_td.find("img")["src"]

        # Skill e Rank
        skill = int(skill_td.text.replace("Skill", "").strip())
        rank = get_rank(skill)

        # Tempo de criação
        craft_time = parse_time_to_seconds(time_td.text.strip())

        # Ingredientes
        ingredients = []
        for img in ingredients_td.find_all("img"):
            item_name = img.find_next(string=True).strip()
            quantity = int(item_name.split(" ")[0])
            item_name = " ".join(item_name.split(" ")[1:])
            item_img = "https://wiki.pokexgames.com" + img["src"]

            ingredients.append(
                {
                    "name": item_name,
                    "quantity": quantity,
                    "item_img": item_img,
                    "value_npc": 1,
                }
            )

        recipes.append(
            {
                "title": name,
                "meta_title": f"{name} craft",
                "description": f"Craft de {name}",
                "rank": rank,
                "draft": False,
                "name": name,
                "recipe_img": img_url,
                "level": skill,
                "craft_time": craft_time,
                "result": result,
                "value_npc": 1,
                "ingredients": ingredients,
            }
        )
    return recipes


def save_mdx(recipe):
    directory = f"./output/professor/rank_{recipe['rank']}"
    os.makedirs(directory, exist_ok=True)

    mdx_content = f"""---
title: "{recipe['title']}"
meta_title: "{recipe['meta_title']}"
description: "{recipe['description']}"
rank: "{recipe['rank']}"
draft: {str(recipe['draft']).lower()}
name: "{recipe['name']}"
recipe_img: "{recipe['recipe_img']}"
level: {recipe['level']}
craft_time: {recipe['craft_time']}
result: {recipe['result']}
value_npc: {recipe['value_npc']}
ingredients:
"""
    for ing in recipe["ingredients"]:
        mdx_content += f"  - name: \"{ing['name']}\"\n    quantity: {ing['quantity']}\n    item_img: \"{ing['item_img']}\"\n    value_npc: {ing['value_npc']}\n"

    mdx_content += "---"

    file_path = os.path.join(directory, f"{recipe['name'].replace(' ', '_')}.mdx")
    with open(file_path, "w", encoding="utf-8") as file:
        file.write(mdx_content)


# Exemplo de uso
url = "https://wiki.pokexgames.com/index.php/Craft_Profiss%C3%B5es_-_Professor"
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")
table_rows = soup.find_all("td", align="center")
recipes = extract_data_from_table(table_rows)

for recipe in recipes:
    save_mdx(recipe)
