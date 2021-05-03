window.onload = function() {
    let cart = new Cart();
    cart.cartCount();

    window.addEventListener("storage",function(){
        let cart = new Cart();
        cart.cartCount();
    })
    
    /* like */
    const like = document.querySelectorAll(".like img");

    for(let i = 0; i < like.length; i++){
        like[i].addEventListener("click", function(){
            if(this.getAttribute("src") == "img/header_icon_04.jpg"){
                this.setAttribute("src","img/like.jpg");
            }else{
                this.setAttribute("src","img/header_icon_04.jpg");
            }   
        })
    }

    /* itemList */
    var itemList = {};
    if(localStorage.getItem("itemList")){
        itemList = JSON.parse(localStorage.getItem("itemList"));    
    }

    /* cartadd */

    const cartAdd = document.querySelectorAll(".cart");

    for(let i = 0; i < cartAdd.length;i++){

        cartAdd[i].addEventListener("click",function(){
            let item = {}
            item.name = document.querySelector(".item_name").innerText;
            item.price = document.querySelector(".price").innerText.replace(/[^0-9]/ig,"");//非数字的部分替换
            item.color = this.parentNode.querySelector(".color").innerText;
            item.size = this.parentNode.querySelector(".size").innerText;
            item.id = item.name + item.color + item.size;
            item.img = 'img/item2.jpg'

            let itemID = item.id
            itemList[itemID] = item;

            localStorage.setItem("itemList",JSON.stringify(itemList));
    
            let cart = new Cart();//调用cart
            cart.saveData(itemID,1,false);
            cart.cartCount();

        }
    )}

    
}