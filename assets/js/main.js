// ... كود الـ Menu Button يبقى كما هو ...

async function getCategory() {
  try {
    const response = await axios.get(
      "https://dummyjson.com/products/category-list",
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

const categories = async () => {
  try {
    const category = await getCategory();
    const isHomePage =
      window.location.pathname.endsWith("index.html") ||
      window.location.pathname === "/";
    const displayData = isHomePage ? category.slice(0, 8) : category;

    const data = displayData
      .map(
        (item) =>
          `
          <div class="flex flex-col items-center gap-2 cursor-pointer group">
             <a href="productsByCategory.html?category=${item}" class="flex flex-col items-center gap-2">
               <div class="w-24 h-24 rounded-full border-2 border-gray-200 flex items-center justify-center bg-white group-hover:border-primary group-hover:bg-red-50 transition-all duration-300">
                 <span class="text-xs font-medium text-center px-2 text-gray-700 group-hover:text-primary capitalize">${item.replace("-", " ")}</span>
               </div>
             </a>
          </div>
        `,
      )
      .join("");

    const container = document.querySelector(".category_list");
    if (container) {
      container.innerHTML = data;
    }
  } catch (error) {
    console.error("Error in categories function:", error);
  }
};

categories();
