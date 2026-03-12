/* BRIGHT LABEL: NEW DAWN - MAIN.JS (Index) */
import { db } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');

    // Only run the fetch if we are on a page that has the product grid
    if (!productGrid) return;

    // --- 1. FETCH FEATURED PRODUCTS ---
    async function getFeaturedProducts() {
        // Show a simple loading state
        productGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Loading New Arrivals...</p>';

        const { data, error } = await db
            .from('products')
            .select('*')
            .limit(6) // Only show the 6 most recent items on the homepage
            .order('created_at', { ascending: false });

        if (error) {
            console.error('New Dawn Fetch Error:', error.message);
            productGrid.innerHTML = '<p>Something went wrong. Please check your connection.</p>';
            return;
        }

        renderProducts(data);
    }

    // --- 2. RENDER TO HTML ---
    function renderProducts(items) {
        productGrid.innerHTML = ''; // Clear the loading text

        if (items.length === 0) {
            productGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Check back soon for our next drop.</p>';
            return;
        }

        items.forEach(item => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            // Note: We use the classes from our CSS but keep the HTML structure clean
            productCard.innerHTML = `
                <div class="product-img-box" style="aspect-ratio: 3/4; overflow: hidden; background: #f4f4f4; margin-bottom: 1rem;">
                    <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                </div>
                <div class="product-info">
                    <h4 style="font-family: 'Playfair Display', serif; font-size: 1.1rem; margin-bottom: 0.3rem;">${item.name}</h4>
                    <p style="color: #666; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 0.5rem;">${item.category}</p>
                    <p style="font-weight: 600; color: #b08d57;">₦${item.price.toLocaleString()}</p>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    }

    getFeaturedProducts();
});
