// Restaurant WhatsApp Number (CHANGE THIS!)
const RESTAURANT_PHONE = "201272442140";

const menuData = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    description:
      "Juicy beef patty, mature cheddar, crisp lettuce, tomato, and our signature special sauce.",
    price: 12.99,
    category: "burgers",
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Truffle Mushroom Burger",
    description:
      "Beef patty, wild mushrooms, truffle aioli, swiss cheese, on a brioche bun.",
    price: 15.5,
    category: "burgers",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Margherita Pizza",
    description:
      "Fresh mozzarella, San Marzano tomatoes, fresh basil, and extra virgin olive oil.",
    price: 18.99,
    category: "pizza",
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Pepperoni Feast",
    description:
      "Loaded with crispy pepperoni, rich mozzarella, and our signature slow-cooked tomato sauce.",
    price: 21.99,
    category: "pizza",
    badge: "",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Spicy BBQ Chicken Pizza",
    description:
      "Grilled chicken, red onions, cilantro, mozzarella, and a tangy BBQ sauce base.",
    price: 22.5,
    category: "pizza",
    badge: "Hot",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    name: "Artisanal Craft Cola",
    description:
      "Small-batch craft cola made with natural cane sugar and botanicals.",
    price: 3.99,
    category: "drinks",
    badge: "",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "Fresh Mint Lemonade",
    description:
      "Freshly squeezed lemons with a refreshing hint of crushed mint.",
    price: 4.99,
    category: "drinks",
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 9,
    name: "Decadent Lava Cake",
    description:
      "Warm, rich chocolate cake with a molten center, served with vanilla bean ice cream.",
    price: 8.99,
    category: "desserts",
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 10,
    name: "Classic Tiramisu",
    description:
      "Espresso-soaked ladyfingers, creamy mascarpone, dusted with premium cocoa.",
    price: 9.5,
    category: "desserts",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
];
// Auto-hide splash after 5 seconds

const menuGrid = document.getElementById("menuGrid");
const categoryBtns = document.querySelectorAll(".category-btn");
const viewMenuBtn = document.getElementById("viewMenuBtn");
const menuContainer = document.querySelector(".menu-container");

