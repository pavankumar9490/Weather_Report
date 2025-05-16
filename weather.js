let apikey = "3b27c7b1f2662c4bc4604fe7402797b9"
let cityName = document.getElementById("cityName")
let cityContainer = document.querySelector(".city-container")
let form = document.getElementById("form")

window.addEventListener("DOMContentLoader",()=>{
   const savedData=JSON.parse(localStorage.getItem(weattherData))
   savedData.forEach(displayWeather)
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apikey}&units=metric`
    console.log(api)
    fetch(api)
        .then((res) => {
            console.log(res)
            return res.json()
        })
        .then((res) => {
            console.log(res)
            if (res.cod === "404") {
                alert("City not found")
                return
            }
            const {name,sys,weather,main}=res
            const weatherObj={
                name,
                temp:main.temp,
                country:sys.country,
                weatherType:weather[0].main
            }
            console.log(weatherObj)
            let data=JSON.parse(localStorage.getItem("weatherData"))||[]
            data.push(weatherObj)
            localStorage.setItem("weatherData",JSON.stringify(data))
            displayWeather(weatherObj)
        })
})

function displayWeather(data){
    console.log(data)
    let div=document.createElement("div")
    div.classList.add("weather-card")
    div.innerHTML=
    `<h1 class="name">${data.name}</h1>
    <p class="temp">Temperture:${data.temp}</p>
    <p class="count">Country:${data.country}</p>

    `
    cityContainer.append(div)
}