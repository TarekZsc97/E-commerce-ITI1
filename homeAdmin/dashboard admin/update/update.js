document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the product to update from local storage
  const productToUpdate =
    JSON.parse(localStorage.getItem("productToUpdate")) || {};

  // Populate the form with product details
  document.getElementById("title").value = productToUpdate.fields.title || "";
  document.getElementById("price").value = productToUpdate.fields.price || "";
  document.getElementById("image").value =
    productToUpdate.fields.image.fields.file.url || "";

  // Handle the form submission
  const updateForm = document.getElementById("updateForm");
  updateForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Update the product details
    productToUpdate.fields.title = document.getElementById("title").value;
    productToUpdate.fields.price = parseFloat(
      document.getElementById("price").value
    );
    productToUpdate.fields.image.fields.file.url =
      document.getElementById("image").value;

    // Retrieve the existing products from local storage
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Find the index of the product to update
    const index = products.findIndex(
      (product) => product.sys.id === productToUpdate.sys.id
    );

    // Update the product in the products array
    if (index !== -1) {
      products[index] = productToUpdate;

      // Save the updated products to local storage
      localStorage.setItem("products", JSON.stringify(products));

      // Redirect to the product list page or perform other actions
      window.location.href = "http://127.0.0.1:5500/dashbordAdmin.htm";
    }
  });
});
