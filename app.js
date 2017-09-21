
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
    
    var calculateTotal = function(typeIncOrExp) {
        var sum = 0;
        
        // looping over an array using the forEach method
        data.allItems[typeIncOrExp].forEach(function(cur){
            sum += cur.value;
        });
        data.totals[typeIncOrExp] = sum;
    };
   
    var data = {
        allItems : {
            exp : [],
            inc : []
        },
        
        totals : {
            exp : 0,
            inc : 0
        },
        
        budget : 0,
        percentage : -1
    }
    
    return {
        // blue text : 
        // methods - since we are making them public
        
        addItems : function(type, des, val){
            var newItem, ID;
            
            // [1,2,3,4,5] next ID = 6
            // [1,2,4,6,8] next ID = 9 this one has some elements deleted
            
            // ID = last ID + 1 
            
            if(data.allItems[type].length > 0) {
                // Creates new ID
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                // if array is empty have the ID at 0
                ID = 0;
            }
            
            // Create new item for "inc" or "exp" type
            if(type === "exp") {
                newItem = new Expense(ID, des, val);    
            }
            
            else if(type === "inc"){
                newItem = new Income(ID, des, val);
            }
            
            // pushes either "inc" or "exp" new item into correct array 
            data.allItems[type].push(newItem);
            
            // return the new element
            return newItem;
        },
        
        calculateBudget : function(){
            // Calculate total income and expenses
            calculateTotal("exp");
            calculateTotal("inc");
            
            // Calculate the budget : Income - expense
            data.budget = data.totals.inc - data.totals.exp;
            
            // Calculate Percentage when inc > 0
            
            if(data.totals.inc > 0) {
                // Calculate % of income that we spent
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
            
        },
        
        getBudget : function(){
            return {
                budget : data.budget,
                totalInc : data.totals.inc,
                totalExp : data.totals.exp,
                totalPercentage : data.percentage
            }
        },
        
        testing : function(){
            console.log(data);
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
        addBtn : ".add__btn",
        incomeContainer : ".income__list",
        expenseContainer : ".expenses__list",
        incomeLabel : ".budget__income--value",
        expenseLabel : ".budget__expenses--value",
        percentageLabel : ".budget__expenses--percentage",
        budgetLabel: ".budget__value"
    }
    


    // Created a method that will retrieve the input from our description box
    
    // this return, returns an object and makes it public for other functions to access the GrabInput object and its methods & parameters.
    return {
        grabInput : function(){
            return {
                
                // typeIncOrExp returns a string of "inc" or "exp"
                
                typeIncOrExp : document.querySelector(DOMStrings.typeIncOrExp).value,
            
                // Returns the description user tpyed in
                
                description : document.querySelector(DOMStrings.description).value,
            
                // returns the $ amount user input
                
                value : parseFloat(document.querySelector(DOMStrings.value).value)
            }
        },
        
        
        addListItem : function(obj, type){
            
            var html, newHTML, element;
          
            // Create HTML string with placeholder text
            
            if(type === "inc") {
                element = DOMStrings.incomeContainer;
                
                html = ' <div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div> ' 
                
            }
            
            else if(type === "exp") {
                element = DOMStrings.expenseContainer;
                
                html = ' <div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div> '
                
            }
            
            // Replaces the placeholder text with some actual data
            
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);
            
            // Insert the HTML into the DOM
            // this element will either be an income or expense container
            document.querySelector(element).insertAdjacentHTML("beforeend", newHTML);
        },
        
        clearFields : function(){
            var fields, fieldsArr, clearDes, clearVal;
            
//            clearDes = document.querySelector(DOMStrings.description).value = "";
//            clearVal = document.querySelector(DOMStrings.value).value = "";
            
            fields = document.querySelectorAll(DOMStrings.description + ", " + DOMStrings.value);
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });
            
            
            // Focuses on the description box or 
            // document.querySelector(DOMStrings.description).focus;
            fieldsArr[0].focus();
            
        },
        
        updateGlobalBudget : function(obj){
                
            document.querySelector(DOMStrings.incomeLabel).textContent = "+ " + obj.totalInc;
            document.querySelector(DOMStrings.expenseLabel).textContent = "- " + obj.totalExp;
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            
            if( obj.percentageLabel > 0 ) {
                
                document.querySelector(DOMStrings.budgetPercetageValue).textContent = obj.percentageLabel + "%";  
                
            } else {
                
                document.querySelector(DOMStrings.percentageLabel).textContent = "--";
                
            }
            
            
        },
        
        // This object getDOMStrings becomes public since it is being returned as well. 
        getDOMStrings : function() {
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
            }
        });    
    };
    
    
    var updateBudget = function(){
        
        // 1. calculate the budget
        BudgetCtrl.calculateBudget();
        
        // 2. return the budget
        var budget = BudgetCtrl.getBudget();
        
        // 3. display the budget on the UI
        UICtrl.updateGlobalBudget(budget);
        
    };
    
    var ctrlAddItem = function(){
        
        var input, newItem;
        
        // 1. Get the field input data
        input = UICtrl.grabInput();
        
        if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. add the item to the budget controller
            newItem = BudgetCtrl.addItems(input.typeIncOrExp, input.description, input.value);

            // 3. add the new item to the user interface

            UICtrl.addListItem(newItem, input.typeIncOrExp);

            // 4. Clears the fields
            UICtrl.clearFields();

            // 5. Calculate and Update budget
            updateBudget();
        }
    };
    
    return {
        init: function(){
            console.log("Application has started");
            setUpEventListeners();
            
            // Resets all values
            UICtrl.updateGlobalBudget({
                budget: 0,
                totalInc : 0,
                totalExp : 0,
                totalPercentage : 0
            })
        }
    };
    
}) (budgetController, UIController);


// If this function with an object is never called the event listerners never start
appController.init();