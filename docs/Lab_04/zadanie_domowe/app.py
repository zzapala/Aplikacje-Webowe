from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import jwt
from functools import wraps

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'twoj_tajny_klucz_jwt'  # W produkcji użyj środowiska!

db = SQLAlchemy(app)

# Model książki
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'year': self.year
        }

# Dekorator do weryfikacji JWT
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'error': 'Token jest wymagany'}), 401
        
        try:
            # Usuń "Bearer " z tokenu
            if token.startswith('Bearer '):
                token = token[7:]
            
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token wygasł'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Nieprawidłowy token'}), 401
        
        return f(*args, **kwargs)
    
    return decorated

# Endpoint do logowania (dla testów)
@app.route('/api/auth', methods=['POST'])
def auth():
    data = request.get_json()
    
    # W prawdziwej aplikacji sprawdzalibyśmy dane w bazie użytkowników
    if data and data.get('username') and data.get('password'):
        # Tworzymy token JWT
        token = jwt.encode({
            'user': data['username'],        }, app.config['SECRET_KEY'], algorithm='HS256')
        
        return jsonify({'token': token})
    
    return jsonify({'error': 'Nieprawidłowe dane logowania'}), 401

# Endpointy
@app.route('/api/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([book.to_dict() for book in books])

@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = Book.query.get_or_404(book_id)
    return jsonify(book.to_dict())

@app.route('/api/books', methods=['POST'])
@token_required
def add_book():
    data = request.get_json()
    
    if not data or not all(key in data for key in ['title', 'author', 'year']):
        return jsonify({'error': 'Brak wymaganych pól: title, author, year'}), 400
    
    new_book = Book(
        title=data['title'],
        author=data['author'],
        year=data['year']
    )
    
    db.session.add(new_book)
    db.session.commit()
    
    return jsonify({'id': new_book.id}), 201

@app.route('/api/books/<int:book_id>', methods=['DELETE'])
@token_required
def delete_book(book_id):
    book = Book.query.get_or_404(book_id)
    db.session.delete(book)
    db.session.commit()
    return '', 204

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=3001)

    