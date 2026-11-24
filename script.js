(() => {
  const root = document.getElementById('ark-global');
  if (!root || root.dataset.ready) return;
  root.dataset.ready = 'true';
  const heroVideo = root.querySelector('.ark-hero-video');
  const heroVideoToggle = root.querySelector('.ark-hero-video-toggle');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const playHeroVideo = () => {
    if (motionPreference.matches) return;
    if (!heroVideo.hasAttribute('src')) heroVideo.src = heroVideo.dataset.src;
    heroVideo.play().catch(() => {});
  };
  heroVideo.addEventListener('playing', () => {
    heroVideoToggle.hidden = false;
    heroVideoToggle.textContent = 'Pause background video';
  });
  heroVideo.addEventListener('pause', () => {
    heroVideoToggle.textContent = 'Play background video';
  });
  heroVideo.addEventListener('error', () => {
    heroVideo.hidden = true;
    heroVideoToggle.hidden = true;
  });
  heroVideoToggle.addEventListener('click', () => {
    if (heroVideo.paused) playHeroVideo();
    else heroVideo.pause();
  });
  motionPreference.addEventListener('change', () => {
    if (motionPreference.matches) heroVideo.pause();
    else if (!heroVideo.hasAttribute('src')) playHeroVideo();
  });
  playHeroVideo();
  const menu = root.querySelector('.ark-menu');
  const nav = root.querySelector('nav');
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('ark-open', open);
  });
  nav.addEventListener('click', event => {
    if (!event.target.closest('a')) return;
    menu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('ark-open');
  });
  const descriptions = {
    pharmaceuticals: ['Pharmaceuticals & Supplements', ['Nutraceutical Raw Materials', 'Vitamins & Minerals', 'Dietary Supplement Ingredients', 'Herbal Supplement Ingredients', 'Amino Acids & Protein Ingredients', 'Botanical Extracts', 'Probiotics & Prebiotics']],
    herbal: ['Herbal & Ayurvedic Products', ['Ashwagandha', 'Shilajit', 'Moringa', 'Holy Basil (Tulsi)', 'Neem', 'Amla', 'Brahmi']],
    beauty: ['Perfume Oils & Beauty Products', ['Premium Perfume Oils', 'Concentrated Fragrance Oils', 'Essential Oils', 'Natural Aromatic Oils', 'Herbal Hair Oils', 'Natural Cosmetic Oils', 'Botanical Skincare Ingredients']],
    food: ['Food & Agricultural Products', ['Basmati & Non-Basmati Rice', 'Wheat & Food Grains', 'Pulses & Lentils', 'Turmeric & Chilli', 'Cardamom & Other Spices', 'Dried Fruits & Nuts', 'Dehydrated Vegetables']],
    fashion: ['Fashion & Jewelry', ["Men's Formal & Casual Wear", "Women's Apparel", 'T-Shirts & Casual Clothing', 'Traditional Indian Garments', 'Cotton & Blended Fabrics', 'Bedsheets & Home Textiles', 'Towels & Bath Linen']]
  };
  const dialog = root.querySelector('dialog');
  const productList = dialog.querySelector('.ark-product-list');
  const fashionDetails = dialog.querySelector('.ark-fashion-details');
  root.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => {
    const [title, products] = descriptions[button.dataset.product];
    dialog.querySelector('h3').textContent = title;
    productList.hidden = products.length === 0;
    fashionDetails.hidden = button.dataset.product !== 'fashion';
    productList.replaceChildren(...products.map(product => {
      const item = document.createElement('li');
      item.textContent = product;
      return item;
    }));
    root.querySelector('[name="product"]').value = title;
    dialog.showModal();
  }));
  dialog.querySelector('.ark-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('a').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  const form = root.querySelector('form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const body = ['ARK GLOBAL enquiry', ...Array.from(data, ([key, value]) => `${key}: ${value}`)].join('\n\n');
    window.location.href = `mailto:info@arkglobaltrading.com?subject=${encodeURIComponent('Trade enquiry — ' + data.get('product'))}&body=${encodeURIComponent(body)}`;
    root.querySelector('[role="status"]').textContent = 'Your email application has been requested. Please review and send the enquiry there. If it does not open, email info@arkglobaltrading.com directly.';
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
      if (!visible) return;
      nav.querySelectorAll('a').forEach(link => { if (link.hash === '#' + visible.target.id) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
    }, { rootMargin: '-10% 0px -45% 0px', threshold: [0,.2,.5] });
    root.querySelectorAll('section[id]').forEach(section => observer.observe(section));
  }
})();
