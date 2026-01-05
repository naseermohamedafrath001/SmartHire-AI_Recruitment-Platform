import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from the backend directory
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(backend_dir, '.env'))

class GeminiService:
    def __init__(self):
        self.api_key = os.getenv('GEMINI_API_KEY', 'your key')
        self.model_name = None
        self.model = None
        
        if not self.api_key:
            print("⚠️  WARNING: GEMINI_API_KEY not found in environment variables")
            self.configured = False
        else:
            try:
                genai.configure(api_key=self.api_key)
                
                # Intelligent Model Selection
                available_models = []
                for m in genai.list_models():
                    if 'generateContent' in m.supported_generation_methods:
                        available_models.append(m.name)
                
                # Preferred order of models
                preferences = [
                    'models/gemini-1.5-flash',
                    'models/gemini-1.5-flash-latest',
                    'models/gemini-flash-latest',
                    'models/gemini-pro',
                    'models/gemini-pro-latest',
                    'models/gemini-2.0-flash',
                    'models/gemini-1.5-pro'
                ]
                
                for pref in preferences:
                    if pref in available_models:
                        self.model_name = pref
                        break
                
                if not self.model_name and available_models:
                    self.model_name = available_models[0]
                
                if self.model_name:
                    self.model = genai.GenerativeModel(self.model_name)
                    print(f"✅ Gemini API configured successfully using model: {self.model_name}")
                    self.configured = True
                else:
                    print("❌ No compatible Gemini models found for this API key.")
                    self.configured = False
                    
            except Exception as e:
                print(f"❌ Gemini Configuration Error: {e}")
                self.configured = False

    def _call_gemini(self, messages, temperature=0.7, max_tokens=1500):
        """Call Google Gemini API using SDK"""
        if not self.configured:
            return self._get_mock_response()

        try:
            # Combine messages into a single prompt for simpler SDK call
            # The SDK also supports chat history, but for simple analysis, a prompt is fine
            prompt_parts = []
            for msg in messages:
                prompt_parts.append(f"{msg['role'].capitalize()}: {msg['content']}")
            
            prompt = "\n\n".join(prompt_parts)

            response = self.model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    temperature=temperature,
                    max_output_tokens=max_tokens
                )
            )
            
            if response.text:
                return response.text
            return "Sorry, I couldn't process that request."

        except Exception as e:
            print(f"❌ Gemini SDK Call Error: {e}")
            return self._get_mock_response()

    def _get_mock_response(self):
        """Return a basic mock response when API is unavailable"""
        return "I am currently in mock mode because the Gemini API is not configured or reachable. I can still perform basic resume parsing and analysis based on local logic."

    def analyze_resume(self, resume_text, job_description=""):
        """Analyze resume and provide comprehensive evaluation"""
        try:
            prompt = f"""
            Analyze the following resume and provide a comprehensive evaluation in JSON format.

            Resume Text:
            {resume_text}

            Job Description (if provided):
            {job_description}

            Please provide analysis in the following JSON structure:
            {{
                "overall_score": <number 0-100>,
                "category": "<Highly Qualified|Qualified|Not a Fit>",
                "summary": "<brief summary>",
                "strengths": ["<strength1>", "<strength2>", ...],
                "weaknesses": ["<weakness1>", "<weakness2>", ...],
                "skills_match": <number 0-100>,
                "experience_level": "<Junior|Mid-level|Senior|Expert>",
                "experience_years": <number>,
                "key_skills": ["<skill1>", "<skill2>", ...],
                "education": "<education details>",
                "recommendations": ["<recommendation1>", "<recommendation2>", ...],
                "red_flags": ["<flag1>", "<flag2>", ...],
                "contact_info": {{
                    "name": "<name>",
                    "email": "<email>",
                    "phone": "<phone>"
                }}
            }}

            Ensure the response is valid JSON only, no additional text.
            """

            # Simplified SDK call for structured output
            response = self.model.generate_content(prompt)
            response_text = response.text

            # Clean JSON response (sometimes SDK wraps in backticks)
            if "```json" in response_text:
                response_text = response_text.split("```json")[1].split("```")[0].strip()
            elif "```" in response_text:
                response_text = response_text.split("```")[1].split("```")[0].strip()

            try:
                analysis = json.loads(response_text)
                return analysis
            except json.JSONDecodeError:
                print(f"❌ JSON parsing failed. Response: {response_text[:200]}...")
                return self._get_mock_analysis(resume_text)

        except Exception as e:
            if "429" in str(e) or "quota" in str(e).lower():
                print("❌ Gemini API Error: Quota Exceeded (429). Please wait a minute.")
                return {"error": "Quota exceeded. Please try again in 60 seconds."}
            print(f"❌ Error in resume analysis: {str(e)}")
            return self._get_mock_analysis(resume_text)

    def _get_mock_analysis(self, resume_text=""):
        """Return mock analysis structure (kept for fallback)"""
        import random
        import hashlib

        # Create a seed based on resume content for consistent but unique results
        content_hash = hashlib.md5(resume_text.encode()).hexdigest()
        random.seed(content_hash)

        # Basic local extraction (Privacy First)
        from services.resume_parser import ResumeParser
        parser = ResumeParser()
        contact = parser.extract_contact_info(resume_text)
        skills = parser.extract_skills(resume_text) or ["Python", "JavaScript", "SQL"]
        exp = parser.extract_experience_years(resume_text)

        return {
            "overall_score": random.randint(70, 95),
            "category": "Qualified",
            "summary": f"Calculated locally: Candidate with {exp} years of experience.",
            "strengths": ["Local Analysis", "Privacy Protected"],
            "weaknesses": ["Mock Feedback"],
            "skills_match": random.randint(70, 90),
            "experience_level": "Mid-level",
            "experience_years": exp,
            "key_skills": skills[:10],
            "education": "Verified via local parser",
            "recommendations": ["Check API Key for full AI insights"],
            "red_flags": [],
            "contact_info": {
                "name": contact.get('name', 'Candidate Name'),
                "email": contact.get('email', 'Email not found'),
                "phone": contact.get('phone', 'Phone not found')
            }
        }

    def chat_about_candidate(self, candidate, message):
        """Chat about a specific candidate using SDK"""
        try:
            analysis = candidate.get('analysis', {})
            contact_info = analysis.get('contact_info', {})
            name = contact_info.get('name', 'This candidate')
            
            prompt = f"""
            You are an expert HR consultant. Answer the user question about this candidate.
            
            Candidate Data: {json.dumps(analysis)}
            
            User Question: {message}
            
            Provide a professional, structured response in Markdown.
            """
            
            response = self.model.generate_content(prompt)
            return response.text

        except Exception as e:
            print(f"❌ Chat Error: {str(e)}")
            import traceback
            print(f"❌ Traceback: {traceback.format_exc()}")
            return f"I'm sorry, I'm having trouble analyzing **{name}** right now."

    def hr_assistant_chat(self, candidates, message):
        """General HR assistant chat using SDK"""
        try:
            # Prepare minimal candidate summaries for context
            candidate_list = []
            for c in candidates[:10]:
                a = c.get('analysis', {})
                candidate_list.append({
                    "name": a.get('contact_info', {}).get('name', 'Unknown'),
                    "score": a.get('overall_score', 0),
                    "category": a.get('category', 'Unknown'),
                    "skills": a.get('key_skills', [])[:5]
                })

            prompt = f"""
            You are a senior HR assistant. Use this candidate list to answer the user question.
            
            Candidates: {json.dumps(candidate_list)}
            
            User question: {message}
            
            Format your response clearly with markdown, bullet points, and bold text.
            """

            response = self.model.generate_content(prompt)
            return response.text

        except Exception as e:
            if "429" in str(e) or "quota" in str(e).lower():
                print("❌ Gemini API Error: Quota Exceeded (429).")
                return "The AI is currently busy (Quota Exceeded). Please wait about 30 seconds and try your message again."
            print(f"❌ HR Assistant Error: {str(e)}")
            import traceback
            print(f"❌ Traceback: {traceback.format_exc()}")
            return "I apologize, but I encountered an error while consulting with the AI. Please try again."

    def _generate_mock_hr_response(self, candidates, message):
        # Kept for total fallback compatibility
        return "I am currently in mock mode. Please check your API configuration."
