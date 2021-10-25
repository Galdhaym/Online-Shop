window.addEventListener('load', function() {
    var scriptController = document.createElement('script');
    document.body.appendChild(scriptController);

    scriptController.onload = function loadOrderLogic(){
        var map;
        var service;

        function getOfficeValueWithoutBrackets(office){
            var startSymbol;
            var finalSymbol;
            for(var i = 0;i < office.length;i++){
                if(office[i] == "("){
                    startSymbol = i;
                }
                else if(office[i] == ")"){
                    finalSymbol = i;
                    office = office.slice(0, startSymbol) + office.slice(finalSymbol+1, office.length+1);
                    i = startSymbol;
                }
                if(office[i] == ":"){
                    office = office.slice(0, i) + office.slice(i+1, office.length + 1);
                    i = i - 1;
                }
            }
            return office;
        }

        function createMarker(place){
            var marker = new google.maps.Marker({
                map,
                position: place.geometry.location
            });
        }

        function initMap() {
            if(map == null){
                map = new google.maps.Map(document.getElementById("map"), {
                    center: { lat: -34.397, lng: 150.644 },
                    zoom: 18,
                });
            }
            service = new google.maps.places.PlacesService(map);
            
            var mapButton = document.querySelector(".showMap");
            google.maps.event.addDomListener(mapButton, "click", function showMap(){
                var town = document.getElementById("town__input").value;
                var office = document.getElementById("office__input").value;
                var officeWithoutBrackets = getOfficeValueWithoutBrackets(office);
                var officeQuery = officeWithoutBrackets + "," + town;
                const request = {
                    query: officeQuery,
                    fields: ["name", "geometry"],
                };
                service.findPlaceFromQuery(request, function(results, status){
                    if(status === google.maps.places.PlacesServiceStatus.OK){
                        map.setCenter(results[0].geometry.location);
                        createMarker(results[0]);
                    }
                });

                var mapElem = document.querySelector("#map");
                mapElem.style.display = "block";
            });
        }

        function showValidationMessage(elem){
                if(elem.id == "email"){
                    var text = document.querySelector("#email__text");
                    text.style.color = "red";
                    text.textContent = "Email is not correct!";
                }
                else if(elem.id == "surname"){
                    var text = document.querySelector("#surname__text");
                    text.style.color = "red";
                    text.textContent = "Surname must be not less two characters!";
                }
                else if(elem.id == "telephone"){
                    var text = document.querySelector("#telephone__text");
                    text.style.color = "red";
                    text.textContent = "Telephone must be not less ten characters and must contain the only numbers!";
                }
                else if(elem.id == "name"){
                    var text = document.querySelector("#name__text");
                    text.style.color = "red";
                    text.textContent = "Name must be not less two characters!";
                }

        }

        function clearMessagesContactInfo(){
            var errors = document.querySelectorAll(".validationText");
            for(var error of errors){
                error.textContent = "";
            }
            
        }

        function validateContactInfo(){
            clearMessagesContactInfo();
            var orderItem = document.querySelector(".order__item");
            var emailElem = orderItem.querySelector("#email");
            var email = emailElem.value;
            var surnameElem = orderItem.querySelector("#surname");
            var surname = surnameElem.value;
            var telephoneElem = orderItem.querySelector("#telephone");
            var telephone = telephoneElem.value;
            var nameElem = orderItem.querySelector("#name");
            var name = nameElem.value;
            
            var value = true;
            const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const regTelephone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            if(reg.test(email) == false){
                value = false;
                showValidationMessage(emailElem);
            }
            if(surname.length < 3){
                value = false; 
                showValidationMessage(surnameElem);
            }
            if(name.length < 3){
                value = false;
                showValidationMessage(nameElem);
            }
            if(regTelephone.test(telephone) == false){
                value = false;
                showValidationMessage(telephoneElem);
            }
            if(value){
                clearMessagesContactInfo();
            }
            return value;
        }

        async function validatePoshtaAdress(){

        }

        function validateExpressDelivery(){

        }

        function showFirstSlide(){
            var orderItems = document.querySelectorAll(".order__item");
            for(var i = 1;i < orderItems.length; i++){
                orderItems[i].style.display = "none";
            }
        }

        function checkSlideForm(){
            var orderItems = document.querySelectorAll(".order__item");
            var currentSlide = this.closest(".order__item");
            var checkboxes = orderItems[1].querySelector(".checkbox");
            if(orderItems[0] == currentSlide && validateContactInfo()){
                showNextSlideOfOrder(this);
            }
            else if(orderItems[1] == currentSlide){
                showNextSlideOfOrder(this);
            }
            else if(orderItems[2] == currentSlide){
                if(checkboxes[1].checked === true && validatePoshtaAdress()){
                    showNextSlideOfOrder(this)
                }
                else if(checkboxes[2].checked === true && validateExpressDelivery()){
                    showNextSlideOfOrder(this);
                }
            }
            else if(orderItems[3] == currentSlide){
                showNextSlideOfOrder(this);
            }
        }

        function showNextSlideOfOrder(currentNextButton){
            var orderItems = document.querySelectorAll(".order__item");
            var parentSlide = currentNextButton.closest(".order__item");
            var nextParent = parentSlide.nextElementSibling;

            for(var orderItem of orderItems){
                orderItem.style.display = "none";
            }

            nextParent.style.display = "block";
        }

        function showPrevSlideOfOrder(){
            var orderItems = document.querySelectorAll(".order__item");
            var parentSlide = this.closest(".order__item");
            var prevParent = parentSlide.previousElementSibling;

            for(var orderItem of orderItems){
                orderItem.style.display = "none";
            }

            prevParent.style.display = "block";
        }

        function onSearchOffices(){
            var officeValue = document.querySelector("#office__input").value;
            if(officeValue == ""){
                var list = document.querySelector(".autocomplete__list__offices");
                if(!list){
                    var list = document.querySelector(".autocomplete__list__offices.active");
                }
                else{
                    list.setAttribute("class","autocomplete__list__offices active");
                }
                var children = list.children;
                for(var child of children){
                    child.style.display = "";
                }
            }
            else{
                var list = document.querySelector(".autocomplete__list__offices.active");
                if(!list){
                    var list = document.querySelector(".autocomplete__list__offices");
                    list.setAttribute("class","autocomplete__list__offices active");
                }
                var children = list.children;
                var inputText = this.value.toUpperCase();
                for(var child of children){
                    var liValue = child.outerText.toUpperCase();
                    if(liValue.indexOf(inputText) > -1){
                        child.style.display = "";
                    }
                    else{
                        child.style.display = "none";
                    }
                }
            }
        }

        function onSelectItemOfListTowns(){
            var input = document.querySelector("#town__input");
            input.value = this.outerText;
            var officeInput = document.querySelector("#office__input");
            var body = document.querySelector("body");
            officeInput.addEventListener("click", onSearchOffices);

            body.addEventListener("click", function(){
                var list = document.querySelector(".autocomplete__list__offices.active");
                if(list && event.target != officeInput){
                    list.setAttribute("class","autocomplete__list__offices");
                }
            });

            officeInput.addEventListener("keyup", onSearchOffices);
            var list = document.querySelector(".autocomplete__list__towns.active");
            list.setAttribute("class","autocomplete__list__towns");

            onLoadOfficesFromNovaPoshta(input.value, showListElementsOffices);
        }

        function onSelectItemOfListOffice(){
            var input = document.querySelector("#office__input");
            input.value = this.outerText;
            var list = document.querySelector(".autocomplete__list__offices.active");
            list.setAttribute("class","autocomplete__list__offices");

            var showMapButton = document.querySelector(".showMap");
            if(!showMapButton){
                var showMapButton = document.createElement("button");
                showMapButton.className = "showMap";
                showMapButton.textContent = "show map";
                showMapButton.style.display = "block";
            }
            document.querySelector(".postOffice__part").after(showMapButton);
            initMap();
        }

        function showListElementsTowns(){
            var list = document.querySelector(".autocomplete__list__towns.active");
            if(list.hasChildNodes()){
                while(list.firstChild){
                    list.removeChild(list.firstChild);
                }
            }

            if(this.response.data.length != 0){
                var cities = this.response.data;
                for(var city of cities){
                    console.log(city.Description);
                    var li = document.createElement("li");
                    li.id = city.Description;
                    li.className = "listItem";
                    li.innerText = city.Description;
                    li.style.cursor = "pointer";
                    li.addEventListener("click", onSelectItemOfListTowns);
                    list.appendChild(li);
                }
            }
            else{
                var list = document.querySelector(".autocomplete__list__towns.active");
                list.setAttribute("class","autocomplete__list__towns");
            }

        }

        function showListElementsOffices(){
            var list = document.querySelector(".autocomplete__list__offices");
            
            if(!list){
                list = document.querySelector(".autocomplete__list__offices.active");
            }

            if(list.hasChildNodes()){
                while(list.firstChild){
                    list.removeChild(list.firstChild);
                }
            }

                var offices = this.response.data;
                for(var office of offices){
                    console.log(office.Description);
                    var li = document.createElement("li");
                    li.id = office.Description;
                    li.className = "listItem";
                    li.innerText = office.Description;
                    li.style.cursor = "pointer";
                    li.addEventListener("click", onSelectItemOfListOffice);
                    list.appendChild(li);
                }
        }

        function getRequestNovaPoshta(){
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.novaposhta.ua/v2.0/json/', true);
            xhr.setRequestHeader('Content-Type', "application/json");
            return xhr;
        }

        function onLoadCitiesFromNovaPoshta(cityName, callback){
           var data = {
            "modelName": "Address",
            "calledMethod": "getCities",
            "methodProperties": {
                "FindByString": cityName
            },
            "apiKey": "e38272aa0cb037d30416dd7773f10451"
           }
           var xhr = getRequestNovaPoshta();
           xhr.responseType = "json"; 
           xhr.send(JSON.stringify(data));
           xhr.onload = callback;
        }

        async function onLoadOfficesFromNovaPoshta(cityName, callback){
            var data = {
                "modelName": "AddressGeneral",
                "calledMethod": "getWarehouses",
                "methodProperties": {
                    "CityName":cityName
                },
                "apiKey": "e38272aa0cb037d30416dd7773f10451"
            }

            var xhr = getRequestNovaPoshta();
            xhr.responseType = "json"; 
            xhr.send(JSON.stringify(data));
            xhr.onload = callback;
        }

        function showListOfTowns(){
            var cityInputValue = document.querySelector("#town__input").value;

            var list = document.querySelector(".autocomplete__list__towns.active");
            if(!list){
                list = document.querySelector(".autocomplete__list__towns");
            }

            if(cityInputValue.length >= 2){
                list.setAttribute("class","autocomplete__list__towns active");
                onLoadCitiesFromNovaPoshta(cityInputValue, showListElementsTowns);
            }
            else{
                list.setAttribute("class","autocomplete__list__towns");
            }

        }

        function showPickUpChoice(){
            var slideContainer = document.createElement("div");
            slideContainer.className = "order__item";
            slideContainer.style.display = "none";

            var orderForm = document.createElement("div");
            orderForm.className = "order__form";
            orderForm.id = "order__form__3";
            orderForm.innerHTML = "<h2>Способ оплаты</h2><div class='checkbox'><input type='checkbox' id='cashPayment'><label for='cashPayment'>Оплата наличными</label></div>";

            var prevButton = document.createElement("button");
            prevButton.innerText = "Назад";
            prevButton.className = "prevButton";
            slideContainer.appendChild(orderForm);
            orderForm.after(prevButton);
            var orderButton = document.createElement("button");
            orderButton.innerText = "Оформить заказ";
            orderButton.className = "order__button";
            orderForm.after(orderButton);
            prevButton.addEventListener("click", showPrevSlideOfOrder);

            var slidesContainer = document.querySelector(".order__container");
            slidesContainer.appendChild(slideContainer);

            var checkbox = document.querySelector("#cashPayment");
            checkbox.checked = true;
            checkbox.disabled = true;
        };

        function showDeliveryServiceChoice(){
            var slideContainer = document.createElement("div");
            var slidesContainer = document.querySelector(".order__container");
            slideContainer.className = "order__item";
            slideContainer.style.display = "none";

            var orderForm = document.createElement("div");
            orderForm.className = "order__form";

            orderForm.innerHTML = `<h2 class = 'order__category__title'>Адрес доставки</h2>
            <div class = "town__part">
                <label>Выберите нас. пункт:</label>
                <div class = "town__container">
                    <input type = "text" id = "town__input" placeholder = "Выберите нас. пункт" autocomplete = "off"></input>
                    <ul class = "autocomplete__list__towns"></ul>
                </div>
            </div>
            <div class = "postOffice__part">
                <label>Выберите отделение:</label>
                <div class = "postOffice__container">
                    <input type = "text" id = "office__input" placeholder = "Все отделения" autocomplete = "off"></input>
                    <ul class = "autocomplete__list__offices"></ul>
                </div>
            </div>
            <div id = "map"></div>`;
            
            var prevButton = document.createElement("button");
            var nextButton = document.createElement("button");
            prevButton.innerText = "Назад";
            prevButton.className = "prevButton";
            nextButton.innerText = "Далее";
            nextButton.className = "nextButton";
            slideContainer.appendChild(orderForm);

            orderForm.after(prevButton, nextButton);
            prevButton.addEventListener("click", showPrevSlideOfOrder);
            nextButton.addEventListener("click", showNextSlideOfOrder);

            slidesContainer.appendChild(slideContainer);

            var townContainer = document.querySelector(".town__container");
            townContainer.addEventListener("keyup", showListOfTowns);

            ////Second Slide
            var slideContainerSecond = document.createElement("div");
            slideContainerSecond.className = "order__item";
            slideContainerSecond.style.display = "none";
            var orderFormSecond = document.createElement("div");
            orderFormSecond.className = "order__form";
            orderFormSecond.id = "order__form__5";

            orderFormSecond.innerHTML = `<h2>Способ оплаты</h2>
            <div class="checkbox">
                <input type="checkbox" id="deliveryPayment">
                <label for="deliveryPayment">Наложенный платеж</label>
            </div>
            <div class="checkbox">
                <input type="checkbox" id="LiqPAY">
                <label for="LiqPAY">LiqPAY</label>
            </div>`;
            
            slideContainerSecond.appendChild(orderFormSecond);
            var prevButtonSecond = document.createElement("button");
            prevButtonSecond.innerText = "Назад";
            prevButtonSecond.className = "prevButton";
            orderFormSecond.after(prevButtonSecond);
            prevButtonSecond.addEventListener("click", showPrevSlideOfOrder);

            slidesContainer.appendChild(slideContainerSecond);

            var deliveryPaymentCheckbox = document.querySelector("#deliveryPayment");
            var LiqPAYCheckbox = document.querySelector("#LiqPAY");

            deliveryPaymentCheckbox.checked = true;
            deliveryPaymentCheckbox.addEventListener("click", showWayOfPaymentMailDelivery);
            LiqPAYCheckbox.addEventListener("click", showWayOfPaymentMailDelivery);
        }

        function showWayOfPaymentMailDelivery(e){
            var deliveryPaymentCheckbox = document.querySelector("#deliveryPayment");
            var LiqPAYCheckbox = document.querySelector("#LiqPAY");
            if(this.checked == true){
                deliveryPaymentCheckbox.checked = false;
                LiqPAYCheckbox.checked = false;
                this.checked = true;
            }
            else{
                e.preventDefault();
            }
        }

        function showExpressDelivery(){
            var slideContainer = document.createElement("div");
            slideContainer.className = "order__item";
            slideContainer.style.display = "none";

            var orderForm = document.createElement("div");
            orderForm.className = "order__form";
            orderForm.id = "order__form__6";

            orderForm.innerHTML = `<h2 class = "order__category__title">Адрес доставки</h2>
            <label>Выберите область:</label>
            <label>
                <select>
                    <option value="chose_areas"> - Выберите область - </option>
                </select>
            </label>
            </br>
            <label>Выберите область город/село/смт:</label>
            <label>
                <select>
                    <option value="chose_areas"> - Выберите область город/село/смт - </option>
                </select>
            </label>
            </br>
            <input id = 'location'></input/>`;
            
            var prevButton = document.createElement("button");
            var nextButton = document.createElement("button");
            prevButton.innerText = "Назад";
            prevButton.className = "prevButton";
            nextButton.innerText = "Далее";
            nextButton.className = "nextButton";
            slideContainer.appendChild(orderForm);
            orderForm.after(prevButton, nextButton);
            prevButton.addEventListener("click", showPrevSlideOfOrder);
            nextButton.addEventListener("click", showNextSlideOfOrder);

            var slidesContainer = document.querySelector(".order__container");
            slidesContainer.appendChild(slideContainer);
            ////Second Slide
            var orderFormSecond = document.createElement("div");
            orderFormSecond.className = "order__form";
            orderFormSecond.id = "order__form__7";

            orderFormSecond.innerHTML = `<h2>Способ оплаты</h2>
            <div class="checkbox">
                <input type="checkbox" id="cashPayment">
                <label for="cashPayment">Оплата наличными</label>
            </div>
            <div class="checkbox">
                <input type="checkbox" id="LiqPAY">
                <label for="LiqPAY">LiqPAY</label>
            </div>`;
            
            var slideContainerSecond = document.createElement("div");
            slideContainerSecond.className = "order__item";
            slideContainerSecond.style.display = "none";

            slideContainerSecond.appendChild(orderFormSecond);
            var prevButtonSecond = document.createElement("button");
            prevButtonSecond.innerText = "Назад";
            prevButtonSecond.className = "prevButton";
            orderFormSecond.after(prevButtonSecond);
            prevButtonSecond.addEventListener("click", showPrevSlideOfOrder);

            slidesContainer.appendChild(slideContainerSecond);

            var cashPaymentCheckbox = document.querySelector("#cashPayment");
            var LiqPAYCheckbox = document.querySelector("#LiqPAY");

            cashPaymentCheckbox.checked = true;
            cashPaymentCheckbox.addEventListener("click", showWayOfPaymentExpressDelivery);
            LiqPAYCheckbox.addEventListener("click", showWayOfPaymentExpressDelivery);
        }

        function showWayOfPaymentExpressDelivery(e){
            var cashPaymentCheckbox = document.querySelector("#cashPayment");
            var LiqPAYCheckbox = document.querySelector("#LiqPAY");
            if(this.checked == true){
                cashPaymentCheckbox.checked = false;
                LiqPAYCheckbox.checked = false;
                this.checked = true;
            }
            else{
                e.preventDefault();
            }
        }

        function showSlides(e){
            var checkboxes = document.querySelectorAll(".checkbox input");
            if(this.checked == true){
                for(var checkbox of checkboxes){
                    checkbox.checked = false;
                }
                this.checked = true;
                showCurrentChoice(this);
            }
            else{
                e.preventDefault();
            }
        }

        function showCurrentChoice(currentElem){
            var slides = document.querySelectorAll(".order__item");
            var parent = slides[0].parentElement;
            var checkboxes = document.querySelectorAll(".checkbox input");

            for(var i = 2; i < slides.length; i++){
                parent.removeChild(slides[i]);
            }

            if(currentElem == checkboxes[0]){
                showPickUpChoice();
            }
            if(currentElem == checkboxes[1]){
                showDeliveryServiceChoice();
            }
            if(currentElem == checkboxes[2]){
                showExpressDelivery();
            }
        }

        function addEventListenersOnNextPrevButtonClickEvent(){
            var nextButtons = document.querySelectorAll(".nextButton");
            showFirstSlide();
            for(var nextButton of nextButtons){
                nextButton.addEventListener("click", checkSlideForm);
            }

            var prevButtons = document.querySelectorAll(".prevButton");
            for(var prevButton of prevButtons){
                prevButton.addEventListener("click", showPrevSlideOfOrder);
            }

            var checkboxes = document.querySelectorAll(".checkbox input");
            checkboxes[0].checked = true;
            for(var checkbox of checkboxes){
                checkbox.addEventListener("click", showSlides);
            }

            showPickUpChoice();
        }

        addEventListenersOnNextPrevButtonClickEvent();
    }

    scriptController.src = "/add_to_cart_front_controller.js";
});