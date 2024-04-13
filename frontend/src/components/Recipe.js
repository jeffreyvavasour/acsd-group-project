import FavoriteStar from "./FavoriteStar";
import { useState, useEffect } from "react";

const Recipe = ({ recipe }) => {
  const [hasNotes, setHasNotes] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("users"));
    const username = localStorage.getItem("username");

    if (userData && username && userData.hasOwnProperty(username)) {
      if (userData[username].hasOwnProperty("recipes")) {
        const recipeIndex = userData[username].recipes.findIndex(
          (r) => r.recipeId === recipe.id
        );
        if (recipeIndex !== -1) {
          if (userData[username].recipes[recipeIndex].notes) {
            setHasNotes(true);
          }
        }
      }
    }
  }, []);

  return (
    <div className="recipe">
      <h2>{recipe.name}</h2>
      <div className="recipe-img-container">
        <FavoriteStar recipeId={recipe.id} />
        {hasNotes && (
          <div className="icon notes-icon" title="This recipe has saved notes">
            ✎
          </div>
        )}
        <img src={recipe.image} alt={recipe.name} className="recipe-img" />
      </div>
      <br />
      Difficulty:{" "}
      <span className={`difficulty ${recipe.difficulty.toLowerCase()}`}>
        {recipe.difficulty}
      </span>
      <br />
      Prep time: {recipe.prepTimeMinutes} min
      <br />
      {recipe.cookTimeMinutes > 0 && (
        <div>Cooking time: {recipe.cookTimeMinutes} min</div>
      )}
    </div>
  );
};

export default Recipe;
