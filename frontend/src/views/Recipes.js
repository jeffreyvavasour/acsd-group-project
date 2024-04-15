import axios from "axios";
import { useState, useEffect } from "react";
import Recipe from "../components/Recipe";
import { Link, useNavigate } from "react-router-dom";

// View to show all recipes
const Recipes = ({ loggedIn }) => {
  // State to keep an array of recipes
  const [recipes, setRecipes] = useState([]);
  // State to flag whether the data is being loaded
  const [isLoading, setIsLoading] = useState(true);
  // State to keep information about any errors
  const [error, setError] = useState("");
  // State to keep track of the current number of already loaded recipes
  const [skipIndex, setSkipIndex] = useState(0);

  // UseNavigate hook to redirect back to login page if user is not logged in
  const navigate = useNavigate();

  // Function to fetch recipes
  const getRecipes = async () => {
    setIsLoading(true);
    await axios
      .get(`https://dummyjson.com/recipes?limit=10&skip=${skipIndex}`)
      .then((data) => {
        // Append the fetched recipes to the recipes state
        setRecipes([...recipes, ...data.data.recipes]);
        // Add 10 to the number of already loaded recipes
        setSkipIndex(skipIndex + 10);
      })
      .catch((err) => setError(err));
    setIsLoading(false);
  };

  // Check if user is logged in to render recipes
  useEffect(() => {
    if (loggedIn) {
      getRecipes();
    } else if (loggedIn === false) {
      navigate("/login");
    }
  }, [loggedIn]);

  if (error) {
    // Render error message
    return (
      <div className="generic">
        {error.message}
        <br />
        Please try again later. 😭
      </div>
    );
  } else if (recipes.length > 0) {
    // Render the recipes
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
    // Render the loading information
    return <div className="generic">Loading recipes... ⏳</div>;
  } else {
    return (
      // Render a generic error if everything fails
      <div className="generic">
        Something went wrong. Please try again later. 😭
      </div>
    );
  }
};

export default Recipes;
