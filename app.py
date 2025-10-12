import os
import subprocess
import sys
from pathlib import Path

def install_requirements():
    """Install required packages"""
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])

def setup_environment():
    """Setup environment variables for Hugging Face Spaces"""
    # Set default values for Hugging Face Spaces
    os.environ.setdefault("NEXT_PUBLIC_APP_URL", "https://your-space-name.hf.space")
    os.environ.setdefault("NODE_ENV", "production")
    
    # Check if Supabase credentials are provided
    if not os.getenv("NEXT_PUBLIC_SUPABASE_URL"):
        print("⚠️  NEXT_PUBLIC_SUPABASE_URL not set. Please configure in Space settings.")
    if not os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY"):
        print("⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY not set. Please configure in Space settings.")

def build_and_serve():
    """Build and serve the Next.js application"""
    try:
        # Install dependencies
        print("📦 Installing dependencies...")
        subprocess.run(["npm", "install"], check=True)
        
        # Build the application
        print("🔨 Building application...")
        subprocess.run(["npm", "run", "build"], check=True)
        
        # Start the application
        print("🚀 Starting application...")
        subprocess.run(["npm", "start"], check=True)
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    setup_environment()
    build_and_serve()
