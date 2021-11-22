const fs = require('fs');
const axios = require('axios');

class Search {
    history = new Array();
    pathFile = './database/data.json';

    constructor(){
        this.readData();
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es',
        };
    }

    get historyCapitalize(){
        return this.history.map( location => {
            let words = location.split( ' ' );
            words = words.map( word =>  word[0].toUpperCase() + word.substring(1) );
            return words.join(' ');
        });
    }
    
    async searchCity( place = "" ){
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json?`,
                params: this.paramsMapbox,
            });
            const result = await instance.get();
            return result.data.features.map( lugar => ({
                id: lugar.id,
                place_name: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));
        } catch ( error ) {
            console.log( error )
        }
    }

    async getWeather( lon, lat ){
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    appid: process.env.OPENWEATHER_KEY,
                    lang: 'es',
                    units: 'metric',
                    lon: lon,
                    lat: lat
             },       
            });
            
            const result = await instance.get();

            const { temp, temp_min, temp_max } = result.data.main;
            
            return{
                desc: result.data.weather[0].description,
                min: temp_min,
                max: temp_max,
                temp: temp
            };  
        } catch ( error ) {
            console.log( error );
        }
    }

    addHistory( place = '' ){
        if( this.history.includes( place.toLowerCase() ) ) return;

        this.history = this.history.splice(0, 5);

        this.history.push( place.toLowerCase() );

        this.saveData();
    }
    saveData(){
        const payload = {
            history: this.history
        };
        fs.writeFileSync( this.pathFile, JSON.stringify( payload ) );
    };
    
    readData(){
        if( !fs.existsSync( this.pathFile ) ){
            return null;
        }
        const data = fs.readFileSync( this.pathFile, { encoding: 'utf-8' } );
        const parseData = JSON.parse( data );
        this.history = parseData.history;
    };

}

module.exports = Search;