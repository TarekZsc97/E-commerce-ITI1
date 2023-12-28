document.addEventListener("DOMContentLoaded", function () {
  // Existing code to read and render products
  const products = JSON.parse(localStorage.getItem("products")) || [];
  console.log(products);
  renderProductTable(products);

  // New code to read and display order data
  const orderData =
    JSON.parse(localStorage.getItem("dashboardOrderData")) || [];
  console.log(orderData);
  displayOrderData(orderData);
});

function displayOrderData(orderData) {
  // Assuming you have an element with id 'orderTableBody' in your HTML
  const orderTableBody = document.getElementById("orderTableBody");
  orderTableBody.innerHTML = "";

  // Create a new row for the order data
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>${orderData.name}</td>
        <td>${orderData.email}</td>
        <td>${orderData.address}</td>
        <td>${orderData.paymentMethod}</td>
        <button onclick="confirmOrder('${orderData.email}')" class="btn confirm">Confirm</button>
        <button onclick="rejectOrder('${orderData.email}')" class="btn reject">Reject</button>
    `;
  orderTableBody.appendChild(row);
}
function confirmOrder(orderEmail) {
  // Logic to confirm the order
  console.log("Order confirmed for:", orderEmail);
  // You might want to remove the order from localStorage or update its status
}

function rejectOrder(orderEmail) {
  // Logic to reject the order
  console.log("Order rejected for:", orderEmail);
  // Similar to confirm, handle the rejection
}

function renderProductTable(products) {
  const productTableBody = document.getElementById("productTableBody");
  productTableBody.innerHTML = "";
  for (const product of products) {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.title}</td>
          <td>${product.price}</td>
          <td><img style="width:25%; margin: auto; display: block;" src="${product.image}"></td>
          <td class="actions">
              <button onclick="updateProduct('${product.id}')" class="btn update">Update</button>
              <button onclick="deleteProduct('${product.id}')" class="btn delete">Delete</button>
          </td>
      `;
    productTableBody.appendChild(row);
  }
}

function deleteProduct(productId) {
  let products = JSON.parse(localStorage.getItem("products")) || [];

  const index = products.findIndex((product) => product.id === productId);

  if (index !== -1) {
    products.splice(index, 1);

    localStorage.setItem("products", JSON.stringify(products));

    renderProductTable(products);
  }
}

function updateProduct(productId) {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  let productToUpdate = products.find((product) => product.id === productId);

  if (productToUpdate) {
    localStorage.setItem("productToUpdate", JSON.stringify(productToUpdate));

    console.log(
      `Product with ID ${productId} updated. Redirecting to update page.`
    );

    window.location.href = "./update/update.html";
  }
}

function redirectToCreateProduct() {
  window.location.href = "./create/create.html";
}
