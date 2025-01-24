import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

export default function MyList(title) {
  const navigate = useNavigate();
  const [fetchedMovieListDatas, setFetchedMovieListData] = useState([]);

  const deleteMovieList = async (title) => {
    try {
      await axios.delete(
        `https://netflix-clonee-api.vercel.app/user-movie-list/${title}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handlePlayClick = (key) => {
    navigate("/movie-player", { state: { data: key } });
  };

  const deleteAllMovieList = async () => {
    try {
      await axios.delete(
        `https://netflix-clonee-api.vercel.app/delete-movie-list`
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchMovieListInfo = async () => {
      try {
        const response = await axios.get(
          "https://netflix-clonee-api.vercel.app/user-movie-list"
        );

        setFetchedMovieListData(response.data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchMovieListInfo();
  }, [fetchedMovieListDatas]);

  return (
    <div>
      <Navbar />
      <div className="movie-list-cont">
        <div onClick={deleteAllMovieList} className="delete-all">
          <p>Delete All</p>
        </div>
        {fetchedMovieListDatas.length === 0 ? (
          <p className="no-movie-msg">No movies are added to your list!</p>
        ) : (
          fetchedMovieListDatas.map((fetchedMovieListData, index) => (
            <div className="movie-list-card" key={index}>
              <div className="movie-list-img-cont">
                <i
                  onClick={() =>
                    deleteMovieList(fetchedMovieListData.MovieTitle)
                  }
                  className="delete-icon fa-solid fa-trash-can"
                ></i>
                <div className="movie-list-cover"></div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${fetchedMovieListData.MovieImgURL}`}
                  alt=""
                />
                <h1>{fetchedMovieListData.MovieTitle}</h1>
              </div>
              <div className="movie-list-descrp-cont">
                <div
                  onClick={() =>
                    handlePlayClick(fetchedMovieListData.MovieVideoKey)
                  }
                  className="play-btn"
                >
                  <i class="fa-solid fa-play"></i>
                  <p>Play</p>
                </div>

                <div className="movie-list-info-cont">
                  <div>
                    <p>{fetchedMovieListData.MovieLength}</p>
                    <p>{fetchedMovieListData.MovieDate}</p>
                    <div>
                      <p className="hd">HD</p>
                    </div>
                  </div>

                  <div className="genre-cont">
                    {fetchedMovieListData.MovieGenres.map((genre, i) => (
                      <p key={i}>{genre.name}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
