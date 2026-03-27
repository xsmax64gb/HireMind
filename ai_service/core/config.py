from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "HireMind AI Service"
    PROJECT_VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    OPENAI_API_KEY: str = ""

    model_config = {
        "env_file": ".env",
        "extra": "ignore"
    }

settings = Settings()
