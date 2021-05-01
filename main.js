function find(){
    //Hide main content
    mainContent = document.getElementsByClassName("main-content");
    mainContent[0].style.display = "none";
    //Hide two buttons
    mainBtn = document.getElementsByClassName("btn");
    mainBtn[0].style.display = "none";
    //Show the search bar
    mySearch = document.getElementsByClassName("search");
    mySearch[0].style.display = "flex";
    //Show the category
    myCategory = document.getElementsByClassName("category");
    myCategory[0].style.display = "flex";
    //Show the products
    for (let i=0; i<products.length; i++) {
        addProduct(products[i].name, products[i].price);
    }
}

function addProduct(name,price){
    const div = document.createElement("div");
    div.className = "card";
    div.style = "display: inline-flex";
    div.innerHTML = 
    `
    <div class="card-body">
        <p id="p-name-${name}" style="text-align:center">${name}</p>
        <p class="price d-inline" id="p-price-${name}" style="text-align:center">$${price} each.</p>
        <div class="add-and-details" style="display:inline-flex; margin-top: 5px;">
            <div class="addon-btn">
                <button id="cart-add-${name}" onclick="addToCart(this.id)">
                <img class="icon" src="photos/add_to_shoppingcart.png" style="width:20px">
                <span> Add </span>
            </div>
            <div class="details" style="text-align:center; line-height:35px">
                <span> Details </span>
            </div>
        </div>
    </div>
    </div>
    `;
    document.getElementById("product").appendChild(div);
}