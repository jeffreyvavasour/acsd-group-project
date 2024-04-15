import { useEffect, useState } from "react";

const FavoriteStar = ({ recipeId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("users"));
    const username = localStorage.getItem("username");
    if (userData && username && userData.hasOwnProperty(username)) {
      if (userData[username].hasOwnProperty("recipes")) {
        const recipeIndex = userData[username].recipes.findIndex(
          (r) => r.recipeId === recipeId
        );
        if (recipeIndex !== -1) {
          setIsFavorite(userData[username].recipes[recipeIndex].favorite);
        }
      }
    }
  }, []);

  const handleFavorite = (e) => {
    e.preventDefault();
    let userData = JSON.parse(localStorage.getItem("users"));
    const username = localStorage.getItem("username");
    if (userData && username && userData.hasOwnProperty(username)) {
      if (userData[username].hasOwnProperty("recipes")) {
        const recipeIndex = userData[username].recipes.findIndex(
          (r) => r.recipeId === recipeId
        );
        if (recipeIndex !== -1) {
          userData[username].recipes[recipeIndex].favorite = !isFavorite;
        } else {
          userData[username].recipes.push({
            recipeId: recipeId,
            notes: "",
            favorite: !isFavorite,
          });
        }
      } else {
        userData[username].recipes = [
          { recipeId: recipeId, notes: "", favorite: !isFavorite },
        ];
      }
    } else {
      if (!username) {
        window.alert("Something went wrong. Please try again later. 😭");
      } else if (!userData) {
        userData = {
          [username]: {
            recipes: [{ recipeId: recipeId, notes: "", favorite: !isFavorite }],
          },
        };
      } else if (!userData.hasOwnProperty(username)) {
        userData[username] = {
          recipes: [{ recipeId: recipeId, notes: "", favorite: !isFavorite }],
        };
      }
    }
    localStorage.setItem("users", JSON.stringify(userData));
    setIsFavorite(!isFavorite);
  };

  return (
    <span
      className={`icon star ${isFavorite && "favorite"}`}
      onClick={handleFavorite}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? "★" : "☆"}
    </span>
  );
};

export default FavoriteStar;
