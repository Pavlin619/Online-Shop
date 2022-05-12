import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
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
const loginBtn=document.getElementById("login-btn");
const emailInput=document.getElementById("email");
const passwordInput=document.getElementById("password");
const loginError=false;

function emptyInput(){
    emailInput.value="";
    passwordInput.value="";
}

loginBtn.addEventListener("click",(event)=>{
    var email=emailInput.value;
    var password=passwordInput.value;

    if(email==""||password==""){
        successfullLogin=false;
        alert("Please fullfill all the fields!");
        emptyInput();
    }
    else{
        const auth = getAuth();
       signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
         if(userCredential){
           var mail=email.split('@')[0];
           window.localStorage.setItem("username",mail);
           window.location.href="ProductListPage.html";
         }
       })
        .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorCode==='auth/wrong-password') alert('Wrong password.');
    else alert(errorMessage);
    });
        emptyInput();
}});

