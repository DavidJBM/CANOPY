import aiohttp
from core.config import settings

async def get_weather(lat: float, lon: float) -> dict:
    """
    Consulta la API del clima en RapidAPI basándose en coordenadas.
    """
    url = "https://weatherapi-com.p.rapidapi.com/current.json"
    querystring = {"q": f"{lat},{lon}"}
    
    headers = {
        "X-RapidAPI-Key": settings.RAPIDAPI_KEY,
        "X-RapidAPI-Host": settings.RAPIDAPI_HOST
    }
    
    # Si no hay API key (como pasa en el MVP inicial), devolvemos datos mockeados
    if not settings.RAPIDAPI_KEY:
        return {
            "current": {
                "temp_c": 25.0,
                "humidity": 85,
                "condition": {"text": "Rain"}
            }
        }
        
    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers=headers, params=querystring) as response:
            if response.status == 200:
                return await response.json()
            return {}
