from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db, get_db_connection
from models import create_customer, create_reservation, check_table_availability
import random

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Initialise database on startup
init_db()

@app.route('/api/newsletter', methods=['POST'])
def newsletter_signup():
    # Handle newsletter signup
    try:
        data = request.get_json()
        email = data.get('email')
        
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Check if email already exists
        cursor.execute(
            "SELECT customer_id FROM customers WHERE email = %s",
            (email,)
        )
        existing = cursor.fetchone()
        
        if existing:
            # Update newsletter signup status
            cursor.execute(
                "UPDATE customers SET newsletter_signup = TRUE WHERE email = %s",
                (email,)
            )
        else:
            # Create new customer with newsletter signup
            cursor.execute(
                """INSERT INTO customers (email, newsletter_signup) 
                   VALUES (%s, TRUE)""",
                (email,)
            )
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({'message': 'Successfully subscribed to newsletter!'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/reservations', methods=['POST'])
def create_reservation_endpoint():
    # Handle table reservations
    try:
        data = request.get_json()
        
        # Extract data
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone', '')
        time_slot = data.get('timeSlot')
        guests = data.get('guests', 2)
        
        # Validate required fields
        if not all([name, email, time_slot]):
            return jsonify({'error': 'Name, email, and time slot are required'}), 400
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Check table availability
        available_table = check_table_availability(cursor, time_slot)
        
        if not available_table:
            cursor.close()
            conn.close()
            return jsonify({'error': 'No tables available for this time slot. Please select a different time.'}), 409
        
        # Create or get customer
        customer_id = create_customer(cursor, name, email, phone)
        
        # Create reservation
        reservation_id = create_reservation(cursor, customer_id, time_slot, available_table)
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({
            'message': f'Reservation confirmed! Your table number is {available_table}.',
            'reservationId': reservation_id,
            'tableNumber': available_table,
            'timeSlot': time_slot
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/reservations/<int:reservation_id>', methods=['GET'])
def get_reservation(reservation_id):
    # Get reservation details
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute(
            """SELECT r.reservation_id, r.time_slot, r.table_number, 
                      c.customer_name, c.email, c.phone_number
               FROM reservations r
               JOIN customers c ON r.customer_id = c.customer_id
               WHERE r.reservation_id = %s""",
            (reservation_id,)
        )
        
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        
        if not result:
            return jsonify({'error': 'Reservation not found'}), 404
        
        reservation = {
            'reservationId': result[0],
            'timeSlot': str(result[1]),
            'tableNumber': result[2],
            'customerName': result[3],
            'email': result[4],
            'phoneNumber': result[5]
        }
        
        return jsonify(reservation), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    # Health check endpoint
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='127.0.0.1')