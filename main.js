/* BRIGHT LABEL BOUTIQUE - MAIN SCRIPT */
import { db } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    // Select both possible grids (Index and Shop pages)
    const productGrid = document.getElementById('product-grid');
    const shopGrid = document.getElementById('shop-product-grid');
    const activeGrid = productGrid || shopGrid;

    // If we aren't on a page with a grid, stop the script
    if (!activeGrid) return;

    // --- 1. FETCH PRODUCTS FROM SUPABASE ---
    async function fetchProducts() {
        activeGrid.innerHTML = '<p>Loading latest trends...</p>';

        const { data, error } = await db
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Database Error:', error.message);
            activeGrid.innerHTML = '<p>Something went wrong. Please try again later.</p>';
            return;
        }

        displayProducts(data);
    }

    // --- 2. DISPLAY PRODUCTS IN THE GRID ---
    function displayProducts(products) {
        activeGrid.innerHTML = '';

        if (products.length === 0) {
            activeGrid.innerHTML = '<p>Our collection is currently being updated. Check back soon!</p>';
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card fade-in';

            productCard.innerHTML = `
                <div class="product-image-container" style="height: 300px; overflow: hidden; background: #f4f4f4;">
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="product-details" style="padding: 1rem 0;">
                    <h4 style="font-family: 'Playfair Display', serif; font-size: 1.2rem;">${product.name}</h4>
                    <p style="color: #666; font-size: 0.85rem; text-transform: uppercase; margin: 0.2rem 0;">${product.category}</p>
                    <p style="font-weight: 600; color: #b08d57;">₦${product.price.toLocaleString()}</p>
                    <button class="btn-primary" style="width: 100%; margin-top: 10px;">View Item</button>
                </div>
            `;
            activeGrid.appendChild(productCard);
        });
    }

    // Initial fetch when page loads
    fetchProducts();
});
