// ============================================
// CONFIGURACIÓN - ACTUALIZAR CON TU INFORMACIÓN
// ============================================
const GOOGLE_SHEET_ID = '1YdAMTKVED5UvQ63plsROfZEu8EKcgpfLxY4c4MA2Sxg';
const GOOGLE_SHEET_NAME = 'Productos'; // Nombre de la hoja en tu spreadsheet
const WHATSAPP_NUMBER = '5493512119851'; // Tu número de WhatsApp

// ============================================
// MENÚ HAMBURGUESA RESPONSIVE
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Scroll suave para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Cambiar estilo del header al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// MANEJO DEL FORMULARIO DE CONTACTO
// ============================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Gracias por tu mensaje. Te contactaremos pronto!');
        contactForm.reset();
    });
}

// ============================================
// CARGA DE PRODUCTOS DESDE GOOGLE SHEETS
// ============================================
let allProducts = [];
let currentCategory = 'all';

// Función para cargar productos desde Google Sheets
async function loadProducts() {
    const catalogGrid = document.getElementById('catalog-grid');
    const catalogLoading = document.getElementById('catalog-loading');
    const catalogError = document.getElementById('catalog-error');

    try {
        // URL del CSV publicado de Google Sheets
        const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vRUJcdZOnMKpOrTzVwbCoEG2FuJSC1BOiKfXbCTC_6x_uv9I4s3NE08W-_M1GcFtntxc2SsnO7OiLs0/pub?output=csv`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al cargar los productos');

        const csvText = await response.text();
        allProducts = parseCSV(csvText);

        // Ocultar loading y mostrar productos
        catalogLoading.style.display = 'none';
        renderProducts(allProducts);

    } catch (error) {
        console.error('Error:', error);
        catalogLoading.style.display = 'none';
        catalogError.style.display = 'block';
    }
}

// Función para parsear CSV
function parseCSV(csv) {
    const lines = csv.split('\n');
    const products = [];

    // Omitir la primera línea (encabezados)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Parse CSV teniendo en cuenta comillas
        const values = [];
        let currentValue = '';
        let insideQuotes = false;

        for (let char of line) {
            if (char === '"') {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                values.push(currentValue.replace(/^"|"$/g, '').trim());
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        values.push(currentValue.replace(/^"|"$/g, '').trim());

        // Crear objeto producto
        // Formato: Nombre, Precio, Descripción, Medidas, Categoría, URL Imagen
        if (values.length >= 6) {
            // Combinar descripción y medidas
            const descripcionCompleta = values[2]
                ? `${values[2]} - ${values[3]}`
                : values[3];

            // Procesar URL de imagen
            let imagenUrl = values[5];

            // Si no es una URL completa, asumimos que está en resources/
            if (!imagenUrl.startsWith('http')) {
                imagenUrl = `resources/${imagenUrl}`;
            }

            products.push({
                nombre: values[0],
                precio: values[1] || 'Consultar',
                descripcion: descripcionCompleta,
                categoria: values[4].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""), // Remover tildes
                imagenUrl: imagenUrl
            });
        }
    }

    return products;
}

// Función para renderizar productos
function renderProducts(products) {
    const catalogGrid = document.getElementById('catalog-grid');
    catalogGrid.innerHTML = '';

    // Filtrar por categoría si no es "all"
    const filteredProducts = currentCategory === 'all'
        ? products
        : products.filter(p => p.categoria === currentCategory);

    if (filteredProducts.length === 0) {
        catalogGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--gray);">No hay productos en esta categoría.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        catalogGrid.appendChild(productCard);
    });

    // Reinicializar funcionalidades
    initializeLightbox();
    initializeWhatsAppButtons();
    initializeProductAnimation();
}

// Función para crear una tarjeta de producto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.categoria);

    card.innerHTML = `
        <div class="product-image">
            <img src="${product.imagenUrl}" alt="${product.nombre}" loading="lazy">
        </div>
        <div class="product-info">
            <h3>${product.nombre}</h3>
            <p class="product-description">${product.descripcion}</p>
            <p class="product-price">${product.precio}</p>
            <button class="btn-secondary btn-consultar"
                    data-product="${product.nombre}"
                    data-price="${product.precio}">
                Consultar
            </button>
        </div>
    `;

    return card;
}

// Event listener para el filtro de categorías
document.getElementById('category-select').addEventListener('change', (e) => {
    currentCategory = e.target.value;
    renderProducts(allProducts);
});

// Cargar productos al cargar la página
loadProducts();

// Actualizar el botón flotante de WhatsApp con el número configurado
document.getElementById('whatsapp-float').href = `https://wa.me/${WHATSAPP_NUMBER}`;

// ============================================
// ANIMACIÓN DE ENTRADA PARA PRODUCTOS
// ============================================
function initializeProductAnimation() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ============================================
// LIGHTBOX FUNCTIONALITY
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

function initializeLightbox() {
    // Add click event to all product images
    document.querySelectorAll('.product-image img').forEach(img => {
        img.addEventListener('click', function() {
            lightbox.classList.add('active');
            lightboxImg.src = this.src;
            lightboxCaption.textContent = this.alt;
            document.body.style.overflow = 'hidden';
        });
    });
}

// Close lightbox when clicking the X
lightboxClose.addEventListener('click', function() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox || e.target === lightboxClose) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// WHATSAPP CONSULTATION FUNCTIONALITY
// ============================================
function initializeWhatsAppButtons() {
    document.querySelectorAll('.btn-consultar').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const productPrice = this.getAttribute('data-price');

            // Create the message
            const message = `Hola! Me interesa consultar por la *${productName}* (${productPrice}). ¿Podrías darme más información? Gracias!`;

            // Encode the message for URL
            const encodedMessage = encodeURIComponent(message);

            // Create WhatsApp link
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');
        });
    });
}