// Cart Elements
const cartIconBtn = document.getElementById("cartIconBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsContainer = document.getElementById("cartItems");
const cartCountEl = document.getElementById("cartCount");
const cartTotalValueEl = document.getElementById("cartTotalValue");
const checkoutBtn = document.getElementById("checkoutBtn");
const overlay = document.getElementById("overlay");

// Modal Elements
const checkoutModal = document.getElementById("checkoutModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const checkoutForm = document.getElementById("checkoutForm");

// Image Modal Elements
const imageModal = document.getElementById("imageModal");
const imageModalContent = document.getElementById("imageModalContent");
const closeImage = document.getElementById("closeImage");

// Cart State
let cart = [];

// Render Menu
function renderMenu(category = "all") {
  menuGrid.innerHTML = "";
  const filteredMenu =
    category === "all"
      ? menuData
      : menuData.filter((item) => item.category === category);

  filteredMenu.forEach((item) => {
    const card = document.createElement("div");
    card.className = "menu-card";

    let badgeHtml = "";
    if (item.badge) {
      const badgeClass =
        item.badge.toLowerCase() === "new"
          ? "badge-new"
          : item.badge.toLowerCase() === "hot"
          ? "badge-hot"
          : "badge-popular";
      badgeHtml = `<span class="badge ${badgeClass}">${item.badge}</span>`;
    }

    card.innerHTML = `
${badgeHtml}
<img src="${item.image}" alt="${
      item.name
    }" class="menu-image" onclick="openImageModal('${item.image}')" />
<div class="menu-info">
<h3 class="menu-name">${item.name}</h3>
<p class="menu-description">${item.description}</p>
<div class="menu-price">$${item.price.toFixed(2)}</div>
<button class="add-to-cart-btn" onclick="addToCart(${item.id})">
<i class="fa-solid fa-cart-plus"></i> Add to Order
</button>
</div>
`;
    menuGrid.appendChild(card);
  });
}

// Image Modal Functions
function openImageModal(imageSrc) {
  imageModalContent.src = imageSrc;
  imageModal.classList.add("active");
}

function closeImageModal() {
  imageModal.classList.remove("active");
}

// Cart Functions
function addToCart(id) {
  const item = menuData.find((p) => p.id === id);
  const existingItem = cart.find((c) => c.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  updateCartUI();
  cartSidebar.classList.add("active");
  overlay.classList.add("active");
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCartUI();
}

function updateQuantity(id, change) {
  const item = cart.find((c) => c.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      updateCartUI();
    }
  }
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalCount;

  cartItemsContainer.innerHTML = "";
  let totalCost = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart-msg">Your cart is empty</p>';
  } else {
    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      totalCost += itemTotal;

      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
<div class="cart-item-header">
<div class="cart-item-info">
<h4>${item.name}</h4>
<p>$${item.price.toFixed(2)} each</p>
</div>
<button class="remove-item" onclick="removeFromCart(${item.id})">
<i class="fa-solid fa-trash"></i>
</button>
</div>
<div class="cart-item-controls">
<div class="quantity-controls">
<button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
<span class="qty-value">${item.quantity}</span>
<button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
</div>
<span style="font-weight: bold; color: var(--accent);">$${itemTotal.toFixed(
        2
      )}</span>
</div>
`;
      cartItemsContainer.appendChild(itemEl);
    });
  }

  cartTotalValueEl.textContent = `$${totalCost.toFixed(2)}`;
}

// Sidebar Toggle
function toggleCart(open) {
  if (open) {
    cartSidebar.classList.add("active");
    overlay.classList.add("active");
  } else {
    cartSidebar.classList.remove("active");
    overlay.classList.remove("active");
    checkoutModal.classList.remove("active");
  }
}

cartIconBtn.addEventListener("click", () => toggleCart(true));
closeCartBtn.addEventListener("click", () => toggleCart(false));
overlay.addEventListener("click", () => {
  toggleCart(false);
  closeImageModal();
});

// Image Modal Events
closeImage.addEventListener("click", closeImageModal);
imageModal.addEventListener("click", (e) => {
  if (e.target === imageModal) closeImageModal();
});

// Checkout Modal
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  cartSidebar.classList.remove("active");
  checkoutModal.classList.add("active");
  overlay.classList.add("active");
});

closeModalBtn.addEventListener("click", () => {
  checkoutModal.classList.remove("active");
  overlay.classList.remove("active");
  cartSidebar.classList.add("active");
});

// WhatsApp Order
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("customerName").value;
  const phone = document.getElementById("customerPhone").value;
  const address = document.getElementById("customerAddress").value;

  let message = `*New Order from Website* 🍽️\n\n`;
  message += `*Customer:* ${name}\n`;
  message += `*Phone:* ${phone}\n`;
  message += `*Address:* ${address}\n\n`;
  message += `*Order Details:*\n`;

  let total = 0;
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `- ${item.quantity}x ${item.name} ($${itemTotal.toFixed(2)})\n`;
  });

  message += `\n*Total Price: $${total.toFixed(2)}*`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${RESTAURANT_PHONE}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");

  cart = [];
  updateCartUI();
  checkoutModal.classList.remove("active");
  overlay.classList.remove("active");
  checkoutForm.reset();
});

// Category Filtering
categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderMenu(btn.dataset.category);
  });
});

// View Menu Button
// Smooth Scroll + Hide Splash for CTA
// Smooth Scroll for CTA
if (viewMenuBtn && menuContainer) {
  viewMenuBtn.addEventListener("click", () => {
    const splashScreen = document.getElementById("splashScreen");

    // إخفاء الـ splash screen
    splashScreen.classList.add("hidden");

    // إظهار الـ menu
    menuContainer.classList.add("visible");

    // Scroll للـ menu
    setTimeout(() => {
      menuContainer.scrollIntoView({ behavior: "smooth" });
    }, 100);
  });
}

// إخفاء الـ splash screen أوتوماتيك بعد 5 ثواني (اختياري)
setTimeout(() => {
  const splashScreen = document.getElementById("splashScreen");
  if (splashScreen && !splashScreen.classList.contains("hidden")) {
    splashScreen.classList.add("hidden");
    menuContainer.classList.add("visible");
  }
}, 5000);

// Initialize
renderMenu();
