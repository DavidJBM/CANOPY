from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    ROBOFLOW_API_KEY: str = ""
    ROBOFLOW_WORKSPACE: str = ""
    ROBOFLOW_MODEL: str = ""
    ROBOFLOW_VERSION: str = ""
    
    RAPIDAPI_KEY: str = ""
    RAPIDAPI_HOST: str = "weatherapi-com.p.rapidapi.com"
    
    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings()
