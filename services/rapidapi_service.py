import os
import requests
from dotenv import load_dotenv

load_dotenv()

RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")
RAPIDAPI_HOST = "house-plants.p.rapidapi.com"

def obtener_plantas():
    """Trae la lista de plantas desde la API house-plants."""
    url = f"https://{RAPIDAPI_HOST}/all"

    headers = {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": RAPIDAPI_HOST
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"[Error RapidAPI]: {e}")
        return None

def buscar_planta_por_nombre(nombre_comun: str):
    """Busca plantas por coincidencia en el nombre común."""
    plantas = obtener_plantas()
    if not plantas:
        return []
    
    # Filtro local rápido para buscar la planta que coincida
    resultados = [
        p for p in plantas 
        if nombre_comun.lower() in p.get("common", [""])[0].lower() or 
           nombre_comun.lower() in p.get("latin", "").lower()
    ]
    return resultados

if __name__ == "__main__":
    print("Consultando catálogo de plantas...")
    todas = obtener_plantas()
    
    if todas:
        print(f"Total de plantas obtenidas: {len(todas)}")
        print("\nEjemplo de la primera planta encontrada:")
        print(todas[0])