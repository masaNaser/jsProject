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

   let currentPage = 1; // الصفحة الحالية
   const limit = 20; // عدد المنتجات في كل صفحة
async function getAllProducts(page) {
  try {
    const skip = (page - 1) * limit; // حساب العناصر اللي رح نتخطاها 
        //مثلا بالصفحة الاولى رح يكون السكيب صفر يعني اعرض 20 منتج ما تتخطى اي عنصر
    const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

const Products = async (page) => {
  try {
    const data = await getAllProducts(page);
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
    renderPagination(total, page);
  } catch (error) {
    console.error("Error:", error);
  }};


function renderPagination(totalItems, page) {
  const totalPages = Math.ceil(totalItems / limit); // حساب عدد الصفحات الكلي ,, مثلا عنا 100 منتج و 20 منتج بالصفحة يعني عنا 5 صفحات
  const paginationContainer = document.querySelector(".pagination-controls");
  
  let buttonsHtml = "";

  // زر السابق
  buttonsHtml += `
    <button ${page === 1 ? 'disabled' : ''} 
            onclick="changePage(${page - 1})" 
            class="px-3 py-1 border rounded ${page === 1 ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}">
      Previous
    </button>
  `;

  // عرض رقم الصفحة الحالية من إجمالي الصفحات
  buttonsHtml += `<span class="px-4 text-sm">Page ${page} of ${totalPages}</span>`;

  // زر التالي
  buttonsHtml += `
    <button ${page === totalPages ? 'disabled' : ''} 
            onclick="changePage(${page + 1})" 
            class="px-3 py-1 border rounded ${page === totalPages ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}">
      Next
    </button>
  `;

  paginationContainer.innerHTML = buttonsHtml;
}

window.changePage = (newPage) => {
  // تحديث الصفحة الحالية
  currentPage = newPage;
  Products(currentPage);
  // لما نغير الصفحة رح يرجعنا لفوق عشان نبدأ نشوف المنتجات من أول الصفحة
  window.scrollTo({ top: 0, behavior: 'smooth' });
};



Products(currentPage);