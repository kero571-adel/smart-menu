// filepath: c:\Users\afc\Desktop\demo\menu\script.js
const menuData = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    description:
      "Juicy beef patty, mature cheddar, crisp lettuce, tomato, and our signature special sauce.",
    price: "$12.99",
    category: "burgers",
    badge: "Popular",
  },
  {
    id: 2,
    name: "Double Bacon Smash",
    description:
      "Two smashed patties, crispy smoked bacon, american cheese, and caramelized onions.",
    price: "$16.99",
    category: "burgers",
    badge: "Hot",
  },
  {
    id: 3,
    name: "Truffle Mushroom Burger",
    description:
      "Beef patty, wild mushrooms, truffle aioli, swiss cheese, on a brioche bun.",
    price: "$15.50",
    category: "burgers",
    badge: "New",
  },
  {
    id: 4,
    name: "Margherita Pizza",
    description:
      "Fresh mozzarella, San Marzano tomatoes, fresh basil, and extra virgin olive oil.",
    price: "$18.99",
    category: "pizza",
    badge: "Popular",
  },
  {
    id: 5,
    name: "Pepperoni Feast",
    description:
      "Loaded with crispy pepperoni, rich mozzarella, and our signature slow-cooked tomato sauce.",
    price: "$21.99",
    category: "pizza",
    badge: "",
  },
  {
    id: 6,
    name: "Spicy BBQ Chicken Pizza",
    description:
      "Grilled chicken, red onions, cilantro, mozzarella, and a tangy BBQ sauce base.",
    price: "$22.50",
    category: "pizza",
    badge: "Hot",
  },
  {
    id: 7,
    name: "Artisanal Craft Cola",
    description:
      "Small-batch craft cola made with natural cane sugar and botanicals.",
    price: "$3.99",
    category: "drinks",
    badge: "",
  },
  {
    id: 8,
    name: "Fresh Mint Lemonade",
    description:
      "Freshly squeezed lemons with a refreshing hint of crushed mint.",
    price: "$4.99",
    category: "drinks",
    badge: "Popular",
  },
  {
    id: 9,
    name: "Decadent Lava Cake",
    description:
      "Warm, rich chocolate cake with a molten center, served with vanilla bean ice cream.",
    price: "$8.99",
    category: "desserts",
    badge: "Popular",
  },
  {
    id: 10,
    name: "Classic Tiramisu",
    description:
      "Espresso-soaked ladyfingers, creamy mascarpone, dusted with premium cocoa.",
    price: "$9.50",
    category: "desserts",
    badge: "New",
  },
];

const menuGrid = document.getElementById("menuGrid");
const categoryBtns = document.querySelectorAll(".category-btn");
const viewMenuBtn = document.getElementById("viewMenuBtn");
const menuContainer = document.querySelector(".menu-container");

// Function to render menu items
function renderMenu(category = "all") {
  // Clear grid
  menuGrid.innerHTML = "";

  // Filter data
  const filteredMenu =
    category === "all"
      ? menuData
      : menuData.filter((item) => item.category === category);

  // Render cards
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
            <div class="menu-info">
                <h3 class="menu-name">${item.name}</h3>
                <p class="menu-description">${item.description}</p>
                <div class="menu-price">${item.price}</div>
            </div>
        `;

    menuGrid.appendChild(card);
  });
}

// Initialize Menu
renderMenu();

// Category Filtering Logic
categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all
    categoryBtns.forEach((b) => b.classList.remove("active"));
    // Add to clicked
    btn.classList.add("active");
    // Render
    renderMenu(btn.dataset.category);
  });
});

// Smooth Scroll for CTA
if (viewMenuBtn && menuContainer) {
  viewMenuBtn.addEventListener("click", () => {
    menuContainer.scrollIntoView({ behavior: "smooth" });
  });
}
