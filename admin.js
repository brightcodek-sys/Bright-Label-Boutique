/* BRIGHT LABEL: NEW DAWN - ADMIN LOGIC */
import { db } from './supabase.js';

const productForm = document.getElementById('productForm');
const statusMsg = document.getElementById('status-msg');
const imageInput = document.getElementById('p-image');
const previewImg = document.getElementById('preview-img');
const previewDiv = document.getElementById('image-preview');

// 1. Show a preview when a local file is picked
imageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            previewDiv.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});

// 2. Handle the Form Submission
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    statusMsg.innerText = "Processing upload...";
    statusMsg.style.color = "black";

    const name = document.getElementById('p-name').value;
    const price = parseFloat(document.getElementById('p-price').value);
    const category = document.getElementById('p-category').value;
    const file = imageInput.files[0];

    if (!file) {
        statusMsg.innerText = "Please select an image.";
        return;
    }

    // Convert the image to a string for Supabase
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = async () => {
        const base64Image = reader.result;

        // 3. Insert into Supabase
        const { data, error } = await db
            .from('products')
            .insert([
                { 
                    name: name, 
                    price: price, 
                    category: category, 
                    image: base64Image 
                }
            ]);

        if (error) {
            statusMsg.style.color = "red";
            statusMsg.innerText = "Error: " + error.message;
            console.error(error);
        } else {
            statusMsg.style.color = "green";
            statusMsg.innerText = "Success! Product added to boutique.";
            productForm.reset();
            previewDiv.style.display = 'none';
        }
    };
});
