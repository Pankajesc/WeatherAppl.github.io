
const search =document.getElementById("search-bar");
const reload =document.getElementById("reload");
const cityName =document.getElementById("cityName");
const stateName =document.getElementById("stateName");
const countryName =document.getElementById("countryName");
const tempInC=document.getElementById("cels");
const tempInF=document.getElementById("fehr");
const logoImage=document.getElementById("logoImage");
const weatherStatus=document.getElementById("weatherStatus");
const main=document.getElementById("bg-img");
const humidity = document.getElementById("humidity");
const windSpeed= document.getElementById("wind");
const lastUpdate=document.getElementById("lastUpdate");
const feelsinC =document.getElementById("inCel");
const feelsinF =document.getElementById("infehr");
const visibility=document.getElementById("visibility");
const airIndex=document.getElementById("airIndex");
const currDate=document.getElementById("currDate");
const currTime=document.getElementById("currTime");
const forecastDay=document.querySelectorAll(".forecast-day")
const forecastImage=document.querySelectorAll(".forecast-image");
const forecastStatus=document.querySelectorAll(".forecast-status");
const foreinC=document.querySelectorAll(".foreinC");
const foreinF=document.querySelectorAll(".foreinF");
let data;

main.style.backgroundImage="url(./assets/img/main-img.jpg)";
main.style.backgroundRepeat="no-repeat";
main.style.backgroundSize="cover";
main.style.backgroundRepeat="no-repeat";



const getData= async(event)=>{
    event.preventDefault();
    if(!search.value){
        alert("Please! Enter the City Name");
        return;
    }

    const city=search.value;
    const fetchData =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7cd2b59fbda6460a8ee61920232602&q=${city}&days=14&aqi=yes`);

    const orgData = await fetchData.json();
    data = orgData;
    console.log(data);

    countryName.innerHTML = data.location.country;
    stateName.innerHTML = data.location.region;
    cityName.innerHTML = data.location.name;
    tempInC.innerHTML=data.current.temp_c;
    tempInF.innerHTML=data.current.temp_f;
    humidity.innerHTML = data.current.humidity;
    windSpeed.innerHTML = data.current.wind_mph;
    logoImage.src = data.current.condition.icon;
    weatherStatus.innerHTML = data.current.condition.text;
    lastUpdate.innerHTML=data.current.last_updated;
    feelsinC.innerHTML=data.current.feelslike_c;
    feelsinF.innerHTML=data.current.feelslike_f;
    visibility.innerHTML=data.current.vis_miles;
    airIndex.innerHTML=data.current.air_quality["us-epa-index"];
    
    // Current date and time
    const dateString =data.location.localtime;
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour=date.getHours();
    const minutes=date.getMinutes();
    const sec=date.getSeconds();
    const dayOfWeek = date.getDay();

    const dateFormatter = new Intl.DateTimeFormat(undefined, { weekday: 'long' });
     
    const newWD = dateFormatter.format(date);

    const newDate = `${newWD},${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;

    currDate.innerHTML=newDate;
      
    let amPm = hour < 12 ?'am':'pm';
    let hours=hour%12;
    hours=hours?hours:12;
    const newTime=`${hours}:${minutes.toString().padStart(2, "0")}${amPm}`
    currTime.innerHTML=newTime;

    // forecastImage.src=data.forecast.forecastday[0].day.condition.icon;
    // forecastStatus.innerHTML=data.forecast.forecastday[0].day.condition.text;
    // foreinC.innerHTML=data.forecast.forecastday[0].day.avgtemp_c;
    // foreinF.innerHTML=data.forecast.forecastday[0].day.avgtemp_f;


    
    for (let i = 0; i <= 9; i++) {
        forecastStatus[i].innerHTML=data.forecast.forecastday[i].day.condition.text;
        foreinC[i].innerText = data.forecast.forecastday[i].day.avgtemp_c;
        foreinF[i].innerText =data.forecast.forecastday[i].day.avgtemp_f;
        forecastImage[i].src = data.forecast.forecastday[i].day.condition.icon;

        const forecastdate=data.forecast.forecastday[i].date;
        const date = new Date(forecastdate);
        const fday = date.getDate(); 
        
        const fdateFormatter = new Intl.DateTimeFormat(undefined, { weekday: 'long' });
        const fnewWD = dateFormatter.format(date);
        const fnewDay=`${fnewWD}    ${fday}`
        forecastDay[i].innerHTML=fnewDay;
      };
    
    

    let timeOfday= "day";

    const code= data.current.condition.code;
    if(!data.current.is_day){
        timeOfday="night";
    }

    if(code==1000){
      main.style.backgroundImage=`url(./assets/${timeOfday}/sunny.jpg)`;
      main.style.backgroundSize = "cover";
      
    }
    else if(code==1003||
            code==1006||
            code==1009||
            code==1030||
            code==1069||
            code==1087||
            code==1135||
            code==1275||
            code==1276||
            code==1279||
            code==1282
            ){
                main.style.backgroundImage=`url(./assets/${timeOfday}/cloudy.jpg)`
                main.style.backgroundSize = "cover";
            }
     else if(code==1063||
             code==1069||
             code==1072||
             code==1150||
             code==1153||
             code==1180||
             code==1183||
             code==1186||
             code==1189||
             code==1192||
             code==1195||
             code==1204||
             code==1207||
             code==1240||
             code==1243||
             code==1246||
             code==1249||
             code==1252)
             {
              main.style.backgroundImage=`url(./assets/${timeOfday}/rainy.jpg)`
     }       
     else{
         main.style.backgroundImage=`url(./assets/${timeOfday}/snowy.jpg)`
     }
    }





