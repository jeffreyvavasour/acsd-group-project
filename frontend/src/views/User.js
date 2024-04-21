import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Routes, Route, Link } from "react-router-dom";

// View to show a user page
function User({ loggedIn }) {
  // State to store the current username
  const [username, setUsername] = useState("");
  // State to flag whether the data is being loaded
  const [isLoading, setIsLoading] = useState(true);
  // State to keep information about any errors
  const [error, setError] = useState("");
  // State to keep information of user's favorite recipes
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  // State to keep information of user's notes
  const [userNotes, setUserNotes] = useState([]);

  useEffect(() => {
    getUsername();
    getFavoriteRecipes();
    getNotes();
  }, []);

  // Function to get the current user's username
  const getUsername = async function () {
    setIsLoading(true);
    try {
      var token = localStorage.getItem("token");
      var incomingData = await axios.get("http://localhost:8080/users/user", {
        params: { token: token },
      });
      setUsername(incomingData.data.username);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  // Function to get the current user's favorite recipes
  const getFavoriteRecipes = () => {
    let favoriteRecipeIds = [];

    const userData = JSON.parse(localStorage.getItem("users"));
    const username = localStorage.getItem("username");

    // Check if the user data and username exist in localStorage
    if (userData && username && userData.hasOwnProperty(username)) {
      // Check if the user recipes collection exists
      if (userData[username].hasOwnProperty("recipes")) {
        // Find only favorite recipes and save the IDs in the favoriteRecipeIds variable
        favoriteRecipeIds = userData[username].recipes
          .filter(
            (recipe) =>
              recipe.favorite === true &&
              recipe.recipeId &&
              typeof recipe.favorite === "boolean" &&
              typeof recipe.recipeId === "number"
          )
          .map((favorites) => favorites.recipeId);
      }
    }

    // Check if there are any favorite recipes
    if (favoriteRecipeIds && favoriteRecipeIds.length > 0) {
      // Call the API for every favorite recipe
      axios
        .all(
          favoriteRecipeIds.map((id) =>
            axios.get(`https://dummyjson.com/recipes/${id}`)
          )
        )
        .then(
          // Save the recipes in the favoriteRecipes state
          axios.spread((...arr) => {
            setFavoriteRecipes(arr.map((res) => res.data));
          })
        )
        .catch((error) => {
          setError(error);
        });
    }
  };

  // Function to get the current user's recipes with notes
  const getNotes = () => {
    let notes = [];

    const userData = JSON.parse(localStorage.getItem("users"));
    const username = localStorage.getItem("username");

    // Check if the user data and username exist in localStorage
    if (userData && username && userData.hasOwnProperty(username)) {
      // Check if the user recipes collection exists
      if (userData[username].hasOwnProperty("recipes")) {
        // Find only recipes with notes and map the recipe IDs and notes in the notes variable
        notes = userData[username].recipes
          .filter(
            (recipe) =>
              recipe?.notes &&
              typeof recipe?.notes === "string" &&
              typeof recipe?.recipeId === "number"
          )
          .map((recipe) => {
            return { recipeId: recipe.recipeId, notes: recipe.notes };
          });
      }
    }

    // Check if there are any recipes with notes
    if (notes && notes.length > 0) {
      // Call the API for every recipe with notes
      axios
        .all(
          notes.map((note) =>
            axios.get(`https://dummyjson.com/recipes/${note.recipeId}`)
          )
        )
        .then(
          // Merge the response recipes with the respective notes and save the array in userNotes state
          axios.spread((...arr) => {
            let recipes = [...arr.map((res) => res.data)];
            recipes.forEach((recipe, index) => {
              recipes[index] = { ...recipe, notes: notes[index].notes };
            });
            setUserNotes(recipes);
          })
        )
        .catch((error) => {
          setError(error);
        });
    }
  };

  if (error) {
    // Render error message
    return (
      <div className="generic">
        {error.message}
        <br />
        Please try again later. 😭
      </div>
    );
  } else if (loggedIn) {
    // Render the user page for logged in user
    if (username) {
      return (
        <div className="user-view">
          <h2>Welcome back {username}!</h2>
          <div>
            <h3>Your favorite recipes</h3>
            {favoriteRecipes && favoriteRecipes.length > 0 ? (
              <ul className="favorite-recipes-container">
                {
                  // Render user's favorite recipes
                }
                {favoriteRecipes.map((recipe, index) => {
                  return (
                    <Link
                      to={`../recipes/${recipe.id}`}
                      key={index}
                      className="recipe"
                    >
                      <li>
                        <h4>{recipe.name}</h4>
                        <div className="recipe-img-container">
                          <img
                            className="recipe-img"
                            src={recipe.image}
                            alt={recipe.name}
                          />
                        </div>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            ) : (
              <p>
                Use the <span className="favorite">★</span> icon to add new
                recipes to your favorite list!
              </p>
            )}
            <h3>Your notes</h3>
            {
              // Render user's recipes with notes
            }
            {userNotes && userNotes.length > 0 ? (
              <ul className="recipes-with-notes-container">
                {userNotes.map((recipe, index) => {
                  return (
                    <Link
                      to={`../recipes/${recipe.id}`}
                      key={index}
                      className="recipe"
                    >
                      <li>
                        <h4>{recipe.name}</h4>
                        <div className="recipe-img-container">
                          <img
                            className="recipe-img"
                            src={recipe.image}
                            alt={recipe.name}
                          />
                        </div>
                        <div className="notes-container">
                          <h5>Notes</h5>
                          <br />
                          {recipe.notes}
                        </div>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            ) : (
              <p>No added notes yet.</p>
            )}
          </div>
        </div>
      );
    } else if (isLoading) {
      // Render the loading information
      return <div className="generic">Loading data... ⏳</div>;
    } else {
      // Render a generic error if everything fails
      return (
        <div className="generic">
          Something went wrong. Please try again later. 😭
        </div>
      );
    }
  } else {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
}

export default User;
