import { Link } from "react-router-dom";

function CatItem({ imgUrl, id }) {
  return (
    <li className="catItem">
      <Link to={`/cats/${id}`}>
        <img src={imgUrl} alt="cats" />
      </Link>
    </li>
  );
}

export default CatItem;
