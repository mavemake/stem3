
from flask import Flask, request, jsonify, send_from_directory
import os
import sqlite3
import time
import json
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = '../uploads/'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}
DATABASE = 'testimonials.db'

# Create uploads directory if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize database
def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        text TEXT NOT NULL,
        image_url TEXT,
        user_id TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    conn.commit()
    conn.close()

init_db()

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/testimonials', methods=['GET', 'POST'])
def testimonials():
    if request.method == 'GET':
        try:
            conn = sqlite3.connect(DATABASE)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM testimonials ORDER BY created_at DESC')
            testimonials = [dict(row) for row in cursor.fetchall()]
            conn.close()
            return jsonify({"success": True, "data": testimonials})
        except Exception as e:
            return jsonify({"success": False, "error": str(e)})
    
    elif request.method == 'POST':
        try:
            name = request.form.get('name')
            text = request.form.get('text')
            user_id = request.form.get('userId')
            
            # Check if user has already submitted a testimonial
            conn = sqlite3.connect(DATABASE)
            cursor = conn.cursor()
            cursor.execute('SELECT id FROM testimonials WHERE user_id = ?', (user_id,))
            existing = cursor.fetchone()
            
            if existing:
                conn.close()
                return jsonify({"success": False, "error": "You have already submitted a testimonial"})
            
            image_url = ""
            if 'image' in request.files:
                file = request.files['image']
                if file and allowed_file(file.filename):
                    filename = secure_filename(time.time().__str__() + "_" + file.filename)
                    file_path = os.path.join(UPLOAD_FOLDER, filename)
                    file.save(file_path)
                    image_url = "uploads/" + filename
            
            cursor.execute(
                'INSERT INTO testimonials (name, text, image_url, user_id) VALUES (?, ?, ?, ?)', 
                (name, text, image_url, user_id)
            )
            testimonial_id = cursor.lastrowid
            conn.commit()
            conn.close()
            
            return jsonify({
                "success": True,
                "message": "Testimonial added successfully",
                "data": {
                    "id": testimonial_id,
                    "name": name,
                    "text": text,
                    "image_url": image_url,
                    "user_id": user_id
                }
            })
        
        except Exception as e:
            return jsonify({"success": False, "error": str(e)})

@app.route('/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory('../uploads', filename)

if __name__ == '__main__':
    app.run(debug=True)
