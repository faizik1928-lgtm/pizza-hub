/* ==========================================================================
   PIZZA HUB — 120FPS HIGH-PERFORMANCE JAVASCRIPT ENGINE
   Instant Fast Explosion, Throttled Hardware Transforms & Zero Lag
   ========================================================================== */

const CONFIG = {
  whatsappNumber: "923001234567",
  currency: "Rs. ",
  deliveryFee: 150
};

let cart = [];
let fulfillmentType = 'delivery';

// ==========================================================================
// 1. FAST & ULTRA-RESPONSIVE 3D PIZZA EXPLOSION (Zero Lag)
// ==========================================================================
function initFast3DPizzaExplosion() {
  const stage = document.getElementById('fixed-3d-stage');
  const assembly = document.getElementById('real-pizza-assembly');
  
  const layerTomatoes = document.getElementById('photo-layer-tomatoes');
  const layerSlice = document.getElementById('photo-layer-slice');
  const layerUserPizza = document.getElementById('photo-layer-user-pizza');
  const layerCrust = document.getElementById('photo-layer-crust');

  const readout = document.getElementById('explosion-readout');
  const bar = document.getElementById('explosion-bar');
  const showcaseSection = document.getElementById('showcase');

  if (!assembly) return;

  let isScrollTicking = false;

  function updateFastScrollExplosion() {
    const scrollY = window.scrollY;

    // FAST SENSITIVITY: 100% explosion within just 200px of scroll!
    const explosionProgress = Math.min(1, Math.max(0, scrollY / 200));

    // Update Anatomy Overlay HUD
    const pct = Math.round(explosionProgress * 100);
    if (readout) readout.textContent = `${pct}% Revealed`;
    if (bar) bar.style.width = `${pct}%`;

    if (stage) {
      stage.classList.toggle('anatomy-active', explosionProgress > 0.1);
    }

    // Direct GPU Transforms
    if (layerTomatoes) {
      const z = 220 * explosionProgress;
      const y = -130 * explosionProgress;
      layerTomatoes.style.transform = `translate3d(0, ${y.toFixed(1)}px, ${z.toFixed(1)}px)`;
    }

    if (layerSlice) {
      const z = 120 * explosionProgress;
      const x = -55 * explosionProgress;
      const y = -40 * explosionProgress;
      const rot = -14 * explosionProgress;
      layerSlice.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateZ(${rot.toFixed(1)}deg)`;
    }

    if (layerUserPizza) {
      const z = 30 * explosionProgress;
      layerUserPizza.style.transform = `translate3d(0, 0px, ${z.toFixed(1)}px)`;
    }

    if (layerCrust) {
      const z = -120 * explosionProgress;
      const y = 110 * explosionProgress;
      layerCrust.style.transform = `translate3d(0, ${y.toFixed(1)}px, ${z.toFixed(1)}px)`;
    }

    // Fade out 3D background stage when entering showcase
    if (showcaseSection) {
      const sRect = showcaseSection.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (sRect.top < windowH * 0.6) {
        let fadeOut = (sRect.top - windowH * 0.1) / (windowH * 0.5);
        fadeOut = Math.max(0, Math.min(1, fadeOut));
        stage.style.opacity = fadeOut.toFixed(2);
      } else {
        stage.style.opacity = '1';
      }
    }

    // Assembly tilt angle
    const baseRotZ = scrollY > 50 ? 10 : 5;
    assembly.style.transform = `rotateX(25deg) rotateY(-15deg) rotateZ(${baseRotZ}deg)`;

    isScrollTicking = false;
  }

  // Throttled scroll listener with requestAnimationFrame (120 FPS Butter Smooth)
  window.addEventListener('scroll', () => {
    if (!isScrollTicking) {
      requestAnimationFrame(updateFastScrollExplosion);
      isScrollTicking = true;
    }
  }, { passive: true });

  updateFastScrollExplosion();
}

// ==========================================================================
// 2. FLYING DRAG ANIMATION INTO CART
// ==========================================================================
function initFlyingCartAnimation() {
  const cartBtn = document.getElementById('open-cart-btn');
  const toast = document.getElementById('cart-toast');
  const toastImg = document.getElementById('toast-img');
  const toastTitle = document.getElementById('toast-title');

  let toastTimeout;

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.add-to-cart-trigger');
    if (!trigger) return;

    const name = trigger.dataset.name || 'Gourmet Dish';
    const price = parseFloat(trigger.dataset.price) || 12.00;
    const imgSrc = trigger.dataset.img || 'images/user_pizza.jpg';

    // 1. Add item to cart state
    addToCart(name, price, imgSrc);

    // 2. Spawn real-photo flying clone from clicked position
    const rect = trigger.getBoundingClientRect();
    const cartRect = cartBtn.getBoundingClientRect();

    const clone = document.createElement('img');
    clone.src = imgSrc;
    clone.className = 'flying-cart-clone';
    clone.style.top = `${rect.top + rect.height / 2 - 35}px`;
    clone.style.left = `${rect.left + rect.width / 2 - 35}px`;
    document.body.appendChild(clone);

    // 3. Animate flight along parabolic trajectory into Cart Button
    requestAnimationFrame(() => {
      clone.style.transform = `translate(${(cartRect.left - rect.left) * 0.5}px, ${-120}px) scale(1.15)`;
      
      setTimeout(() => {
        clone.style.top = `${cartRect.top + cartRect.height / 2 - 35}px`;
        clone.style.left = `${cartRect.left + cartRect.width / 2 - 35}px`;
        clone.style.transform = 'scale(0.2)';
        clone.style.opacity = '0.3';
      }, 300);
    });

    // 4. On Landing in Cart
    setTimeout(() => {
      clone.remove();

      cartBtn.classList.remove('cart-impact');
      void cartBtn.offsetWidth;
      cartBtn.classList.add('cart-impact');

      toastImg.src = imgSrc;
      toastTitle.textContent = `${name}`;
      toast.classList.add('show');

      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);

    }, 650);
  });
}

// ==========================================================================
// 3. CONTINUOUS SCROLL SHOWCASE (ONE BY ONE APPEARANCE)
// ==========================================================================
function initSequentialReveal() {
  const items = document.querySelectorAll('.reveal-item');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -30px 0px"
  });

  items.forEach(item => observer.observe(item));
}

// ==========================================================================
// 4. MELTING CHEESE NAV BUTTONS (TOUCH & HOVER GLOW EFFECTS)
// ==========================================================================
function initMeltingCheeseNav() {
  const cheeseButtons = document.querySelectorAll('.cheese-nav-btn');

  cheeseButtons.forEach(btn => {
    btn.addEventListener('pointerdown', () => {
      btn.style.transform = 'translateY(1px) scale(0.98)';
    });

    btn.addEventListener('pointerup', () => {
      btn.style.transform = '';
    });

    btn.addEventListener('touchstart', () => {
      cheeseButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }, { passive: true });
  });

  const sections = ['hero', 'anatomy', 'showcase', 'menu'];
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 200;
    sections.forEach(secId => {
      const el = document.getElementById(secId);
      if (el) {
        const top = el.offsetTop;
        const h = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + h) {
          cheeseButtons.forEach(b => {
            const href = b.getAttribute('href');
            if (href === `#${secId}`) {
              b.classList.add('active');
            } else if (href && href.startsWith('#')) {
              b.classList.remove('active');
            }
          });
        }
      }
    });
  }, { passive: true });
}

