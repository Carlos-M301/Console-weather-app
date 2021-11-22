require( 'colors' );
const inquirer = require( 'inquirer' );

const pauseQuestion = [
    {
        type: 'input',
        name: 'result',
        message: `Press ${ 'Enter'.blue } to continue.`,
        default(){
            return '';
        }
    }
]

const questions = [
    {
        type: 'list',
        name: 'option',//This store the answer.
        message: 'What would you like to do?',
        choices: [
            {
                value: 1,
                name:  `${'1'.green}. Search city`
            },
            {
                value: 2,
                name:  `${'2'.green}. History`
            },
            {
                value: 0,
                name:  `${'0'.green}.Exit`
            },
        ],
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log( "=========================".green );
    console.log( "    Choose an option".white );
    console.log( "========================= \n".green );

    const { option } = await inquirer.prompt( questions );
    return option;
}

const pause = async() => {
    console.log('\n')
    await inquirer.prompt( pauseQuestion );
}

const readInput = async( message ) => {
    const input = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if( value.length === 0 ){
                    return 'Please enter a value';
                }
                return true;
            }
        }
    ]
    const { desc } = await inquirer.prompt( input );
    return desc;
}

const ListPlaces = async( places = [] ) => {
    const choices = places.map( ( place, i ) => {
        const index = `${i + 1}.`.green; 
        return {
            value: place.id,
            name: `${index} ${place.place_name}`,
        }
    });
    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancel',
    })
    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Select place: ',
            choices,
        }
    ]
    const { id } = await inquirer.prompt( question );
    return id;
}

// const confirmation = async( message ) => {
//     const question = [
//         {
//             type: 'confirm',
//             name: 'ok',
//             message,
//         }
//     ]

//     const { ok } = await inquirer.prompt( question );
//     return ok;
// }

// const multipleSelection = async( tasks = [] ) => {
//     const choices = tasks.map( ( task, i ) => {
//         const index = `${i + 1}.`.green; 
//         return {
//             value: task.id,
//             name: `${index} ${task.desc}`,
//             checked: task.taskEndDate ? true: false,
//         }
//     });
//     const question = [
//         {
//             type: 'checkbox',
//             name: 'ids',
//             message: 'Select',
//             choices,
//         }
//     ]
//     const { ids } = await inquirer.prompt( question );
//     return ids;
// }

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    ListPlaces,
    // confirmation,
    // multipleSelection,
}


