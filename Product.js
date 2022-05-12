// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js'
import { getDatabase,ref,set,push,onChildAdded } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiOIgOX6kUjSWbHMhVpi0UyzLTRbh4seM",
  authDomain: "sofia-export-online-shop.firebaseapp.com",
  databaseURL: "https://sofia-export-online-shop-default-rtdb.firebaseio.com",
  projectId: "sofia-export-online-shop",
  storageBucket: "sofia-export-online-shop.appspot.com",
  messagingSenderId: "402774801578",
  appId: "1:402774801578:web:13304467786dea6e8724d3",
  measurementId: "G-ZYTF4QWGVN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database=getDatabase();

const fetchResult=await fetch("./Products.json");
const data=await fetchResult.json();
const products=data.products;
const productName=window.localStorage.getItem("productName");

const html=products.map(product=>{
    if(product["name"]==productName){
        const availability=document.getElementById("availability");
    return `   <li>
    <div class="product">
        <div class="img-description">
        <img src="${product["image"]}" id="product-image">
        <div class="description">
        <h1>${product["name"]}</h1>
        <span>${product["description"]}</span>
        <img src="${product["brandImage"]}" id="brand-image">
        </div>
        </div>
        <div class="price-product">
            <div class="price">
            <span id="price-word">Цена:</span>
            <span id="price">${product["price"]}<span>
            </div>
            <div class="quantity">
            <span id="quantity-word">Количество:</span>
            <span id="quantity">${product["quantity"]}</span>
            </div>
            <div class="availability">
            <span id="availability">${product["availability"]}</span>
            </div>
            <div class="button">
            <button id="button"><i class="fas fa-shopping-cart"></i></button>
            </div>
        </div>
    </div>
    <div class="message-wrapper">
    <h2>Write a comment:</h2>
    <input id="input"/>
    </div> 
    <div id="comments">
        <header class="header-comments">
            <span>Отзиви</span>
        </header>
    </div>
    <h2>Rating:</h2>
    <ul id="rating">
        <li><i class="rating__star far fa-star"></i></li>
        <li><i class="rating__star far fa-star"></i></li>
        <li><i class="rating__star far fa-star"></i></li>
        <li><i class="rating__star far fa-star"></i></li>
        <li><i class="rating__star far fa-star"></i></li>
        <li><i class="rating__star far fa-star"></i></li>
    </div>
    </li>`
}}).join("");


document.getElementById("product-list").innerHTML=html;
const dataRef=ref(database,"messages/"+productName);
const mesRef=ref(database,"messages");
const inputField=document.getElementById("input");
inputField.addEventListener("change",(event)=>{
    const messageRef=push(dataRef);
    set(messageRef,{
        "username":window.localStorage.getItem("username"),
        "date":Date.now(),
        "text": event.target.value,
    });
    inputField.value="";
});
const messageList=document.getElementById("comments");

onChildAdded(dataRef,(data)=>{
    console.log(data.val());
    const message=data.val();
    const listItem=document.createElement("li");
    listItem.innerHTML=`
    <div class="comment-content">
    <div id="comment-content">
    <div class="comment-header">
        <span id="name">${message.username}</span>
        <span id="date">${new Date(message.date).toLocaleString()}</span>
    </div>
    <div class="comment-text">
        <p>${message.text}</p>
    </div>
    </div>`
    messageList.appendChild(listItem);
});

const secondDataRef=ref(database,"ratings/"+productName);
const stars=[...document.getElementsByClassName("rating__star")];
const starClassActive = "rating__star fas fa-star";
const starClassInactive = "rating__star far fa-star";
const starsLength = stars.length;
let i;
stars.map((star) => {
  star.onclick = () => {
    i = stars.indexOf(star);
    const ratingRef=push(secondDataRef);
    set(ratingRef,{
        "rating":i+1,
    });
    if (star.className===starClassInactive) {
      for (i; i >= 0; --i) stars[i].className = starClassActive;
    } else {
      for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
    }
  };
});
