import { ProductActions } from "../flux/Actions";
import { State, store } from "../flux/Store";

class ProductCard extends HTMLElement {
    connectedCallback() {
        store.subscribe((state: State) => {this.handleChange(state)});
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    handleChange(state: State) {
        this.render(state);
    }

    render(state = store.getState()) {
        if (!this.shadowRoot) return;

        const title = this.getAttribute('title') || 'Product Title'; 
        const price = this.getAttribute('price') || 0;
        const description = this.getAttribute('description') || 'Product Description';
        const image = this.getAttribute('image');
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                flex: 1 1 calc(33.333% - 40px);
                max-width: 350px;
                margin: 20px;
                box-sizing: border-box;
            }

            .product-card {
                background: white;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 10px 25px rgba(0, 181, 33, 0.15);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                font-family: 'Poppins', sans-serif;
                position: relative;
            }

            .product-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 15px 30px rgba(32, 225, 6, 0.25);
            }

            .image-container {
                position: relative;
                padding-top: 75%; /* 4:3 Aspect Ratio */
                overflow: hidden;
                background: linear-gradient(135deg, #f0f0ff, #e6e6ff);
            }

            .product-image {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.5s ease;
            }

            .product-card:hover .product-image {
                transform: scale(1.08);
            }

            .product-content {
                padding: 20px;
                position: relative;
            }

            .product-badge {
                position: absolute;
                top: -18px;
                right: 20px;
                background: linear-gradient(135deg,rgb(139, 255, 31),rgb(83, 204, 50));
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                text-transform: uppercase;
                font-size: 0.8em;
                font-weight: bold;
                letter-spacing: 0.5px;
                box-shadow: 0 4px 10px rgba(13, 173, 21, 0.3);
            }

            .product-title {
                font-size: 1.4em;
                font-weight: 600;
                margin: 10px 0;
                color: #333;
                line-height: 1.3;
            }

            .product-price {
                font-size: 1.5em;
                font-weight: 700;
                color:rgb(64, 173, 13);
                margin: 12px 0;
            }

            .product-description {
                font-size: 0.95em;
                color: #666;
                margin-bottom: 20px;
                line-height: 1.5;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .product-actions {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            #add-to-cart {
                flex-grow: 1;
                background: linear-gradient(135deg,rgb(77, 255, 23),rgb(101, 204, 50));
                color: white;
                border: none;
                padding: 12px 18px;
                border-radius: 12px;
                font-weight: 600;
                font-size: 1em;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }

            #add-to-cart:hover {
                background: linear-gradient(135deg,rgb(12, 158, 41),rgb(67, 226, 43));
                transform: translateY(-2px);
                box-shadow: 0 5px 12px rgba(12, 255, 97, 0.3);
            }

            .cart-icon {
                display: inline-block;
                vertical-align: middle;
                width: 18px;
                height: 18px;
            }
        </style>

        <div class="product-card">
            <div class="image-container">
                <img src="${image}" alt="${title}" class="product-image" />
            </div>
            <div class="product-content">
                <div class="product-badge">new</div>
                <h3 class="product-title">${title}</h3>
                <p class="product-price">$${price}</p>
                <p class="product-description">${description}</p>
                <div class="product-actions">
                    <button id="add-to-cart">
                        <svg class="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        </div>
        `;

        this.shadowRoot.querySelector('#add-to-cart')?.addEventListener('click', () => {
            const product = {
                id: state.cart.length + 1,
                title,
                price: Number(price),
                description,
                image: this.getAttribute('image') || '',
            };
            ProductActions.addToCart(product);
        });
    }
}

export default ProductCard;