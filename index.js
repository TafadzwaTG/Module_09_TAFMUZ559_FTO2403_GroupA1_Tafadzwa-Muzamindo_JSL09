//const { response } = require("express");

//function displayRandomImage(){
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=graffiti")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
    })
.catch(error => {
    console.error("Error fetching image:",error);
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`;
    document.getElementById("author").textContent = "By: Dodi Achmad";
});
//}
 
function displayDogecoinData() {
    fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(response =>{
        if(!response.ok) {
            throw new Error("Something went wrong fectching Dogecoin data");
        }
        return response.json();
    
    })
    .then(data => {
    const currentPrice = (data.market_data.current_price.usd * 19.5).toFixed(2)
    const highPrice = (data.market_data.high_24h.usd * 19.5).toFixed(2); 
    const lowPrice = (data.market_data.low_24h.usd * 19.5).toFixed(2); 

    document.getElementById("crypto-top").innerHTML = `
    <img src=${data.image.small} />
    <span>${data.name}</span>`;

    document.getElementById("crypto").innerHTML += `
    <p>🎯: R${currentPrice}</p>
    <p>👆🏽: R${highPrice}</p>
    <p>👇🏼: R${lowPrice}</p> `;

})
.catch(error => {
    console.error("Error fetching Dogecoin data", error);
});
}

function getCurrentTime() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2,'0');
    const minutes = date.getMinutes().toString().padStart(2,'0');
    const seconds = date.getSeconds().toString().padStart(2,'0');
    document.getElementById("time").textContent = `${hours} :${minutes} :${seconds}`;
}
setInterval(getCurrentTime,1000);
