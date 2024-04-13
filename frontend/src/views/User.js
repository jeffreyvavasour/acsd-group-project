import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Routes, Route, Link } from "react-router-dom";

function User({ loggedIn }) {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [userNotes, setUserNotes] = useState([]);

  useEffect(() => {
    getUsername();
    getFavoriteRecipes();
    getNotes();
  }, []);

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

  const getFavoriteRecipes = () => {
    let favoriteRecipeIds = [];

    const userData = JSON.parse(localStorage.getItem("users"));
    const username = localStorage.getItem("username");
    if (userData && username && userData.hasOwnProperty(username)) {
      if (userData[username].hasOwnProperty("recipes")) {
        favoriteRecipeIds = userData[username].recipes
          .filter((recipe) => recipe.favorite === true)
          .map((favorites) => favorites.recipeId);
      }
    }

    if (favoriteRecipeIds && favoriteRecipeIds.length > 0) {
      axios
        .all(
          favoriteRecipeIds.map((id) =>
            axios.get(`https://dummyjson.com/recipes/${id}`)
          )
        )
        .then(
          axios.spread((...arr) => {
            setFavoriteRecipes(arr.map((res) => res.data));
          })
        )
        .catch((error) => {
          setError(error);
        });
    }
  };

  const getNotes = () => {
    let notes = [];

    const userData = JSON.parse(localStorage.getItem("users"));
    const username = localStorage.getItem("username");
    if (userData && username && userData.hasOwnProperty(username)) {
      if (userData[username].hasOwnProperty("recipes")) {
        notes = userData[username].recipes
          .filter((recipe) => recipe.notes)
          .map((recipe) => {
            return { recipeId: recipe.recipeId, notes: recipe.notes };
          });
      }
    }

    if (notes && notes.length > 0) {
      axios
        .all(
          notes.map((note) =>
            axios.get(`https://dummyjson.com/recipes/${note.recipeId}`)
          )
        )
        .then(
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
    return (
      <div className="generic">
        {error.message}
        <br />
        Please try again later. 😭
      </div>
    );
  } else if (loggedIn) {
    if (username) {
      return (
        <div>
          <h3>Welcome back {username}!</h3>
          <div>
            <h3>Your favorite recipes</h3>
            {favoriteRecipes && favoriteRecipes.length > 0 ? (
              <ul className="favorite-recipes-container">
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
            {userNotes && userNotes.length > 0 ? (
              <ul className="favorite-recipes-container">
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
      return <div className="generic">Loading data... ⏳</div>;
    } else {
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
