// Function to handle the form submission
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect the values from the form inputs
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    // Make a POST request to the /login endpoint
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // Redirect the user to the homepage after successful login
      document.location.replace('/');
    } else {
      // Display an error message if login fails
      const errorData = await response.json();
      console.log(errorData);
        alert(errorData.message);
    }
  };
  
  // Attach the loginFormHandler function to the form's submit event
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);