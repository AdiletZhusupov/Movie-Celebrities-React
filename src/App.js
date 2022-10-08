import axios from "axios";
import { useEffect, useState } from "react";
import MoviesPagination from "./MoviesPagination";
import MoviesSpinner from "./MoviesSpinner";
import MyModal from "./MyModal";
import "./styles.css";

export default function App() {
  const api = {
    key: "df8b08ecb436696fee41a00f8d87a540",
    base: "https://api.themoviedb.org/3/person",
    pic: "http://image.tmdb.org/t/p/w185"
  };

  const [celebrities, setCelebrities] = useState([]);
  const [paginationArr, setPaginationArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [modal, setModal] = useState(false);
  const [celebrityInfo, setCelebrityInfo] = useState(null);

  const toggle = () => setModal(!modal);
  const fetchData = async () => {
    setLoading(true);
    try {
      const url = `${api.base}/popular?api_key=${api.key}&language=en&page=${currentPage}`;
      const resp = await axios.get(url);
      setCelebrities(resp.data.results);
      setPaginationArr([...Array(resp.data.total_pages + 1).keys()].slice(1));
    } catch (err) {
      console.error(err.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const checkNum = (n) => {
    if (n > paginationArr.length) {
      return 0;
    } else if (n < 0) {
      return paginationArr.length;
    } else {
      return n;
    }
  };

  const handleNext = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(checkNum(nextPage));
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrev = () => {
    const prevPage = currentPage - 1;
    setCurrentPage(checkNum(prevPage));
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleFirst = () => {
    setCurrentPage(1);
    setMinPageNumberLimit(0);
    setMaxPageNumberLimit(5);
  };
  const handleLast = () => {
    setCurrentPage(paginationArr.length);
    setMinPageNumberLimit(paginationArr.length - pageNumberLimit);
    setMaxPageNumberLimit(paginationArr.length);
  };
  const handleClickNumber = (num) => {
    setCurrentPage(num);
  };
  const handleCelebrityInfo = (celebrity) => {
    setCelebrityInfo(celebrity);
    toggle();
  };

  return (
    <div className="App">
      <div className="wrapper">
        <header>
          <h1>Movie Celebrities</h1>
        </header>
        <div className="pagination-count">
          <MoviesPagination
            currentPage={currentPage}
            numOfCelebPerPage={celebrities.length}
            paginationArr={paginationArr}
            handleNext={handleNext}
            handlePrev={handlePrev}
            handleFirst={handleFirst}
            handleLast={handleLast}
            handleClickNumber={handleClickNumber}
            maxPageNumberLimit={maxPageNumberLimit}
            minPageNumberLimit={minPageNumberLimit}
          />
        </div>
        {loading ? (
          <main className="content">
            <MoviesSpinner />
          </main>
        ) : (
          <main className="content">
            <ul className="movies">
              {celebrities.map((celebrity) => {
                const moviesInfo = [...celebrity.known_for];
                const movies = moviesInfo.map((item) => {
                  return item.title;
                });
                return (
                  <li
                    className="movie"
                    key={celebrity.id}
                    onClick={() => handleCelebrityInfo(celebrity)}
                  >
                    <img
                      src={`${api.pic}${celebrity.profile_path}`}
                      alt={celebrity.name}
                    />
                    <div className="celeb-name">
                      <strong>{celebrity.name}</strong>
                    </div>
                    <div className="celeb-name">
                      {movies.map((movie) => {
                        if (movie) {
                          return movie;
                        } else {
                          return `""`;
                        }
                      })}
                    </div>
                  </li>
                );
              })}
            </ul>
          </main>
        )}
        {modal ? (
          <MyModal
            toggle={toggle}
            modal={modal}
            celebrityInfo={celebrityInfo}
            picUrl={api.pic}
          />
        ) : null}
      </div>
    </div>
  );
}
