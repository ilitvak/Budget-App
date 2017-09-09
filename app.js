
// Budget Controller && get some data
var budgetController = (function(){
    
    // some code
})();







// Controls User Interface && where we input methods
var UIController = (function(){ 

// Created a method that will retrieve the input from our description box
    return {
        grabDescription : function(){
            var hold = document.querySelector(".add__description").value;
            return hold;
        }
    }

})();





// appController now has access to the other two modules. 
var appController = (function(BudgetCtrl, UICtrl){
    
    var ctrlAddItem = function(){
         // 1. Get the field input data
        UIController.grabDescription();
        
        // 2. add the item to the budget controller
        
        // 3. add the new item to the user interface
        
        // 4. calculate the budget
        
        // 5. display the budget on the UI
    }
    
    document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);
    
    // this return keypress happens on the global document
    
    document.addEventListener("keypress", function(event){
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
        
    });

    
})(budgetController, UIController);


