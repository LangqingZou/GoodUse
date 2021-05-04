// All cards
var cards = document.getElementsByClassName("card");

// Flag of price filter, flag is false before clicking
var flagPrice = false;

// Quantity of products in shopping cart
var number = 0;

// Product added to cart
var productInCart = {};

// Temp number to remember the original number
var tempNumber =0;

// The number of clicking the shopping cart icon
var firstClickShoppingCart=0;

// The subtotal prices of added products
var subtotal = 0;

/**
 * @description Function responsible for removing the all cards that are already in the page, then add new cards
 */
function setUp(){
    removeDiv("card");
    for (let i = 0; i < products.length; i++) {
        addProduct(products[i].name, products[i].price);
    }
}

/**
 * @description Function responsible for removing the element according to it's class name
 */
function removeDiv(className){
    var card = document.getElementsByClassName(className);
    while (card.length > 0){
        card[0].remove();
    } 
}

/**
 * @description Function responsible for the FIND PAGE. Hiding and showing.
 */
function find() {
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
    for (let i = 0; i < products.length; i++) {
        addProduct(products[i].name, products[i].price);
    }
    //Show the filter
    myFilter = document.getElementsByClassName("filterBy");
    myFilter[0].style.display = "flex";
    //Show the prices filter
    myPriceFilter = document.getElementsByClassName("priceFilter");
    myPriceFilter[0].style.display = "flex";
    //Filter the category
    categoryFilter();
}


/**
 * @description Function responsible for adding products in the FIND PAGE
 * @param name The name of a product added
 * @param price The price of a product added
 */
function addProduct(name, price) {
    const div = document.createElement("div");
    div.className = "card";
    div.style = "display: inline-flex";
    div.innerHTML = `
    <div class="card-body" id="card-body">
        <p id="p-name-${name}" class="p-name-${name}" style="text-align:center;color:rgb(89, 91, 92)">${name}</p>
        <p class="price d-inline" id="p-price-${name}" style="text-align:center;color:rgb(89, 91, 92)">$${price} each.</p>
        <div class="add-and-details" style="display:inline-flex; margin-top:5px;">
            <div class="addon-btn">
                <button id="cart-add-${name}" onclick="addToCart(this.id)">
                <img class="icon" src="photos/add_to_shoppingcart.png" style="width:20px">
                <span style="font-size:0.8rem"> Add </span>
                </button>
            </div>
            <div class="details" id="details-${name}">
                <button id="details-${name}" onclick="getDetails(this.id)">
                <span> Details </span>
            </div>
        </div>
    </div>
    `;
    document.getElementById("product").appendChild(div);
}


/**
 * @description Function responsible for adding event listener for each card(product)
 */
function categoryFilter() {
    var myCategory = document.getElementById("category-content").children;
    for (let i = 0; i < myCategory.length; i++) {
        myCategory[i].addEventListener("click", clickCategory);
    }
}


/**
 * @description Function responsible for when the card(product) is clicked, trigger the event and manage the hiding and showing
 */
function clickCategory() {
    setUp();
    for (let i = 0; i < cards.length; i++) {
        const cardName = cards[i].querySelector("p").innerHTML; // the first p element is the name of product
        var type = findProduct(cardName).category;
        if (this.id != type) {
            cards[i].style.display = "none";
        } else {
            cards[i].style.display = "inline-flex";
        }
        if (this.id == "All") {
            cards[i].style.display = "inline-flex";
        }
    }
}


/**
 * @description Function responsible for finding the product object according the given name
 * @param name The name of a product
 * @return Returns the category of a product
 */
function findProduct(name) {
    var obj = {};
    products.forEach((elem) => {
        if (elem.name == name) obj = elem;
    });
    return obj;
}


/**
 * @description Function responsible for manage the checkbox, showing and hiding the correspond products
 */
function clickCheckBox() {
    if(flagPrice){
        setUp();
    }
    var allFalse = true;
    const states = {
        // key:value
        New: document.getElementById("New").checked,
        "Used but Like New": document.getElementById("Used but Like New")
            .checked,
        "Used but Good": document.getElementById("Used but Good").checked,
        "Used but Fair": document.getElementById("Used but Fair").checked,
    };
    for (var state in states) {
        if (states[state] == true) {allFalse = false;}
    }
    if (!allFalse) {
        for (let i = 0; i < cards.length; i++) {
            const cond = findProduct(cards[i].querySelector("p").innerHTML)
                .condition;
            states[cond] // --> value
                ? (cards[i].style.display = "inline-flex")
                : (cards[i].style.display = "none");
        }
    } else {
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.display = "inline-flex";
        }
    }
}


/**
 * @description Function responsible for manage the price filter, showing the products with correct order
 * @param x The order of sorting. 1 means from low to high, 2 means from high to low
 */
function sort(x){
    flagPrice = true;
    // The products display on the screen
    var productShowed = [];
    for (let i = 0; i < cards.length; i++) {
        var product = findProduct(cards[i].querySelector("p").innerHTML);
        if(cards[i].style.display != "none" ){
            productShowed[i] = product;
        }
    }
    console.log(productShowed);
    if(x==1){
        productShowed.sort(function (a, b) {
            return parseFloat(a.price) - parseFloat(b.price);
        });
    }else{
        productShowed.sort(function (a, b) {
            return parseFloat(b.price) - parseFloat(a.price);
        });
    }
    var temp = productShowed;
    removeDiv("card");
    for(let k = 0; k<temp.length; k++){
        //console.log(temp[k]!=null);
        if(temp[k]!=null){
            for(let j=0; j<products.length; j++){
                if(temp[k].name == products[j].name){
                    addProduct(temp[k].name,temp[k].price);
                }
            }
        }
    }
}


