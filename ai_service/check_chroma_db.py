import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from services.chroma_service import chroma_service

try:
    print("\n--- JOBS COLLECTION ---")
    results = chroma_service.jobs_collection.get()
    print(f"Total jobs in ChromaDB: {len(results['ids'])}")
    if len(results['ids']) > 0:
        for i in range(len(results['ids'])):
            print(f"- Job ID: {results['ids'][i]}")
            print(f"  Metadata: {results['metadatas'][i]}")
            print(f"  Document: {results['documents'][i][:150]}...\n")

    print("\n--- CVS COLLECTION ---")
    cv_results = chroma_service.cvs_collection.get()
    print(f"Total CVs in ChromaDB: {len(cv_results['ids'])}")
    if len(cv_results['ids']) > 0:
        for i in range(len(cv_results['ids'])):
            print(f"- CV ID: {cv_results['ids'][i]}")
            print(f"  Metadata: {cv_results['metadatas'][i]}")
            print(f"  Document: {cv_results['documents'][i][:150]}...\n")

except Exception as e:
    print(f"Error accessing ChromaDB: {e}")
