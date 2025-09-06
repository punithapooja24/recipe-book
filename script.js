document.addEventListener("DOMContentLoaded", () => {
  loadRecipes();
  document.getElementById("recipeForm").addEventListener("submit", addRecipe);
});

function addRecipe(e) {
  e.preventDefault();

  const name = document.getElementById("recipeName").value.trim();
  const ingredients = document.getElementById("ingredients").value.trim();
  const steps = document.getElementById("steps").value.trim();
  const imageFile = document.getElementById("image").files[0];

  if (!name || !ingredients || !steps || !imageFile) {
    alert("Please fill all the fields and upload an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const recipe = {
      name,
      ingredients,
      steps,
      image: reader.result,
    };

    const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
    recipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));

    document.getElementById("recipeForm").reset();
    loadRecipes();
  };
  reader.readAsDataURL(imageFile);
}

function loadRecipes() {
  const recipeList = document.getElementById("recipeList");
  recipeList.innerHTML = "";

  const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <h3>${recipe.name}</h3>
      <img src="${recipe.image}" alt="${recipe.name}" />
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Steps:</strong> ${recipe.steps}</p>
    `;
    recipeList.appendChild(card);
  });
}

function searchRecipes() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".recipe-card");

  cards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(query) ? "block" : "none";
  });
}






