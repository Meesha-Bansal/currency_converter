const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

// Function to store conversion records
const storeConversion = (amount, from, to, result) => {
    let records = JSON.parse(localStorage.getItem("conversionRecords")) || [];
    const timestamp = new Date().toLocaleString();
    //   Ensure all values are stored as strings
      let record = {
        timestamp: timestamp,
        amount: amount.toString(),  // Convert to string
        from: from,
        to: to,
        result: result.toString()  // Convert to string
    };
    records.push({ timestamp, amount, from, to, result });
    localStorage.setItem("conversionRecords", JSON.stringify(records));
};

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
        try{
        let response = await fetch(URL);
        let data = await response.json();
        // console.log(data);
        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        // console.log(rate);
        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
            // Store conversion record
        storeConversion(amtVal, fromCurr.value, toCurr.value, finalAmount);
        }
        catch (error) {
            console.error("Error fetching exchange rate:", error);
        }
};
// Show stored records
document.addEventListener("DOMContentLoaded", () => {
    const viewRecordsBtn = document.getElementById("record-btn");
    const modal = document.getElementById("recordsModal");
    const recordsList = document.getElementById("recordsList");
    const closeBtn = document.querySelector(".close-btn");

    if (!viewRecordsBtn || !modal || !recordsList || !closeBtn) {
        console.error("One or more modal elements are missing in the HTML.");
        return;
    }

    const showRecords = () => {
        let records = JSON.parse(localStorage.getItem("conversionRecords")) || [];
        
        if (records.length === 0) {
            alert("No records found.");
            return;
        }

        console.log("Displaying records..."); // Debugging

        // Clear previous records before inserting new ones
        recordsList.innerHTML = "";

        // Populate the modal with stored records
        records.forEach((rec, index) => {
            let recordItem = document.createElement("p");
            recordItem.innerText = `${index + 1}. ${rec.timestamp} - ${rec.amount} ${rec.from} → ${rec.result} ${rec.to}`;
            recordsList.appendChild(recordItem);
        });

        // Display the modal
        modal.style.display = "block";
        modal.classList.add("show-modal"); // Add class for visibility
    };

     // Ensure the button works every time
    viewRecordsBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent any form submission interference
        console.log("View Records button clicked"); // Debugging
        showRecords();
    });


    // Close the modal when close button is clicked
    closeBtn.addEventListener("click", () => {
        console.log("Close button clicked"); // Debugging
        modal.style.display = "none";
        modal.classList.remove("show-modal"); // Remove class for visibility
    });

    // Prevent modal from closing when clicking inside the modal content
    document.querySelector(".modal-content").addEventListener("click", (event) => {
        event.stopPropagation();
    });

    // Close modal when clicking outside the modal
    modal.addEventListener("click", () => {
        modal.style.display = "none";
    });
});


        
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
            
window.addEventListener("load", () => {
    updateExchangeRate();
});

// let recordBtn = document.getElementById("record-btn");
// recordBtn.addEventListener("click", showRecords);


