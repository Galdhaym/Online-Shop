window.addEventListener('load', function() {
    var scriptController = document.createElement('script');
    document.body.appendChild(scriptController);
    scriptController.onload = function loadMainPageLogic() {
        checkEmptyCartRecords();
        cartMenu();
    
        var buttons = document.getElementsByClassName("add_to_cart");
        for(let button of buttons){
            button.addEventListener("click", sendRequestAddCartRecord);
        }

        var deleteButtons = document.getElementsByClassName("delete__button");
        for(let deleteButton of deleteButtons){
            deleteButton.addEventListener("click", sendRequestWithDelete);
        }
    }

    scriptController.src = "/add_to_cart_front_controller.js";
});