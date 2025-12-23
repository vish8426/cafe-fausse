SELECT email, newsletter_signup, created_at
FROM customers
WHERE newsletter_signup = true
ORDER BY created_at DESC
LIMIT 5;