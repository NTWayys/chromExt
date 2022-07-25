function getCurrentTime() {
    const date = new Date()
    document.getElementById("timeDiv").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}
getCurrentTime()
setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weatherDiv").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});

document.getElementById("googleSearchBtn").addEventListener("click",() => {
    let mySearch =document.getElementById("googleSearch").value
    location.href = `https://www.google.com/search?q=${mySearch}`
})
document.getElementById("googleSearch").addEventListener("keypress", event => {
    if (event.key === "Enter") {
        console.log("click")
        let mySearch =document.getElementById("googleSearch").value
        location.href = `https://www.google.com/search?q=${mySearch}`
    } 
})


function getLastMonth() {

    const zeroPad = (num, places) => String(num).padStart(places, '0')
    
    const d = new Date();
    let prevMonth = zeroPad(d.getMonth(), 2);

    date = d.getFullYear()+"-"+prevMonth
    return (date)
}

fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=ef8c3cb55a2b5b56b810a1f5a8d7018a&&sort_by=vote_average.desc&with_original_language=en&language=en-US&primary_release_date.gte=${getLastMonth()}`)
.then(res => {
    if (!res.ok) {
        throw Error("Movie API not available")
    }
    return res.json()
})
.then(data => {
    const movieArr = data.results
    document.getElementById("movieContainer").style.backgroundImage = `url(https://image.tmdb.org/t/p/original${data.results[0].backdrop_path})`
    

    movieArrHtml = movieArr.map((movie,index) => {
        return{
            sidebar:
            `<div class="movie" style="background-image: url(https://image.tmdb.org/t/p/original/${movie.backdrop_path});">
                <div id="a${index}" class="dimmer">
                    <h3>${movie.original_title}</h3>
                    <div class="sideInfo">
                        <p>${movie.release_date}</p><p>${movie.popularity}</p>
                    </div>
                </div>
                <div id="a${index}" class="movieSelector"></div>
            </div>`,

            front:
            `<div>
                <h2>${movie.original_title}</h2>
                <div class="movieInformation">
                    <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="">
                <p>${movie.overview}</p>
                </div>
                <div> 
                    <a class="btn" href="https://www.google.com/search?q=${movie.original_title} ${new Date().getFullYear()}">Find on Google</a>
                </div>
            </div>`
    }})

    document.getElementById("movieContainer").innerHTML = movieArrHtml[0].front
    document.getElementById("movieList").innerHTML = movieArrHtml.map(movie => movie.sidebar).join("")

    Array.from(document.querySelectorAll(".movieSelector")).map(el => el.addEventListener("click", event => {
        movieArrHtml.map((movie,index) => {
            if("a"+index === event.target.id || "a"+index === event.parents ){
                document.getElementById("movieContainer").innerHTML = movieArrHtml[index].front
                console.log(movieArr)
                document.getElementById("movieContainer").style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movieArr[index].backdrop_path})`
            }
        })
    }))
})





