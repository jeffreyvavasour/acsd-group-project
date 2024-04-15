import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FavoriteStar from "../components/FavoriteStar";
import axios from "axios";

// View to show a single recipe
const SingleRecipe = ({ loggedIn }) => {
  // State to store the recipe
  const [recipe, setRecipe] = useState();
  // State to flag whether the data is being loaded
  const [isLoading, setIsLoading] = useState(true);
  // State to keep information about any errors
  const [error, setError] = useState("");
  // State to keep information about the user's notes about this recipe
  const [notes, setNotes] = useState("");
  // Variable to store the URL param to fetch the right recipe
  const { recipeId } = useParams();

  // UseNavigate hook to redirect back to login page if user is not logged in
  const navigate = useNavigate();

  // Function to fetch the recipe
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

  // Function to fetch the notes for this recipe from localStorage
  const getNotes = (recipe) => {
    const userData = JSON.parse(localStorage.getItem("users"));
    const username = localStorage.getItem("username");

    // Check if the localStorage for this user exists
    if (userData && username && userData.hasOwnProperty(username)) {
      // Check if the localStorage for the recipes collection exists
      if (userData[username].hasOwnProperty("recipes")) {
        // Check if this recipe exists in the user recipes collection
        const recipeIndex = userData[username].recipes.findIndex(
          (r) => r.recipeId === recipe.id
        );
        if (recipeIndex !== -1) {
          const recipeNotes = userData[username].recipes[recipeIndex].notes;
          if (recipeNotes) {
            // Update the notes state for this recipe
            setNotes(recipeNotes);
          }
        }
      }
    }
  };

  // Function to update the notes state for this recipe
  const handleNotesChange = (e) => {
    e.preventDefault();
    setNotes(e.target.value);
  };

  // Function to save the notes for this recipe
  const saveNotes = (e) => {
    e.preventDefault();
    let userData = JSON.parse(localStorage.getItem("users"));
    const username = localStorage.getItem("username");

    // Check if the localStorage for this user exists
    if (userData && username && userData.hasOwnProperty(username)) {
      // Check if the localStorage for the recipes collection exists
      if (userData[username].hasOwnProperty("recipes")) {
        // Check if this recipe exists in the user recipes collection
        const recipeIndex = userData[username].recipes.findIndex(
          (r) => r.recipeId === recipe.id
        );
        if (recipeIndex !== -1) {
          // Update the notes for an existing recipe in the collection
          userData[username].recipes[recipeIndex].notes = notes;
        } else {
          // Create a new recipe in the user recipes collection
          userData[username].recipes.push({
            recipeId: recipe.id,
            notes: notes,
            favorite: false,
          });
        }
        // Update the local recipes collection
        localStorage.setItem("users", JSON.stringify(userData));
      }
    } else {
      if (!username) {
        // Show error if the username does not exist in localStorage
        window.alert("Something went wrong. Please try again later. 😭");
      } else if (!userData) {
        // Create the new recipe collection for all users
        userData = {
          [username]: {
            recipes: [{ recipeId: recipeId, notes: notes, favorite: false }],
          },
        };
      } else if (!userData.hasOwnProperty(username)) {
        // Create the new recipe collection for this user
        userData[username] = {
          recipes: [{ recipeId: recipeId, notes: notes, favorite: false }],
        };
      }
      // Update the local recipes collection
      localStorage.setItem("users", JSON.stringify(userData));
    }
    window.alert("Notes successfully saved!");
  };

  // Check if user is logged in to render recipes
  useEffect(() => {
    if (loggedIn) {
      getRecipe();
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
  } else if (recipe) {
    // Render the recipe
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
    // Render the loading information
    return <div className="generic">Loading recipe... ⏳</div>;
  } else {
    // Render a generic error if everything fails
    return (
      <div className="generic">
        Something went wrong. Please try again later. 😭
      </div>
    );
  }
};

export default SingleRecipe;
