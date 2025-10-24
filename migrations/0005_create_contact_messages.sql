-- Migration: Create contact_messages table
-- Date: 2025-10-24
-- Description: Table for storing contact/inquiry messages from customers

CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- Basic Information
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Inquiry Information
  inquiry_type TEXT NOT NULL,  -- membership, service, partnership, general, other
  message TEXT NOT NULL,
  
  -- Status Management
  status TEXT DEFAULT 'pending',  -- pending, reviewing, replied, closed
  admin_notes TEXT,
  replied_at DATETIME,
  
  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_inquiry_type ON contact_messages(inquiry_type);

-- Insert sample data for testing
INSERT INTO contact_messages (name, company, email, phone, inquiry_type, message, status) 
VALUES 
  ('김철수', '(주)테크놀로지', 'kim@tech.com', '010-1234-5678', 'membership', '조합원 가입 절차에 대해 문의드립니다. 가입 조건과 필요한 서류를 알려주세요.', 'pending'),
  ('이영희', '스타트업코리아', 'lee@startup.com', '010-2345-6789', 'service', '3D 프린팅 서비스 이용을 희망합니다. 견적 상담이 가능한가요?', 'reviewing'),
  ('박민수', '', 'park@example.com', '010-3456-7890', 'partnership', '귀 조합과의 협력 사업을 제안하고자 합니다. 미팅 일정을 잡을 수 있을까요?', 'replied'),
  ('최지훈', '(주)디자인랩', 'choi@design.com', '010-4567-8901', 'general', '교육 프로그램 일정을 확인하고 싶습니다.', 'pending');
