document.addEventListener("DOMContentLoaded", function () {
  redirectToLoginIfNotLoggedIn();
  setUpLogoutButton();
});

function redirectToLoginIfNotLoggedIn() {
  let userData = JSON.parse(localStorage.getItem("currentUser"));
  if (!userData) {
    window.location.href = "./../login/login.html";
    return;
  }

  updateUIWithUserData(userData);
}

function updateUIWithUserData(userData) {
  let userNameElement = document.getElementById("userNamelogout");
  let userTypeElement = document.getElementById("userTypelogout");

  if (userNameElement) {
    userNameElement.textContent = "Welcome Our Admin: " + userData.username;
  }

  if (userTypeElement) {
    userTypeElement.textContent = userData.userType;
  }
}

function setUpLogoutButton() {
  let logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("currentUser");
      window.location.href = "./../login/login.html";
    });
  }
}
