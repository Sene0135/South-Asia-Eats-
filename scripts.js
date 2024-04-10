const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
document.addEventListener('DOMContentLoaded', () => {getRecommendedMeals();});
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// mealList.addEventListener('click', (event) => {
//     const likeButton = document.getElementById('buttonForLike');
//     if (likeButton && likeButton.textContent === 'Like Me') {
//       likeRecipe(likeButton);
//     }
//   });
  
//   // Function to handle likes
//   function likeRecipe(likeButton) {
//     const mealItem = likeButton.closest('.meal-item');
//     const recipeName = mealItem.dataset.id;
  
//     // Update like status in UI
//     likeButton.textContent = 'Liked'; // Visually indicate the like
  
//     // Fetch and update data in FoodDataset.json (assuming you have a mechanism for this)
//     fetch(`./FoodDataset.json`)
//       .then(response => response.json())
//       .then(data => {
//         const recipeIndex = data.findIndex(({ TranslatedRecipeName }) => TranslatedRecipeName === recipeName);
//         data[recipeIndex].Like = true; // Set the 'like' property to true
//       })
//       .catch(error => console.error('Error updating data:', error));
//   }

// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`./FoodDataset.json`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        const recipe = data.find(({ TranslatedRecipeName }) => TranslatedRecipeName === searchInputTxt);
        const like = recipe.Like
        console.log(like)

        if(recipe){
                html += `
                    <div class = "meal-item" data-id = "${recipe.TranslatedRecipeName}">
                        <div class = "meal-img">
                            <img src = "${recipe.image_url}" alt = "food">
                        </div>
                        <div class = "meal-name">
                        <p class = "recipe-category">${recipe.Cuisine}</p>
                        <div class = "recipe-instruct">
                            <h3>ingredients:</h3>
                            <p>${recipe.TranslatedIngredients}</p>
                        </div>
                        <div class = "recipe-instruct">
                            <h3>Instructions:</h3>
                            <p>${recipe.TranslatedInstructions}</p>
                        </div>
                        <div class = "recipe-link">
                            <a href = "${recipe.URL}" target = "_blank">Click Link to read more!</a>
                        </div>
                        <div>
                        Time Taken: 
                        ${recipe.TotalTimeInMins} minutes
                        </div>
                        </div>
                    </div>
                `;
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meals!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}





function getRecommendedMeals() { //shuffle recommended meals to get 3 recommended meals
    fetch('./FoodDataset.json')
    .then(response => response.json())
    .then(data => {
        const shuffledMeals = data.sort(() => 0.5 - Math.random());
        const recommendedMeals = shuffledMeals.slice(0, 3);
        displayRecommendedMeals(recommendedMeals);
    });
}

function displayRecommendedMeals(meals) { //display recommended meals from previous function
    const recommendedMealsContainer = document.getElementById('recommended-meals');
    let html = '';
    meals.forEach(meal => {
        html += `
            <div class="meal-item" data-id="${meal.TranslatedRecipeName}">
                <div class="meal-img">
                    <img src="${meal.image_url}" alt="food">
                </div>
                <div class="meal-name">
                    <h3>${meal.TranslatedRecipeName}</h3>
                    <a href="#" class="recipe-btn">Get Recipe</a>
                </div>
            </div>
        `;
    });
    recommendedMealsContainer.innerHTML = html;
}

