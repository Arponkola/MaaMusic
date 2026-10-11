const options = document.getElementById("options");
const home = document.getElementById("home");
const showHideBtn = document.getElementById("show-hide");
const navBar = document.getElementById("options")
const classList = navBar.querySelectorAll(".nav");
const searchInput = document.getElementById("search-input");
const wholeModal = document.getElementById("modal-product-info");
const modalForm = document.getElementById("modal-content");
const productSelect = document.getElementById("product-select-option");
const optionSelect = productSelect.querySelectorAll(".select-option")
const productGridContainer = document.getElementById("products-grid-container");
let allProducts = [];

fetch("./static/assets/data.json")
.then(res=>res.json())
.then((data)=>{
    allProducts = data;
})
.catch((err)=>{
    console.log(err);
    allProducts = []
})

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
            <span>☰</span>
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
        // FIXED: Removed the dot "." inside the contains check
        if(!nodeItem.classList.contains("active")) {
            nodeItem.classList.add("active");
        }
    })
}

// FIXED: Using Event Delegation on the container to handle dynamic inputs
productGridContainer.addEventListener("click", (event) => {
    const item = event.target.closest(".product-container");
    if (!item) return;

    wholeModal.style.display = 'flex';
    document.body.style.overflowY = "hidden";
    modalForm.classList.add("active");
    
    const name = item.getAttribute("data-name")
    const info = item.getAttribute("data-info")
    const category = item.getAttribute("data-category")
    const imagePath = item.getAttribute("data-image")
    
    modalForm.innerHTML = `
        <button onclick="closeModal()" class="modal-close-btn">&times;</button>
        <div class="product-view-container">
            <!-- Left Side: Product Image Display -->
            <div class="product-view-media">
                <img src="${imagePath}" alt="Product Image" id="modal-product-img">
            </div>
            
            <!-- Right Side: Details & Purchasing -->
            <div class="product-view-details">
                <span class="product-category">${category}</span>
                <h2 class="product-title" id="modal-product-title">${name}</h2>
                
                <div class="product-price-row">
                    <span class="stock-badge">In Stock</span>
                </div>
                
                <p class="product-desc" id="modal-product-desc">
                    ${info}
                </p>
            </div>
        </div>
    `
});

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

function getProducts(option) {
    const p = []
    if(option=="boxes") {
        allProducts.forEach((element)=>{
            console.log(element)
            if(element.category  === "box") {
                p.push(element);
            }
        })
        return p;
    } else if(option=="lights") {
        allProducts.forEach((element)=>{
            if(element.category  === "light") {
                p.push(element);
            }
        })
        return p;
    }
    return allProducts
}

function removeAll() {
    for(let i=0; i<optionSelect.length; i++) {
        optionSelect.item(i).classList.remove("active");
    }
}

for(let i=0; i<optionSelect.length; i++) {
    optionSelect.item(i).addEventListener("click", ()=>{
        removeAll()
        optionSelect.item(i).classList.add("active");
        const pro = optionSelect.item(i).getAttribute("data-op");
        const ProductsGeted = getProducts(pro);
        if(ProductsGeted.length == 0) {
            productGridContainer.innerHTML = '<h1 style="text-align:center;">No Item Present</h1>'
            productGridContainer.style.overflowY = "hidden";
            return;
        }
        productGridContainer.style.overflowY = "scroll";
        let p = ''
        productGridContainer.innerHTML = ''
        ProductsGeted.forEach(element => {
            p += `
                <div class="product-container" data-name="${element.name}" data-info="${element.info}" data-category="${element.category}" data-image="${element.imagePath}">
                    <img src="./static/images/hero_section_image_.png" class="product-container-image"/>
                    <div class="product-info">
                        <h3>${element.name}</h3>
                        <small>${element.info}</small>
                    </div>
                </div>
            `
        });
        productGridContainer.innerHTML += p
    })
}