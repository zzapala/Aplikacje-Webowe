html_template = """
<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>My Website</title>
<link rel="stylesheet" href="./style.css" />
</head>
<body>
    <main>
    <div class="content"></div>
</main>
<script src="index.js"></script>
</body>
</html>
"""

f = open('index.html', 'w')
f.write(html_template)
f.close()

css_template = """
body {
    background-image: url('cw1_background.jpg');
    background-size: cover;
    background-attachment: fixed;
}

main {
    height: 100vh; 
    display: flex;
    justify-content: center;  /* poziomo */
    align-items: center;      /* pionowo */
  }


.content {
    width: 80%;
    justify-content: center;
    margin: 0 auto;
    background-color: rgba(255, 222, 190, 0.338);
    padding: 20px;
    border-radius: 4px;
    margin: 0px;
    backdrop-filter: blur(10px); /* rozmycie tła */
    font-family: Georgia, 'Times New Roman', Times, serif;
    color: #412f23;
}
"""
f = open('style.css', 'w')
f.write(css_template)
f.close()

js_template = """
setTimeout(() => {
  console.log('Test JS')
}, 4000)
"""
f = open('index.js', 'w')
f.write(js_template)
f.close()
