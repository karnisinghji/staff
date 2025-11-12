-- Find user IDs by email
-- Run this query in your PostgreSQL database

SELECT 
    id,
    email,
    role,
    created_at
FROM users
WHERE email IN ('khushabhu@gmail.com', 'ramp@info.com')
ORDER BY email;

-- Also check if they have any messages
SELECT 
    m.id as message_id,
    m.from_user_id,
    m.to_user_id,
    m.body,
    m.created_at,
    m.read_at,
    sender.email as from_email,
    recipient.email as to_email
FROM messages m
LEFT JOIN users sender ON m.from_user_id = sender.id
LEFT JOIN users recipient ON m.to_user_id = recipient.id
WHERE sender.email = 'khushabhu@gmail.com' 
   OR recipient.email = 'ramp@info.com'
ORDER BY m.created_at DESC
LIMIT 10;
