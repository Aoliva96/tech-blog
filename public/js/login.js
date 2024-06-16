// Login form handler
const handleLogin = async (event) => {
  event.preventDefault();

  // Collect form values
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      // Redirect to dashboard if login successful
      document.location.replace("/dashboard");
    } else {
      console.error(response.statusText);
      // Helper function to display error message
      toggleMessage(
        "login-error",
        "Incorrect email or password, please try again."
      );
    }
  }
};

// Signup form handler
const handleSignup = async (event) => {
  event.preventDefault();

  // Collect form values
  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // Redirect to dashboard if signup successful
      document.location.replace("/dashboard");
    } else {
      console.error(response.statusText);
      // Helper function to display error message
      toggleMessage(
        "signup-error",
        "There was an issue creating your account, please try again."
      );
    }
  }
};

// Close button handler
const handleClose = (event) => {
  event.preventDefault();
  toggleMessage(event.target.parentNode.id);
};

// Event listeners
document.querySelector(".login-form").addEventListener("submit", handleLogin);
document.querySelector(".signup-form").addEventListener("submit", handleSignup);
document.querySelectorAll(".close-btn").forEach((element) => {
  element.addEventListener("click", handleClose);
});
