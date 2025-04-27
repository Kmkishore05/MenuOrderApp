import { menuArray } from './data.js';

const menuContainer = document.getElementById("menu-container");

// Create Order Section
const orderContainer = document.createElement("div");
orderContainer.id = "order-container";
orderContainer.innerHTML = `
    <h3>Your Order</h3>
    <div id="order-items"></div>
    <div id="total-price-container">
        <strong>Total Price: $<span id="total-price">0</span></strong>
    </div>
`;
document.body.appendChild(orderContainer);

// Create Complete Order Button (✅ OUTSIDE the forEach)
const completeOrderBtn = document.createElement("button");
completeOrderBtn.textContent = "Complete Order";
completeOrderBtn.id = "complete-order-btn";
completeOrderBtn.style.display = "none"; // hidden initially
document.body.appendChild(completeOrderBtn);

// Button click action
// completeOrderBtn.addEventListener("click", () => {
//     window.location.href = "order.html"; // or any page you want
// });

// Track current orders
let currentOrder = [];

// Update Order Function
function updateOrder() {
    const orderItems = document.getElementById("order-items");
    const totalPriceEl = document.getElementById("total-price");
    orderItems.innerHTML = "";

    let total = 0;

    currentOrder.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("order-item");
        itemDiv.innerHTML = `
            <span>${item.name}</span>
            <button class="remove-btn" data-index="${index}">remove</button>
            <span>$${item.price}</span>
        `;
        orderItems.appendChild(itemDiv);
        total += item.price;
    });

    totalPriceEl.textContent = total;

    // Show or hide complete order button
    if (currentOrder.length > 0) {
        completeOrderBtn.style.display = "block";
    } else {
        completeOrderBtn.style.display = "none";
    }

    // Setup remove button again
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idx = e.target.getAttribute("data-index");
            currentOrder.splice(idx, 1);
            updateOrder();
        });
    });
}

// Render Menu
menuArray.forEach(item => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");

    menuItem.innerHTML = `
        <div class="menu-left">
            <div class="emoji">${item.emoji}</div>
            <div class="menu-details">
                <h2>${item.name}</h2>
                <p>${item.ingredients.join(", ")}</p>
                <div class="price">$${item.price}</div>
            </div>
        </div>
        <div class="add-btn">+</div>
    `;

    // Add click event to +
    menuItem.querySelector(".add-btn").addEventListener("click", () => {
        currentOrder.push(item);
        updateOrder();
    });

    menuContainer.appendChild(menuItem);
});
completeOrderBtn.addEventListener("click", () => {
    const modal = document.getElementById("payment-modal");
    modal.classList.remove("hidden");
});
const payBtn = document.getElementById("pay-btn");

payBtn.addEventListener("click", () => {
    // You can add validation here if you want
    alert("Payment Successful!");
    
    // Hide the modal
    const modal = document.getElementById("payment-modal");
    modal.classList.add("hidden");

    // Optionally reset order
    currentOrder = [];
    updateOrder();
});
