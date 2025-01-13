// Global variables
const productList = document.getElementById('product-list');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fetch products from the API
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data; // Return fetched products
    } catch (error) {
        console.error('Error fetching products:', error);
        return []; // Return an empty array in case of an error
    }
}

// Function to display products
function displayProducts(products) {
    productList.innerHTML = ''; // Clear the existing products
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="product-info">
                <h3>${product.title}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Function to add products to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(p => p.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Function to update the cart count
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchProducts(); // Fetch products from the API
    displayProducts(products); // Display fetched products
    updateCartCount(); // Update cart count
});
