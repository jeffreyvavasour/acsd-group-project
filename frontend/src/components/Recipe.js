import FavoriteStar from "./FavoriteStar";

const Recipe = ({ recipe }) => {
  return (
    <div className="recipe">
      <h2>{recipe.name}</h2>
      <div className="recipe-img-container">
        <FavoriteStar recipeId={recipe.id} />
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
