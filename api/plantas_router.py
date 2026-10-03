from fastapi import APIRouter, HTTPException
from models.schemas import ImageRequest
from services.roboflow_service import detectar_planta_service
from services.rapidapi_service import obtener_plantas

router = APIRouter(prefix="/plantas", tags=["Plantas"])

@router.post("/identificar")
async def identificar_planta(request: ImageRequest):
    """
    Endpoint para identificar una planta usando la imagen en base64.
    """
    resultado = await detectar_planta_service(request.image_base64)
    return resultado

@router.get("/catalogo")
async def get_catalogo():
    """
    Endpoint para obtener el catálogo completo de plantas desde RapidAPI.
    """
    plantas = obtener_plantas()
    if plantas is None:
        raise HTTPException(status_code=500, detail="Error fetching catalog from external API.")
    return plantas
