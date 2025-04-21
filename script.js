function handleClick() {
  const name = document.getElementById('nameInput').value;
  const accepted = document.getElementById('acceptTerms').checked;
  alert(`Name: ${name}, Accepted: ${accepted}`);
}

document.getElementById('testForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('emailInput').value;
  const dropdown = document.getElementById('dropdown').value;
  if (!email || !dropdown) {
    document.getElementById('formMessage').innerText = 'Please fill all fields.';
  } else {
    document.getElementById('formMessage').innerText = 'Form submitted successfully!';
  }
});
