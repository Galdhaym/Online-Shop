

    function sendRequestAddCartRecord(){
        var parent = this.parentElement;
        var id = parent.children[0].value;
        var xhr = new XMLHttpRequest(); 
        xhr.open('GET', '/add-to-cart?id=' + id, true);
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.send();

        xhr.onload = function(){
            if(this.status === 200){
                addCartRecord(this.response);
            }
        }
    }

    function sendRequestWithDelete(){
        var parent = this.parentElement;
        var id = parent.children[0].value;
        var xhr = new XMLHttpRequest(); 
        xhr.open('GET', '/delete-from-cart?id=' + id, true);
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.send();

        xhr.onload = function(){
            if(this.status === 200){
                deleteCartRecord(id, "cartRecord");
                var cartRecordMain = document.getElementsByClassName("cartRecordMain");
                if(cartRecordMain){
                    deleteCartRecord(id, "cartRecordMain");
                }
                checkEmptyCartRecords();
            }
        }
    }

    function cartMenu(){
        var img = document.getElementById("cart_img");
        var menu = document.getElementsByClassName("cart_menu")[0];
        var container = document.getElementsByClassName("cart__logo")[0];

        container.addEventListener("mouseover", function(event){
                menu.setAttribute("class", "cart_menu active");
        });

        container.addEventListener("mouseout", function(event){
                menu.setAttribute("class", "cart_menu");
        });
    }

    function addCartRecord(jsonData){
        var data = JSON.parse(jsonData);
        var record = data.cartDBRecord;

        var cartRecordsElements = document.getElementsByClassName("cartRecord");
        var checkID = checkIDInExistRecords(cartRecordsElements, record);
        if(!checkID){
            createNewCartRecord(record);
        }
    }

    function createNewCartRecord(record){
        var cartRecord = document.createElement("div");
            cartRecord.className = "cartRecord";
            var img = document.createElement("img");
            img.className = "cart__image";
            img.src = "./images__for__products/" + record.ref_img + ".jpg";

            var textContainer = document.createElement("div");
            textContainer.className = "cart__text__container";

            var text = document.createElement("p");
            text.innerText = record.product;
            text.className = "cart__title";

            var cost = document.createElement("p");
            cost.innerText = record.count + "*" + record.cost;
            text.className = "cart__text";

            var form = document.createElement("form");
            form.className = "mainPage__cart__form";
            var FormID = document.createElement("input");
            FormID.value = record.id;
            FormID.type = "text";
            FormID.hidden = true;
            form.appendChild(FormID);

            var deleteButton = document.createElement("img");
            deleteButton.className = "delete__button";
            deleteButton.src = "./images/delete_bucket.png";
            deleteButton.addEventListener("click", sendRequestWithDelete);

            form.appendChild(deleteButton);

            cartRecord.appendChild(img);
            textContainer.appendChild(text);
            textContainer.appendChild(cost);
            cartRecord.appendChild(textContainer);
            cartRecord.appendChild(form);
            var cartContainer = document.getElementsByClassName("shop__cart__menu")[0];
            cartContainer.appendChild(cartRecord);
            checkEmptyCartRecords();
    }

    function checkIDInExistRecords(cartRecords, record){
        var input;
        var checkID = false;
        for(var cartRecord of cartRecords){
            var inputID = cartRecord.children[2].children[0];
            if(inputID.value == record.id){
                input = inputID;
                var cost = input.parentElement.parentElement;
                var container = cost.children[1];
                var costElem = container.children[1];
                costElem.innerText = record.count + "*" + record.cost;
                checkID = true;
                break;
            }
        }
        return checkID;
    }

    function checkEmptyCartRecords(){
        var length = document.getElementsByClassName("cartRecord").length;
        if(length == 0){
            var emptyCart = document.createElement("p");
            emptyCart.innerText = "Корзина пустая!";
            emptyCart.className = "empty__cart";
            var emptyMainCart = document.createElement("p");
            emptyMainCart.innerText = "Корзина пустая!";
            emptyMainCart.className = "empty__cart";
            var cartContainer = document.getElementsByClassName("shop__cart__menu")[0];
            var cartMainContainer = document.getElementsByClassName("cart__main__container")[0];
            cartContainer.appendChild(emptyMainCart);
            if(cartMainContainer){
                cartMainContainer.appendChild(emptyCart);
            }
            return true;
        }
        else{
            deleteEmptyCartRecord();
            return false;
        }
    }

    function deleteEmptyCartRecord(){
        var emptyCart = document.getElementsByClassName("empty__cart")[0];
        if(emptyCart){
            emptyCart.parentElement.removeChild(emptyCart);
        }
    }

    function findByIDRecords(id, elem){
        var cartRecords = document.getElementsByClassName(elem);

        for(var cartRecord of cartRecords){
            var inputID = cartRecord.children[2].children[0];
            if(inputID.value == id){
                inputID.parentElement.parentElement.remove(cartRecord);
                break;
            }
        }
    }

    function deleteCartRecord(id, elem){
        findByIDRecords(id, elem);
    }


