const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
const cardName = document.querySelector("#card-name");
const cardNumber = document.querySelector("#card-number");
const cardDate = document.querySelector("#date");
// const cardYear = document.querySelector("#year");
const cardCVC = document.querySelector("#cvc");
const error = document.querySelector(".input-error");
const errorcvc = document.querySelector(".input-error-cvc");
const errornum = document.querySelector(".input-error-number");
const errordate = document.querySelector(".input-error-date");


const confirm = document.querySelector("#submit-btn");
const form = document.querySelector("#submit");   

const isRequired = value => value === "" ? false : true;
const isBetween = (lenght, min, max) => lenght > min && lenght < max ? false : true;

// const showError =  (input, message) =>{
//     //get the form-element
//     const formfield = input.parentElement;

//     //adding error classlist
//     formfield.classList.add("error-message");
//     //showerror message
//     const error= formfield.querySelector("small");
//     error.textContext = message;
   
// }
// const showSuccess =  (input) =>{
//     //get the form-element
//     const formfield = input.parentElement;

//     //remove error classlist
//     formfield.classList.remove("error-message");
//     //hide error message
//     const error= formfield.querySelector("small");
//     error.textContext = "";
   
// }
const validateName = () =>{
    let valid = false;
    
    const name =cardName.value.trim();

    if(!isRequired(name)){
        error.innerText = "name cant be blank";
        error.classList.add("error-message");
    }
    else if(!name.match(nameRegex)){
        error.innerText = "invalid name";
        error.classList.add("error-message");
    }
    else {
        error.innerText = "";
        error.classList.remove("error-message");;
        valid = true;
    }
    return valid;
}
const validateCardNumber = () =>{
    let valid = false;

    const number = cardNumber.value;
    const maxnum   = number.length

    if(!isRequired(number)){
        errornum.innerText = "card number cant be blank";
        errornum.classList.add("error-message");
    }

    else if(!(maxnum === 16)){
        errornum.innerText = "invalid card number";
        errornum.classList.add("error-message");
    }
    else {
        errornum.innerText = "";
        errornum.classList.remove("error-message");
        valid = true;
    }
    return valid;
}
const validateDate = () =>{
    let valid = false;
    
    const date = cardDate.value.trim();

    if(!isRequired(date)){
        errordate.innerText = "Date can't Be Blank";
        errordate.classList.add("error-message");
    }

    else {
        errordate.innerText = "";
        errordate.classList.remove("error-message");
  
        valid = true;
    }
    return valid;
}
// const validateYear = () =>{
//     let valid = false;
//     const min = 4;
//     const max =  4;

//     const year = cardYear.value.trim();

//     if(!isRequired(year)){
//         errordate.innerText = "year cant be blank";
//         errordate.classList.add("error-message");
  
//     }

//     else if(!isBetween(year.lenght, min, max)){
//         errordate.innerText = " invalid year";
//         errordate.classList.add("error-message");
  
//     }
//     else if(!month.match(dateRegex)){
//         errordate.innerText = " invalid year";
//         errordate.classList.add("error-message");
  
//     }
//     else {
//         errordate.innerText = " ";
//         errordate.classList.remove("error-message");
  
//         valid = true;
//     }
//     return valid;
// }

const validateCVC = () =>{
    let valid = false;
    // const min = 2;
    // const max =  4;
    
    const cvc = cardCVC.value;
    const maxl= cvc.length

    if(!isRequired(cvc)){
        errorcvc.innerText = " CVC cant be blank";
        errorcvc.classList.add("error-message");
  
    }
    else if(!(maxl > 2 & maxl < 4)){
        errorcvc.innerText = " invalid cvc";
        errorcvc.classList.add("error-message");
  
    }
    
    else {
        errorcvc.innerText = " ";
        errorcvc.classList.remove("error-message");
  
        valid = true;
    }
    return valid;
}

// const addSpace = () =>{
//     if(cardNumber.value.length > 0){
//         if(cardNumber.value.length % 4 == 0){
//             cardNumber.value += " "
//         }
//     }
// }

let complete = document.querySelector(".completed");
let section = document.querySelector(".right-sec");
form.addEventListener("submit", (e)=>{
    //prevent submission on default
    e.preventDefault();

    let validName = validateName();
    let validNumber = validateCardNumber();
    let validDate = validateDate();
    let validCVC = validateCVC();

    let validForm = validName && 
    validNumber &&
    validDate &&
    validCVC;

    if(validForm){
        section.style.display = "none";
        complete.style.display ="block";
    }

})
// function insertSpace(){
//     let str = cardNumber.value.split("").join("").split("");
//     let format =[]
//     while(str.length){
//         for(let i = 0; i === 4 && str.length; i++){
//             format.push(str.shift());
//         }
//         if(str.length){
//             format.push("")
//         }
//     } 
//     return format.join("")
// }
let print = document.querySelector("#print-card-name");
let printNum = document.querySelector("#print-card-number");
let printDate = document.querySelector("#print-card-date");
let printCVC =  document.querySelector("#print-card-cvc");

// cardName.addEventListener("change", () =>{
//     print.innerText = cardName.value;
// })
const debounce =(fn, delay = 3000) => {
    let timeoutId;
    return (...args)=>{
        //cancel old timer
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        //setup new timer
        timeoutId =setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    }
}

form.addEventListener("input", debounce(function (e) {
    switch(e.target.id){
        case 'card-name':
            validateName();
            print.innerText = cardName.value;
            break;
        case 'card-number':
            validateCardNumber();
            printNum.innerText = cardNumber.value;
            break;
        case 'date':
            validateDate();
            printDate.innerText = cardDate.value;
            break;
        case 'cvc':
            validateCVC();
            printCVC.innerText = cardCVC.value;
            break;
    }
}));

