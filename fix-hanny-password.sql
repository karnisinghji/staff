-- Fix hanny@info.com password hash (convert from sha256 to bcrypt)
-- New bcrypt hash for password "password"
UPDATE users 
SET password_hash = '$2b$10$1tCCSpxlqsGKEcPspLWESuw24a8h2v3Z3YAf6EneYwIssgaZNCJby'
WHERE email = 'hanny@info.com'
RETURNING email, created_at, updated_at;
