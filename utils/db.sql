CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,  -- e.g., 'tour', 'user'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);