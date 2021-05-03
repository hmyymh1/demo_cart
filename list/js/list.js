window.onload = function() {
    let cart = new Cart();
    cart.cartCount();

    window.addEventListener("storage",function(){
        let cart = new Cart();
        cart.cartCount();
    })


    const $item = document.getElementsByClassName('item');

    for (let i = 0; i < 4; i++) {
        $item[i].onclick = function() {
            window.location = `./item/item${i+1}/index.html`;
        }
    }
}