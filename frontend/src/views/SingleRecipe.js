import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FavoriteStar from "../components/FavoriteStar";
import axios from "axios";

const SingleRecipe = ({ loggedIn }) => {
  const [recipe, setRecipe] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState("");
  const { recipeId } = useParams();

  const getRecipe = async () => {
    setIsLoading(true);
    await axios
      .get(`https://dummyjson.com/recipes/${recipeId}`)
      .then((res) => {
        setRecipe(res.data);
        setIsLoading(false);
        getNotes(res.data);
      })
      .catch((err) => setError(err));
  };

  const getNotes = (recipe) => {
    const userData = JSON.parse(localStorage.getItem("users"));
    const username = localStorage.getItem("username");
    if (userData && username && userData.hasOwnProperty(username)) {
      if (userData[username].hasOwnProperty("recipes")) {
        const recipeIndex = userData[username].recipes.findIndex(
          (r) => r.recipeId === recipe.id
        );
        if (recipeIndex !== -1) {
          const recipeNotes = userData[username].recipes[recipeIndex].notes;
          if (recipeNotes) {
            setNotes(recipeNotes);
          }
        }
      }
    }
  };

  const handleNotesChange = (e) => {
    e.preventDefault();
    setNotes(e.target.value);
  };

  const saveNotes = (e) => {
    e.preventDefault();
    let userData = JSON.parse(localStorage.getItem("users"));
    const username = localStorage.getItem("username");

    if (userData && userData.length > 0 && username) {
      const recipeIndex = userData[username].recipes.findIndex(
        (r) => r.recipeId === recipe.id
      );
      if (recipeIndex !== -1) {
        userData[username].recipes[recipeIndex].notes = notes;
      } else {
        userData[username].recipes.push({
          recipeId: recipe.id,
          notes: notes,
          favorite: false,
        });
      }
      localStorage.setItem("users", JSON.stringify(userData));
    } else {
      localStorage.setItem(
        "users",
        JSON.stringify({
          [username]: {
            recipes: [{ recipeId: recipe.id, notes: notes, favorite: false }],
          },
        })
      );
    }
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
        <h3>Ingredients</h3>
        <br />
        <ul className="ingredients">
          {recipe.ingredients.map((ingredient, index) => {
            return <li key={index}>{ingredient}</li>;
          })}
        </ul>
        <h3>Instructions</h3>
        <br />
        <ol className="instructions">
          {recipe.instructions.map((instruction, index) => {
            return <li key={index}>{instruction}</li>;
          })}
        </ol>
        <h3>Notes</h3>
        <textarea
          cols="40"
          rows="5"
          className="notes"
          value={notes}
          onChange={handleNotesChange}
        ></textarea>
        <button onClick={saveNotes}>Save 💾</button>
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
