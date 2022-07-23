import { useState, useEffect, useRef } from "react";
import CatItem from "../components/CatItem";
import Spinner from "../components/Spinner";
import Filters from "../components/Filters";

function Cats() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [httpError, setHttpError] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fetchedCats, setFetchedCats] = useState(null);

  //   const navigate = useNavigate();
  const isMounted = useRef(null);
  useEffect(() => {
    const fetchCats = async () => {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${page}&category_ids=${selectedCategory}&order=Desc`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "4bebae0d-0ec4-4787-8e77-8602741525af",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Fatching cats failed");
      }
      const total = response.headers.get("Pagination-Count");
      setFetchedCats(total - (page + 1) * limit);

      const data = await response.json();
      const loadedCats = [];
      data.forEach((loadedCat) => {
        return loadedCats.push({
          id: loadedCat.id,
          imgUrl: loadedCat.url,
        });
      });

      if (page > 0) {
        setCats((prevState) => [...prevState, ...loadedCats]);
      } else setCats(loadedCats);

      setLoading(false);
    };
    try {
      fetchCats();
    } catch (error) {
      setLoading(false);
      setHttpError(error.message);
    }
  }, [isMounted, page, selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      const responseCategory = await fetch(
        "https://api.thecatapi.com/v1/categories"
      );
      if (!responseCategory.ok) {
        throw new Error("Fatching categories failed");
      }
      const dataCategory = await responseCategory.json();
      const loadedCategories = await dataCategory.map((loadedCategory) => {
        return {
          id: loadedCategory.id,
          name: loadedCategory.name,
        };
      });

      setCategories(loadedCategories);
      setLoading(false);
    };
    try {
      fetchCategories();
    } catch (error) {
      setLoading(false);
      setHttpError(error.message);
    }
  }, []);
  const fetchMoreCats = () => {
    setPage((prevState) => prevState + 1);
  };
  const changeOption = (option) => {
    setCats([]);
    setPage(0);
    setSelectedCategory(option);
  };

  if (loading) {
    return <Spinner />;
  } else if (cats && cats.length > 0) {
    return (
      <div className="catsContainer">
        <aside>
          <Filters
            categories={categories}
            changeOption={changeOption}
            selectedCategory={selectedCategory}
          />
        </aside>
        <main>
          <ul className="catsList">
            {cats.map((cat) => {
              return <CatItem key={cat.id} imgUrl={cat.imgUrl} id={cat.id} />;
            })}
          </ul>
          {fetchedCats > 0 && (
            <p className="loadMore" onClick={fetchMoreCats}>
              Load More
            </p>
          )}
        </main>
      </div>
    );
  }
}

export default Cats;
