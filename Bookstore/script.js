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
                return 1;
            }
        }
        console.log("Cannot restock!");
        return 0;
    },
    sellBook: function(title, quantity){
        for(let i = 0; i < this.inventory.length; i++){
            if(this.inventory[i].title === title){
                if(this.inventory[i].quantity < quantity){
                    console.log("Only " + this.inventory[i].quantity + " stocks left!");
                    return this.inventory[i].quantity;
                }
                else{
                    this.inventory[i].quantity -= quantity;
                    this.earnings += quantity * this.inventory[i].value;
                    return "success";
                }
            }
        }
        console.log(title + " out of stock!");
        return 0;
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

/* store.addBook("HP",25, 500);
store.addBook("LoTR",50, 1000); */

// With DOM:

const NAME = document.getElementsByClassName("store-name")[0];
const EARNING = document.getElementsByClassName("earnings")[0];
const ADD = document.getElementsByClassName("add")[0];
const RESTOCK = document.getElementsByClassName("restock")[0];
const BUY = document.getElementsByClassName("buy")[0];
const INVENTORY = document.getElementsByClassName("inventory")[0];
const SHOW = document.getElementsByClassName("show-earnings")[0];

NAME.innerHTML = store.name;

ADD.addEventListener("click",() =>{
    let title = prompt("Title of Book:");
    let quantity = parseInt(prompt("Quantity:"));
        while(isNaN(+quantity)){
            quantity = prompt("Quantity must be a number!");
        }
    let value = parseInt(prompt("Value:"));
        while(isNaN(+value)){
            value = prompt("Quantity must be a number!");
        }
    store.addBook(title,quantity,value);
    displayInventory();
});

RESTOCK.addEventListener("click",()=>{
    let title = prompt("Title:");
    let quantity = parseInt(prompt("Quantity:"));
        while(isNaN(+quantity)){
            quantity = prompt("Quantity must be a number!");
        }
    let res = store.restockBook(title,quantity);
    if(res === 0){
        alert("Book not in inventory yet!");
    }
    else if(res === 1){
        alert(title + " restocked successfully!")
    }
    displayInventory();
});

BUY.addEventListener("click",()=>{
    let title = prompt("Title:");
    let quantity = parseInt(prompt("Quantity:"));
        while(isNaN(+quantity)){
            quantity = prompt("Quantity must be a number!");
        }
    let res = store.sellBook(title,quantity);
    if(res === "success"){
        alert(title + " bought successfully!");
    }
    else if(res === 0){
        alert(title + " is out of stock!");
    }
    else{
        alert(title + " has only " + res + " stocks left!");
    }
    displayInventory();
});

SHOW.addEventListener("click",()=>{
    if(EARNING.style.display == 'inline')    {
        EARNING.style.display = 'none';
        SHOW.innerHTML = "Display Earnings";
    }
    else {
        EARNING.style.display = 'inline';
        SHOW.innerHTML = "Hide Earnings";
    }   
});

function displayInventory(){
    INVENTORY.innerHTML = '';
    for(let i = 0; i < store.inventory.length; i++){
        let e = document.createElement("div");
        e.classList.add("books")
        let h = document.createElement("h2");
        h.innerHTML = store.inventory[i].title;
        e.appendChild(h);
        let q = document.createElement("p");
        q.innerHTML = "Quantity: " + store.inventory[i].quantity;
        e.appendChild(q);
        let v = document.createElement("p");
        v.innerHTML = "Value: " + store.inventory[i].value;
        e.appendChild(v);
        INVENTORY.appendChild(e);
    }
    EARNING.innerHTML = "Php " + store.earnings;
}