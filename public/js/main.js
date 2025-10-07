document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");
  const CART_ID = "ID_DEL_CARRITO_AQUI"; // reemplazá con el ID real de tu carrito

  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productId = btn.dataset.id;
      try {
        const res = await fetch(`/api/carts/${CART_ID}/products/${productId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: 1 }),
        });
        const data = await res.json();
        alert("Producto agregado al carrito!");
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    });
  });
});
