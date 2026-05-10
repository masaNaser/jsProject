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

async function getAllProducts() {
  try {
    const response = await axios.get(
      "https://dummyjson.com/products",
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
const allProducts = async () => {
  try {
    const data = await getAllProducts();
    console.log(data);
    const productList = data.products;
    const total = data.total;

    const result = productList.map((product) => {
      const oldPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);

      return `
         <a href="productDetails.html?ProductId=${product.id}" class="flex flex-col items-center gap-2 cursor-pointer group">
        <div class="group flex flex-col bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative">
          ${product.discountPercentage ? `
            <span class="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded z-10">
              ${Math.round(product.discountPercentage)}% OFF
            </span>
          ` : ''}

          <div class="aspect-square bg-gray-50 overflow-hidden flex items-center justify-center p-4">
            <img 
              src="${product.thumbnail}" 
              alt="${product.title}" 
              class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div class="p-3 flex flex-col flex-grow">
            <p class="text-[10px] text-blue-600 font-bold uppercase mb-1">${product.brand || 'Essence'}</p>
            
            <h5 class="text-sm font-semibold text-gray-800 line-clamp-1 mb-1" title="${product.title}">
              ${product.title}
            </h5>

            <div class="flex items-center mb-2">
              <span class="text-yellow-400 text-xs">★</span>
              <span class="text-[11px] text-gray-500 ml-1">(${product.rating})</span>
            </div>

            <div class="mt-auto">
              <div class="flex items-baseline gap-1">
                <span class="text-base font-bold text-gray-900">$${product.price}</span>
                <span class="text-[10px] text-gray-400 line-through">$${oldPrice}</span>
              </div>
              
              <p class="text-[10px] mt-1 mb-3 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'} font-medium">
                 ${product.availabilityStatus}
              </p>

              <button class="w-full cursor-pointer bg-primary hover:opacity-90 text-white text-xs font-bold py-2 rounded transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        </a>
      `;
    }).join("");

    document.querySelector(".products").innerHTML = result;
    document.querySelector(".total_product").textContent = `Total: ${total} items`;

  } catch (error) {
    console.error("Error:", error);
  }};
allProducts();