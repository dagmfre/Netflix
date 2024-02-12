import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MovieDetail(props) {
  const navigate = useNavigate();
  const [relatedMoviesCont, setRelatedMoviesCont] = useState([]);
  const api_key = process.env.REACT_APP_TMDB_API_KEY;
  const [isPlusBtnClicked, setIsPlusBtnClicked] = useState(null);

  const handleXclick = () => {
    props.handleChildData(true);
  };

  const truncate = (str, n) => {
    return str.length > n ? str.slice(0, n - 1) + "..." : str;
  };

  const playClickHandler = () => {
    navigate("/movie-player", { state: { data: props.clickedKey } });
  };

  const handlePlusBtnClick = () => {
    props.plusBtnClicked(true);

    setIsPlusBtnClicked(true);
    setTimeout(() => {
      setIsPlusBtnClicked(false);
    }, 500);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${props.clickedID}/similar?api_key=${api_key}`
      )
      .then((response) => setRelatedMoviesCont(response.data.results))
      .catch((err) => console.log(err));
  }, [props.clickedID]);

  return (
    <div
      className="movie-detail"
      style={{
        top: props.btnClickState ? "1.5rem" : "100%",
      }}
    >
      <div className="detail-main">
        <div className="cover2"></div>
        <i onClick={handleXclick} className="fa-solid fa-xmark x"></i>
        <iframe
          width="560"
          height="100%"
          src={`https://www.youtube.com/embed/${props.clickedKey}?loop=1&autoplay=1&color=white&mute=1&rel=0"`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded YouTube video"
        />
        <div className="detail-descrp-cont">
          <div className="title-control-cont">
            <h1>{props.clickedTitle}</h1>
            <div className="control-cont">
              <div onClick={playClickHandler} className="play-btn">
                <i class="fa-solid fa-play"></i>
                <p>Play</p>
              </div>
              <div className="detail-controld-cont">
                <i
                  style={{
                    display: isPlusBtnClicked ? "none" : "flex",
                  }}
                  onClick={handlePlusBtnClick}
                  class="fa-solid fa-plus"
                ></i>
                <i
                  style={{
                    display: isPlusBtnClicked ? "flex" : "none",
                  }}
                  class="fa-solid fa-check check-icon"
                ></i>
                <i class="fa-regular fa-thumbs-up"></i>
              </div>
            </div>
          </div>
          <div className="detail-info-cont">
            <div>
              <p>{props.clickedLength}</p>
              <p>{props.clickedDate}</p>
              <p>HD</p>
            </div>
            <li>
              {props.clickedGenre &&
                props.clickedGenre.map((genres, index) => (
                  <ul key={index}>{genres.name}</ul>
                ))}
            </li>
          </div>
          <div className="overview-cont">
            <p>{truncate(props.clickedOverview, 255)}</p>
          </div>
        </div>
      </div>
      <div className="detail-related-cont">
        <p className="related-text">Related Movies</p>
        {relatedMoviesCont.map((relatedMovies, index) => (
          <div key={index} className="realted-cards">
            <div className="related-img-cont">
              <img
                src={`https://image.tmdb.org/t/p/w500${relatedMovies.backdrop_path}`}
                alt=""
              />
            </div>
            <div className="related-descrp-cont">
              <div className="related-info-cont">
                <div>
                  <p>{relatedMovies.release_date.slice(0, 4)}</p>
                  <p className="hd">HD</p>
                </div>
                <div>
                  <i class="fa-regular fa-thumbs-up"></i>
                </div>
              </div>
              <p>{truncate(relatedMovies.overview, 100)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
