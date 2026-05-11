const urlParams = new URLSearchParams(window.location.search);
let searchQuery = urlParams.get('search') || ""; 
console.log(searchQuery);

let currentPage = 1; 
const limit = 20; 

async function getAllProducts(page) {
  try {
    const skip = (page - 1) * limit;
    let url = "";

    if (searchQuery) {
      url = `https://dummyjson.com/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`;
    } else {
      url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

const Products = async (page) => {
  try {
    const productsContainer = document.querySelector(".products");
    productsContainer.innerHTML = "<p class='col-span-full text-center py-10'>Loading products...</p>";
    
    const data = await getAllProducts(page);
    const productList = data.products;
    const total = data.total;

    if (productList.length === 0) {
        productsContainer.innerHTML = `<p class="col-span-full text-center py-10 text-gray-500">No results found for "${searchQuery}"</p>`;
        document.querySelector(".total_product").textContent = `Total: 0 items`;
        document.querySelector(".pagination-controls").innerHTML = "";
        return;
    }

    const result = productList.map((product) => {
      const oldPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
      return `
         <a href="productDetails.html?ProductId=${product.id}" class="flex flex-col items-center gap-2 cursor-pointer group">
            <div class="group flex flex-col bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative w-full">
              ${product.discountPercentage ? `<span class="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded z-10">${Math.round(product.discountPercentage)}% OFF</span>` : ''}
              <div class="aspect-square bg-gray-50 overflow-hidden flex items-center justify-center p-4">
                <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div class="p-3 flex flex-col flex-grow">
                <p class="text-[10px] text-blue-600 font-bold uppercase mb-1">${product.brand || 'Brand'}</p>
                <h5 class="text-sm font-semibold text-gray-800 line-clamp-1 mb-1">${product.title}</h5>
                <div class="mt-auto">
                   <div class="flex items-baseline gap-1">
                      <span class="text-base font-bold text-gray-900">$${product.price}</span>
                      <span class="text-[10px] text-gray-400 line-through">$${oldPrice}</span>
                   </div>
                </div>
              </div>
            </div>
         </a>
      `;
    }).join("");

    productsContainer.innerHTML = result;
    document.querySelector(".total_product").textContent = searchQuery 
        ? `Results for "${searchQuery}": ${total} items` 
        : `Total: ${total} items`;

    renderPagination(total, page);
  } catch (error) {
    console.error("Error:", error);
    document.querySelector(".products").innerHTML = "<p class='col-span-full text-center text-red-500'>Error loading products.</p>";
  }
};

const searchInputs = [document.getElementById('search-desktop'), document.getElementById('search-mobile')];

searchInputs.forEach(input => {
    if (input) {
        if(searchQuery) input.value = searchQuery; // عرض الكلمة المبحوث عنها في الحقل

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query) {
                    const currentPath = window.location.pathname;
                    let targetUrl = "";

                    // توجيه ذكي بناءً على الصفحة الحالية
                    if (currentPath.includes("pages/")) {
                        targetUrl = `AllProduct.html?search=${encodeURIComponent(query)}`;
                    } else {
                        targetUrl = `assets/pages/AllProduct.html?search=${encodeURIComponent(query)}`;
                    }
                    window.location.href = targetUrl;
                }
            }
        });
    }
});

// --- 5. منطق الباجنيشن ---
function renderPagination(totalItems, page) {
  const totalPages = Math.ceil(totalItems / limit);
  const paginationContainer = document.querySelector(".pagination-controls");
  
  if(totalPages <= 1) {
    paginationContainer.innerHTML = "";
    return;
  }

  let buttonsHtml = `
    <button ${page === 1 ? 'disabled' : ''} onclick="changePage(${page - 1})" 
            class="px-3 py-1 border rounded ${page === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-primary text-white hover:opacity-90'}">
      Previous
    </button>
    <span class="px-4 text-sm font-medium">Page ${page} of ${totalPages}</span>
    <button ${page === totalPages ? 'disabled' : ''} onclick="changePage(${page + 1})" 
            class="px-3 py-1 border rounded ${page === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-primary text-white hover:opacity-90'}">
      Next
    </button>
  `;
  
  paginationContainer.innerHTML = buttonsHtml;
}

window.changePage = (newPage) => {
  currentPage = newPage;
  Products(currentPage);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// تشغيل الدالة عند تحميل الصفحة
Products(currentPage);