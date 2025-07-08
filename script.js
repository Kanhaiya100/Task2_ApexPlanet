document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const num = document.getElementById('num').value.trim();
  const pass = document.getElementById('pass').value.trim();

  // Check empty fields
  if (name === '' || email === '' || num === '' || pass === '') {
    alert("Please fill all the fields.");
    return;
  }

  // Name minimum 3 characters
  if (name.length < 3) {
    alert("Name must be at least 3 characters long.");
    return;
  }

  // Email pattern check
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Phone number must be numeric and 10 digits
  if (isNaN(num) || num.length !== 10) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  // Password minimum 6 characters
  if (pass.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  // Password should have uppercase, lowercase, and number
  const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  if (!pass.match(passPattern)) {
    alert("Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.");
    return;
  }

  // All validations passed
  alert("Form submitted successfully!");
  this.submit();
});
