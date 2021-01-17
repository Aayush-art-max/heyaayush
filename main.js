function responsive(){
    var x = document.getElementById("mytopnav");
    if( x.className === "topNav"){
        x.className += " responsive";
    }
    else{
        x.className = "topNav";
    }
};
// function myFunction() {
//     var x = document.getElementById("myTopnav");
//     if (x.className === "topnav") {
//       x.className += " responsive";
//     } else {
//       x.className = "topnav";
//     }
//   }// SCRIPTING CLOCK
setInterval ( () => {
    d = new Date();
    htime = d.getHours();
    mtime = d.getMinutes();
    stime = d.getSeconds();
    hrotation = 30*htime + mtime/2;
    mrotation = 6*mtime;
    srotation = 6*stime;

    hour.style.transform = `rotate(${hrotation}deg)`;
    minute.style.transform = `rotate(${mrotation}deg)`;
    second.style.transform = `rotate(${srotation}deg)`;
}, 1000);


// function getHistory() {
//     return document.getElementById("history-value").innerText;
// }

// function printHistory(num){
//     document.getElementById("history-value").innerText=num;
// }
// function getOutput(){
//     return document.getElementById("output-value").innerText;
// }
// function printOutput(num){
//     if(num===""){
//         document.getElementById("output-value").innerText=num;
//     }
//     else{
//         document.getElementById("output-value").innerText=getFormattedNumber(num);
//     }
// }
// function getFormattedNumber(num){
//     var n = Number(num);
//     var value = n.toLocaleString("en");
//     return value;
// }

// function reverseNumberFormat(num){
//     return Number(num.replace(/,/g,''));
// }
// var operator = document.getElementsByClassName("operator");
// for(var i =0;i<operator.length;i++){
//     operator[i].addEventListener('click',function(){
//         if(this.id=="clear"){
//             printHistory("");
//             printOutput("");
//         }
//         else if(this.id=="backspace"){
//             var output=reverseNumberFormat(getOutput()).toString();
//             if(output){
//                 output=output.substr(0,output.length-1);
//                 printOutput(output);
//             }
//         }
//         else{
//             var output=getOutput();
//             var history=getHistory();
//             if(output!=""){
//                 output=reverseNumberFormat(output);
//                 history=history+output;
//                 if(this.id=="="){
//                     var result = eval(history);
//                     printOutput(result);
//                     printHistory("");
//                 }
//                 else{
//                     history=history+this.id;
//                     printHistory(history);
//                     printOutput("");
//                 }
//             }
//         }
//     })
// }
// var number = document.getElementsByClassName("number");
// for(var i =0;i<operator.length;i++){
//     number[i].addEventListener('click',function(){
//         var output=reverseNumberFormat(getOutput());
//         if(output!=NaN){
//             output=output+this.id;
//             printOutput(output);
//         }
//     })
// }

let screen = document.getElementById('screen');
buttons = document.querySelectorAll('button');
let screenValue = '';
for (item of buttons) {
    item.addEventListener('click', (e) => {
        buttonText = e.target.innerText;
        console.log('Button text is ', buttonText);
        if (buttonText == 'X') {
            buttonText = '*';
            screenValue += buttonText;
            screen.value = screenValue;
        }
        else if (buttonText == 'C') {
            screenValue = "";
            screen.value = screenValue;
        }
        else if (buttonText == '=') {
            screen.value = eval(screenValue);
        }
        else {
            screenValue += buttonText;
            screen.value = screenValue;
        }

    })
}




// api key : 82005d27a116c2880c8f0fcb866998a0
// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//APP DATA
const weather = {};

weather.temperature = {
    unit: "celsius"
}

//CONSTS
const kelvin = 273;
const key = "b57c25718fb51255f3c09ddf7a080ba5";
//API KEY

//CHECKING BROWSERS
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser dosen't Support This Project</p>";
}

//SETTING UP USERS POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// SHOW ERROR
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message}</p>`;
}

//GET REPORT FROM API   
function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - kelvin);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });

}

//DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
