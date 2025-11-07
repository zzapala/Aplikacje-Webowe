fetch('https://dummyjson.com/posts')
    .then((res) => res.json())
    .then((data) => {
        const T = data.posts;
        T.forEach((element) => {
            const post = document.createElement('div');
            post.classList.add('post');

            const title = document.createElement('h2');
            title.classList.add('post-title');
            title.textContent = element.title;
            
            const body = document.createElement('p');
            body.classList.add('post-body');
            body.textContent = element.body;

            post.appendChild(title);
            post.appendChild(body);

            const likes = document.createElement('p');
            likes.classList.add('post-likes');
            likes.textContent = `👍 ${element.reactions.likes}`;
            post.appendChild(likes);

            const likeIncreaseButton = document.createElement('button');
            likeIncreaseButton.classList.add('post-likes-button');
            likeIncreaseButton.textContent = '+';
            likeIncreaseButton.addEventListener('click', () => {
                element.reactions.likes++;
                likes.textContent = `👍 ${element.reactions.likes}`;
            });
            post.appendChild(likeIncreaseButton);

            const likeDecreaseButton = document.createElement('button');
            likeDecreaseButton.classList.add('post-likes-button');
            likeDecreaseButton.textContent = '-';
            likeDecreaseButton.addEventListener('click', () => {
                if (element.reactions.likes > 0) {
                    element.reactions.likes--;
                    likes.textContent = `👍 ${element.reactions.likes}`;
                }
            });
            post.appendChild(likeDecreaseButton);

            const dislikes = document.createElement('p');   
            dislikes.classList.add('post-dislikes');
            dislikes.textContent = `👎 ${element.reactions.dislikes}`;
            post.appendChild(dislikes);

            const dislikeIncreaseButton = document.createElement('button');
            dislikeIncreaseButton.classList.add('post-dislikes-button');
            dislikeIncreaseButton.textContent = '+';
            dislikeIncreaseButton.addEventListener('click', () => {
                element.reactions.dislikes++;
                dislikes.textContent = `👎 ${element.reactions.dislikes}`;
                if (element.reactions.dislikes >= 40){
                    post.classList.add('bad-post');
                };
            });
            
            post.appendChild(dislikeIncreaseButton);

            const dislikeDecreaseButton = document.createElement('button');
            dislikeDecreaseButton.classList.add('post-dislikes-button');
            dislikeDecreaseButton.textContent = '-';
            dislikeDecreaseButton.addEventListener('click', () => {
                if (element.reactions.dislikes > 0) {
                    element.reactions.dislikes--;
                    dislikes.textContent = `👎 ${element.reactions.dislikes}`;
                    if (element.reactions.dislikes < 40){
                        post.classList.remove('bad-post');
                    };
                }
                

            });
            post.appendChild(dislikeDecreaseButton);

            document.body.appendChild(post);
        });
    });
