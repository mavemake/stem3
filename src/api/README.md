
# Flask Backend for Testimonials

This is a simple Flask backend for managing testimonials.

## Setup

1. Install required packages:
   ```
   pip install -r requirements.txt
   ```

2. Run the development server:
   ```
   python run.py
   ```

3. For production, use a WSGI server like Gunicorn:
   ```
   pip install gunicorn
   gunicorn -w 4 wsgi:app
   ```

## API Endpoints

- `GET /testimonials` - Get all testimonials
- `POST /testimonials` - Add a new testimonial
- `GET /uploads/<filename>` - Get uploaded files
