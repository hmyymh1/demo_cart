window.onload = function() {

    let cart = new Cart();
    cart.showList();
    cart.cartTotal();


    window.addEventListener("storage",function(){
        let cart = new Cart();
        cart.showList();
        cart.cartTotal();
    })

    const $cart_btn = document.querySelector(".cart_btn");
    $cart_btn.addEventListener("click",function(){
        if(localStorage.getItem("cartData") != null && localStorage.getItem("cartData") != "{}"){
            window.location = './order/index.html'
        }else{
            alert("カートに商品がありません｡")
        }
    })
}


/* 数字变成PRICE */
function price(e) {
    var price = []
    while(e > 999){
        if(e % 1000 < 10){
            price.unshift("00" + e % 1000);
        }else if(e % 1000 >= 10 && e % 1000 < 100){
            price.unshift("0" + e % 1000);
        }else{
            price.unshift(e % 1000);
        }
        e = parseInt(e / 1000);
    }
    return e + ',' + price + '円(税込)';
}