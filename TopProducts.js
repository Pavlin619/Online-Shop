import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js'
import { getDatabase,ref,get,child } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js'
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

const secondDataRef=ref(database,"ratings");
const currentTop=window.localStorage.getItem("topTen");
const fetchResult=await fetch("./Products.json");
const data=await fetchResult.json();
const products=data.products;
var messageMap=new Map();
if(currentTop==="comments"){
products.map(element => {
   messageMap.set(element["name"],0);
}).join("");
const dataRef=ref(database);
 await get(child(dataRef,'messages')).then((snapshot)=>{
    if(snapshot.exists()){
    for(var [key,value] of Object.entries(snapshot.val())){
        var currentCounter=0;
        for(var [innerKey,innerValue] of Object.entries(value)){
            currentCounter++;
        }
        messageMap.set(key,currentCounter);
    }    
    }
});
var newMap= new Map([...messageMap.entries()].sort((a, b) => b[1] - a[1]));
var counter=0;
newMap.forEach((value,key)=>{
    var current=key;
    counter++;
    console.log(counter);
    var productList=products.map(product=>{
        if(product["name"]==current&&counter<=10){
        return `<li class="list-item">
        <div class="product-container">
            <div class="img-name">
            <img src="${product["image"]}" class="product-img">
            <a class="product-name" href="Product.html">${product["name"]}</a>
            </div>
            <footer class="product-footer">
            <div class="img-description">
                <img src="${product["brandImage"]}" class="footer-img">
                <span>${product["description"]}</span>
            </div>
             <span id="price">${product["price"]}</span>
             <div>
             
             <button><i class="fas fa-shopping-cart"></i>Добавяне в количката</button>
             </div>
            </footer>
        </div>
    </li>`}}).join("")
    document.getElementById("product-list").innerHTML+=productList;
    const currentProduct=document.querySelectorAll('.product-name');
const arrProduct=Array.from(currentProduct);
arrProduct.forEach(product=>product.addEventListener("click",event=>{
    const curProduct=event.target;
    window.localStorage.setItem("productName",curProduct.text);
}));
});
}
else{
    products.map(element => {
        messageMap.set(element["name"],0);
     }).join("");
     const dataRef=ref(database);
      await get(child(dataRef,'ratings')).then((snapshot)=>{
         if(snapshot.exists()){
         for(var [key,value] of Object.entries(snapshot.val())){
             var currentCounter=0;
             for(var [innerKey,innerValue] of Object.entries(value)){
                 currentCounter++;
             }
             messageMap.set(key,currentCounter);
         }    
         }
     });
     var newMap= new Map([...messageMap.entries()].sort((a, b) => b[1] - a[1]));
     var counter=0;
     newMap.forEach((value,key)=>{
         var current=key;
         counter++;
         console.log(counter);
         var productList=products.map(product=>{
             if(product["name"]==current&&counter<=10){
             return `<li class="list-item">
             <div class="product-container">
                 <div class="img-name">
                 <img src="${product["image"]}" class="product-img">
                 <a class="product-name" href="Product.html">${product["name"]}</a>
                 </div>
                 <footer class="product-footer">
                 <div class="img-description">
                     <img src="${product["brandImage"]}" class="footer-img">
                     <span>${product["description"]}</span>
                 </div>
                  <span id="price">${product["price"]}</span>
                  <div>
                  
                  <button><i class="fas fa-shopping-cart"></i>Добавяне в количката</button>
                  </div>
                 </footer>
             </div>
         </li>`}}).join("")
         document.getElementById("product-list").innerHTML+=productList;  
         
         const currentProduct=document.querySelectorAll('.product-name');
const arrProduct=Array.from(currentProduct);
arrProduct.forEach(product=>product.addEventListener("click",event=>{
    const curProduct=event.target;
    window.localStorage.setItem("productName",curProduct.text);
}));
     });
}