// ==========================================================================
// 5. SLIDE-OVER WHATSAPP CART ENGINE (CLEAN & NON-OVERLAPPING)
// ==========================================================================
function addToCart(title, price, img = 'images/user_pizza.jpg') {
  const existing = cart.find(item => item.title === title);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ title, price, img, qty: 1 });
  }

  updateCartUI();

  const counter = document.getElementById('cart-counter');
  if (counter) {
    counter.style.transform = 'scale(1.4)';
    setTimeout(() => counter.style.transform = 'scale(1)', 250);
  }
}

function updateCartQty(title, delta) {
  const item = cart.find(i => i.title === title);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.title !== title);
    }
  }
  updateCartUI();
}

function removeCartItem(title) {
  cart = cart.filter(i => i.title !== title);
  updateCartUI();
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const deliveryCost = fulfillmentType === 'delivery' ? (subtotal > 0 ? CONFIG.deliveryFee : 0) : 0;
  const total = subtotal > 0 ? (subtotal + deliveryCost) : 0;

  document.getElementById('cart-counter').textContent = totalCount;
  document.getElementById('drawer-item-count').textContent = `${totalCount} item${totalCount === 1 ? '' : 's'}`;

  document.getElementById('price-subtotal').textContent = `${CONFIG.currency}${Math.round(subtotal)}`;
  document.getElementById('price-delivery').textContent = fulfillmentType === 'delivery' ? `${CONFIG.currency}${Math.round(CONFIG.deliveryFee)}` : 'Rs. 0 (Pickup)';
  document.getElementById('price-total').textContent = `${CONFIG.currency}${Math.round(total)}`;

  const container = document.getElementById('cart-items-container');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-view">
        <span class="empty-icon">🍕</span>
        <p>Your culinary tray is empty.</p>
        <span>Click "Add to Tray" on any pizza, burger or sides!</span>
      </div>
    `;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-row">
      <div class="cart-item-thumb">
        <img src="${item.img}" alt="${item.title}">
      </div>
      <div class="cart-item-info">
        <span class="cart-item-title">${item.title}</span>
        <span class="cart-item-sub">${CONFIG.currency}${Math.round(item.price)} each</span>
      </div>
      <div class="cart-qty-ctrl">
        <button class="qty-btn" onclick="updateCartQty('${item.title}', -1)">-</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" onclick="updateCartQty('${item.title}', 1)">+</button>
      </div>
      <span class="cart-item-total">${CONFIG.currency}${Math.round(item.price * item.qty)}</span>
      <button class="cart-item-delete" onclick="removeCartItem('${item.title}')" title="Remove Item">&times;</button>
    </div>
  `).join('');
}

