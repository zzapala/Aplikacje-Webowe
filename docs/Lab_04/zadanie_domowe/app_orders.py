from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import requests
from functools import wraps
import jwt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///orders.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'twoj_tajny_klucz_jwt'   # MUSI BYĆ TAKI SAM JAK W BOOKS API


db = SQLAlchemy(app)

# Model zamówienia
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    book_id = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'book_id': self.book_id,
            'quantity': self.quantity
        }

# Funkcja do sprawdzania czy książka istnieje
def check_book_exists(book_id):
    try:
        response = requests.get(f'http://localhost:3001/api/books/{book_id}')
        return response.status_code == 200
    except requests.exceptions.RequestException:
        return False

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


# Endpointy
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


@app.route('/api/orders/<int:user_id>', methods=['GET'])
def get_user_orders(user_id):
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([order.to_dict() for order in orders])

@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    
    # Walidacja
    if not data or not all(key in data for key in ['user_id', 'book_id', 'quantity']):
        return jsonify({'error': 'Brak wymaganych pól: user_id, book_id, quantity'}), 400
    
    # Sprawdź czy książka istnieje
    if not check_book_exists(data['book_id']):
        return jsonify({'error': 'Książka o podanym book_id nie istnieje'}), 400
    
    new_order = Order(
        user_id=data['user_id'],
        book_id=data['book_id'],
        quantity=data['quantity']
    )
    
    db.session.add(new_order)
    db.session.commit()
    
    return jsonify({'id': new_order.id}), 201

@app.route('/api/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    order = Order.query.get_or_404(order_id)
    db.session.delete(order)
    db.session.commit()
    return '', 204

@app.route('/api/orders/<int:order_id>', methods=['PATCH'])
def update_order(order_id):
    order = Order.query.get_or_404(order_id)
    data = request.get_json()
    
    if 'quantity' in data:
        order.quantity = data['quantity']
    
    db.session.commit()
    return jsonify(order.to_dict())

if __name__ == '__main__':
    # Automatyczne tworzenie bazy przy uruchomieniu
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=3002)