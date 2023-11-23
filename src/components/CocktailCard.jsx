import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/CocktailCard";

const CocktailCard = ({ id, name, img, alcohol, glass, instructions }) => {
  return (
    <Wrapper>
      <div className="img-container">
        <img src={img} alt={name} className="img"></img>
      </div>
      <div className="footer">
        <h4>{name}</h4>
        <h5>{alcohol}</h5>
        <h6>{glass}</h6>
        <p>{instructions}</p>
        <Link to={`/cocktail/${id}`} className="btn">
          details
        </Link>
      </div>
    </Wrapper>
  );
};
export default CocktailCard;
