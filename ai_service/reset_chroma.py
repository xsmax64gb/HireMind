import os
import shutil
import chromadb
from chromadb.utils import embedding_functions
from core.config import settings

CHROMA_DB_DIR = os.path.join(os.path.dirname(__file__), "chroma_db")

def reset_chroma():
    print(f"Deleting existing ChromaDB at {CHROMA_DB_DIR}...")
    if os.path.exists(CHROMA_DB_DIR):
        shutil.rmtree(CHROMA_DB_DIR)
        print("Done.")
    else:
        print("ChromaDB directory not found, nothing to delete.")

    # Initialize again with correct metadata
    print("Re-initializing collections with Cosine Similarity...")
    client = chromadb.PersistentClient(path=CHROMA_DB_DIR)
    
    api_key = settings.OPENAI_API_KEY
    if not api_key:
        api_key = os.getenv("OPENAI_API_KEY")
        
    openai_ef = embedding_functions.OpenAIEmbeddingFunction(
        api_key=api_key,
        model_name="text-embedding-3-small"
    )
    
    client.create_collection(
        name="jobs",
        embedding_function=openai_ef,
        metadata={"hnsw:space": "cosine"}
    )
    
    client.create_collection(
        name="cvs",
        embedding_function=openai_ef,
        metadata={"hnsw:space": "cosine"}
    )
    print("SUCCESS: Collections recreated with Cosine Similarity.")

if __name__ == "__main__":
    reset_chroma()
