function validateLogin() {
  var validEmail = document.getElementById("email");
  var password = document.getElementById("password");
  var confirmPassword = document.getElementById("confirm-password");
  var emailError = document.getElementById("errorMessage1");
  var passwordError = document.getElementById("errorMessage2");
  var passwordErrorConfirm = document.getElementById("errorMessage3");

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(validEmail.value)) {
    emailError.innerHTML = "Invalid email address";
    return false;
  } else {
    emailError.innerHTML = "";
  }

  var passwordRegex = /[a-zA-Z0-9]{8,}$/;
  if (!passwordRegex.test(password.value)) {
    passwordError.innerHTML =
      "Invalid password. Password must contain at least 8 characters, including at least one number, one lowercase letter, and one uppercase letter.";
    return false;
  } else {
    passwordError.innerHTML = " ";
  }

  if (confirmPassword.value !== password.value) {
    passwordErrorConfirm.innerHTML = "Passwords don't match";
    return false;
  } else {
    passwordErrorConfirm.innerHTML = "";
  }

  return true;
}

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const userType = document.getElementById("userType").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ username, email, password, userType });
  localStorage.setItem("users", JSON.stringify(users));

  const successMessageDiv = document.getElementById("successMessage");

  successMessageDiv.innerHTML = "Sign up successful. Redirecting to login...";

  // Use setTimeout to delay redirection, allowing the user to read the message
  setTimeout(() => {
    window.location.href = "login.html";
  }, 3000); // Redirect after 3 seconds
});
