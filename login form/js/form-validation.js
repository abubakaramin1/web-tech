document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  
  form.addEventListener('submit', function (event) {
    event.preventDefault();  

    let isValid = true;

   
    email.classList.remove('is-invalid', 'is-valid');
    password.classList.remove('is-invalid', 'is-valid');

    if (!email.value || !email.validity.valid) {
      email.classList.add('is-invalid');
      isValid = false;
    } else {
      email.classList.add('is-valid');
    }


    if (!password.value || password.value.length < 6) {
      password.classList.add('is-invalid');
      isValid = false;
    } else {
      password.classList.add('is-valid');
    }


    if (isValid) {
      
      alert('User logged in successfully!');
    } else {
    
      alert('Please fix the errors in the form.');
    }
  });
});
