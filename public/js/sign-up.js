// Function to handle the form submission
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect the values from the form inputs
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    // Make a POST request to the /signup endpoint
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // Redirect the user to the login page after successful sign-up
      document.location.replace('/login');
    } else {
      // Display an error message if sign-up fails
      const errorData = await response.json();
      console.log(errorData);
      alert(errorData.message);
    }
  };
  
  // Attach the signupFormHandler function to the form's submit event
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);