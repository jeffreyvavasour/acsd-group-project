import { useEffect, useState } from "react";

const FavoriteStar = ({ recipeId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    let favoriteRecipes = JSON.parse(localStorage.getItem("favorite_recipes"));
    if (favoriteRecipes && favoriteRecipes.length > 0) {
      if (favoriteRecipes.includes(recipeId)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, []);

  const handleFavorite = (e) => {
    e.preventDefault();
    let favoriteRecipes = JSON.parse(localStorage.getItem("favorite_recipes"));
    if (favoriteRecipes && favoriteRecipes.length > 0) {
      if (favoriteRecipes.includes(recipeId)) {
        if (favoriteRecipes.length === 1) {
          favoriteRecipes = [];
        } else {
          favoriteRecipes.splice(favoriteRecipes.indexOf(recipeId), 1);
        }
        setIsFavorite(false);
      } else {
        favoriteRecipes.push(recipeId);
        setIsFavorite(true);
      }
      localStorage.setItem("favorite_recipes", JSON.stringify(favoriteRecipes));
    } else {
      localStorage.setItem("favorite_recipes", JSON.stringify([recipeId]));
      setIsFavorite(true);
    }
  };

  return (
    <span
      className={`star ${isFavorite && "favorite"}`}
      onClick={handleFavorite}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? "★" : "☆"}
    </span>
  );
};

export default FavoriteStar;
