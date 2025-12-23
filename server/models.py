import random
from datetime import datetime

# Total number of tables in the restaurant
TOTAL_TABLES = 30

def create_customer(cursor, name, email, phone=''):
    """
    Create a new customer or return existing customer ID
    
    Args:
        cursor: Database cursor
        name: Customer name
        email: Customer email
        phone: Customer phone (optional)
    
    Returns:
        customer_id: ID of the customer
    """
    # Check if customer already exists
    cursor.execute(
        "SELECT customer_id FROM customers WHERE email = %s",
        (email,)
    )
    existing = cursor.fetchone()
    
    if existing:
        # Update customer info if they exist
        cursor.execute(
            """UPDATE customers 
               SET customer_name = %s, phone_number = %s
               WHERE email = %s
               RETURNING customer_id""",
            (name, phone, email)
        )
        return cursor.fetchone()[0]
    else:
        # Create new customer
        cursor.execute(
            """INSERT INTO customers (customer_name, email, phone_number) 
               VALUES (%s, %s, %s)
               RETURNING customer_id""",
            (name, email, phone)
        )
        return cursor.fetchone()[0]

def check_table_availability(cursor, time_slot):
    """
    Check if any tables are available for the given time slot
    
    Args:
        cursor: Database cursor
        time_slot: Reservation time slot (string format: 'YYYY-MM-DD HH:MM:SS')
    
    Returns:
        table_number: Available table number or None if all tables are booked
    """
    # Get all booked tables for this time slot
    cursor.execute(
        "SELECT table_number FROM reservations WHERE time_slot = %s",
        (time_slot,)
    )
    booked_tables = [row[0] for row in cursor.fetchall()]
    
    # Get available tables (1 to TOTAL_TABLES)
    all_tables = set(range(1, TOTAL_TABLES + 1))
    available_tables = list(all_tables - set(booked_tables))
    
    if available_tables:
        # Return a random available table
        return random.choice(available_tables)
    else:
        return None

def create_reservation(cursor, customer_id, time_slot, table_number, guests=2):
    """
    Create a new reservation
    
    Args:
        cursor: Database cursor
        customer_id: ID of the customer
        time_slot: Reservation time slot
        table_number: Assigned table number
        guests: Number of guests (default: 2)
    
    Returns:
        reservation_id: ID of the created reservation
    """
    try:
        cursor.execute(
            """INSERT INTO reservations (customer_id, time_slot, table_number, guests)
               VALUES (%s, %s, %s, %s)
               RETURNING reservation_id""",
            (customer_id, time_slot, table_number, guests)
        )
        return cursor.fetchone()[0]
    except Exception as e:
        # Handle duplicate reservation - same table and time slot
        raise Exception(f"Failed to create reservation: {str(e)}")

def get_reservation_by_id(cursor, reservation_id):
    """
    Get reservation details by ID
    
    Args:
        cursor: Database cursor
        reservation_id: ID of the reservation
    
    Returns:
        dict: Reservation details or None if not found
    """
    cursor.execute(
        """SELECT r.reservation_id, r.time_slot, r.table_number, r.guests,
                  c.customer_name, c.email, c.phone_number
           FROM reservations r
           JOIN customers c ON r.customer_id = c.customer_id
           WHERE r.reservation_id = %s""",
        (reservation_id,)
    )
    
    result = cursor.fetchone()
    if result:
        return {
            'reservation_id': result[0],
            'time_slot': result[1],
            'table_number': result[2],
            'guests': result[3],
            'customer_name': result[4],
            'email': result[5],
            'phone_number': result[6]
        }
    return None

def get_customer_reservations(cursor, customer_id):
    """
    Get all reservations for a specific customer
    
    Args:
        cursor: Database cursor
        customer_id: ID of the customer
    
    Returns:
        list: List of reservation dictionaries
    """
    cursor.execute(
        """SELECT reservation_id, time_slot, table_number, guests
           FROM reservations
           WHERE customer_id = %s
           ORDER BY time_slot DESC""",
        (customer_id,)
    )
    
    results = cursor.fetchall()
    reservations = []
    for row in results:
        reservations.append({
            'reservation_id': row[0],
            'time_slot': row[1],
            'table_number': row[2],
            'guests': row[3]
        })
    return reservations

def cancel_reservation(cursor, reservation_id):
    """
    Cancel a reservation
    
    Args:
        cursor: Database cursor
        reservation_id: ID of the reservation to cancel
    
    Returns:
        bool: 
            - True if cancelled successfully 
            - False otherwise
    """
    cursor.execute(
        "DELETE FROM reservations WHERE reservation_id = %s RETURNING reservation_id",
        (reservation_id,)
    )
    return cursor.fetchone() is not None