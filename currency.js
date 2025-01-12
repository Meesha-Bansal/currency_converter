// const BASEURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";
// const BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';
// const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/eur.min.json";
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");
// for (code in countryList){
//     console.log(code, countryList[code]);
// }

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "USD";
            }
            else{
                if(select.name === "to" && currCode === "INR"){
                    newOption.selected = "INR";
                }
            }
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);    
    });
}
const updateFlag =(element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = 'https://flagsapi.com/${countryCode}/flat/64.png';
    let img = element.parentElement.querySelector("img");
    img.src = newSrc.replace("${countryCode}", countryCode);
}
/*
async function getUsdInrRate() {
    // This url will give you currencies UDS/XXX
    
    // Fetch data and get INR rate
    // tocurrvalue = toCurr.value.toLowerCase(); 
    // fromcurrvalue = fromCurr.value.toLowerCase();
    // console.log(fromcurrvalue, tocurrvalue)
    const url = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json'
    const inr = await fetch(url)
        .then(response => response.json())
        .then(data => data['usd'].inr)

    console.log(inr)
}
getUsdInrRate()
*/

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
        }
        // const URL = '${}/usd.min.json'
        BASE_URL= 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';
        const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.min.json`;
        let response = await fetch(URL);
        let data = await response.json();
        // console.log(data);
        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        // console.log(rate);
        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
        };
        
        btn.addEventListener("click", (evt) => {
            evt.preventDefault();
            updateExchangeRate();
            });
            
            window.addEventListener("load", () => {
                updateExchangeRate();
                });
/*
btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval<1 || amtval ===""){
        amtval = 1;
        amount.value = "1";
    }
    console.log(fromCurr.value, toCurr.value);
    // const URL = '${BASEURL}/${fromCurr}/${toCurr}.json';
})*/
