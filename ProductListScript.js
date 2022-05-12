
async function fetchData(){
const fetchResult=await fetch("./Products.json");
const data=await fetchResult.json();
const products=data.products;
products.sort(function(first,second){
    const firstData=new Date(first["data"]);
    const secondData=new Date(second["data"]);
    if(firstData.getTime()>secondData.getTime()) return -1;
    if(firstData.getTime()<secondData.getTime()) return 1;
    return 0;
});
const productList=products.map(product=>{
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
</li>`})
    .join("");
document.getElementById("product-list").innerHTML=productList;
const currentProduct=document.querySelectorAll('.product-name');
const arrProduct=Array.from(currentProduct);
arrProduct.forEach(product=>product.addEventListener("click",event=>{
    const curProduct=event.target;
    window.localStorage.setItem("productName",curProduct.text);
}));
}
fetchData();

const comments=document.getElementById("topComments");
const ratings=document.getElementById("topRating");
comments.addEventListener("click",(event)=>{window.localStorage.setItem("topTen","comments")});
ratings.addEventListener("click",(event)=>{window.localStorage.setItem("topTen","rating")});