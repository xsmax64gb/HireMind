import os
import json
from openai import OpenAI
from core.config import settings
from typing import Optional

class AIService:
    def __init__(self):
        self.api_key = settings.OPENAI_API_KEY
        if not self.api_key:
            self.api_key = os.getenv("OPENAI_API_KEY")
        
        self.client = OpenAI(api_key=self.api_key)

    async def analyze_cv_match(self, cv_text: str, job_title: str, job_description: str, requirements: str):
        prompt = f"""
        Sử dụng vai trò là một chuyên gia tuyển dụng nhân sự (HR Recruiter) dày dặn kinh nghiệm.
        Nhiệm vụ của bạn là phân tích CV của ứng viên so với Mô tả công việc (Job Description) và Yêu cầu (Requirements) để đánh giá độ phù hợp một cách khách quan, thực tế, công tâm nhất. Yêu cầu đánh giá tuyệt đối KHÔNG ĐƯỢC BỊA ĐẶT (no hallucination), chỉ dựa trên dữ liệu thực tế có trong CV và JD.
        
        Thông tin Công việc (JD):
        - Vị trí: {job_title}
        - Mô tả: {job_description}
        - Yêu cầu: {requirements}
        
        Văn bản CV của ứng viên đã được trích xuất:
        {cv_text}
        
        Vui lòng trả về kết quả dưới dạng JSON với cấu trúc chính xác sau:
        {{
            "match_score": <số nguyên từ 0 đến 100 thể hiện phần trăm độ phù hợp>,
            "summary": "<Đoạn văn ngắn 2-3 câu tổng quát lý do đạt số điểm này>",
            "strengths": [
                "<Điểm mạnh 1: Nêu rõ kỹ năng/kinh nghiệm ứng viên có khớp với yêu cầu>",
                "<Điểm mạnh 2>",
                ... (Khoảng 2-3 điểm mạnh)
            ],
            "improvements": [
                "<Gợi ý 1: Thiếu sót cụ thể hoặc kỹ năng cần cải thiện hoặc thiếu dựa trên JD>",
                "<Gợi ý 2>",
                ... (Khoảng 2-3 gợi ý)
            ]
        }}
        
        Chỉ trả về JSON hợp lệ, không kèm giải thích nào khác. Ngôn ngữ: Tiếng Việt.
        """

        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a professional HR assistant matching CVs to Job Descriptions. Always return valid JSON only in Vietnamese. Be completely factual based on provided text."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"},
                temperature=0.2
            )
            
            content = response.choices[0].message.content
            return json.loads(content)

        except Exception as e:
            print(f"Error analyzing CV match: {str(e)}")
            return {
                "match_score": 0,
                "summary": "Không thể phân tích dữ liệu CV lúc này.",
                "strengths": [],
                "improvements": []
            }

ai_service = AIService()
