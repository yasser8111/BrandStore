document.addEventListener("DOMContentLoaded", () => {
  const productData = JSON.parse(localStorage.getItem("selectedProduct"));
  const productDetails = document.getElementById("product-details");

  if (productData) {
    const {
      image,
      name,
      description,
      price,
      oldPrice,
      currency,
      available,
      colors,
      additionalImages
    } = productData;

    const currencySymbol = currency === "SAR" ? "ر.س" : "ر.ي";

    const availabilityText = available
      ? `<span style="color: green;">متوفر</span>`
      : `<span style="color: red;">غير متوفر</span>`;

    const colorOptions = colors
      .map((color) => `<span style="background: ${color};"></span>`)
      .join("");

    // قسم معرض الصور
    const imageGallery = `
      <div class="product-gallery">
        <div class="main-image">
          <img id="main-image" src="${image}" alt="${name}" />
        </div>
        <div class="thumbnail-images">
          <img class="thumbnail" src="${image}" alt="Product Image" onclick="changeImage('${image}')" />
          ${additionalImages.map(img => `
            <img class="thumbnail" src="${img}" alt="Product Image" onclick="changeImage('${img}')" />
          `).join('')}
        </div>
      </div>
    `;

    // قسم البيانات الأخرى
    const productInfo = `
      <div class="product-info">
        <h1>${name}</h1>
        <div class="price-container">
          <span class="price">${price} ${currencySymbol}</span>
          ${oldPrice ? `<span class="old-price">${oldPrice} ${currencySymbol}</span>` : ""}
        </div>
        <div class="availability">التوفر: ${availabilityText}</div>
        <div class="colors">الألوان: ${colorOptions}</div>
        <div class="description"><p>${description}</p></div>
        <div class="quantity">
          <label for="quantity">الكمية:</label>
          <input type="number" id="quantity" min="1" value="1" />
        </div>
        <div class="product-actions">
          <button class="buy-now btn">شراء الآن</button>
          <button class="add-to-cart btn">
            <i class="fa-solid fa-cart-shopping"></i> إضافة إلى السلة
          </button>
        </div>
      </div>
    `;

    productDetails.innerHTML = imageGallery + productInfo;
  } else {
    productDetails.innerHTML = `<p>لم يتم العثور على تفاصيل المنتج.</p>`;
  }
});

function changeImage(imageSrc) {
  const mainImage = document.getElementById('main-image');
  mainImage.src = imageSrc;
}
