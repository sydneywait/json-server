let allTheFoods = "";

//gets the data
fetch("http://localhost:8088/food")
    //turns it into a javascript object
    .then(foods => foods.json())
    // same as .then(function(response){ return response.json})
    //anything you want to do to data coming back from the .then has to be inside the .then
    //do stuff to the javascript object that was returned
    .then(parsedFoods => {
        console.table(parsedFoods);
        let foodString = "";
        parsedFoods.forEach(singleFood => {
            console.log(singleFood);
            

            fetch(`https://world.openfoodfacts.org/api/v0/product/${singleFood.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                      
                        let ingredientString = `Ingredients: ${productInfo.product.ingredients_text_en}`
                        let countryString = `Country of Origin: ${productInfo.product.countries}`
                        let calorieString =  `Calories: ${productInfo.product.nutriments.energy_value} kCal`
                        let fatString = `Fat: ${productInfo.product.nutriments.fat} g`
                        let sugarString =  `Sugar: ${productInfo.product.nutriments.sugars_100g} g/100g`

                        foodString = foodString + `<div class ="food-object"><h2>${singleFood.name}</h2><p>${singleFood.category}</p><p>${singleFood.ethnicity}</p><p>${ingredientString}</p><p>${calorieString}</p><p>${fatString}</p><p>${sugarString}</p><p>${countryString}</p></div>`
                        document.querySelector(".foodList").innerHTML = foodString
                    
                })
        })



    })



//talking to json server to make a request and getting something back
console.log("Hello, World");
//will not work >
console.log(allTheFoods);
