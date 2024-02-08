let dishes = [
    {
        name: "Pizzabrot",
        description: "Pizza ohne Belag &#128521;\n",
        ingredients: "Knoblauch und Olivenöl",
        price: 3.50,
        amount: 1,
        additionalInfo: "Kann Allergene enthalten",
        mealMiniImage: './img/pizzabrot.jpg'
    },
    {
        name: "Bruschetta",
        description: "Scheibenbrot garniert mit verschiedenem Gemüse",
        ingredients: "Frische Tomaten, Mozzarella, frisches Basilikum, Knoblauch",
        price: 5.99,
        amount: 1,
        additionalInfo: "Kann Allergene enthalten",
        mealMiniImage: './img/bruschetta.png'
    },
    {
        name: "Spaghetti Aglio e Olio",
        description: "Der Klassiker unter den Pastagerichten",
        ingredients: "Olivenöl, Knoblauch, pikanter Peperoni, Tomaten, Oliven und Basilikum",
        price: 9.95,
        amount: 1,
        additionalInfo: "Kann Allergene enthalten",
        mealMiniImage: './img/aglioeolio.jpg'
    },
    {
        name: "Trio Pasta al Forno",
        description: "Für alle die nicht genug bekommen können &#129316;",
        ingredients: "3 Nudelsorten mit Bolognese-Sahnesauce und Käse überbacken",
        price: 10.95,
        amount: 1,
        additionalInfo: "Kann Allergene enthalten",
        mealMiniImage: './img/alforno.jpg'
    },
    {
        name: "Pizza Milano Spezial",
        description: "Mit allem was wir haben",
        ingredients: "Salami, Schinken, frischen Champignons, Paprika, Zwiebeln, Oliven, milden Peperoni, Sardellen, Kapern, Ei ",
        price: 13.45,
        amount: 1,
        additionalInfo: "Kann Allergene enthalten",
        mealMiniImage: './img/pizza.png'
    },
    {
        name: "Coca-Cola 0,5l",
        description: "Coca-Cola steht für einzigartigen Geschmack und erfrischende Momente.",
        ingredients: "Farbstoffe, Koffein, Säuerungsmittel",
        price: 3.5,
        amount: 1,
        additionalInfo: "Kann Allergene enthalten",
        mealMiniImage: './img/cola.png'
    },
];

let finalBasketMeals = [];
let finalBasketPrices = [];
let finalBasketAmounts = [];
let currency = '€';
let deliveryCost = '1.95';

function renderMenu() {
    document.getElementById('meals').innerHTML = ``;
    for (let i = 0; i < dishes.length; i++) {
       const meals = dishes[i];
       let formattedPrice = meals['price'].toFixed(2).replace('.', ',');
       
       document.getElementById('meals').innerHTML += `
           <div class="mealDescription" id="mealDescription${i}">
                <div class="wholeMeal">
                    <h2 class="mealName" id="mealName">
                        ${meals['name']}
                        <img src="./img/info.png" alt="information" class="mealInfo" onclick="openInfoContainer()">
                    </h2>
                    <p class="dishDescription">
                        ${meals['description']}
                    </p>
                    <p class="mealIngredients">
                        <span>Zutaten: </span>${meals['ingredients']}
                    </p>
                    
                    <h3 id="dishPrice" class="dishPrice">
                        ${formattedPrice}
                        ${currency}
                    </h3>
                </div>
                <div class="mealImage">
                    <img src="${meals['mealMiniImage']}" alt="pommes">
                </div>
                <div id="addToBasket" class="addToBasket addButton">
                    <img src="./img/plus.png" alt="" onclick="addToBasket(${i})">
                </div>
                <div id="addToBasket" class="addToBasket bottomAddButton">
                    <img src="./img/plus.png" alt="" onclick="addToBasket(${i})">
                </div>
           </div>
       `;
    }
}

function addToBasket(i) {
    const meal = finalBasketMeals;
    const prices = finalBasketPrices;
    const amounts = finalBasketAmounts;
    let index = finalBasketMeals.indexOf(finalBasketMeals[i]);
    
    if (index === -1) {
        meal.push(dishes[i]['name']);
        prices.push(dishes[i]['price']);
        amounts.push(dishes[i]['amount']);
    }
    else {
        finalBasketAmounts[i]++;
    }
    saveLocalBasket();
    renderShoppingCart();
    calculatePrice();
}

