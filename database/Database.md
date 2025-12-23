# 📊 Database Queries

## Useful SQL Queries

**View all Customers:**
```sql
SELECT * FROM customers ORDER BY created_at DESC;
```

**View Newsletter Subscribers:**
```sql
SELECT email, created_at 
FROM customers 
WHERE newsletter_signup = true
ORDER BY created_at DESC;
```

**View all Reservations with Customer Details:**
```sql
SELECT 
    r.reservation_id,
    c.customer_name,
    c.email,
    c.phone_number,
    r.time_slot,
    r.table_number,
    r.guests,
    r.created_at
FROM reservations r
JOIN customers c ON r.customer_id = c.customer_id
ORDER BY r.time_slot DESC;
```

**Check Table Availability for Specific Date:**
```sql
SELECT table_number, time_slot
FROM reservations
WHERE DATE(time_slot) = '2025-12-25'
ORDER BY time_slot, table_number;
```

**Count Reservations by Date:**
```sql
SELECT 
    DATE(time_slot) as date,
    COUNT(*) as total_reservations
FROM reservations
GROUP BY DATE(time_slot)
ORDER BY date DESC;
```

**Find Available Tables for Specific Time:**
```sql
-- Replace with your desired time slot
WITH booked AS (
    SELECT table_number 
    FROM reservations 
    WHERE time_slot = '2025-12-25 19:00:00'
)
SELECT generate_series(1, 30) AS table_number
EXCEPT
SELECT table_number FROM booked;
```