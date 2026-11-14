(() => {
  const root = document.getElementById('ark-global');
  if (!root || root.dataset.ready) return;
  root.dataset.ready = 'true';
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
    pharmaceuticals: ['Pharmaceuticals & Supplements', 'Discuss your pharmaceutical and supplement sourcing requirements with our team. Product availability, documentation and destination requirements are confirmed for each enquiry.'],
    herbal: ['Herbal & Ayurvedic Products', 'Enquire about herbal and Ayurvedic products. Share your preferred ingredients, format, packaging and destination so we can discuss suitable sourcing options.'],
    beauty: ['Perfume Oils & Beauty Products', 'Explore sourcing enquiries for perfume oils and beauty products. Tell us your preferred fragrances, product formats, packaging and quantities.'],
    food: ['Food & Agricultural Products', 'Connect with our team about food and agricultural sourcing. Include the commodity, grade, packaging, quantity and destination in your enquiry.'],
    fashion: ['Fashion & Clothing', 'Discuss clothing sourcing for your business. Share garment types, materials, sizes, quantities and any packaging requirements.']
  };
  const dialog = root.querySelector('dialog');
  root.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => {
    const [title, description] = descriptions[button.dataset.product];
    dialog.querySelector('h3').textContent = title;
    dialog.querySelector('p').textContent = description;
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
