import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# Database configuration
DB_CONFIG = {
    'host': 'localhost',
    'database': 'cafe_fausse',
    'user': 'postgres',
    'password': 'postgres',  
    'port': 5432
}

def get_db_connection():
    # Create and return a database connection
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        return conn
    except psycopg2.Error as e:
        print(f"Database connection error: {e}")
        raise

def init_db():
    # Initialise the database with required tables
    # First connect to PostgreSQL server
    try:
        conn = psycopg2.connect(
            host=DB_CONFIG['host'],
            user=DB_CONFIG['user'],
            password=DB_CONFIG['password'],
            port=DB_CONFIG['port']
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        # Create database if it doesn't exist
        cursor.execute("SELECT 1 FROM pg_database WHERE datname = 'cafe_fausse'")
        exists = cursor.fetchone()
        if not exists:
            cursor.execute("CREATE DATABASE cafe_fausse")
            print("Database 'cafe_fausse' created successfully")
        
        cursor.close()
        conn.close()
        
    except psycopg2.Error as e:
        print(f"Error creating database: {e}")
    
    # Now connect to the cafe_fausse database and create tables
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Create customers table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS customers (
                customer_id SERIAL PRIMARY KEY,
                customer_name VARCHAR(255),
                email VARCHAR(255) UNIQUE NOT NULL,
                phone_number VARCHAR(20),
                newsletter_signup BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Create reservations table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS reservations (
                reservation_id SERIAL PRIMARY KEY,
                customer_id INTEGER REFERENCES customers(customer_id),
                time_slot TIMESTAMP NOT NULL,
                table_number INTEGER NOT NULL,
                guests INTEGER DEFAULT 2,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT unique_table_time UNIQUE (table_number, time_slot)
            )
        """)
        
        # Create index for faster lookups
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_reservations_time_slot 
            ON reservations(time_slot)
        """)
        
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_reservations_table 
            ON reservations(table_number, time_slot)
        """)
        
        conn.commit()
        cursor.close()
        conn.close()
        
        print("Database tables created successfully")
        
    except psycopg2.Error as e:
        print(f"Error creating tables: {e}")
        raise

def drop_tables():
    # Drop all tables 
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("DROP TABLE IF EXISTS reservations CASCADE")
        cursor.execute("DROP TABLE IF EXISTS customers CASCADE")
        
        conn.commit()
        cursor.close()
        conn.close()
        
        print("All tables dropped successfully")
        
    except psycopg2.Error as e:
        print(f"Error dropping tables: {e}")
        raise

if __name__ == '__main__':
    # Initialise database when run directly
    init_db()