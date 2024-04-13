import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Routes, Route, Link } from "react-router-dom";

function User(props) {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    getUsername();
    getFavoriteRecipes();
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
    const favoriteRecipeIds = JSON.parse(
      localStorage.getItem("favorite_recipes")
    );

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

  if (error) {
    return (
      <div className="generic">
        {error.message}
        <br />
        Please try again later. 😭
      </div>
    );
  }

  if (props.loggedIn) {
    if (username) {
      return (
        <div>
          <h3>Welcome back {username}!</h3>
          <div>
            <h3>Your favorite recipes</h3>
            {favoriteRecipes && favoriteRecipes.length > 0 ? (
              <ul>
                {favoriteRecipes.map((recipe, index) => {
                  return (
                    <Link to={`../recipes/${recipe.id}`} key={index}>
                      <li className="generic">{recipe.name}</li>
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
