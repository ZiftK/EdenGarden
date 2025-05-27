from supabase import create_client
import os

def get_supabase_client():
    supabase_url = os.getenv("SUPABASE_URL", "https://mthehujknsafqhtuuuek.supabase.co")
    supabase_key = os.getenv("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10aGVodWprbnNhZnFodHV1dWVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjYzMDgzOCwiZXhwIjoyMDYyMjA2ODM4fQ.Z1gDejKBgLInNi_cEBJOSc0zyBNBSxc6tPgCLo22v8s")
    
    return create_client(supabase_url, supabase_key) 