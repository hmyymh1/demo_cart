window.onload = function() {

    let cart = new Cart();
    cart.cartTotal();


    window.addEventListener("storage",function(){
        let cart = new Cart();
        cart.cartTotal();
    });

    const $must = document.getElementsByClassName('must');
    const $cart_btn = document.querySelector(".cart_btn");
    const $input = document.getElementsByTagName('input');
    const tel = document.getElementById("tel");
    let adress = [];
    $cart_btn.addEventListener("click",function(){
        for(let i = 0; i < $must.length; i++) {
            if($must[i].value == null || $must[i].value == ""){
                return alert("入力内容の修正が必要です");
            }
        }
        if(!tel.value.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/)){
            return alert("電話番号の修正が必要です");
        }
        for(let i = 0; i < $input.length; i++) {
            adress[i] = $input[i].value;
        }
        localStorage.setItem('adress',JSON.stringify(adress));
        window.location = './orderConfirm/index.html';
    });
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