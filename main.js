function limitedwords(str, n) {
    return str.split("").slice(0, n).join("") + "...";
}

// Fetch and display products
let allProducts = []; 

fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
        allProducts = data; 
        displayProducts(allProducts); 
    })
    .catch((error) => {
        console.log("Error:", error);
    });

function displayProducts(products) {
    const container = document.getElementById("container");
    const productHTML = products
        .map((product) => {
            const shorttitle = limitedwords(product.title, 11);
            const shortdescription = limitedwords(product.description, 70);
            return `
                <div class="productcard">
                    <img src="${product.image}" alt="Product Image">
                    <h3>${shorttitle}</h3>
                    <p>${shortdescription}</p>
                    <hr>
                    <p>$${product.price}</p>
                    <hr>
                    <button>Details</button>
                    <button id="addtocart">Add to Cart</button>
                </div>`;
        })
        .join("");
    container.innerHTML = productHTML;
}

// Function to filter products by category
function filterProducts(category) {
    const filteredProducts = allProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
    ); 
    displayProducts(filteredProducts); 
}

// Add event listeners to filter buttons
document.getElementById("categoriesbtns").addEventListener("click", (e) => {
    const category = e.target.id; 
    if (category === "all") {
        displayProducts(allProducts);
    } else if (category === "mens") {
        filterProducts("men's clothing");
    } else if (category === "women") {
        filterProducts("women's clothing");
    } else if (category === "jewelery") {
        filterProducts("jewelery");
    } else if (category === "electronics") {
        filterProducts("electronics");
    }
});




