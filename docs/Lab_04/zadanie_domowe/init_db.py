from app import app, db, Book

with app.app_context():
    # Utwórz wszystkie tabele
    db.create_all()
    
    # Dodaj przykładowe książki
    books = [
        Book(title="Hobbit", author="J.R.R. Tolkien", year=1937),
        Book(title="Władca Pierścieni", author="J.R.R. Tolkien", year=1954),
        Book(title="Harry Potter i Kamień Filozoficzny", author="J.K. Rowling", year=1997)
    ]
    
    for book in books:
        db.session.add(book)
    
    db.session.commit()
    print("Baza danych zainicjalizowana z przykładowymi książkami!")