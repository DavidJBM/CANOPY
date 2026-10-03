from fastapi import FastAPI
from api.plagas_router import router as plagas_router
from api.plantas_router import router as plantas_router
from api.orquestador_router import router as orquestador_router

app = FastAPI(
    title="CANOPY API",
    description="MVP de Diagnóstico Agrícola (Plantas, Plagas y Clima)",
    version="1.0.0"
)

# Registrar los módulos (routers) de cada Dev
app.include_router(plagas_router)
app.include_router(plantas_router)
app.include_router(orquestador_router)

@app.get("/")
def root():
    return {
        "message": "Bienvenido a la API de CANOPY.", 
        "docs": "Visita /docs para probar los endpoints interactivos."
    }
