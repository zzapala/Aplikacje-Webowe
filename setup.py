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
<main class="main-container">
<h1>Welcome to My Website</h1>
</main>
<script src="index.js"></script>
</body>
</html>
"""

f = open('index.html', 'w')
f.write(html_template)
f.close()

css_template = """
html {
  background-color: #DDBEAA;
  height: 100vh;
}
body {
  height: 100vh;
  margin: 0;
}
.main-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
