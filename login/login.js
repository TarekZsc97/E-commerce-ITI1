function validateLogin() {
  var validEmail = document.getElementById("loginEmail");
  var password = document.getElementById("loginPassword");
  var emailError = document.getElementById("errorMessage1");
  var passwordError = document.getElementById("errorMessage2");

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
      "Invalid password. Password must contain at least 8 characters, including numbers and characters";
    return false;
  } else {
    passwordError.innerHTML = "";
  }

  return true;
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validateLogin()) {
    return;
  }

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const errorMessageDiv = document.getElementById("errorMessage");

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    if (user.userType === "admin") {
      window.location.href = "./../homeAdmin/index.html";
    } else {
      window.location.href = "./../homeUser/index.html";
    }
  } else {
    errorMessageDiv.innerHTML = "Invalid credentials or user not found.";
  }
});
