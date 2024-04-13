import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FavoriteStar from "../components/FavoriteStar";
import axios from "axios";

const SingleRecipe = () => {
  const [recipe, setRecipe] = useState();
  const { recipeId } = useParams();

  const getRecipe = async () => {
    await axios
      .get(`https://dummyjson.com/recipes/${recipeId}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getRecipe();
  }, []);

  if (recipe) {
    return (
      <div className="full-recipe">
        <h2>{recipe.name}</h2>
        <div className="recipe-img-container">
          <FavoriteStar recipeId={recipe.id} />
          <img src={recipe.image} alt={recipe.name} className="recipe-img" />
        </div>
        <br />
        Ingredients
        <br />
        <ul className="ingredients">
          {recipe.ingredients.map((ingredient, index) => {
            return <li key={index}>{ingredient}</li>;
          })}
        </ul>
        Instructions
        <br />
        <ol className="instructions">
          {recipe.instructions.map((instruction, index) => {
            return <li key={index}>{instruction}</li>;
          })}
        </ol>
      </div>
    );
  }
};

export default SingleRecipe;