/**
 * @description Function responsible for showing the details of product
 * @param productID The id of clicked product
 */
function getDetails(productID){
    for(let i=0; i<products.length; i++){
        if(productID.includes(products[i].name)){
            console.log(productID);
            var myProduct = products[i];
            var div = document.createElement("div");
            div.id = products[i].name;
            div.className = "productDetails";
            //console.log(myProduct.name);
            div.innerHTML = 
            `
            <div class="productDetails-body" id="productDetails-body-${myProduct.name}">
                <p id="p-name-${myProduct.name}">Name: ${myProduct.name}</p>
                <p id="p-name-${myProduct.band}">Brand: ${myProduct.brand}</p>
                <p id="p-name-${myProduct.price}">Price: $ ${myProduct.price}</p>
                <p id="p-name-${myProduct.condition}">Condition: ${myProduct.condition}</p>
                <p id="p-name-${myProduct.location}">Location: ${myProduct.location}</p>
                <p id="p-name-${myProduct.description}">Description: ${myProduct.description}</p>
            </div>
            `;
            var id1 = "details-"+myProduct.name;
            var id2 = "productDetails-body-"+myProduct.name;
            document.getElementById(id1).appendChild(div);
            document.getElementById(id2).classList.toggle("show");
        }
    }
}


/**
 * @description Function responsible for adding products to the shopping cart
 */
function addToCart(id){
    tempNumber=number;
    number++;
    //console.log(id);
    for(let i=0; i<products.length; i++){
        if(id.includes(products[i].name)){
            if(products[i].name in productInCart){
                productInCart[products[i].name]++;
            }else{
                productInCart[products[i].name] = 1;
            }
        }
    }
    //console.log(productInCart);
    showProductNumber();
}


/**
 * @description Function responsible for managing the number of added product beside the cart icon
 */
function showProductNumber(){
    var div = document.getElementById("productQuantity");
    div.innerHTML = 
    `
    <p style="font-size:1rem;margin:0;text-align:center;line-height:35px;color:rgb(89, 91, 92)">(${number})</p>
    `;
}


/**
 * @description Function responsible for managing the shopping cart page
 */
function clickShoppingCart(){
    firstClickShoppingCart++;
    document.getElementById("find-page").classList.toggle("hide");
    document.getElementById("main-content").classList.toggle("hide");
    document.getElementById("btn").classList.toggle("hide");
    if(firstClickShoppingCart==1){
        const div = document.createElement("div");
        div.className = "myCart";
        div.id = "myCart";
        div.innerHTML = 
        `
        <div class="myCartList" id="myCartList">
            <p style="font-size:2rem;text-align:center;color:rgb(89, 91, 92)"> My Cart</p>
        </div>
        `;
        document.body.appendChild(div);
    }
    if(number==0 && firstClickShoppingCart==1){
        const div = document.createElement("div");
        div.className = "emptyCart";
        div.id = "emptyCart";
        div.innerHTML = 
        `
        <p>Your cart is empty</p>
        `;
        document.getElementById("myCartList").appendChild(div);
    }else{
        if(number>0){
            removeDiv("emptyCart");
        }
        if(number>tempNumber){
            removeDiv("cartItem");
            removeDiv("subtotal");
            for(let p in productInCart){
                showProduct(p);
            }
            tempNumber++;
            const div = document.createElement("div");
            div.className = "subtotal";
            div.id = "subtotal";
            div.innerHTML = 
            `
            <hr>
            <p>SUBTOTAL</p>
            <p>$ ${subtotal}</p>
            `;
            subtotal=0;
            document.getElementById("myCartList").appendChild(div);
        }
    }  
}


/**
 * @description Function responsible for showing the product info in shopping cart
 * @param product The name of product
 */
function showProduct(product){
    var p;
    for(let i=0; i<products.length; i++){
        if(products[i].name == product){
            p = products[i];
        }
    }
    subtotal+=p.price * productInCart[product];
    const div = document.createElement("div");
    div.className = "cartItem"
    div.id = "cartItem";
    div.innerHTML = 
    `
    <hr>
    <p>Name: ${p.name}</p>
    <p>Price: $ ${p.price * productInCart[product]}</p>
    <p>Quantity: ${productInCart[product]}</p>
    `;
    document.getElementById("myCartList").appendChild(div);
}


/**
 * @description Function responsible for showing the products according to the inputs in search bar
 */
function search(){
    let search = document.getElementById("search-box");
    let lowercaseSearch = search.value.toLowerCase();
    for (let i = 0; i < cards.length; i++) {
        let cardName = cards[i].querySelector("p").innerHTML;
        for (let j = 0; j < products.length; j++) {
            if (products[j].name == cardName) {
                if (cardName.toLowerCase().indexOf(lowercaseSearch) > -1) {
                    //will display all products with the searched string contained in the product name's string
                    //products[j].searchFlag = true;
                    cards[i].style.display = "inline-flex";
                } else {
                    //products[j].searchFlag = false;
                    cards[i].style.display = "none";
                }
            }
        }
    }
}