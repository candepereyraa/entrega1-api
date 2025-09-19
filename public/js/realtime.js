const socket = io();

const productList = document.getElementById("product-list");
const addForm = document.getElementById("product-form");
const deleteForm = document.getElementById("delete-form");

// Renderizar productos en tiempo real
socket.on("updateProducts", (products) => {
  productList.innerHTML = "";
  products.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.id} - ${p.title} - $${p.price}`;
    productList.appendChild(li);
  });
});

// Agregar producto
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(addForm);
  const product = {
    title: formData.get("title"),
    price: formData.get("price")
  };
  socket.emit("newProduct", product);
  addForm.reset();
});

// Eliminar producto
deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = new FormData(deleteForm).get("id");
  socket.emit("deleteProduct", id);
  deleteForm.reset();
});