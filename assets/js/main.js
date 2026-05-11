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
// كود البحث المركزي في main.js
const searchInputs = [document.getElementById('search-desktop'), document.getElementById('search-mobile')];

searchInputs.forEach(input => {
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query) {
                    // الحل الأبسط والأضمن للمسارات المحليه (C:/)
                    const currentUrl = window.location.href;
                    let targetUrl = "";

                    if (currentUrl.includes("/pages/")) {
                        // إذا كنا جوا مجلد pages (برودكت أو كاتيجري)
                        targetUrl = `AllProduct.html?search=${encodeURIComponent(query)}`;
                    } else {
                        // إذا كنا برا (index.html)
                        targetUrl = `./assets/pages/AllProduct.html?search=${encodeURIComponent(query)}`;
                    }

                    console.log("Redirecting to:", targetUrl); // عشان تتأكد في الـ console
                    window.location.href = targetUrl;
                }
            }
        });
    }
});