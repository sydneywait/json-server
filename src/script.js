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

                    let ingredientString = `Ingredients:`
                    if (productInfo.product.ingredients_text) {

                        ingredientString = `Ingredients: ${productInfo.product.ingredients_text}`
                    }
                    else if (productInfo.product.ingredients_text_en) {

                        ingredientString = `Ingredients: ${productInfo.product.ingredients_text_en}`
                    }
                     
                    //checks if there is an object key for the image.  If not, it uses a placeholder
                    // let imageUrl = "https://zabas.com/wp-content/uploads/2017/01/food-placeholder.png"                    
                    // if(productInfo.product.image_front_url){
                    //     imageUrl = `${productInfo.product.image_front_url}`
                    // }

                    let imageUrl = productInfo.product.image_front_url ? productInfo.product.image_front_url : "https://zabas.com/wp-content/uploads/2017/01/food-placeholder.png"

                        let countryString = `Country of Origin: ${productInfo.product.countries}`
                        let calorieString = `Calories: ${productInfo.product.nutriments.energy_value} kCal`
                        let fatString = `Fat: ${productInfo.product.nutriments.fat} g`
                        let sugarString = `Sugar: ${productInfo.product.nutriments.sugars_100g} g/100g`
                        

                        foodString = foodString + `<div class ="food-object"><h2>${singleFood.name}</h2><img src = ${imageUrl} alt ="food" width = "100%"><p>${singleFood.category}</p><p>${singleFood.ethnicity}</p><p>${ingredientString}</p><p>${calorieString}</p><p>${fatString}</p><p>${sugarString}</p><p>${countryString}</p></div>`
                        document.querySelector(".foodList").innerHTML = foodString
                    
                })
    })



    })



//talking to json server to make a request and getting something back
console.log("Hello, World");
//will not work >
console.log(allTheFoods);
