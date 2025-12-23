# 🛠️ Toubleshooting Logs

## Issues & Solutions

#### Issue: React app won't start - "options.allowedHosts[0] should be a non-empty string"

**Solution:**
- Remove `"proxy"` line from `package.json`
- Ensure API calls use full URL: `http://localhost:5000/api/...`

#### Issue: Flask server shows "Database connection error"

**Solutions:**
1. Verify PostgreSQL is running (check services)
2. Check password in `database.py` is correct
3. Ensure PostgreSQL is listening on port 5432:
   ```bash
   netstat -an | grep 5432
   ```

#### Issue: "psycopg2-binary" installation fails on Windows

**Solution:**
```bash
# Install Microsoft C++ Build Tools
# Or try:
pip uninstall psycopg2-binary
pip install psycopg2-binary --only-binary :all:
```

#### Issue: Newsletter signup returns 404 error

**Solution:**
1. Verify Flask server is running
2. Check browser console for actual URL being called
3. Ensure CORS is configured in `app.py`:
   ```python
   CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
   ```

#### Issue: Reservations not appearing in database

**Solution:**
1. Check Flask terminal for errors
2. Verify table exists: `SELECT * FROM reservations;`
3. Check unique constraint isn't blocking: same table + time slot

#### Issue: Images not loading on Gallery page

**Solution:**
- Ensure images are imported correctly:
  ```javascript
  import imageName from '../assets/imgs/image.jpg';
  ```
- Not as string: `url: imageName` (not `url: '../assets/imgs/image.jpg'`)

#### Issue: Mobile view not responsive

**Solution:**
1. Check viewport meta tag in `public/index.html`:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   ```
2. Test with Chrome DevTools device toolbar (F12 → Ctrl+Shift+M)

## Port Already in Use

**Frontend (Port 3000):**
```bash
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:3000 | xargs kill -9
```

**Backend (Port 5000):**
```bash
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5000 | xargs kill -9
```