function generatePassword(minLen, maxLen, includeUppercase, includeSymbols) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let characters = lowercase + numbers;
    if (includeUppercase) {
        characters += uppercase;
    }
    if (includeSymbols) {
        characters += symbols;
    }

    const passwordLength = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    let password = '';

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    return password;
}





const generateButton = document.getElementById("generate-button");
const userMaxLen = document.getElementById("max-len");
const userMinLen = document.getElementById("min-len");
let includeSymbols = true;
let includeUppercase = true;

generateButton.addEventListener("click", () => {
  minLen = parseInt(userMinLen.value);
  maxLen = parseInt(userMaxLen.value);
  includeSymbols = document.getElementById("include-symbols").checked;
  includeUppercase = document.getElementById("include-uppercase").checked;

  if (minLen > maxLen) {
    alert("Min length cannot be greater than max length.");
    return;
  }
  if (minLen <= 0) {
    alert("Length must be greater than 0.");
    return;
  }

  console.log("Min Length:", minLen);
  console.log("Max Length:", maxLen);
  const password = generatePassword(
    minLen,
    maxLen,
    includeUppercase,
    includeSymbols
  );
  console.log("Generated Password:", password);
  document.getElementById('result').textContent = password;
});