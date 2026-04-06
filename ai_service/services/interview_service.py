import os
from openai import OpenAI
from core.config import settings
from typing import List, Dict

class InterviewService:
    def __init__(self):
        self.api_key = settings.OPENAI_API_KEY
        if not self.api_key:
            # Fallback to env if not in settings object properly (sometimes pydantic-settings needs it)
            self.api_key = os.getenv("OPENAI_API_KEY")
        
        self.client = OpenAI(api_key=self.api_key)

    async def generate_questions(self, job_title: str, job_description: str, requirements: str, skills: Optional[List[str]] = None) -> Dict[str, List[Dict[str, str]]]:
        """
        Generate a list of interview questions based on job details and specific skills.
        """
        skills_context = f"Focus specifically on these skills: {', '.join(skills)}" if skills else "Focus on the overall job description and requirements"

        prompt = f"""
        Sử dụng vai trò Chuyên gia tư vấn nhân sự cấp cao. Hãy soạn thảo các câu hỏi phỏng vấn bằng **Tiếng Việt**.
        Đối tượng sử dụng: **HR Managers** (dùng để đánh giá ứng viên, không phải để ứng viên đọc).
        Với mỗi câu hỏi, cung cấp **Tiêu chí đánh giá (Evaluation Criteria)** chi tiết để HR chấm điểm phần thể hiện của ứng viên.

        Thông tin công việc:
        - Vị trí: {job_title}
        - Mô tả: {job_description}
        - Yêu cầu: {requirements}

        QUY TẮC NGHIÊM NGẶT:
        - Chỉ tạo các câu hỏi thuộc chính xác các nhóm sau đây: {', '.join(skills) if skills else "Technical, Soft Skills, Cultural Fit"}.
        - KHÔNG TẠO bất kỳ nhóm nào nằm ngoài danh sách này.
        - Trả về JSON với các key là tên các nhóm được chọn.

        Các nhóm kỹ năng:
        1. "Technical": Kỹ năng chuyên môn, kinh nghiệm thực chiến.
        2. "Soft Skills": Kỹ năng mềm, giao tiếp, xử lý tình huống.
        3. "Cultural Fit": Sự phù hợp văn hóa, giá trị cốt lõi.

        Định dạng trả về: Một đối tượng JSON.
        Mỗi nhóm chứa danh sách câu hỏi:
        - "question": Câu hỏi bằng Tiếng Việt.
        - "evaluation_criteria": Tiêu chí đánh giá chi tiết cho HR (Tiếng Việt).
        - "tags": 1-2 từ khóa liên quan.

        Trả về DUY NHẤT mã JSON.
        """

        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a specialized HR consultant generating interview kits with evaluation criteria in Vietnamese."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"}
            )
            
            import json
            content = response.choices[0].message.content
            return json.loads(content)

        except Exception as e:
            print(f"Error generating questions: {str(e)}")
            return []

    async def generate_mock_interview_questions(self, job_title: str, job_description: str, requirements: str) -> List[str]:
        """
        Generate 5-7 mock interview questions for candidate.
        """
        prompt = f"""
        Bạn là một chuyên gia nhân sự (HR) đóng vai trò người phỏng vấn trực tiếp ứng viên cho vị trí {job_title}.
        
        Mô tả công việc: {job_description}
        Yêu cầu: {requirements}

        Nhiệm vụ: Hãy tạo ra từ 5 đến 7 câu hỏi phỏng vấn bằng Tiếng Việt để hỏi ứng viên một cách tự nhiên như một buổi phỏng vấn thực tế.
        Các câu hỏi nên đánh giá về mặt chuyên môn và kinh nghiệm thực tế.
        
        Trả về kết quả dưới dạng JSON với một key duy nhất là "questions" chứa mảng các câu hỏi (chuỗi string).
        Chỉ trả về JSON hợp lệ.
        """
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a professional HR conducting an interview. Return JSON only."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"}
            )
            import json
            content = response.choices[0].message.content
            return json.loads(content).get("questions", [])
        except Exception as e:
            print(f"Error generating mock questions: {str(e)}")
            return []

    async def evaluate_mock_interview_answer(self, question: str, answer: str, job_title: str, job_description: str) -> dict:
        """
        Evaluate candidate's answer without soft skills.
        """
        prompt = f"""
        Bạn là một chuyên gia nhân sự. Ứng viên đang phỏng vấn cho vị trí {job_title}.
        
        Bối cảnh công việc: {job_description}
        
        Câu hỏi của bạn: {question}
        Câu trả lời của ứng viên: {answer}

        Nhiệm vụ: 
        Đánh giá độ chính xác và chuyên môn của câu trả lời. 
         KHÔNG đánh giá kỹ năng mềm.
        
        Vui lòng trả về định dạng JSON với các thông tin sau:
        - "score": Điểm số độ chính xác chuyên môn (từ 0.0 đến 10.0).
        - "feedback": Nhận xét ngắn gọn, chỉ ra điểm đúng, điểm sai hoặc thiếu sót.
        - "perfect_answer": Gợi ý cách trả lời hoàn hảo cho câu hỏi này.
        """
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are an expert HR evaluating a candidate's answer. Return JSON only."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"}
            )
            import json
            content = response.choices[0].message.content
            return json.loads(content)
        except Exception as e:
            print(f"Error evaluating answer: {str(e)}")
            return {"score": 0, "feedback": "Có lỗi hệ thống khi đánh giá AI.", "perfect_answer": ""}

interview_service = InterviewService()

