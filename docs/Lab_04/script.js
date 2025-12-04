let done = 0;
fetch('https://dummyjson.com/todos')
    .then((res) => res.json())
    .then((data) => {
        const T = data.todos;
        T.forEach((element) => {
            if (element.completed) {
                done += 1;

            };
        });
        document.getElementById('result').textContent = done;
    });
