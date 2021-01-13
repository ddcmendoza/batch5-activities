

let store = {
    name: "NBS",
    inventory: [],
    earnings: 0,
    addBook: function(title,quantity,value){
        this.inventory.push(new Book(title, quantity, value));
    },
    restockBook: function(title, quantity){
        for(let i = 0; i < this.inventory.length; i++){
            if(this.inventory[i].title === title){
                this.inventory[i].quantity += quantity;
                return;
            }
        }
        console.log("Cannot restock!");
    },
    sellBook: function(title, quantity){
        for(let i = 0; i < this.inventory.length; i++){
            if(this.inventory[i].title === title){
                if(this.inventory[i].quantity < quantity){
                    console.log("Only " + this.inventory[i].quantity + " stocks left!");
                    return;
                }
                else{
                    this.inventory[i].quantity -= quantity;
                    this.earnings += quantity * this.inventory[i].value;
                    return;
                }
            }
        }
        console.log(title + " out of stock!");
    },
    totalEarning: function(){
        console.log("Total Earnings: " + this.earnings);
        console.log("Store Name: " + this.name);
    },
    listInventory: function(){
        for(let i = 0; i < this.inventory.length; i++){
            console.log("Title: " + this.inventory[i].title);
            console.log("Quantity: " + this.inventory[i].quantity);
            console.log("Value: " + this.inventory[i].value);
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        }
    }
}


class Book{
    constructor(title, quantity, value){
        this.title = title;
        this.quantity = quantity;
        this.value = value;
    }
}

store.addBook("HP",25, 500);
store.addBook("LoTR",50, 1000);