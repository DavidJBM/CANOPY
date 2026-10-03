from fastapi import APIRouter

router = APIRouter(prefix="/diagnostico-completo", tags=["Orquestador"])

@router.post("/")
async def diagnostico_completo():
    """
    Endpoint asignado al Dev 3.
    Orquestará llamadas internas a /plantas y /plagas.
    """
    return {"status": "en_desarrollo", "message": "Orquestador central (Dev 3)"}
