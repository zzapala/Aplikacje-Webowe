from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import bcrypt
import jwt
import datetime

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'twoj_super_tajny_klucz_jwt'

db = SQLAlchemy(app)

# ---------------- MODEL ------------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email
        }


# ---------------- REGISTER ------------------
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data or "email" not in data or "password" not in data:
        return jsonify({"error": "email i password są wymagane"}), 400

    email = data["email"]
    password = data["password"]

    # sprawdzenie czy email istnieje
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Użytkownik o tym email już istnieje"}), 409

    # hashowanie hasła bcrypt
    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    new_user = User(email=email, password=hashed_pw)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"id": new_user.id}), 201


# ---------------- LOGIN ------------------
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or "email" not in data or "password" not in data:
        return jsonify({"error": "email i password są wymagane"}), 400

    email = data["email"]
    password = data["password"]

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "Nieprawidłowe dane logowania"}), 401

    # sprawdzamy hasło bcrypt
    if not bcrypt.checkpw(password.encode('utf-8'), user.password):
        return jsonify({"error": "Nieprawidłowe dane logowania"}), 401

    # generujemy token JWT
    token = jwt.encode({
        "user_id": user.id,
        "email": user.email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, app.config["SECRET_KEY"], algorithm="HS256")

    return jsonify({"token": token})


# ---------------- MAIN ------------------
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=3003)
