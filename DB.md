CREATE DATABASE IF NOT EXISTS db_tuyendung;
USE db_tuyendung;

-- ================= 1. USERS =================
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY, -- Using nanoid numbers only (16 digits)
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    
    avatar VARCHAR(255), -- Link Cloudinary
    
    role ENUM('candidate','recruiter','admin') DEFAULT 'candidate',
    status ENUM('active','inactive','banned') DEFAULT 'active',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ================= 2. CANDIDATE PROFILE =================
CREATE TABLE candidate_profiles (
    user_id VARCHAR(50) PRIMARY KEY,
    
    phone VARCHAR(20),
    address VARCHAR(255),
    date_of_birth DATE,
    gender ENUM('male','female','other'),
    
    experience_years DECIMAL(4,1) DEFAULT 0.0,
    education TEXT,
    bio TEXT,
    
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ================= 3. RECRUITER PROFILE (MERGED WITH COMPANY) =================
CREATE TABLE recruiter_profiles (
    user_id VARCHAR(50) PRIMARY KEY,
    
    -- Thông tin cá nhân HR
    position VARCHAR(100), -- VD: HR Manager, Talent Acquisition
    
    -- Thông tin Doanh nghiệp
    company_name VARCHAR(255),
    company_website VARCHAR(255),
    company_size VARCHAR(50),
    company_address VARCHAR(255),
    company_description TEXT,
    company_logo_url VARCHAR(255),
    
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ================= 4. JOBS =================
CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recruiter_id VARCHAR(50) NOT NULL,
    
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    benefits TEXT,
    
    location VARCHAR(255),
    
    employment_type ENUM('fulltime','parttime','intern','freelance') DEFAULT 'fulltime',
    experience_level ENUM('fresher','junior','mid','senior','manager') DEFAULT 'junior',
    
    salary_min BIGINT,  -- Dùng BIGINT cho tiền VND
    salary_max BIGINT,
    currency VARCHAR(10) DEFAULT 'VND',
    
    quantity INT DEFAULT 1,
    deadline DATE,
    
    status ENUM('draft','open','closed') DEFAULT 'open',
    
    -- Phục vụ AI & Vector Search (ChromaDB)
    chroma_id VARCHAR(100),
    is_embedded BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (recruiter_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ================= 5. CV FILES =================
CREATE TABLE cv_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    
    cloudinary_url VARCHAR(255) NOT NULL,
    file_name VARCHAR(255),
    
    extracted_text LONGTEXT,
    
    chroma_id VARCHAR(100),
    is_embedded BOOLEAN DEFAULT FALSE,
    
    ai_suggestions TEXT, -- Gợi ý sửa CV từ AI
    
    is_default BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) DEFAULT 0 -- Soft delete flag
);

-- ================= 6. SKILLS =================
CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- ================= 7. JOB SKILLS =================
CREATE TABLE job_skills (
    job_id INT NOT NULL,
    skill_id INT NOT NULL,
    
    PRIMARY KEY (job_id, skill_id),
    
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- ================= 8. JOB INTERVIEW QUESTIONS (RECRUITER REFERENCE) =================
CREATE TABLE job_interview_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    
    category VARCHAR(50), -- Added: Technical, Soft Skills, etc.
    question TEXT NOT NULL,
    suggested_answer TEXT,
    tags JSON, -- Added tags
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

-- ================= 9. APPLICATIONS =================
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    cv_id INT NOT NULL,
    
    match_score FLOAT, -- Điểm matching (%)
    missing_skills JSON, -- Các kỹ năng còn thiếu bóc tách từ AI
    ai_feedback TEXT,
    
    status ENUM('pending','reviewed','interview','accepted','rejected') DEFAULT 'pending',
    
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (cv_id) REFERENCES cv_files(id) ON DELETE CASCADE
);

-- Bảng cache kết quả phân tích AI để tối ưu token
CREATE TABLE IF NOT EXISTS cv_analysis_cache (  
  id INT AUTO_INCREMENT PRIMARY KEY,   
  cv_id INT NOT NULL,  
  job_id INT NOT NULL,   
  user_id VARCHAR(50) NOT NULL,   
  strengths JSON,
  match_score FLOAT,    improvements JSON,   
  summary TEXT,   
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    
  UNIQUE KEY (cv_id, job_id),  
  FOREIGN KEY (cv_id) REFERENCES cv_files(id) ON DELETE CASCADE,  
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
  );

-- ================= 10. INTERVIEW SESSIONS (AI MÔ PHỎNG) =================
CREATE TABLE interview_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT NOT NULL,
    
    status ENUM('scheduled','in_progress','completed','cancelled') DEFAULT 'scheduled',
    scheduled_at DATETIME, 
    started_at TIMESTAMP NULL,
    finished_at TIMESTAMP NULL,
    
    overall_score FLOAT,
    overall_feedback TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

-- ================= 11. INTERVIEW ANSWERS (AI CHAT LOGS) =================
CREATE TABLE interview_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT NOT NULL,
    
    question TEXT NOT NULL,
    candidate_answer TEXT,
    
    ai_feedback TEXT,
    score FLOAT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (session_id) REFERENCES interview_sessions(id) ON DELETE CASCADE
);
