require('dotenv').config();

const { pause, inquirerMenu, readInput, ListPlaces } = require("./helper/inquirer");
const Search = require('./models/search');

const main = async() =>{
    let option = '';

    const search = new Search();
    do{
        option = await inquirerMenu();

        switch ( option ) {
            case 1:
                //Display input
                const city = await readInput( 'City:' );
                //Search places
                const cities = await search.searchCity( city );
                //Select Place
                const id = await ListPlaces( cities );
                if( id !== '0' ){
                    const { place_name, lng, lat } = cities.find( place => place.id === id );
                    //Save data
                    search.addHistory( place_name );
                    //Get the weather
                    const { desc, min, max, temp } = await search.getWeather( lng, lat );
                    //Show results
                    console.log( '\n City information\n'.green );
                    console.log( 'City: ', place_name.green );
                    console.log( 'Lat: ',lat );
                    console.log( 'Lng: ', lng );
                    console.log( 'Temperature: ', temp );
                    console.log( 'Min: ', min );
                    console.log( 'Max: ', max );
                    console.log( 'Description: ', desc.green);
                }
                break;
            case 2:
                search.historyCapitalize.forEach( ( city, index ) => {
                    const id = `${index + 1}.`.green;
                    console.log( `${id} ${city}` );
                });
                break;
            case 0:
                console.log("option 0 choose");
                break;
            
        
        }
        if( option !== 0 ) await pause();
    }
    while( option !== 0 );
}

main();