function openCartDrawer() {
  document.getElementById('cart-drawer-overlay').classList.add('open');
}

function closeCartDrawer() {
  document.getElementById('cart-drawer-overlay').classList.remove('open');
}

function initCartListeners() {
  document.getElementById('open-cart-btn').addEventListener('click', openCartDrawer);
  document.getElementById('close-cart-btn').addEventListener('click', closeCartDrawer);

  document.getElementById('cart-drawer-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'cart-drawer-overlay') closeCartDrawer();
  });

  const optDelivery = document.getElementById('opt-delivery');
  const optPickup = document.getElementById('opt-pickup');
  const radios = document.querySelectorAll('input[name="fulfillment"]');

  radios.forEach(r => {
    r.addEventListener('change', (e) => {
      fulfillmentType = e.target.value;
      if (optDelivery && optPickup) {
        optDelivery.classList.toggle('active', fulfillmentType === 'delivery');
        optPickup.classList.toggle('active', fulfillmentType === 'pickup');
      }
      updateCartUI();
    });
  });

  if (optDelivery) optDelivery.classList.add('active');

  document.getElementById('whatsapp-checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
      alert("Your tray is empty! Add some delicious items first.");
      return;
    }

    const name = document.getElementById('cust-name').value.trim() || 'Valued Guest';
    const address = document.getElementById('cust-address').value.trim() || (fulfillmentType === 'delivery' ? 'Delivery Address' : 'Counter Pickup');
    const notes = document.getElementById('cust-notes').value.trim();

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const fee = fulfillmentType === 'delivery' ? CONFIG.deliveryFee : 0;
    const total = Math.round(subtotal + fee);

    let message = `*🍕 PIZZA HUB — NEW GOURMET ORDER* 🚀\n`;
    message += `──────────────────────\n`;
    message += `👤 *Customer:* ${name}\n`;
    message += `📍 *Service:* ${fulfillmentType === 'delivery' ? 'Hot Express Delivery' : 'Store Pickup'}\n`;
    message += `🏠 *Location:* ${address}\n`;
    if (notes) message += `📝 *Chef Notes:* ${notes}\n`;
    message += `──────────────────────\n`;
    message += `*ORDER ITEMS:*\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.title}* x${item.qty} — ${CONFIG.currency}${Math.round(item.price * item.qty)}\n`;
    });

    message += `──────────────────────\n`;
    message += `💰 *Subtotal:* ${CONFIG.currency}${Math.round(subtotal)}\n`;
    if (fee > 0) message += `🛵 *Express Delivery:* ${CONFIG.currency}${Math.round(fee)}\n`;
    message += `🔥 *TOTAL DUE:* ${CONFIG.currency}${total}\n`;
    message += `──────────────────────\n`;
    message += `_Sent via Pizza Hub Real-Life Experience_`;

    const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  });
}

// ==========================================================================
// 6. BENTO GRID MENU FILTERS
// ==========================================================================
function initMenuFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.bento-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter || cat === 'all') {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ==========================================================================
// 7. INITIALIZATION ON DOM READY
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {
  initFast3DPizzaExplosion();
  initFlyingCartAnimation();
  initSequentialReveal();
  initMeltingCheeseNav();
  initCartListeners();
  initMenuFilters();
});
