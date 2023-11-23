import CocktailCard from "./CocktailCard";
import Wrapper from "../assets/wrappers/CocktailList";

const CocktailList = ({ drinks }) => {
  if (!drinks) {
    return <h4 style={{ textAlign: "center" }}>No cocktail available.</h4>;
  }
  const formattedInfos = drinks.map((drink) => {
    const {
      idDrink,
      strDrink,
      strDrinkThumb,
      strAlcoholic,
      strGlass,
      strInstructions,
    } = drink;
    return {
      id: idDrink,
      name: strDrink,
      img: strDrinkThumb,
      alcohol: strAlcoholic,
      glass: strGlass,
      instructions: strInstructions,
    };
  });
  return (
    <Wrapper>
      {formattedInfos.map((drink) => (
        <CocktailCard {...drink} key={drink.id} />
      ))}
    </Wrapper>
  );
};
export default CocktailList;
