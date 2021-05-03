// All cards
var cards = document.getElementsByClassName("card");
// Flag of price filter, flag is false before clicking
var flagPrice = false;


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