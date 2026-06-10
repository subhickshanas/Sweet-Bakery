// Products Module
import { db } from "./firebase.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Sample products data
const sampleProducts = [
    // Cakes
    { id: 1, name: "Chocolate Cake", category: "cakes", price: 45.99, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", description: "Rich chocolate cake with layers", ingredients: "Flour, Cocoa, Eggs, Butter, Sugar" },
    { id: 2, name: "Vanilla Cake", category: "cakes", price: 39.99, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", description: "Classic vanilla sponge cake", ingredients: "Flour, Vanilla, Eggs, Butter, Sugar" },
    { id: 3, name: "Strawberry Cake", category: "cakes", price: 49.99, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", description: "Fresh strawberry layer cake", ingredients: "Flour, Fresh Strawberries, Eggs, Butter, Sugar" },
    { id: 4, name: "Carrot Cake", category: "cakes", price: 42.99, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", description: "Moist carrot cake with cream cheese frosting", ingredients: "Carrots, Flour, Eggs, Butter, Cream Cheese" },
    { id: 5, name: "Red Velvet Cake", category: "cakes", price: 48.99, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", description: "Elegant red velvet with white frosting", ingredients: "Flour, Cocoa, Red Food Coloring, Eggs, Butter" },
    { id: 6, name: "Cheesecake", category: "cakes", price: 52.99, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", description: "Creamy New York style cheesecake", ingredients: "Cream Cheese, Eggs, Sugar, Graham Cracker Crust" },
    
    // Cupcakes
    { id: 7, name: "Chocolate Cupcakes", category: "cupcakes", price: 18.99, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", description: "Set of 6 chocolate cupcakes", ingredients: "Flour, Cocoa, Eggs, Butter, Sugar" },
    { id: 8, name: "Vanilla Cupcakes", category: "cupcakes", price: 16.99, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", description: "Set of 6 vanilla cupcakes", ingredients: "Flour, Vanilla, Eggs, Butter, Sugar" },
    { id: 9, name: "Red Velvet Cupcakes", category: "cupcakes", price: 19.99, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", description: "Set of 6 red velvet cupcakes", ingredients: "Flour, Cocoa, Red Food Coloring, Eggs, Butter" },
    { id: 10, name: "Lemon Cupcakes", category: "cupcakes", price: 17.99, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", description: "Set of 6 lemon cupcakes", ingredients: "Flour, Lemon, Eggs, Butter, Sugar" },
    
    // Pastries
    { id: 11, name: "Croissants", category: "pastries", price: 12.99, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400", description: "Pack of 6 butter croissants", ingredients: "Flour, Butter, Yeast, Salt" },
    { id: 12, name: "Danish Pastries", category: "pastries", price: 14.99, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400", description: "Assorted Danish pastries", ingredients: "Flour, Butter, Fruit, Sugar" },
    { id: 13, name: "Eclairs", category: "pastries", price: 16.99, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400", description: "Pack of 6 chocolate eclairs", ingredients: "Flour, Eggs, Butter, Chocolate" },
    
    // Cookies
    { id: 14, name: "Chocolate Chip Cookies", category: "cookies", price: 9.99, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400", description: "Box of 12 classic cookies", ingredients: "Flour, Chocolate Chips, Butter, Sugar" },
    { id: 15, name: "Oatmeal Cookies", category: "cookies", price: 8.99, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400", description: "Box of 12 oatmeal cookies", ingredients: "Oats, Flour, Butter, Sugar" },
    { id: 16, name: "Sugar Cookies", category: "cookies", price: 8.99, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400", description: "Box of 12 decorated sugar cookies", ingredients: "Flour, Sugar, Butter, Eggs" },
    
    // Bread
    { id: 17, name: "Sourdough Bread", category: "bread", price: 6.99, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400", description: "Fresh artisan sourdough loaf", ingredients: "Flour, Water, Salt, Sourdough Starter" },
    { id: 18, name: "Whole Wheat Bread", category: "bread", price: 5.99, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400", description: "Nutritious whole wheat loaf", ingredients: "Whole Wheat Flour, Water, Salt, Yeast" },
    { id: 19, name: "French Baguette", category: "bread", price: 7.99, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400", description: "Crispy French baguette", ingredients: "Flour, Water, Salt, Yeast" },
    
    // Donuts
    { id: 20, name: "Glazed Donuts", category: "donuts", price: 10.99, image: "https://images.unsplash.com/photo-1585518419759-63e76c65f4ba?w=400", description: "Box of 6 glazed donuts", ingredients: "Flour, Eggs, Sugar, Glaze" },
    { id: 21, name: "Chocolate Donuts", category: "donuts", price: 11.99, image: "https://images.unsplash.com/photo-1585518419759-63e76c65f4ba?w=400", description: "Box of 6 chocolate donuts", ingredients: "Flour, Cocoa, Eggs, Sugar, Chocolate Glaze" },
    { id: 22, name: "Filled Donuts", category: "donuts", price: 12.99, image: "https://images.unsplash.com/photo-1585518419759-63e76c65f4ba?w=400", description: "Box of 6 assorted filled donuts", ingredients: "Flour, Eggs, Sugar, Filling" },
];

// Load products
export async function loadProducts(category = null) {
    let products = sampleProducts;
    
    if (category) {
        products = products.filter(p => p.category === category);
    }
    
    return products;
}

// Get single product
export function getProduct(id) {
    return sampleProducts.find(p => p.id === id);
}

// Display featured products
export async function displayFeaturedProducts() {
    const container = document.getElementById('featuredProductsGrid');
    if (!container) return;

    const products = await loadProducts();
    const featured = products.slice(0, 8);

    container.innerHTML = featured.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="heart-btn" data-product-id="${product.id}" onclick="toggleWishlist(${product.id})">♡</button>
                    <a href="product-details.html?id=${product.id}" class="btn-small">View Details</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Display all products
export async function displayAllProducts(category = null, sort = null) {
    const container = document.getElementById('productsGrid');
    if (!container) return;

    let products = await loadProducts(category);

    // Sort products
    if (sort === 'price-low') {
        products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
        products.sort((a, b) => b.price - a.price);
    } else if (sort === 'name') {
        products.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (products.length === 0) {
        container.innerHTML = '<p>No products found</p>';
        return;
    }

    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="heart-btn" data-product-id="${product.id}" onclick="toggleWishlist(${product.id})">♡</button>
                    <a href="product-details.html?id=${product.id}" class="btn-small">View</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Search products
export async function searchProducts(query) {
    const products = await loadProducts();
    return products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    );
}
