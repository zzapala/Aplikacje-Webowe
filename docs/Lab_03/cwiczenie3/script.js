fetch('https://dummyjson.com/products')
    .then((res) => res.json())
    .then((data) => {
        const T = data.products.slice(0, 30);
        const table = document.createElement('table');
        table.classList.add('product-table');

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        // tutaj dodaję nagłówki tabeli, iterując po tablicy z nazwami nagłówków
        const headers = ['Numer', 'Nazwa', 'Opis', 'Zdjęcie'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        T.forEach((element) => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = element.id;
            idCell.classList.add('product-id-cell');
            row.appendChild(idCell);

            const titleCell = document.createElement('td');
            titleCell.textContent = element.title;
            row.appendChild(titleCell);

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = element.description;
            row.appendChild(descriptionCell);

            const imageCell = document.createElement('td');
            const img = document.createElement('img');
            img.src = element.images[0];
            img.alt = element.title;
            img.width = 100;
            imageCell.appendChild(img);
            row.appendChild(imageCell);

            tbody.appendChild(row);
        }
        );
        table.appendChild(tbody);
        document.body.appendChild(table);
    }
    );

function filterByName(event) {
    const searchInput = event.target.value.toLowerCase(); // Pobierz wartość z inputa i zamień na małe litery
    const rows = document.querySelectorAll('tbody tr'); // Pobierz wszystkie wiersze tabeli

    rows.forEach(function(row) {
        const titleCell = row.querySelector('td:nth-child(2)'); // Pobierz komórkę z tytułem (druga kolumna)
        if (titleCell && titleCell.textContent.toLowerCase().includes(searchInput)) {
            row.style.display = ''; // Pokaż wiersz, jeśli pasuje do wyszukiwania
        } else {
            row.style.display = 'none'; // Ukryj wiersz, jeśli nie pasuje
        }
    });
}

function filterByCategory(event) {
    const sortOrder = event.target.value;
    const rows = Array.from(document.querySelectorAll('tbody tr'));
    const tbody = document.querySelector('tbody');

    if (sortOrder === 'asc') {
        rows.sort((a, b) => {
            const titleA = a.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const titleB = b.querySelector('td:nth-child(2)').textContent.toLowerCase();
            return titleA.localeCompare(titleB);
        });

    } else if (sortOrder === 'desc') {
        rows.sort((a, b) => {
            const titleA = a.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const titleB = b.querySelector('td:nth-child(2)').textContent.toLowerCase();
            return titleB.localeCompare(titleA);
        });
    } else if (sortOrder === 'all') {
        rows.sort((a, b) => {
            const idA = parseInt(a.querySelector('td:nth-child(1)').textContent);
            const idB = parseInt(b.querySelector('td:nth-child(1)').textContent);
            return idA - idB;
        });
    }
    
    // Usuń wszystkie wiersze z tbody
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
}