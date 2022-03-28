
let meals = [];
let prices = [];
let number = [];
let standardPrice = [];


function addToShoppingCart(name, price){

    if(meals.includes(name)){
        var position = meals.indexOf(name, 0);
        prices[position] = prices[position] + price;
        number[position] = number[position] + 1;
        render();
    } else {
        meals.push(name);
        prices.push(price);
        number.push(1);
        standardPrice.push(price);
        render();
    }
    
}


function render(){
    let shoppingCart = document.getElementById('shoppingCart');

    if(meals.length >= 0) {
        shoppingCart.innerHTML = '';
        document.getElementById('shopping_cart-footer').classList.remove('d-none');
        for (let i = 0; i < meals.length; i++) {
            shoppingCart.innerHTML += /*html*/ `
                <div class="shopping_cart-box">
                    <div class="shopping_cart-name"><span>${number[i]}x </span>${meals[i]}</div>
                    <div class="shopping_cart-icon-box">
                        <div onclick="reducePrice(${i})" class="shopping_cart-icon-container shopping_cart-icon-container-minus">
                            <img class="shopping_cart-icon-minus" src="./images/minus-gray.png">
                        </div>
                        <div onclick="raisePrice(${i})" class="shopping_cart-icon-container">
                            <img class="shopping_cart-icon-plus" src="./images/plus-gray.png">
                        </div>
                    </div>
                    <div class="shopping_cart-price">${prices[i]}€</div>
                    <img onclick="deleteMeal(${i})" class="shopping_cart-icon-trash" src="./images/trash-orange.png">
                </div>
            `;
        }
        updateShoppingCart();
    } 
    if(meals.length <= 0) {
        document.getElementById('shopping_cart-footer').classList.add('d-none');
        shoppingCart.innerHTML = /*html */ `
            <div class="shopping_cart-placeholder" id="placeholder">
                <img class="shopping_cart-placeholder-image" src="./images/shopping-basket.png" alt="shopping-basket">
                <h3 class="shopping_cart-placeholder-headline">Fülle deinen Warenkorb</h3>
                <p class="shopping_cart-placeholder-paragraph">Füge allerlei leckere Gerichte aus unserer Auswahl hinzu und bestelle dein Essen.</p>
            </div>
        `;
    }
}


function updateShoppingCart(){
    let sum = 0;

    for (let i = 0; i < prices.length; i++) {
        sum += prices[i];
    }

    document.getElementById('sum').innerHTML = `${sum} €`;

    if(sum < 50) {
        CalcWithDelivery(sum);
    } else {
        CalcWithoutDelivery(sum)
    }
}


function CalcWithDelivery(sum){
    document.getElementById('finalSum').innerHTML = `${sum + 7} €`;
    document.getElementById('paymentButton').innerHTML = `Bezahlen (${sum + 7} €)`;
    document.getElementById('paymentButtonResponsive').innerHTML = `Bezahlen (${sum + 7} €)`;
    document.getElementById('deliveryCosts').classList.remove('d-none-1');
}


function CalcWithoutDelivery(sum){
    document.getElementById('finalSum').innerHTML = `${sum} €`;
    document.getElementById('paymentButton').innerHTML = `Bezahlen (${sum} €)`;
    document.getElementById('paymentButtonResponsive').innerHTML = `Bezahlen (${sum} €)`;
    document.getElementById('deliveryCosts').classList.add('d-none-1');
}


function deleteMeal(i){
    meals.splice(i, 1);
    prices.splice(i, 1);
    number.splice(i, 1);
    render();
}


function raisePrice(i){
    prices[i] = prices[i] + standardPrice[i];
    number[i] = number[i] + 1;
    render();
}


function reducePrice(i){
    prices[i] = prices[i] - standardPrice[i];
    number[i] = number[i] - 1;
    control(i);
    render();
}


function control(i){
    if(number[i] <= 0){
        deleteMeal(i);
    }
}


function openShoppingCart() {
    document.getElementById('shoppingCartOuter').style.display = 'block';
}


function closeShoppingCart(){
    document.getElementById('shoppingCartOuter').style.display = 'none';
}