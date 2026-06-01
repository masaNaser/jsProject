  

  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
const profileContainerDesktop = document.querySelector('.profile-container');
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    if (mobileMenu.classList.contains('hidden')) {
      menuIcon.classList.replace('fa-xmark', 'fa-bars');   
      profileContainerDesktop.classList.remove('hidden');

    } else {
      menuIcon.classList.replace('fa-bars', 'fa-xmark');
     profileContainerDesktop.classList.add('hidden');
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

const token = localStorage.getItem('accessToken');
if (token) {
    document.querySelectorAll('.profile-container').forEach(link => {
        link.classList.remove('hidden');
    });
    document.querySelectorAll('.login-link').forEach(link => {
        link.classList.add('hidden');
    });
}
function logout() {
    localStorage.removeItem('accessToken');
    window.location.href = './assets/pages/login.html'; 
}
const logoutBtn = document.getElementById('logout-btn');
if(logoutBtn){
logoutBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    logout();
});
}