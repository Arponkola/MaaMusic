const options = document.getElementById("options");
const home = document.getElementById("home");
const showHideBtn = document.getElementById("show-hide");
const navBar = document.getElementById("options")
const classList = navBar.querySelectorAll(".nav");
const searchInput = document.getElementById("search-input");
const products = document.querySelectorAll(".product-container");
const wholeModal = document.getElementById("modal-product-info");
const modalForm = document.getElementById("modal-content");

function performSearch(e) {
    //search logic
    const searchInputValue = searchInput.value.trim();
    console.log(e.target);
    if(!searchInputValue || searchInputValue === "") {
        return;
    }

    window.location.href='#products';
}

showHideBtn.addEventListener("click", ()=>{
    if(options.classList.contains("active")) {
        options.classList.remove("active");
        showHideBtn.innerHTML = `
            <span>&#9776;</span>
        `
        home.style.filter='';
    } else {
        showHideBtn.innerHTML = `
            <span style='font-size: 40px;'>&times;</span>
        `
        home.style.filter='blur(5px)';
        options.classList.add("active");
    }
});

function removeActiveFromAll(classList) {
    for(let i=0; i<classList.length; i++) {
        classList.item(i).classList.remove("active");
    }
}

for(let i=0; i<classList.length; i++) {
    const nodeItem = classList.item(i);
    nodeItem.addEventListener("click", ()=>{
        removeActiveFromAll(classList);
        if(!nodeItem.classList.contains(".active")) {
            nodeItem.classList.add("active");
        }
    })
}

for(let i=0; i<products.length; i++) {
    products.item(i).addEventListener("click", ()=>{
        wholeModal.style.display = 'flex';
        document.body.style.overflowY = "hidden";
        modalForm.classList.add("active");
        modalForm.innerHTML = `
            <button onclick="closeModal()" class="modal-close-btn">&times;</button>
            <div class="product-view-container">
                <!-- Left Side: Product Image Display -->
                <div class="product-view-media">
                    <img src="./static/images/hero_section_image_.png" alt="Product Image" id="modal-product-img">
                </div>
                
                <!-- Right Side: Details & Purchasing -->
                <div class="product-view-details">
                    <span class="product-category">BOX</span>
                    <h2 class="product-title" id="modal-product-title">Luxury Product Name</h2>
                    
                    <div class="product-price-row">
                        <span class="current-price" id="modal-product-price">$149.00</span>
                        <span class="stock-badge">In Stock</span>
                    </div>
                    
                    <p class="product-desc" id="modal-product-desc">
                        Engineered with premium materials and high attention to detail. This product offers superior performance, durability, and a classic clean design that elevates your everyday workflow.
                    </p>
                    
                    <div class="product-actions">
                        <button class="add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            </div>
        `
    });
}

function closeModal() {
    // 1. Remove active state and add the closing animation class
    modalForm.classList.remove("active");
    modalForm.classList.add("closing");
    
    // 2. Wait exactly 200ms (matching the 0.2s CSS animation) before hiding the modal
    setTimeout(() => {
        wholeModal.style.display = 'none';
        modalForm.classList.remove("closing"); // Reset class for next time
        document.body.style.overflowY = "scroll";
    }, 200); // 200 milliseconds = 0.2 seconds
}
