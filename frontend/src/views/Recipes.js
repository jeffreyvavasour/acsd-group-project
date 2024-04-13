import axios from "axios";
import { useState, useEffect } from "react";
import Recipe from "../components/Recipe";
import { Link, Navigate } from "react-router-dom";

const Recipes = ({ loggedIn }) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [skipIndex, setSkipIndex] = useState(0);

  const getRecipes = async () => {
    setIsLoading(true);
    await axios
      .get(`https://dummyjson.com/recipes?limit=10&skip=${skipIndex}`)
      .then((data) => {
        setRecipes([...recipes, ...data.data.recipes]);
        setSkipIndex(skipIndex + 10);
      })
      .catch((err) => setError(err));
    setIsLoading(false);
  };

  useEffect(() => {
    if (loggedIn) {
      getRecipes();
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
  } else if (recipes.length > 0) {
    return (
      <div>
        <div className="recipes-container">
          {recipes.map((recipe, index) => {
            return (
              <Link to={String(recipe.id)} key={index} className="link">
                <Recipe recipe={recipe} />
              </Link>
            );
          })}
        </div>
        {!isLoading && (
          <div className="generic">
            {skipIndex < 50 && (
              <button onClick={() => getRecipes()}>Load more recipes</button>
            )}
            {skipIndex >= 50 && (
              <div>No more recipes. Come back later for more! 🍕</div>
            )}
          </div>
        )}
      </div>
    );
  } else if (isLoading) {
    return <div className="generic">Loading recipes... ⏳</div>;
  } else {
    return (
      <div className="generic">
        Something went wrong. Please try again later. 😭
      </div>
    );
  }
};

export default Recipes;