function renderShoppingCart() {
    const prices = finalBasketPrices;
    const amounts = finalBasketAmounts;
    
    document.getElementById('innerBasket').innerHTML = ``;
    
    for (let i = 0; i < finalBasketAmounts.length; i++) {
        let menuMidSum = (prices[i] * amounts[i]).toFixed(2).replace('.', ',');
        let j = dishes.findIndex(e => e.name === finalBasketMeals[i]);
        document.getElementById('innerBasket').innerHTML += /*html*/ `
            <div id="addedToCart_${i}" class="addedToCart">
                <div class="leftSection">
                    <span>
                        ${finalBasketAmounts[i]} &nbsp;
                    </span>
                    <span>
                        ${finalBasketMeals[i]}
                    </span>
                </div>
            
                <div class="midSection">
                    <div class="buttons">
                        <button>
                            <img src="./img/more.png" alt="plus_orange" onclick="addToBasket(${i})">
                        </button>
                        <button>
                            <img src="./img/less.png" alt="minus_orange" onclick="decreaseAmount(${i})">
                        </button>
                    </div>
                </div>
                
                <div class="rightSection">
                    <div class="price">
                        <span>
                            ${menuMidSum}
                            ${currency}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }
}
function calculatePrice() {
    if (finalBasketPrices.length === finalBasketAmounts.length) {
        let midSum = 0;
        
        for (let index = 0; index < finalBasketPrices.length; index++) {
            midSum += finalBasketPrices[index].toFixed(2) * finalBasketAmounts[index].toFixed(2);
        }
        let sumOfAllInCart = midSum.toFixed(2).replace('.', ',');
        
        document.getElementById('innerBasket').innerHTML += `
            <div id="totalPrice" class="totalPrice">
                <table>
                    <tr>
                        <td>Gesamtpreis:</td>
                        <td id="totalSum">${sumOfAllInCart}&nbsp;${currency}</td>
                    </tr>
                </table>
            </div>
        `;
    }
    saveLocalBasket();
}

function decreaseAmount(i) {
    finalBasketAmounts[i]--;
    if (finalBasketAmounts[i] > 0) {
        saveLocalBasket();
    }
    else if (finalBasketAmounts[i] <= 0){
        finalBasketAmounts.splice(i, 1);
        finalBasketMeals.splice(i, 1);
        finalBasketPrices.splice(i, 1);
        document.getElementById(`addedToCart_${i}`).remove();
        saveLocalBasket();
    }
    renderShoppingCart();
    calculatePrice();
}

function saveLocalBasket() {
    let localAmounts = JSON.stringify(finalBasketAmounts);
    let localMeals = JSON.stringify(finalBasketMeals);
    let localPrices = JSON.stringify(finalBasketPrices);
    
    localStorage.setItem('personalLocalAmounts', localAmounts);
    localStorage.setItem('personalLocalMeals', localMeals);
    localStorage.setItem('personalLocalPrices', localPrices);
}

function loadLocalBasket() {
    let localAmounts = localStorage.getItem('personalLocalAmounts');
    let localMeals = localStorage.getItem('personalLocalMeals');
    let localPrices = localStorage.getItem('personalLocalPrices');
    
    if (localAmounts && localMeals && localPrices) {
        finalBasketAmounts = JSON.parse(localAmounts);
        finalBasketMeals = JSON.parse(localMeals);
        finalBasketPrices = JSON.parse(localPrices);
    }
    else console.log('Fehler beim Speichern');
}

function openInfoContainer() {
    document.getElementById('mealInfoDialog').classList.remove('d-none');
}

function closeInfoContainer() {
    document.getElementById('mealInfoDialog').classList.add('d-none');
}

function openMobileCart() {
    //document.getElementById('closeButton').classList.remove('d-none');
    document.getElementById('basketContainer').classList.toggle('renderedMobileCart');
}

function closeMobileCart() {
    document.getElementById('basketContainer').classList.toggle('d-none');
    //document.getElementById('closeButton').classList.add('d-none');
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        closeInfoContainer();
        closeMobileCart();
    }
    else if (evt.key === 'Enter') { }
});

function init() {
    renderMenu();
    includeHTML();
    loadLocalBasket();
    renderShoppingCart();
    calculatePrice();
}

