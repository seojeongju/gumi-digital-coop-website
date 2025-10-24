-- Migration: Create quote_requests table
-- Date: 2025-10-24
-- Description: Table for storing quote requests from customers

CREATE TABLE IF NOT EXISTS quote_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- Basic Information
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Project Information
  service_type TEXT NOT NULL,
  quantity INTEGER,
  deadline DATE,
  budget_range TEXT,
  description TEXT NOT NULL,
  
  -- File Attachment
  file_key TEXT,
  file_name TEXT,
  file_size TEXT,
  
  -- Status Management
  status TEXT DEFAULT 'pending',  -- pending, reviewing, quoted, completed, cancelled
  admin_notes TEXT,
  
  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_email ON quote_requests(email);

-- Insert sample data for testing
INSERT INTO quote_requests (name, company, email, phone, service_type, quantity, deadline, budget_range, description, status) 
VALUES 
  ('홍길동', '(주)테크놀로지', 'hong@example.com', '010-1234-5678', '3d-printing', 10, '2025-11-15', '100-300', '제품 시제품 제작 요청입니다. 상세한 도면은 첨부 파일을 참고해주세요.', 'pending'),
  ('김철수', '(주)제조산업', 'kim@example.com', '010-2345-6789', 'design', 5, '2025-11-20', '300-500', '3D 디자인 작업이 필요합니다. 컨셉 이미지를 보내드렸습니다.', 'reviewing'),
  ('이영희', '스타트업코리아', 'lee@example.com', '010-3456-7890', 'consulting', NULL, '2025-12-01', 'consulting', '3D 프린팅 사업 진출을 위한 컨설팅이 필요합니다.', 'quoted'),
  ('박민수', '(주)디자인랩', 'park@example.com', '010-4567-8901', 'scanning', 20, '2025-11-10', '500-1000', '기존 제품의 역설계를 위한 3D 스캐닝이 필요합니다.', 'pending');
