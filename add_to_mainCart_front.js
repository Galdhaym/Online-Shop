window.addEventListener('load', function() {
    var scriptController = document.createElement('script');
    document.body.appendChild(scriptController);
    
    scriptController.onload = function loadCartPageLogic() {
        function sendRequestButtonDeleteMainCartRecord(){
            var parent = this.parentElement;
            var inputID = parent.children[0].value;
            var xhr = new XMLHttpRequest(); 
            xhr.open('GET', '/cart/deleteCartRecord?id=' + inputID, true);
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.send();

            xhr.onload = function(){
                if(this.status === 200){
                    deleteMainCartRecord(parent);
                    deleteCartRecord(inputID, "cartRecord");
                    if(checkEmptyCartRecords()){
                        removeSumOrderContainer();
                        document.body.removeChild(document.querySelector(".remove__cart"));
                    }
                    setSumOrder();
                }
            }
        }

        function deleteMainCartRecord(parent){
            var mainCartRecord = parent.parentElement;
            mainCartRecord.parentElement.removeChild(mainCartRecord);
        }

        function addEventListenerDeleteOnButtonMainCart(){
            var deleteButtons = document.getElementsByClassName('mainCart__delete__button');
            for(var deleteButton of deleteButtons){
                deleteButton.addEventListener("click", sendRequestButtonDeleteMainCartRecord);
            }
        }
        
        function findRecordByID(id, costVal, countVal){
            var cardRecords = document.getElementsByClassName("cartRecord");
            for(var cardRecord of cardRecords){
                var inputId = cardRecord.children[2].children[0];
                var inputIdValue = inputId.value
                if(inputIdValue == id){
                    var count = inputId.parentElement.parentElement.children[1].children[1];
                    count.textContent = countVal + "*" + costVal;
                    break;
                }
            }
        }

        function setSumMainCart(inputCount, cost, sum){
            sum.textContent = inputCount * cost;
        }

        function setSumOnCartLoad(){
            var cardRecords = document.getElementsByClassName("cartRecordMain");
            for(var i = 0; i < cardRecords.length; i++){
                var count = document.querySelectorAll(".cartRecordMain .main__cart__form .count__container input")[i].value;
                var cost = document.querySelectorAll(".cartRecordMain .main__cart__form .cost__container .costValue")[i].textContent;
                var sum = document.querySelectorAll(".cartRecordMain .main__cart__form .sum__cost__container .sumCostValue")[i];
                setSumMainCart(count, cost, sum);
            }
        }

        function setSumOrder(){
            var sums = document.querySelectorAll(".sumCostValue");
            var allSum = 0;
            for(var sum of sums){
                var sumValue = Number(sum.textContent);
                allSum = allSum + sumValue;
            }
            var allSumField = document.querySelector(".all__sum__order__value");
            allSumField.textContent = allSum;
        }

        function removeSumOrderContainer(){
            document.body.removeChild(document.querySelector(".all__sum__container"));
        }
        
        function sendRequestButtonIncreaseCountProduct(){
            var countContainer = this.parentElement.parentElement;
            var input = countContainer.parentElement.parentElement.children[0];
            var inputID = input.value;
            var inputCount = countContainer.children[0].value;
            if(!isNaN(inputCount)){
                var inputCount = Number(inputCount) + 1;
                countContainer.children[0].value = inputCount;
                if(inputCount > 1000){
                    countContainer.children[0].value = 1000;
                    return;
                }
                else if (inputCount < 1){
                    countContainer.children[0].value = 1;
                    return;
                }

                var sumContainer = countContainer.parentElement.parentElement.children[3].children[1];
                var cost = countContainer.parentElement.parentElement.children[2].children[1].textContent;
                setSumMainCart(inputCount, cost, sumContainer);
                findRecordByID(inputID, cost, inputCount);
                setSumOrder();

                var xhr = new XMLHttpRequest(); 
                xhr.open('GET', '/cart/increaseCount?count=' + inputCount + "&id=" + inputID, true);
                xhr.setRequestHeader('Content-Type','application/json');
                xhr.send();

                xhr.onload = function(){
                    if(this.status === 200){
                        console.log("success");
                    }
                }
            }
        }

        function sendRequestButtonDecreaseCountProduct(){
            var countContainer = this.parentElement.parentElement;
            var input = countContainer.parentElement.parentElement.children[0];
            var inputID = input.value;
            var inputCount = countContainer.children[0].value;
            if(!isNaN(inputCount)){
                var inputCount = Number(inputCount) - 1;
                countContainer.children[0].value = inputCount;

                if(inputCount > 1000){
                    countContainer.children[0].value = 1000;
                    return;
                }
                else if (inputCount < 1){
                    countContainer.children[0].value = 1;
                    return;
                }

                var sumContainer = countContainer.parentElement.parentElement.children[3].children[1];
                var cost = countContainer.parentElement.parentElement.children[2].children[1].textContent;
                setSumMainCart(inputCount, cost, sumContainer);
                findRecordByID(inputID, cost, inputCount);
                setSumOrder();

                var xhr = new XMLHttpRequest(); 
                xhr.open('GET', '/cart/decreaseCount?count=' + inputCount + "&id=" + inputID, true);
                xhr.setRequestHeader('Content-Type','application/json');
                xhr.send();

                xhr.onload = function(){
                    if(this.status === 200){
                        console.log("success");
                    }
                }
            }
        }
        

        function sendRequestInputChangeCountProduct(event){
            if(event.keyCode == 48 || event.keyCode == 49 || event.keyCode == 50 || event.keyCode == 51 ||
               event.keyCode == 52 || event.keyCode == 53 || event.keyCode == 54 || event.keyCode == 55 ||
               event.keyCode == 56 || event.keyCode == 57 || event.keyCode == 96 || event.keyCode == 97 ||
               event.keyCode == 98 || event.keyCode == 99 || event.keyCode == 100 || event.keyCode == 101 ||
               event.keyCode == 102 || event.keyCode == 103 || event.keyCode == 104 || event.keyCode == 105 ||
               event.keyCode == 8){
                var countContainer = this.parentElement;
                var count = this;
                var input = count.parentElement.parentElement.parentElement.children[0];
                var inputID = input.value;
                var inputCount = count.value;

                if(!isNaN(inputCount)){
                    if(inputCount > 1000 || inputCount < 1){
                        return;
                    }

                var sumContainer = countContainer.parentElement.parentElement.children[3].children[1];
                var cost = countContainer.parentElement.parentElement.children[2].children[1].textContent;
                    setSumMainCart(inputCount, cost, sumContainer);
                    findRecordByID(inputID, cost, inputCount);
                    setSumOrder();

                    var xhr = new XMLHttpRequest(); 
                    xhr.open('GET', '/cart/changeCount?count=' + inputCount + "&id=" + inputID, true);
                    xhr.setRequestHeader('Content-Type','application/json');
                    xhr.send();

                    xhr.onload = function(){
                        if(this.status === 200){
                            console.log("success");
                        }
                    }
                }
            }
        }

        function deleteCart(){
            var cartMainContainer = document.querySelector(".cart__main__container");
            var cartContainer = document.querySelector(".shop__cart__menu");
            var cartMainRecords = document.querySelectorAll(".cartRecordMain");
            var cartRecords = document.querySelectorAll(".cartRecord");

            for(var cartMainRecord of cartMainRecords){
                cartMainContainer.removeChild(cartMainRecord);
            }

            for(var cartRecord of cartRecords){
                cartContainer.removeChild(cartRecord);
            }
        }

        function sendDeleteCartRequest(){
            var xhr = new XMLHttpRequest(); 
            xhr.open('GET', '/cart/removeCart', true);
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.send();

            xhr.onload = function(){
                if(this.status === 200){
                    deleteCart();
                    checkEmptyCartRecords();
                    removeSumOrderContainer();
                    document.body.removeChild(document.querySelector(".remove__cart"));
                }
            }
        }

        function addEventListenerForCountButtons(){
            var plusButtons = document.getElementsByClassName("plus__count");
            var minusButtons = document.getElementsByClassName("minus__count");
            var cartRecords = document.getElementsByClassName("cartRecordMain");

            for(var plusButton of plusButtons){
                plusButton.addEventListener("click", sendRequestButtonIncreaseCountProduct);
            }

            for(var minusButton of minusButtons){
                minusButton.addEventListener("click", sendRequestButtonDecreaseCountProduct);
            }

            for(var cartRecord of cartRecords){
                var input = cartRecord.children[2].children[1].children[1].children[0];
                input.addEventListener("keyup", sendRequestInputChangeCountProduct);
            }

        }

        function addEventListenerForDeleteCartButton(){
            var cartDeleteButton = document.querySelector(".remove__cart");
            cartDeleteButton.addEventListener("click", sendDeleteCartRequest);
        }

        if(checkEmptyCartRecords()){
            document.body.removeChild(document.querySelector(".remove__cart"));
            removeSumOrderContainer()
        }
        else{
            addEventListenerForDeleteCartButton();
        }
        cartMenu();

        var deleteButtons = document.getElementsByClassName("delete__button");
        for(let deleteButton of deleteButtons){
            deleteButton.addEventListener("click", sendRequestWithDelete);
        }


        setSumOnCartLoad();
        setSumOrder();
        addEventListenerDeleteOnButtonMainCart();
        addEventListenerForCountButtons();
    }

    scriptController.src = "/add_to_cart_front_controller.js";
});