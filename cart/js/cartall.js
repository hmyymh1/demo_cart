class Cart {
    constructor(){
        //判断cartData是否有数据
        if(localStorage.getItem("cartData")) {
            this.cartData = JSON.parse(localStorage.getItem("cartData"));
        }else {
            this.cartData = {};
        }

        
        /* console.log(this.cartData); */
    }


    saveData(itemID,num,flag){ //flag为ture num为终值,flag为false num累加
        if(!this.cartData[itemID] || flag) {
            this.cartData[itemID] = num;
        }else {
            this.cartData[itemID] += num;
            if(this.cartData[itemID] > 9){
                this.cartData[itemID] = 9;
            }
        }

        /* console.log(this.cartData); */


        localStorage.setItem("cartData",JSON.stringify(this.cartData));
    }
    
    showList() {

        const $cartList = document.querySelector(".cartList");
        
        let str = "";
        let itemList= JSON.parse(localStorage.getItem("itemList"));
        /* console.log(itemList); */
        for (let id in this.cartData) {
            str += 
                `<div class="itemWapper" itemID="${id}">
                    <div class="itemImg"></div>
                    <div class="itemBox">
                        <p class="txt1">BRAND</p>
                        <p class="txt2 item_name">${itemList[id].name}</p>
                        <p class="txt3">カラー：${itemList[id].color} / サイズ：${itemList[id].size}</p>
                        <table>
                            <tr>
                                <th>価格</th>
                                <th>数量</th>
                                <th>小計(税込)</th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>${price(itemList[id].price)}</td>
                                <td>
                                    <select name="" id="" >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                    </select>
                                </td>
                                <td class="itemTotal">${price(itemList[id].price * this.cartData[id])}</td>
                                <td class="delete">削除</td>
                            </tr>
                        </table>
                    </div>
                </div>`
        }

        if(localStorage.getItem("cartData") != null && localStorage.getItem("cartData") != "{}"){
            $cartList.innerHTML = str;
        }else{
            $cartList.innerHTML = `<p style="color:red">　※　カートに商品がありません｡</p>`;
        }


        for (let id in this.cartData) {
            this.div = document.querySelector('[itemID=' + id + ']');
            console.log(this.div);
            
            this.img = this.div.querySelector('.itemImg');
            this.img.style.background = `url("${itemList[id].img}")`;
            this.img.style.backgroundSize = 'cover';
            
            this.option = this.div.querySelectorAll('option');
            for (let i = 0; i < this.option.length; i++){

                if (this.option[i].value == this.cartData[id]){
                    this.option[i].selected = true;
                }else{
                    this.option[i].selected = false;
                }
            }

            this.select = this.div.querySelector('select');
            this.select.onchange = function(){
                let cart = new Cart();
                cart.saveData(id, parseInt(this.value),true);
                
                this.parentNode.parentNode.querySelector('.itemTotal').innerHTML = cart.itemTotal(id);
                
                cart.cartTotal();
            }

            this.delete = this.div.querySelector('.delete');
            this.delete.onclick = function(){
                let cart = new Cart();
                cart.deleteData(id);
                $cartList.removeChild(this.parentNode.parentNode.parentNode.parentNode.parentNode);

                cart.cartTotal();
                cart.showList();
            }
        }

    }

    deleteData(itemID) {
        delete this.cartData[itemID];
        localStorage.setItem("cartData",JSON.stringify(this.cartData));
    }

    itemTotal(itemID) {
        let itemList= JSON.parse(localStorage.getItem("itemList"));
        return price(itemList[itemID].price * this.cartData[itemID]);
    }

    cartTotal() {
        let itemList= JSON.parse(localStorage.getItem("itemList"));
        this.Total = null;
        for (let itemID in this.cartData){
            this.Total += itemList[itemID].price * this.cartData[itemID];
        }

        const cartTotal = document.getElementsByClassName('cartTotal');
        for(let i = 0; i < cartTotal.length; i++) {
            if(localStorage.getItem("cartData") != null && localStorage.getItem("cartData") != "{}"){
                cartTotal[i].innerHTML = price(this.Total);
            }else{
                cartTotal[i].innerHTML = '0円(税込)';
            }
        }
    }

    showConfirmList(){
        const $cartList = document.querySelector(".cartList");
        
        let str = "";
        let itemList= JSON.parse(localStorage.getItem("itemList"));
        /* console.log(itemList); */
        for (let id in this.cartData) {
            str += 
                `<div class="itemWapper" itemID="${id}">
                    <div class="itemImg"></div>
                    <div class="itemBox">
                        <p class="txt1">BRAND</p>
                        <p class="txt2 item_name">${itemList[id].name}</p>
                        <p class="txt3">カラー：${itemList[id].color} / サイズ：${itemList[id].size}</p>
                        <table>
                            <tr>
                                <th>価格</th>
                                <th>数量</th>
                                <th>小計(税込)</th>
                            </tr>
                            <tr>
                                <td>${price(itemList[id].price)}</td>
                                <td>${this.cartData[id]}</td>
                                <td class="itemTotal">${price(itemList[id].price * this.cartData[id])}</td>
                            </tr>
                        </table>
                    </div>
                </div>`
        }

        if(localStorage.getItem("cartData") != null && localStorage.getItem("cartData") != "{}"){
            $cartList.innerHTML = str;
        }else{
            $cartList.innerHTML = `<p style="color:red">　※　カートに商品がありません｡</p>`;
        }

        for (let id in this.cartData) {
            this.div = document.querySelector('[itemID=' + id + ']');

            this.img = this.div.querySelector('.itemImg');
            this.img.style.background = `url("${itemList[id].img}")`;
            this.img.style.backgroundSize = 'cover';
        };

        const $adressConfirm = document.querySelector('.adressConfirm')
        let adress = JSON.parse(localStorage.getItem("adress"));
        $adressConfirm.innerHTML = 
            `<h3>お届け先情報</h3>
            <table>
                <tr>
                    <th>氏名</th>
                    <td>${adress[1]+ "&nbsp&nbsp&nbsp&nbsp" +adress[2]}</td>
                </tr>
                <tr>
                    <th>住所</th>
                    <td>${adress[4] + adress[5] + adress[6] + adress[7]}</td>
                </tr>
                <tr>
                    <th>電話番号</th>
                    <td>${adress[8]}</td>
                </tr>
            </table>`
        
    }

    cartCount(){
        const $cartCount = document.querySelector('.cartCount')
        let num = 0;

        for (let id in this.cartData){
            num += this.cartData[id];
        }
        if(num == 0){
            $cartCount.style.display = 'none';
        }else if(num > 0 && num <= 9){
            $cartCount.style.display = 'flex';
            $cartCount.innerHTML = num;
        }else{
            $cartCount.style.display = 'flex';
            $cartCount.innerHTML = "...";
        }
    }
}