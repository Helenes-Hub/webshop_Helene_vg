
let appliedDiscount = 0;

function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartReview = document.getElementById("cartReview");
    const cartFooter = document.getElementById("cartFooter");
    const cartTotal = document.getElementById("cartTotal");
    const formContainer = document.getElementById("checkoutForm");

    cartReview.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartFooter.style.display = "none";
        formContainer.style.display = "none";
        cartReview.innerHTML = `<p>Your cart is empty. Go back and add some items!</p>`;
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartReview.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" width="80">
                <strong>${item.title}</strong><br>
                Quantity: ${item.quantity}<br>
                Subtotal: ${(item.price * item.quantity).toFixed(2)}€<br>
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    let discountedTotal = total;

    if (appliedDiscount > 0) {
        discountedTotal = total - (total * (appliedDiscount / 100));
        cartTotal.textContent = `Total: ${discountedTotal.toFixed(2)}€ (−${appliedDiscount}%)`;
    } else {
        cartTotal.textContent = `Total: ${total.toFixed(2)}€`;
    }
    cartFooter.style.display = "flex";
}

document.getElementById("clearCart").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the entire cart?")) {
        localStorage.removeItem("cart");
        updateCartUI();
    }
});

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
    updateCartCount();
}


// Gör så rabattkoden funkar
document.getElementById("applyDiscount").addEventListener("click", function () {
    const discountCode = document.getElementById("discountCode").value.trim().toUpperCase();
    const discountError = document.getElementById("discountError");
    discountError.style.display = "none";

    const validCodes = {
        EASTER15: 15
    };

    if (validCodes[discountCode]) {
        appliedDiscount = validCodes[discountCode];
        updateCartUI();
        alert(`🎉 Discount of ${appliedDiscount}% applied!`);
    } else {
        discountError.textContent = "Invalid discount code";
        discountError.style.display = "block";
        appliedDiscount = 0;
        updateCartUI();
    }
});


document.getElementById("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for your purchase!");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
});

document.addEventListener("DOMContentLoaded", () => {
    updateCartUI();
    updateCartCount();
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    const counter = document.getElementById("cartCount");
    if (counter) {
        counter.textContent = count;
    }
}