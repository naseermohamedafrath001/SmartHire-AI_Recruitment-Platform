import os
import requests
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv('.env')

api_key = os.getenv('GEMINI_API_KEY', 'AIzaSyDO67uTtzRZQeUGpYAA729Tv6ig_VDlSYo')
url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"

try:
    response = requests.get(url)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        models = response.json()
        print(json.dumps(models, indent=2))
    else:
        print(f"Error: {response.text}")
except Exception as e:
    print(f"Exception: {e}")
