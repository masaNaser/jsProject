

  let currentPage = 1; // الصفحة الحالية
  const limit = 20; // عدد المنتجات في كل صفحة
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
async function getProducts(page) {
  try {
    let skip=(page - 1) * limit; // حساب العناصر اللي رح نتخطاها
    const response = await axios.get(
      `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
const products = async (page) => {
  try {
    const data = await getProducts(page);
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
    document.querySelector(".Category_Name").textContent = typeof category !== 'undefined' ? category : "Beauty Selection";
    document.querySelector(".total_product").textContent = `Total: ${total} items`;
    renderPagination(total, page);
  } catch (error) {
    console.error("Error:", error);
  }
};

function renderPagination(total, page){
  const totalPages = Math.ceil(total / limit); // حساب عدد الصفحات الكلي
  const paginationContainer = document.querySelector(".pagination-controls");
  let buttonsHtml = "";
  buttonsHtml += `<button class="px-3 py-1 rounded ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'}"
   ${page === 1 ? 'disabled' : ''} onclick="changePage(${page - 1})">Previous</button>`;

  buttonsHtml += `<span class="px-4 text-sm">Page ${page} of ${totalPages}</span>`;

  buttonsHtml += `<button class="px-3 py-1 rounded ${page === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'}"
   ${page === totalPages ? 'disabled' : ''} onclick="changePage(${page + 1})">Next</button>`;
   if (totalPages <= 1) {
    buttonsHtml = ""; 
  }else{
  paginationContainer.innerHTML = buttonsHtml;
}
}
window.changePage = (newPage) => {
  // تحديث الصفحة الحالية
  currentPage = newPage;
  products(currentPage);
  // لما نغير الصفحة رح يرجعنا لفوق عشان نبدأ نشوف المنتجات من أول الصفحة
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
products(currentPage);