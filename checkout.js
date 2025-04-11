

function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartReview = document.getElementById("cartReview");

    cartReview.innerHTML = "<h3>Your Items</h3>";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartReview.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" width="50">
                <strong>${item.title}</strong> <br>
                Quantity: ${item.quantity} <br>
                Subtotal: ${(item.price * item.quantity).toFixed(2)}€ <br>
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeItem(${index})">Remove</button>
                <hr>
            </div>
        `;
    });

    cartReview.innerHTML += `<div><strong>Total: ${total.toFixed(2)}€</strong></div>`;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

function changeQuantity(index, delta) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// Handle discount code
document.getElementById("applyDiscount").addEventListener("click", () => {
    const discountCode = document.getElementById("discountCode").value.trim();
    const discountError = document.getElementById("discountError");
    discountError.style.display = "none";

    const validCodes = {
        EASTER15: 15
    };

    if (validCodes[discountCode]) {
        alert(`Discount of ${validCodes[discountCode]}% applied!`);
        // Apply discount later during calculation if needed
    } else {
        discountError.textContent = "Invalid discount code";
        discountError.style.display = "block";
    }
});

// Handle order submission
document.getElementById("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for your purchase!");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
});

document.addEventListener("DOMContentLoaded", () => {
    updateCartUI();
});