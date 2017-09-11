
// Budget Controller && get some data
var budgetController = (function(){
    
    // Create a main object that other objects will pilfer from
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
   
    var data = {
        allItems : {
            exp : [],
            inc : []
        },
        totals : {
            exp : 0,
            inc : 0
        }
    }
    
    
})();


// Controls User Interface && where we input methods
var UIController = (function(){ 
    
    // This is a private var in the UIController
    var DOMStrings = {
        typeIncOrExp : ".add__type",
        description : ".add__description",
        value : ".add__value",
        addBtn : ".add__btn"
    }

    // Created a method that will retrieve the input from our description box
    
    // this return, returns an object and makes it public for other functions to access the GrabInput object and its methods & parameters.
    return {
        grabInput : function(){
            return {
                // typeIncOrExp returns Income ( + ) or Expenses ( - )
                typeIncOrExp : document.querySelector(DOMStrings.typeIncOrExp).value,
            
                // Returns the description user tpyed in
                description : document.querySelector(DOMStrings.description).value,
            
                // returns the $ amount user input
                value : document.querySelector(DOMStrings.value).value
            }
        },
        
        // This object getDOMStrings becomes public since it is being returned as well. 
        getDOMStrings : function(){
            return DOMStrings;
        }
    }

})();





// appController now has access to the other two modules. 
var appController = (function(BudgetCtrl, UICtrl){
    
    var setUpEventListeners = function(){
        
        // This DOMStrings variables is storing the UIControllers variable (same name) with all the properties and values
        var DOMStrings = UICtrl.getDOMStrings();
        
        document.querySelector(DOMStrings.addBtn).addEventListener("click", ctrlAddItem);
    
        // this return keypress happens on the global document
    
        document.addEventListener("keypress", function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
                console.log("Enter Key Pressed");
            }
        });
    };
    
    var ctrlAddItem = function(){
        // 1. Get the field input data
        var input = UICtrl.grabInput();
        
        // 2. add the item to the budget controller
        
        // 3. add the new item to the user interface
        
        // 4. calculate the budget
        
        // 5. display the budget on the UI
    };
    
    return {
        init: function(){
            console.log("Application has started");
            setUpEventListeners();
        }
    };
    
}) (budgetController, UIController);


// If this function with an object is never called the event listerners never start
appController.init();
