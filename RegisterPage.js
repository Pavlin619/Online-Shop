
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
  import { getDatabase ,ref, push, set } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";
  import {getAuth,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCiOIgOX6kUjSWbHMhVpi0UyzLTRbh4seM",
    authDomain: "sofia-export-online-shop.firebaseapp.com",
    projectId: "sofia-export-online-shop",
    storageBucket: "sofia-export-online-shop.appspot.com",
    messagingSenderId: "402774801578",
    appId: "1:402774801578:web:00dcd20e6c9ec9658724d3",
    measurementId: "G-BTH0HZWM0X"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const dataRef=ref(database,"users");

const registerButton=document.getElementById("register-btn");
const emailInput=document.getElementById("email");
const firstPasswordInput=document.getElementById("password");
const secondPasswordInput=document.getElementById("second-password");
const checkbox=document.getElementById("checkbox");

function emptyInput(){
    emailInput.value="";
    firstPasswordInput.value="";
    secondPasswordInput.value="";
}

registerButton.addEventListener("click",(event)=>{
    const email=emailInput.value;
    const firstPassword=firstPasswordInput.value;
    const secondPassword=secondPasswordInput.value;

    if(firstPassword!==secondPassword){
        alert("You have not verified you password correctly! Please try again.");
        emptyInput();
    }
    else if(email==""||firstPassword==""||secondPassword==""){
        alert("Please fullfill all the fields!");
        emptyInput();
    }
    else if(!checkbox.checked){
alert("Please agree with the terms of the site");
emptyInput();
    }
    else{
        const auth = getAuth();
        console.log(auth);
createUserWithEmailAndPassword(auth, email, firstPassword).then((userCredential)=>{
  if(userCredential){
    var mail=email.split('@')[0];
    window.localStorage.setItem("username",mail);
    window.location.href="ProductListPage.html";
  }
})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorCode=='auth/weak-password'){
        alert("Your password is too weak!");
    }
    else alert(errorMessage);
  });
emptyInput();
}
});