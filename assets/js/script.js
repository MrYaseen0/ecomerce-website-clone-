document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('ycoms_cart')) || [];

    // Update the cart badge on page load
    updateCartBadge();

    // Setup Add to Cart buttons
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent jump if it's an anchor

            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));

            addToCart(productId, productName, productPrice);

            // Show toast notification
            showToast();
        });
    });

    function addToCart(id, name, price) {
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: id,
                name: name,
                price: price,
                quantity: 1
            });
        }

        // Save to localStorage
        localStorage.setItem('ycoms_cart', JSON.stringify(cart));

        // Update UI
        updateCartBadge();
    }

    function updateCartBadge() {
        const badgeElements = document.querySelectorAll('#cart-badge');

        // Calculate total quantity
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

        badgeElements.forEach(el => {
            el.textContent = totalItems;
        });
    }

    function showToast() {
        const toastEl = document.getElementById('cartToast');
        if (toastEl) {
            const toast = new bootstrap.Toast(toastEl, {
                delay: 3000
            });
            toast.show();
        }
    }
});
