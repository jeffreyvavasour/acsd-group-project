import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FavoriteStar from "../components/FavoriteStar";
import axios from "axios";

const SingleRecipe = ({ loggedIn }) => {
  const [recipe, setRecipe] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { recipeId } = useParams();

  const getRecipe = async () => {
    setIsLoading(true);
    await axios
      .get(`https://dummyjson.com/recipes/${recipeId}`)
      .then((res) => {
        setRecipe(res.data);
        setIsLoading(false);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    if (loggedIn) {
      getRecipe();
    }
  }, []);

  if (!loggedIn) {
    return <Navigate to={"/login"} />;
  }

  if (error) {
    return (
      <div className="generic">
        {error.message}
        <br />
        Please try again later. 😭
      </div>
    );
  } else if (recipe) {
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
  } else if (isLoading) {
    return <div className="generic">Loading recipe... ⏳</div>;
  } else {
    return (
      <div className="generic">
        Something went wrong. Please try again later. 😭
      </div>
    );
  }
};

export default SingleRecipe;
