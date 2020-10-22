window.addEventListener("load", ()=>{
    let long;
    let lat;
    let tempdescription = document.querySelector(".description");
    let tempdegree = document.querySelector(".temp-degree");
    let locationtimezone = document.querySelector(".location-timezone");
    let icon;
    let temperaturesection=document.querySelector(".degree-section");
    let temperatureSpan=document.querySelector(".degree-section span");
    let body=document.querySelector("body");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api =`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=455fc3151bb75638285e3f8e077ac805`;
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp, humidity}=data.main;
                const {description}=data.weather[0];
                
                if(humidity<30){
                    icon="SLEET";
                }
                else if(humidity>70){
                    icon="RAIN";
                }
                else{
                    icon="CLOUDY";
                }

                //Set DOM elements from API
                tempdegree.textContent=Math.floor(temp-273);
                tempdescription.textContent=description;
                locationtimezone.textContent=data.name;

                if((temp-273)>20){
                    body.classList.add('warm');
                }

                
                //Formula for Celsius
                let fahrenheit = ((temp-273)*(9/5))+32;
                //Set Icon
                seticons(icon,document.querySelector(".icon"));

                //change temp to C or F
                
                temperaturesection.addEventListener("click", () =>{
                    
                        
                        
                    if(temperatureSpan.textContent==="F"){
                        temperatureSpan.textContent="C";
                        tempdegree.textContent=Math.floor(temp-273);

                    }else{
                        temperatureSpan.textContent="F";
                        tempdegree.textContent=Math.floor(fahrenheit);
                    }

                    
                });
            });
        });
        
    }
    
    

    function seticons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});