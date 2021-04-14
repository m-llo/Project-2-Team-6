const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(email && password);
      if (response.ok) {
        document.location.replace('/dashboard');
      } 
    }
    else {
      alert('Please enter an email address and password');
    }
  };
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      console.log('this is the if statment');
      const response = await fetch('/api/user/', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // if (response.ok) {
      //   alert('Account successfully created. Please log in to continue')
      //   document.location.replace('/');
      // } 
    }else {
      alert('Please enter a valid username, email address, and password');
    }
  };
  
  
  document
    .querySelector('.login-card')
    .addEventListener('submit', loginFormHandler);

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);