  

  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    if (mobileMenu.classList.contains('hidden')) {
      menuIcon.classList.replace('fa-xmark', 'fa-bars');
    } else {
      menuIcon.classList.replace('fa-bars', 'fa-xmark');
    }
  });
const searchInputs = [document.getElementById('search-desktop'), document.getElementById('search-mobile')];

searchInputs.forEach(input => {
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query) {
                    const currentUrl = window.location.href;
                    let targetUrl = "";

                    if (currentUrl.includes("/pages/")) {
                        targetUrl = `AllProduct.html?search=${encodeURIComponent(query)}`;
                    } else {
                        targetUrl = `./assets/pages/AllProduct.html?search=${encodeURIComponent(query)}`;
                    }

                    window.location.href = targetUrl;
                }
            }
        });
    }
});