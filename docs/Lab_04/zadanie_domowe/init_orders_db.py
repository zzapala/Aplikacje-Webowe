from app_orders import app, db, Order

with app.app_context():
    # Utwórz wszystkie tabele
    db.create_all()
    
    # Dodaj przykładowe zamówienia
    orders = [
        Order(user_id=1, book_id=1, quantity=2),
        Order(user_id=1, book_id=2, quantity=1),
        Order(user_id=2, book_id=1, quantity=1)
    ]
    
    for order in orders:
        db.session.add(order)
    
    db.session.commit()
    print("Baza danych zamówień zainicjalizowana z przykładowymi danymi!")