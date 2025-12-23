SELECT 
    c.customer_name,
    c.email,
    r.time_slot,
    r.table_number,
    r.guests
FROM reservations r
JOIN customers c ON r.customer_id = c.customer_id
ORDER BY r.created_at DESC
LIMIT 5;
