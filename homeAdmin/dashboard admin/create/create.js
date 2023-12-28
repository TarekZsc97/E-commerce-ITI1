document.addEventListener("DOMContentLoaded", function () {
  // Handle the form submission
  const createProductForm = document.getElementById("createProductForm");
  createProductForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get values from form inputs
    const title = document.getElementById("title").value;
    const price = parseFloat(document.getElementById("price").value);
    const image = document.getElementById("image").value;

    // Create a new product object
    const newProduct = {
      sys: {
        id: generateProductId(), // You need to implement a function to generate a unique ID
      },
      fields: {
        title: title,
        price: price,
        image: {
          fields: {
            file: {
              url: image,
            },
          },
        },
      },
    };

    // Retrieve existing products from local storage
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Add the new product to the array
    products.push(newProduct);

    // Save the updated products to local storage
    localStorage.setItem("products", JSON.stringify(products));

    // Redirect back to the dashboard or perform other actions
    window.location.href = "./index.html";
  });
});

function generateProductId() {
  // You need to implement a function to generate a unique ID, for example, using a timestamp or a random string.
  // Ensure the generated ID is unique for each product.
  return "uniqueProductId";
}
