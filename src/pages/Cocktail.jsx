import { Link, useLoaderData, Navigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Wrapper from "../assets/wrappers/CocktailPage";

const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const singleCocktailsQuery = (id) => {
  return {
    queryKey: ["cocktail", id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(singleCocktailsQuery(id));

    return { id };
  };

const Cocktail = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(singleCocktailsQuery(id));
  if (!data.drinks) {
    return <Navigate to="/" />;
  }
  const drink = data.drinks[0];
  const {
    strDrink: name,
    strDrinkThumb: img,
    strAlcoholic: alcohol,
    strInstructions: instructions,
    strGlass: glass,
    strCategory: category,
  } = drink;

  const ingredients = Object.keys(drink)
    .filter(
      (property) =>
        property.includes("strIngredient") && drink[property] !== null
    )
    .map((property) => drink[property]);

  const ingredientList = ingredients.join(", ").split("");

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          Back home
        </Link>
        <h1>{name}</h1>
      </header>

      <div className="drink">
        <img src={img} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">Name:</span>
            {name}
          </p>
          <p>
            <span className="drink-data">Category:</span>
            {category}
          </p>
          <p>
            <span className="drink-data">Alcohol:</span>
            {alcohol}
          </p>
          <p>
            <span className="drink-data">Ingredients:</span>
            {ingredientList}
          </p>
          <p>
            <span className="drink-data">Instructions:</span>
            <span className="ing">{instructions}</span>
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
export default Cocktail;
