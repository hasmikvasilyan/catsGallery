import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

function Cat() {
  const [loading, setLoading] = useState(false);

  const params = useParams();

  if (loading) {
    return <Spinner />;
  } else {
    return <div></div>;
  }
}

export default Cat;
