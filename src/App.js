import { useEffect, useState } from 'react';
import './App.css';


function App() {
  function Cities(lat,lon){
    this.lat = lat 
    this.lon = lon
  } 
  const NewYork = new Cities(40.43,254);
  const Paris = new Cities(48.967,2.433);
  const Tokyo = new Cities(35.68,139.69);
  const London = new Cities(51.507,0);
  const [weather, setWeather] = useState({});
  const getCurrentWeatherUrl = (lat, lon)=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=186a122ba4a581eb439662e8336a2099`)
    .then((response)=>response.json())

    .then((response)=>{setWeather({name: response.name, temp:response.main.temp})})
  }
  
  const getCurrentCityWeather = ()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat;
      let lon;
      
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      getCurrentWeatherUrl(lat,lon);
           
    })
  }
  
function onClick(city){
  let lat = city.lat;
  let lon = city.lon;
  console.log(lat,lon);
  getCurrentWeatherUrl(lat,lon);

}
  useEffect(getCurrentCityWeather,[]);

  return (
    <div className="App">
      <div className="back">
        <div className='container'>
        <div className='city'>{weather.name}</div>
        <div className='temp'>{(weather.temp-273.15).toFixed(2)}℃ / {((weather.temp-273.15)*9/5+32).toFixed(2)}℉</div>
      </div>
      <div className='container2'>
      <button className='button' onClick={getCurrentCityWeather}>CurrentCity</button>
      <button className='button' onClick={()=>onClick(NewYork)}>NewYork</button>
      <button className='button' onClick={()=>onClick(Paris)}>Paris</button>
      <button className='button' onClick={()=>onClick(Tokyo)}>Tokyo</button>
      <button className='button' onClick={()=>onClick(London)}>London</button>
      </div>
      </div>
    </div>
  );
}

export default App;
