from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    ROBOFLOW_API_KEY: str = ""
    ROBOFLOW_API_URL: str = "https://serverless.roboflow.com"
    ROBOFLOW_WORKSPACE: str = "elias-hernandez"
    ROBOFLOW_WORKFLOW_ID: str = "plant-identification-1790985245248"
    ROBOFLOW_MODEL: str = ""
    ROBOFLOW_VERSION: str = ""
    
    RAPIDAPI_KEY: str = ""
    RAPIDAPI_HOST: str = "house-plants.p.rapidapi.com"
    
    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings()
