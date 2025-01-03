// components =================================================

// header --------

fetch("../assets/components/header.html")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load header.html");
    }
    return response.text();
  })
  .then((header) => {
    document.querySelector("header").innerHTML = header;

    // أضف أي سلوك إضافي بعد تحميل الهيدر هنا
    const burgerButton = document.querySelector(".burger-menu button");
    const burgerLinks = document.querySelector(".burger-links");
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    burgerButton.addEventListener("click", () => {
      burgerLinks.classList.toggle("active");
      overlay.classList.toggle("active");
    });

    overlay.addEventListener("click", () => {
      burgerLinks.classList.remove("active");
      overlay.classList.remove("active");
    });
  })
  .catch((error) => console.error("Error loading header:", error));

// categorys ==================================================

fetch("../assets/data/data.json")
  .then((response) => response.json())
  .then((data) => {
    const wrapper = document.getElementById("category-wrapper");

    if (wrapper) {
      const { categories } = data;
      categories.forEach(({ link, image, name }) => {
        wrapper.insertAdjacentHTML(
          "beforeend",
          `<a href="${link}" class="swiper-slide category-card">
            <img src="${image}" class="category-image" />
            <h3 class="category-name">${name}</h3>
          </a>`
        );
      });
    }
  })
  .catch((error) => console.error("Error loading data:", error));

// products ===================================================

fetch("../assets/data/data.json")
  .then((response) => response.json())
  .then(({ products }) => {
    const productContainer = document.getElementById("products");

    if (productContainer) {
      const productHTML = products
        .map(
          ({ id, image, name, description, price, oldPrice, currency }) => `
          <div class="product-card">
            <a href="#" class="img" onclick="saveProductAndRedirect(${id})">
              <img src="${image}" alt="${name}" />
            </a>
            <div class="details">
              <a href="#" class="product-name" onclick="saveProductAndRedirect(${id})">${name}</a>
              <div class="product-description">${description}</div>
              <div class="price-container">
                <p class="old-price">${oldPrice} 
                ${currency === "SAR" ? "ر.س" : "ر.ي"}</p>
                <p class="price">${price} 
                ${currency === "SAR" ? "ر.س" : "ر.ي"}</p>
              </div>
              <div class="product-actions">
                <button class="buy-now btn">شراء الان</button>
                <button class="add-to-cart btn">
                  <i class="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
            </div>
          </div>`
        )
        .join("");

      productContainer.innerHTML = productHTML;
    }

    window.saveProductAndRedirect = (productId) => {
      const product = products.find(({ id }) => id === productId);

      if (product) {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "./product-details.html";
      }
    };
  })
  .catch((error) => console.error("Error loading products:", error));
