fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((res) => {
    const products = res.products;
    const container = document.getElementById("box");
    
    // Clear loading spinner
    container.innerHTML = '';
    
    products.forEach((product) => {
      const productData = encodeURIComponent(JSON.stringify(product));
      
      // Create star rating HTML
      let stars = '';
      const fullStars = Math.floor(product.rating);
      const hasHalfStar = product.rating % 1 >= 0.5;
      
      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
          stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
          stars += '<i class="far fa-star"></i>';
        }
      }
      
      container.innerHTML += `
        <div class="product-card" onclick='viewProduct("${productData}")'>
          ${product.discountPercentage > 0 ? 
            `<div class="discount-badge">${Math.round(product.discountPercentage)}% OFF</div>` : ''}
          <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
          <div class="product-content">
            <h3 class="product-title">${product.title}</h3>
            <span class="product-brand">${product.brand}</span>
            <p class="product-description">${product.description}</p>
            <div class="rating">
              <div class="rating-stars">${stars}</div>
              <div class="rating-count">${product.rating}/5</div>
            </div>
            <div class="price-section">
              <span class="product-price">₹${product.price}</span>
              ${product.discountPercentage > 0 ? 
                `<span class="original-price">₹${Math.round(product.price / (1 - product.discountPercentage/100))}</span>` : ''}
            </div>
            <div class="product-stock">
              <i class="fas fa-check-circle"></i> ${product.stock} in stock
            </div>
          </div>
        </div>
      `;
    });
  })
  .catch((error) => {
    const container = document.getElementById("box");
    container.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <h2>Failed to load products</h2>
        <p>Please check your internet connection and try again.</p>
        <button onclick="window.location.reload()">Retry</button>
      </div>
    `;
    console.error("Error fetching products:", error);
  });

function viewProduct(productStr) {
  const product = JSON.parse(decodeURIComponent(productStr));
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location.href = "details.html";
}