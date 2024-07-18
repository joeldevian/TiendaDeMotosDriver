/*=============== ARRAY ===============*/

const productData = [
  {
      name: "BMW R1300GS",
      type: "Adventure",
      price: "S/ 25,000",
      image: "assets/img/product-1.png",
      tag: "Envío gratuito",
  },
  {
      name: "Ducati Panigale V4",
      type: "Sportbike",
      price: "S/ 14,500",
      image: "assets/img/product-2.png",
      tag: "Envío gratuito",
  },
  {
      name: "Honda CB500X",
      type: "Dual-Sport",
      price: "S/ 10,000",
      image: "assets/img/product-3.png",
      tag: "Envío gratuito",
  },
  {
      name: "Harley-Davidson",
      type: "Cruiser",
      price: "S/ 12,000",
      image: "assets/img/product-4.png",
      tag: "Envío gratuito",
  },
  {
      name: "Kawasaki Ninja ZX-10R",
      type: "Sportbike",
      price: "S/ 8,000",
      image: "assets/img/product-5.png",
      tag: "Envío gratuito",
  },
  {
      name: "Yamaha MT-09",
      type: "Naked",
      price: "S/ 6,800",
      image: "assets/img/product-6.png",
      tag: "Envío gratuito",
  },
  {
      name: "Suzuki V-Strom 650XT",
      type: "Adventure",
      price: "S/ 4,500",
      image: "assets/img/product-7.png",
      tag: "Envío gratuito",
  },
  {
      name: "Triumph Bonneville T100",
      type: "Classic",
      price: "S/ 8,000",
      image: "assets/img/product-8.png",
      tag: "Envío gratuito",
  },
];

// Create product and show in bekecontent div
const createProductBox = (product) => `
<div class="product-box">
  <img src="${product.image}" alt="products image" class="box-img">
  <div class="title-price">
    <div class="title-data">
      <h2>${product.name}</h2>
      <p>${product.type}</p>
    </div>
    <h3 class="product-price">$${product.price}<span>/hour</span></h3>
  </div>
  <a href="#" class="book-btn" data-id="${product.name}">Realizar Pedido</a>
  <span class="tag">${product.tag}</span>
</div>             
`;

const productContent = document.querySelector('.products-content');
// Create product box and show in  productcontent div
productData.forEach((product) => {
  const productBoxHtml = createProductBox(product);
  productContent.insertAdjacentHTML('beforeend', productBoxHtml);
})

/*=============== NENU ===============*/
var swiper = new Swiper(".destination-container", {
  slidePerView: 1,
  spaceBetween: 10,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    clickable: true,
  },
  breakpoints: {
    200: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    510: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    750: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    900: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  }
});

/*=============== NENU ===============*/
let menu = document.querySelector('.menu-icon');
let navBar = document.querySelector('.navbar');

menu.addEventListener('click', () => {
  navBar.classList.toggle('open-menu');
  menu.classList.toggle('move');
  carNav.classList.remove('show');
})

/*=============== CART ===============*/
const carNav = document.getElementById('cart-nav');
const cartIcon = document.querySelector('.cart-button');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const successMessage = document.getElementById('success-message');
const failMessage = document.getElementById('fail-message');

let total = 0;
let itemCount = 0;

cartIcon.addEventListener('click', () => {
  const cart = document.querySelector('.cart');
  cart.classList.toggle('show');
  navBar.classList.remove('open-menu');
});

// Función para agregar un producto al carrito
function addToCart(productName, productImage, productPrice) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${productImage}" alt="${productName}">
      <div class="cart__item-info">
        <p>${productName}</p>
        <p>${productPrice}</p>
      </div>
      <i class="ri-close-line remove-item" title="Eliminar"></i>`;
    
    cartItems.appendChild(cartItem);

    // Actualizar total
    const priceNumber = parseFloat(productPrice.replace('S/ ', '').replace(',', ''));
    total += priceNumber;
    cartTotal.textContent = `S/ ${total.toFixed(2)}`;

    // Actualizar contador de artículos
    itemCount++;
    cartCount.textContent = itemCount;

    // Evento para eliminar un producto del carrito
    const removeButton = cartItem.querySelector('.remove-item');
    removeButton.addEventListener('click', () => {
      total -= priceNumber;
      cartTotal.textContent = `S/ ${total.toFixed(2)}`;
      cartItem.remove();

      // Actualizar contador de artículos
      itemCount--;
      cartCount.textContent = itemCount;
    });
}

// Agregar evento clic a los botones "Comprar Ahora"
const buyButtons = document.querySelectorAll('.book-btn');
buyButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        const productName = button.getAttribute('data-id');
        const product = productData.find(prod => prod.name === productName);
        if (product) {
          addToCart(product.name, product.image, product.price);
          const cart = document.querySelector('.cart');
          cart.classList.add('show');
        }
    });
});

// Evento para el botón "Hacer Pedido"
const buyButton = document.querySelector('.buy-button');
buyButton.addEventListener('click', function () {
    if (itemCount > 0) {
      // Mostrar mensaje de Pedido Realizado
      successMessage.innerHTML = `¡Pedido realizado por un total de <strong>S/ ${total.toFixed(2)}</strong>!`;
      successMessage.style.display = 'block';

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        successMessage.style.display = 'none';
        // Limpiar carrito
        const cartItemElements = document.querySelectorAll('.cart-item');
        cartItemElements.forEach(item => item.remove());
        total = 0;
        itemCount = 0;
        cartTotal.textContent = 'S/ 0.00';
        cartCount.textContent = '0';

        setTimeout(() => {
        carNav.classList.remove('show');
        }, 1500);
      }, 3000);

    } else {
      failMessage.innerHTML = 'No hay productos en el carrito';
      failMessage.style.display = 'block';
      setTimeout(() => {
        failMessage.style.display = 'none';
      }, 2000);
    }
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
})

sr.reveal(`.home-data, .home-img, .helmet-box`);
