window.onload = function(){
    let cart = new Cart();
    cart.cartCount();

    window.addEventListener("storage",function(){
        let cart = new Cart();
        cart.cartCount();
    });
    
    /* all buttom */
    const all = document.querySelector(".all");

    all.addEventListener("click", function(){
        window.location = "./list/index.html";
    });

    /* comming soon */
    const items = document.querySelectorAll(".item");
    items[4].onclick = function(){
        alert('この商品の詳細ページまだ作っていないので、下のVIEW ALL押してください');
    }
    for (let i = 0; i < items.length - 1;i++){
        items[i].onclick = function(){
            window.location = `./list/item/item${i+1}/index.html`;
        }
    }
}