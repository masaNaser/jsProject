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

const urlparams = new URLSearchParams(window.location.search);
const productId = urlparams.get("ProductId");

const getProductDetails = async () => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/${productId}`);
    const product = response.data;
    renderProduct(product);
  } catch (error) {
    console.error("Error:", error);
  }
};

const renderProduct = (product) => {
  const container = document.getElementById("product-container");
  
  const oldPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);

  container.innerHTML = `
    <div class="space-y-4">
      <div class="bg-gray-50 rounded-2xl overflow-hidden aspect-square flex items-center justify-center p-8 border border-gray-100">
        <img src="${product.images[0]}" class="w-full h-full object-contain hover:scale-105 transition-transform duration-500" />
      </div>
      
      <div class="grid grid-cols-4 gap-4">
        ${product.images.map(img => `
          <div class="border rounded-lg overflow-hidden cursor-pointer hover:border-black transition-colors aspect-square p-2 bg-gray-50">
            <img src="${img}" class="w-full h-full object-contain" />
          </div>
        `).join('')}
      </div>
    </div>

    <div class="flex flex-col">
      <span class="text-gray-400 text-sm font-medium tracking-widest uppercase mb-2">${product.brand}</span>
      <h1 class="text-4xl font-bold text-gray-900 mb-4">${product.title}</h1>
      
      <div class="flex items-center gap-4 mb-6">
        <div class="flex items-center text-yellow-400 text-sm">
          ${'<i class="fa-solid fa-star"></i>'.repeat(Math.round(product.rating))}${'<i class="fa-regular fa-star"></i>'.repeat(5 - Math.round(product.rating))}
          <span class="text-gray-500 ml-2">(${product.rating})</span>
        </div>
        <span class="text-gray-300">|</span>
        <span class="text-gray-500 text-sm italic">SKU: ${product.sku}</span>
      </div>

      <div class="mb-8">
        <div class="flex items-center gap-3">
          <span class="text-3xl font-bold text-orange-600">$${product.price}</span>
          <span class="text-lg text-gray-400 line-through">$${oldPrice}</span>
          <span class="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded">
            ${product.discountPercentage}% OFF
          </span>
        </div>
        <p class="text-green-600 text-sm font-semibold mt-2">
          <i class="fa-solid fa-check-circle"></i> ${product.availabilityStatus} & Ready to Ship
        </p>
      </div>

      <div class="mb-8">
        <p class="text-xs font-bold text-gray-900 uppercase mb-3 tracking-wider">Quantity</p>
        <div class="flex items-center border border-gray-200 rounded-lg w-max px-2 py-1">
          <button class="px-3 py-1 hover:text-orange-600 font-bold">-</button>
          <input type="text" value="1" class="w-12 text-center outline-none font-medium" />
          <button class="px-3 py-1 hover:text-orange-600 font-bold">+</button>
        </div>
      </div>

      <div class="flex gap-4 mb-10">
        <button class="flex-1 bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition-colors uppercase tracking-widest text-sm">
          Add to Cart
        </button>
        <button class="flex-1 border-2 border-gray-200 py-4 rounded-lg font-bold hover:border-black transition-colors uppercase tracking-widest text-sm">
          Buy It Now
        </button>
      </div>

 
      <div class="border-b">
        <span class="w-full py-4 font-bold text-sm uppercase tracking-wider">
          Description
        </span>
        <div class="pb-6">
          <p class="text-gray-600 leading-relaxed text-sm">
            ${product.description}
          </p>
          <div class="mt-4 flex flex-wrap gap-2 text-[11px] font-bold">
             <span class="bg-gray-100 px-3 py-1 rounded">WEIGHT: ${product.weight}g</span>
             <span class="bg-gray-100 px-3 py-1 rounded uppercase">${product.category}</span>
          </div>
        </div>
      </div>
    </div>
  `;
};

getProductDetails();