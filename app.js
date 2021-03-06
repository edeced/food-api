const API_URL = 'https://trackapi.nutritionix.com/v2/search' 
const X_APP_ID = '2b73860b'
const X_APP_KEY = '3021e4b8b20e1bd8b5bb19d38c129c6c'
const previousSearch = []
const DEBUG = false; //to see helpful notes, set to true

// All items - /instant?query=${searchTerm}
// Single - /item?nix_item_id=${itemId} // `branded.nix_item_id`

const searchBtn = document.querySelector('#food-search');
const input = document.querySelector('#food-query');

// gets all food that matches
async function getAllFood(query){
    
    const results = await fetch(`${API_URL}/instant?query=${query}`,{
        headers : {
            'x-app-id' : X_APP_ID ,
            'x-app-key': X_APP_KEY
        }
    });

    const data = await results.json()

    if(DEBUG) console.log(data);

    return data.branded

}

async function getSingleFood(itemId){
    const results = await fetch(`${API_URL}/item?nix_item_id=${itemId}`,{
        headers : {
            'x-app-id' : X_APP_ID,
            'x-app-key': X_APP_KEY
        }
    });

    const data = await results.json()

    return data.foods[0]
}

searchBtn.addEventListener('click', async () => {

    addPreviousSearch(input.value)

    const allFoods = await getAllFood(input.value);
    
    const singleFood = await getSingleFood(allFoods[0].nix_item_id)

    if(DEBUG){
        console.log(`Alls matching ${input.value}: `, allFoods);
        console.log(`The Id of the ID of the first el: `, allFoods[0].nix_item_id);
        console.log(`More details about the single el: `, singleFood)
    }
    
    if(DEBUG) console.log([previousSearch])

})

function addPreviousSearch(item){
    previousSearch.push(item)
}