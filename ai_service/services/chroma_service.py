import os
import chromadb
from chromadb.utils import embedding_functions
from core.config import settings

CHROMA_DB_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "chroma_db")

class ChromaService:
    def __init__(self):
        self.api_key = settings.OPENAI_API_KEY
        if not self.api_key:
            self.api_key = os.getenv("OPENAI_API_KEY")
        
        # Initialize the persistent client
        self.client = chromadb.PersistentClient(path=CHROMA_DB_DIR)
        
        # Initialize OpenAI embedding function
        self.openai_ef = embedding_functions.OpenAIEmbeddingFunction(
            api_key=self.api_key,
            model_name="text-embedding-3-small"
        )
        
        # Get or create the 'jobs' collection
        self.jobs_collection = self.client.get_or_create_collection(
            name="jobs",
            embedding_function=self.openai_ef
        )
        
        # Get or create the 'cvs' collection
        self.cvs_collection = self.client.get_or_create_collection(
            name="cvs",
            embedding_function=self.openai_ef
        )

    def add_job(self, job_id: str, text: str, metadata: dict):
        """
        Embed and store a job description in Chroma.
        """
        try:
            self.jobs_collection.add(
                documents=[text],
                metadatas=[metadata],
                ids=[str(job_id)]
            )
            return True
        except Exception as e:
            print(f"Error adding job to Chroma: {e}")
            return False

    def delete_job(self, job_id: str):
        """
        Delete a job description from Chroma using its job_id.
        """
        try:
            self.jobs_collection.delete(
                ids=[str(job_id)]
            )
            return True
        except Exception as e:
            print(f"Error deleting job from Chroma: {e}")
            return False

    def add_cv(self, cv_id: str, text: str, metadata: dict):
        """
        Embed and store a CV in Chroma.
        """
        try:
            self.cvs_collection.add(
                documents=[text],
                metadatas=[metadata],
                ids=[str(cv_id)]
            )
            return True
        except Exception as e:
            print(f"Error adding CV to Chroma: {e}")
            return False

    def delete_cv(self, cv_id: str):
        """
        Delete a CV from Chroma using its cv_id.
        """
        try:
            self.cvs_collection.delete(
                ids=[str(cv_id)]
            )
            return True
        except Exception as e:
            print(f"Error deleting CV from Chroma: {e}")
            return False

chroma_service = ChromaService()
