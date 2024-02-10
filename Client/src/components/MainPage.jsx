import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";
import Navbar from "./Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieDetail from "./MovieDetail";

export default function MainPage() {
  const api_key = process.env.REACT_APP_TMDB_API_KEY;
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  const [title, setTitle] = useState("");
  const [id, setID] = useState("");
  const [description, setDescription] = useState("");
  const [randomVideoKey, setRandomVideoKey] = useState("");
  const [randomGenres, setRandomGenres] = useState([]);
  const [randomLength, setRandomLength] = useState("");
  const [randomDate, setRandomDate] = useState("");
  const [randomImage, setRandomImage] = useState("");

  const [movieImageUrls, setMovieImageUrls] = useState([]);
  const [movieImageUrls2, setMovieImageUrls2] = useState([]);
  const [movieImageUrls3, setMovieImageUrls3] = useState([]);

  const [videoKeyCont, setVideoKeyCont] = useState([]);
  const [videoKeyCont2, setVideoKeyCont2] = useState([]);
  const [videoKeyCont3, setVideoKeyCont3] = useState([]);
  const [allowHover, setAllowHover] = useState(false);

  const [imageURLCont, setimageURLCont] = useState("");
  const [imageURLCont2, setimageURLCont2] = useState("");
  const [imageURLCont3, setimageURLCont3] = useState("");

  const [overviewCont, setOverviewCont] = useState("");
  const [overviewCont2, setOverviewCont2] = useState("");
  const [overviewCont3, setOverviewCont3] = useState("");

  const [lengthCont, setLengthCont] = useState("");
  const [lengthCont2, setLengthCont2] = useState("");
  const [lengthCont3, setLengthCont3] = useState("");

  const [dateCont, setDateCont] = useState("");
  const [dateCont2, setDateCont2] = useState("");
  const [dateCont3, setDateCont3] = useState("");

  const [genreCont, setGenreCont] = useState([]);
  const [genreCont2, setGenreCont2] = useState([]);
  const [genreCont3, setGenreCont3] = useState([]);

  const [titleCont, setTitleCont] = useState("");
  const [titleCont2, setTitleCont2] = useState("");
  const [titleCont3, setTitleCont3] = useState("");

  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedTitle2, setSelectedTitle2] = useState("");
  const [selectedTitle3, setSelectedTitle3] = useState("");

  const [idCont, setIdCont] = useState("");
  const [idCont2, setIdCont2] = useState("");
  const [idCont3, setIdCont3] = useState("");

  const [selectedId, setSelectedId] = useState("");
  const [selectedId2, setSelectedId2] = useState("");
  const [selectedId3, setSelectedId3] = useState("");

  const [selectedKey, setSelectedKey] = useState("");
  const [selectedKey2, setSelectedKey2] = useState("");
  const [selectedKey3, setSelectedKey3] = useState("");

  const [selectedImageURL, setSelectedImageURL] = useState("");
  const [selectedImageURL2, setSelectedImageURL2] = useState("");
  const [selectedImageURL3, setSelectedImageURL3] = useState("");

  const [selectedOverview, setSelectedOverview] = useState("");
  const [selectedOverview2, setSelectedOverview2] = useState("");
  const [selectedOverview3, setSelectedOverview3] = useState("");

  const [selectedLength, setSelectedLength] = useState("");
  const [selectedLength2, setSelectedLength2] = useState("");
  const [selectedLength3, setSelectedLength3] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDate2, setSelectedDate2] = useState("");
  const [selectedDate3, setSelectedDate3] = useState("");

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedGenres2, setSelectedGenres2] = useState([]);
  const [selectedGenres3, setSelectedGenres3] = useState([]);

  const [clickedID, setClickedID] = useState("");
  const [clickedTitle, setClickedTitle] = useState("");
  const [clickedKey, setClickedKey] = useState("");
  const [clickedDate, setClickedDate] = useState("");
  const [clickedLength, setClickedLength] = useState("");
  const [clickedGenre, setClickedGenre] = useState("");
  const [clickedOverview, setClickedOverview] = useState("");

  const [MovieTitle, setMovieTitle] = useState("");
  const [MovieImgURL, setMovieImgURL] = useState("");
  const [MovieVideoKey, setMovieVideoKey] = useState("");
  const [MovieLength, setMovieLength] = useState("");
  const [MovieDate, setMovieDate] = useState("");
  const [MovieGenres, setMovieGenres] = useState([]);
  const [MovieDescription, setMovieDescription] = useState("");
  const [isPlusBtnClicked, setIsPlusBtnClicked] = useState(null);
  const [isRandomMoviePlusBtnClicked, setIsRandomMoviePlusBtnClicked] =
    useState(false);
  const [isCard1MoviePlusBtnClicked, setIsCard1MoviePlusBtnClicked] =
    useState(false);
  const [isCard2MoviePlusBtnClicked, setIsCard2MoviePlusBtnClicked] =
    useState(false);
  const [isCard3MoviePlusBtnClicked, setIsCard3MoviePlusBtnClicked] =
    useState(false);

  const navigate = useNavigate();
  const updateSlicingRangeRef = useRef();
  const updateSlicingRangeRef2 = useRef();
  const updateSlicingRangeRef3 = useRef();

  const videoNode = useRef(null);
  const player = useRef(null);
  const initialized = useRef(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // trancating(cutting) description text if it's longer than 100 words
  const truncate = (str, n) => {
    return str.length > n ? str.slice(0, n - 1) + "..." : str;
  };

  setTimeout(() => {
    setAllowHover(true);
  }, 5000);

  const handleChildData = (xClickState) => {
    if (xClickState) {
      setIsBtnClicked(false);
    }
  };

  const handlePlayClick = (number) => {
    if (number === 0) {
      navigate("/movie-player", { state: { data: randomVideoKey } });
    } else if (number === 1) {
      navigate("/movie-player", { state: { data: selectedKey } });
    } else if (number === 2) {
      navigate("/movie-player", { state: { data: selectedKey2 } });
    } else if (number === 3) {
      navigate("/movie-player", { state: { data: selectedKey3 } });
    }
  };

  const handleClick = (id, title, key, date, length, overview, genres) => {
    setClickedID(id);
    setClickedTitle(title);
    setClickedKey(key);
    setClickedDate(date);
    setClickedLength(length);
    setClickedOverview(overview);
    setClickedGenre(genres);
    setIsBtnClicked(true);
  };

  // 1111111111111111
  const handleMouseEnter = (outerIndex, imageIndex) => {
    if (allowHover) {
      const currentImgURL = imageURLCont[outerIndex][imageIndex];
      setSelectedImageURL(currentImgURL);

      const currentID = idCont[outerIndex][imageIndex];
      setSelectedId(currentID);

      const currentTitle = titleCont[outerIndex][imageIndex];
      setSelectedTitle(currentTitle);

      const currentKey = videoKeyCont[outerIndex][imageIndex];
      setSelectedKey(currentKey);

      const currentOverview = overviewCont[outerIndex][imageIndex];
      setSelectedOverview(currentOverview);

      const currentlength = lengthCont[outerIndex][imageIndex];
      const hours = Math.floor(currentlength / 60);
      var minutes = currentlength % 60;
      setSelectedLength(`${hours}h ${minutes}m`);

      const currentDate = dateCont[outerIndex][imageIndex];
      setSelectedDate(currentDate.slice(0, 4));

      const currentGenre = genreCont[outerIndex][imageIndex];
      const genresToAdd = currentGenre.map((genres, i) => genres);
      const SlicedGenresToAdd = genresToAdd.slice(0, 3);

      setSelectedGenres(SlicedGenresToAdd);
    }

    const slickSliders = document.querySelectorAll(".slick-slider");
    slickSliders[0].classList.add("slider-hovered");
    const layeredSliders = document.querySelectorAll(".layered");
    layeredSliders.forEach((slider) => {
      slider.classList.add("layered-zindex");
    });
  };

  const handleMouseLeave = () => {
    const slickSliders = document.querySelectorAll(".slick-slider");
    slickSliders[0].classList.remove("slider-hovered");
    const layeredSliders = document.querySelectorAll(".layered");
    layeredSliders.forEach((slider) => {
      slider.classList.remove("layered-zindex");
    });
  };

  // 22222222222222
  const handleMouseEnter2 = (outerIndex, imageIndex) => {
    if (allowHover) {
      const currentImgURL = imageURLCont2[outerIndex][imageIndex];
      setSelectedImageURL2(currentImgURL);

      const currentID = idCont2[outerIndex][imageIndex];
      setSelectedId2(currentID);

      const currentTitle = titleCont2[outerIndex][imageIndex];
      setSelectedTitle2(currentTitle);

      const currentKey2 = videoKeyCont2[outerIndex][imageIndex];
      setSelectedKey2(currentKey2);

      const currentOverview2 = overviewCont2[outerIndex][imageIndex];
      setSelectedOverview2(currentOverview2);

      const currentlength2 = lengthCont2[outerIndex][imageIndex];
      const hours = Math.floor(currentlength2 / 60);
      var minutes = currentlength2 % 60;
      setSelectedLength2(`${hours}h ${minutes}m`);

      const currentGenre = genreCont2[outerIndex][imageIndex];
      const genresToAdd = currentGenre.map((genres, i) => genres);
      const SlicedGenresToAdd = genresToAdd.slice(0, 3);

      setSelectedGenres2(SlicedGenresToAdd);

      const currentDate2 = dateCont2[outerIndex][imageIndex];
      setSelectedDate2(currentDate2.slice(0, 4));
    }

    const slickSliders = document.querySelectorAll(".slick-slider");
    slickSliders[1].classList.add("slider-hovered");
    const layeredSliders = document.querySelectorAll(".layered");
    layeredSliders.forEach((slider) => {
      slider.classList.add("layered-zindex");
    });
  };

  const handleMouseLeave2 = () => {
    const slickSliders = document.querySelectorAll(".slick-slider");
    slickSliders[1].classList.remove("slider-hovered");
    const layeredSliders = document.querySelectorAll(".layered");
    layeredSliders.forEach((slider) => {
      slider.classList.remove("layered-zindex");
    });
  };

  // 333333333333333
  const handleMouseEnter3 = (outerIndex, imageIndex) => {
    if (allowHover) {
      const currentImgURL = imageURLCont3[outerIndex][imageIndex];
      setSelectedImageURL3(currentImgURL);

      const currentID = idCont3[outerIndex][imageIndex];
      setSelectedId3(currentID);

      const currentTitle = titleCont3[outerIndex][imageIndex];
      setSelectedTitle3(currentTitle);

      const currentKey3 = videoKeyCont3[outerIndex][imageIndex];
      setSelectedKey3(currentKey3);

      const currentOverview3 = overviewCont3[outerIndex][imageIndex];
      setSelectedOverview3(currentOverview3);

      const currentlength3 = lengthCont3[outerIndex][imageIndex];
      setSelectedLength3(currentlength3);
      const hours = Math.floor(currentlength3 / 60);
      var minutes = currentlength3 % 60;
      setSelectedLength3(`${hours}h ${minutes}m`);

      const currentGenre = genreCont3[outerIndex][imageIndex];
      const genresToAdd = currentGenre.map((genres, i) => genres);
      const SlicedGenresToAdd = genresToAdd.slice(0, 3);

      setSelectedGenres3(SlicedGenresToAdd);

      const currentDate3 = dateCont3[outerIndex][imageIndex];
      setSelectedDate3(currentDate3.slice(0, 4));
    }

    const slickSliders = document.querySelectorAll(".slick-slider");
    slickSliders[2].classList.add("slider-hovered");
    const layeredSliders = document.querySelectorAll(".layered");
    layeredSliders.forEach((slider) => {
      slider.classList.add("layered-zindex");
    });
  };

  const handleMouseLeave3 = () => {
    const slickSliders = document.querySelectorAll(".slick-slider");
    slickSliders[2].classList.remove("slider-hovered");
    const layeredSliders = document.querySelectorAll(".layered");
    layeredSliders.forEach((slider) => {
      slider.classList.remove("layered-zindex");
    });
  };

  useEffect(() => {
    // Redirect unauthorized user back to auth-netflix-account page
    if (location.state) {
      setUsername(location.state.data);
    } else {
      navigate("/auth-netflix-account");
    }
    // Fetching form TMDB API
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`)
      .then((response) => {
        const randomNumber = Math.floor(Math.random() * 20);
        const backdropPaths = response.data.results.map((movie) => {
          return movie.backdrop_path;
        });

        // #111111111111111
        const videoIds = response.data.results.map((movie) => {
          return movie.id;
        });

        // movie detail retrieving
        const fetchMovieDetails = async () => {
          const promises = videoIds.map(async (videoId) => {
            try {
              const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${videoId}?api_key=${api_key}`
              );
              return response;
            } catch (error) {
              console.error(
                `Error fetching data for video ID ${videoId}:`,
                error
              );
              return null;
            }
          });

          const videoDetails = await Promise.all(promises);
          return videoDetails;
        };

        fetchMovieDetails()
          .then((result) => {
            const imageUrl = result.map((movie) => movie.data?.backdrop_path);
            const id = result.map((movie) => movie.data?.id);
            const title = result.map((movie) => movie.data?.title);
            const overview = result.map((movie) => movie.data?.overview);
            const runtime = result.map((movie) => movie.data?.runtime);
            const date = result.map((movie) => movie.data?.release_date);
            const genres = result.map((movie) => movie.data?.genres);

            const updateSlicingRange = () => {
              if (window.innerWidth > 1141) {
                // slicing image-url
                const slicedUrlsIMG1 = imageUrl.slice(0, 6);
                const slicedUrlsIMG2 = imageUrl.slice(7, 13);
                const slicedUrlsIMG3 = imageUrl.slice(13, 19);

                const IMGcont = [
                  [...slicedUrlsIMG1],
                  [...slicedUrlsIMG2],
                  [...slicedUrlsIMG3],
                ];
                setimageURLCont([...IMGcont]);

                // slicing id
                const slicedUrlsID1 = id.slice(0, 6);
                const slicedUrlsID2 = id.slice(7, 13);
                const slicedUrlsID3 = id.slice(13, 19);

                const IDcont = [
                  [...slicedUrlsID1],
                  [...slicedUrlsID2],
                  [...slicedUrlsID3],
                ];
                setIdCont([...IDcont]);

                // slicing title
                const slicedUrlsTI1 = title.slice(0, 6);
                const slicedUrlsTI2 = title.slice(7, 13);
                const slicedUrlsTI3 = title.slice(13, 19);

                const TIcont = [
                  [...slicedUrlsTI1],
                  [...slicedUrlsTI2],
                  [...slicedUrlsTI3],
                ];
                setTitleCont([...TIcont]);

                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 6);
                const slicedUrlsOV2 = overview.slice(7, 13);
                const slicedUrlsOV3 = overview.slice(13, 19);

                const OVcont = [
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 6);
                const slicedUrlsLG2 = runtime.slice(7, 13);
                const slicedUrlsLG3 = runtime.slice(13, 19);

                const LGcont = [
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG3],
                ];
                setLengthCont([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 6);
                const slicedUrlsDT2 = date.slice(7, 13);
                const slicedUrlsDT3 = date.slice(13, 19);

                const DTcont = [
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT3],
                ];
                setDateCont([...DTcont]);

                // slicing genre
                const slicedUrlsGN1 = genres.slice(0, 6);
                const slicedUrlsGN2 = genres.slice(7, 13);
                const slicedUrlsGN3 = genres.slice(13, 19);

                const GNcont = [
                  [...slicedUrlsGN1],
                  [...slicedUrlsGN2],
                  [...slicedUrlsGN3],
                ];
                setGenreCont([...GNcont]);
              } else if (window.innerWidth < 1140 && window.innerWidth > 800) {
                // slicing image-url
                const slicedUrlsIMG1 = imageUrl.slice(0, 4);
                const slicedUrlsIMG2 = imageUrl.slice(5, 9);
                const slicedUrlsIMG3 = imageUrl.slice(10, 14);

                const IMGcont = [
                  [...slicedUrlsIMG1],
                  [...slicedUrlsIMG2],
                  [...slicedUrlsIMG3],
                ];
                setimageURLCont([...IMGcont]);

                // slicing id
                const slicedUrlsID1 = id.slice(0, 4);
                const slicedUrlsID2 = id.slice(5, 9);
                const slicedUrlsID3 = id.slice(10, 14);

                const IDcont = [
                  [...slicedUrlsID1],
                  [...slicedUrlsID2],
                  [...slicedUrlsID3],
                ];
                setIdCont([...IDcont]);

                // slicing title
                const slicedUrlsTI1 = title.slice(0, 4);
                const slicedUrlsTI2 = title.slice(5, 9);
                const slicedUrlsTI3 = title.slice(10, 14);

                const TIcont = [
                  [...slicedUrlsTI1],
                  [...slicedUrlsTI2],
                  [...slicedUrlsTI3],
                ];
                setTitleCont([...TIcont]);

                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 4);
                const slicedUrlsOV2 = overview.slice(5, 9);
                const slicedUrlsOV3 = overview.slice(10, 14);

                const OVcont = [
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 4);
                const slicedUrlsLG2 = runtime.slice(5, 9);
                const slicedUrlsLG3 = runtime.slice(10, 14);

                const LGcont = [
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG3],
                ];
                setLengthCont([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 4);
                const slicedUrlsDT2 = date.slice(5, 9);
                const slicedUrlsDT3 = date.slice(10, 14);

                const DTcont = [
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT3],
                ];
                setDateCont([...DTcont]);

                // slicing genre
                const slicedUrlsGN1 = genres.slice(0, 4);
                const slicedUrlsGN2 = genres.slice(5, 9);
                const slicedUrlsGN3 = genres.slice(10, 14);

                const GNcont = [
                  [...slicedUrlsGN1],
                  [...slicedUrlsGN2],
                  [...slicedUrlsGN3],
                ];
                setGenreCont([...GNcont]);
              } else if (window.innerWidth < 800 && window.innerWidth > 450) {
                // slicing image-url
                const slicedUrlsIMG1 = imageUrl.slice(0, 3);
                const slicedUrlsIMG2 = imageUrl.slice(5, 8);
                const slicedUrlsIMG3 = imageUrl.slice(10, 13);

                const IMGcont = [
                  [...slicedUrlsIMG1],
                  [...slicedUrlsIMG2],
                  [...slicedUrlsIMG3],
                ];
                setimageURLCont([...IMGcont]);

                // slicing title
                const slicedUrlsID1 = id.slice(0, 3);
                const slicedUrlsID2 = id.slice(5, 8);
                const slicedUrlsID3 = id.slice(10, 13);

                const IDcont = [
                  [...slicedUrlsID1],
                  [...slicedUrlsID2],
                  [...slicedUrlsID3],
                ];
                setIdCont([...IDcont]);

                // slicing title
                const slicedUrlsTI1 = title.slice(0, 3);
                const slicedUrlsTI2 = title.slice(5, 8);
                const slicedUrlsTI3 = title.slice(10, 13);

                const TIcont = [
                  [...slicedUrlsTI1],
                  [...slicedUrlsTI2],
                  [...slicedUrlsTI3],
                ];
                setTitleCont([...TIcont]);

                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 3);
                const slicedUrlsOV2 = overview.slice(5, 8);
                const slicedUrlsOV3 = overview.slice(10, 13);

                const OVcont = [
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 3);
                const slicedUrlsLG2 = runtime.slice(5, 8);
                const slicedUrlsLG3 = runtime.slice(10, 13);

                const LGcont = [
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG3],
                ];
                setLengthCont([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 3);
                const slicedUrlsDT2 = date.slice(5, 8);
                const slicedUrlsDT3 = date.slice(10, 13);

                const DTcont = [
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT3],
                ];
                setDateCont([...DTcont]);

                // slicing genre
                const slicedUrlsGN1 = genres.slice(0, 3);
                const slicedUrlsGN2 = genres.slice(5, 8);
                const slicedUrlsGN3 = genres.slice(10, 13);

                const GNcont = [
                  [...slicedUrlsGN1],
                  [...slicedUrlsGN2],
                  [...slicedUrlsGN3],
                ];
                setGenreCont([...GNcont]);
              } else if (window.innerWidth < 450) {
                // slicing image-url
                const slicedUrlsIMG1 = imageUrl.slice(0, 2);
                const slicedUrlsIMG2 = imageUrl.slice(5, 7);
                const slicedUrlsIMG3 = imageUrl.slice(10, 12);

                const IMGcont = [
                  [...slicedUrlsIMG1],
                  [...slicedUrlsIMG2],
                  [...slicedUrlsIMG3],
                ];
                setimageURLCont([...IMGcont]);

                // slicing id
                const slicedUrlsID1 = id.slice(0, 2);
                const slicedUrlsID2 = id.slice(5, 7);
                const slicedUrlsID3 = id.slice(10, 12);

                const IDcont = [
                  [...slicedUrlsID1],
                  [...slicedUrlsID2],
                  [...slicedUrlsID3],
                ];
                setIdCont([...IDcont]);

                // slicing title
                const slicedUrlsTI1 = title.slice(0, 2);
                const slicedUrlsTI2 = title.slice(5, 7);
                const slicedUrlsTI3 = title.slice(10, 12);

                const TIcont = [
                  [...slicedUrlsTI1],
                  [...slicedUrlsTI2],
                  [...slicedUrlsTI3],
                ];
                setTitleCont([...TIcont]);

                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 2);
                const slicedUrlsOV2 = overview.slice(5, 7);
                const slicedUrlsOV3 = overview.slice(10, 12);

                const OVcont = [
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 2);
                const slicedUrlsLG2 = runtime.slice(5, 7);
                const slicedUrlsLG3 = runtime.slice(10, 12);

                const LGcont = [
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG3],
                ];
                setLengthCont([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 2);
                const slicedUrlsDT2 = date.slice(5, 7);
                const slicedUrlsDT3 = date.slice(10, 12);

                const DTcont = [
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT3],
                ];
                setDateCont([...DTcont]);

                // slicing genre
                const slicedUrlsGN1 = genres.slice(0, 2);
                const slicedUrlsGN2 = genres.slice(5, 7);
                const slicedUrlsGN3 = genres.slice(10, 12);

                const GNcont = [
                  [...slicedUrlsGN1],
                  [...slicedUrlsGN2],
                  [...slicedUrlsGN3],
                ];
                setGenreCont([...GNcont]);
              }
            };

            updateSlicingRange();
            updateSlicingRangeRef.current = updateSlicingRange;
            window.addEventListener("resize", updateSlicingRange);
          })
          .catch((error) => {
            console.error("Error fetching video details:", error);
          });

        // video-key retrieving
        const fetchVideoDetails = async () => {
          const promises = videoIds.map(async (videoId) => {
            try {
              const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=${api_key}`
              );
              return response.data.results[0];
            } catch (error) {
              console.error(
                `Error fetching data for video ID ${videoId}:`,
                error
              );
              return null;
            }
          });

          const videoDetails = await Promise.all(promises);
          return videoDetails;
        };

        fetchVideoDetails()
          .then((result) => {
            const videoKeys = result.map((movie) => movie?.key);
            const updateSlicingRange = () => {
              if (window.innerWidth > 1141) {
                // Adjust the range difference to 4 if window width is below 1141px
                const slicedUrls1 = videoKeys.slice(0, 6);
                const slicedUrls2 = videoKeys.slice(7, 13);
                const slicedUrls3 = videoKeys.slice(13, 19);

                const imageUrlCont = [
                  [...slicedUrls1],
                  [...slicedUrls2],
                  [...slicedUrls3],
                ];
                setVideoKeyCont([...imageUrlCont]);
              } else if (window.innerWidth < 1140 && window.innerWidth > 800) {
                const slicedUrls1 = videoKeys.slice(0, 4);
                const slicedUrls2 = videoKeys.slice(5, 9);
                const slicedUrls3 = videoKeys.slice(10, 14);

                const imageUrlCont = [
                  [...slicedUrls1],
                  [...slicedUrls2],
                  [...slicedUrls3],
                ];
                setVideoKeyCont([...imageUrlCont]);
              } else if (window.innerWidth < 800 && window.innerWidth > 450) {
                const slicedUrls1 = videoKeys.slice(0, 3);
                const slicedUrls2 = videoKeys.slice(5, 8);
                const slicedUrls3 = videoKeys.slice(10, 13);

                const imageUrlCont = [
                  [...slicedUrls1],
                  [...slicedUrls2],
                  [...slicedUrls3],
                ];
                setVideoKeyCont([...imageUrlCont]);
              } else if (window.innerWidth < 450) {
                const slicedUrls1 = videoKeys.slice(0, 2);
                const slicedUrls2 = videoKeys.slice(5, 7);
                const slicedUrls3 = videoKeys.slice(10, 12);

                const imageUrlCont = [
                  [...slicedUrls1],
                  [...slicedUrls2],
                  [...slicedUrls3],
                ];
                setVideoKeyCont([...imageUrlCont]);
              }
            };

            updateSlicingRange();
            updateSlicingRangeRef.current = updateSlicingRange;
            window.addEventListener("resize", updateSlicingRange);
          })
          .catch((error) => {
            console.error("Error fetching video details:", error);
          });

        // image url retrieving
        const updateSlicingRange = () => {
          if (window.innerWidth > 1141) {
            // Adjust the range difference to 4 if window width is below 1141px
            const slicedUrls1 = backdropPaths.slice(0, 6);
            const slicedUrls2 = backdropPaths.slice(7, 13);
            const slicedUrls3 = backdropPaths.slice(13, 19);

            const imageUrlCont = [
              [...slicedUrls1],
              [...slicedUrls2],
              [...slicedUrls3],
            ];
            setMovieImageUrls([...imageUrlCont]);
          } else if (window.innerWidth < 1140 && window.innerWidth > 800) {
            const slicedUrls1 = backdropPaths.slice(0, 4);
            const slicedUrls2 = backdropPaths.slice(5, 9);
            const slicedUrls3 = backdropPaths.slice(10, 14);

            const imageUrlCont = [
              [...slicedUrls1],
              [...slicedUrls2],
              [...slicedUrls3],
            ];
            setMovieImageUrls([...imageUrlCont]);
          } else if (window.innerWidth < 800 && window.innerWidth > 450) {
            const slicedUrls1 = backdropPaths.slice(0, 3);
            const slicedUrls2 = backdropPaths.slice(5, 8);
            const slicedUrls3 = backdropPaths.slice(10, 13);

            const imageUrlCont = [
              [...slicedUrls1],
              [...slicedUrls2],
              [...slicedUrls3],
            ];
            setMovieImageUrls([...imageUrlCont]);
          } else if (window.innerWidth < 450) {
            const slicedUrls1 = backdropPaths.slice(0, 2);
            const slicedUrls2 = backdropPaths.slice(5, 7);
            const slicedUrls3 = backdropPaths.slice(10, 12);

            const imageUrlCont = [
              [...slicedUrls1],
              [...slicedUrls2],
              [...slicedUrls3],
            ];
            setMovieImageUrls([...imageUrlCont]);
          }
        };

        updateSlicingRange();
        updateSlicingRangeRef.current = updateSlicingRange;
        window.addEventListener("resize", updateSlicingRange);

        // 11111111111111111111

        // Fetching random video from TMDB API then inserting video key into videojs-youtube
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${response.data.results[randomNumber].id}/videos?api_key=${api_key}`
            // https://api.themoviedb.org/3/movie/787699?
          )
          .then((response) => {
            setRandomVideoKey(response.data.results[0].key);

            // inserting video key into videojs-youtube
            if (videoNode.current && !initialized.current) {
              initialized.current = true; //prevent duplicate initialization
              player.current = videojs(videoNode.current, {
                ...{
                  controls: true,
                  fluid: true,
                  controlBar: {
                    volumePanel: {
                      inline: false,
                    },
                  },
                },
                ...{
                  autoplay: true,
                  muted: true,
                  fluid: true,
                  loop: true,
                  rel: false,
                  sources: [
                    {
                      type: "video/youtube",
                      src: `https://www.youtube.com/watch?v=${response.data.results[0].key}`,
                    },
                  ],
                },
              }).ready(function () {
                console.log("Player Ready");
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });

        // Fetching random movie detail
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${response.data.results[randomNumber].id}?api_key=${api_key}`
          )
          .then((rendomMovieDetailRes) => {
            setDescription(rendomMovieDetailRes.data.overview);
            setRandomImage(rendomMovieDetailRes.data.backdrop_path);
            setID(rendomMovieDetailRes.data.id);
            setTitle(rendomMovieDetailRes.data.title);
            setRandomDate(rendomMovieDetailRes.data.release_date.slice(0, 4));
            setRandomGenres(rendomMovieDetailRes.data.genres.slice(0, 3));
            const hours = Math.floor(rendomMovieDetailRes.data.runtime / 60);
            var minutes = rendomMovieDetailRes.data.runtime % 60;
            setRandomLength(`${hours}h ${minutes}m`);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`)
      .then((response) => {
        const backdropPaths = response.data.results.map(
          (movie) => movie.backdrop_path
        );

        // #22222222222222222222222
        const videoIds2 = response.data.results.map((movie) => {
          return movie.id;
        });

        // movie detail retrieving
        const fetchMovieDetails2 = async () => {
          const promises = videoIds2.map(async (videoId) => {
            try {
              const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${videoId}?api_key=${api_key}`
              );
              return response;
            } catch (error) {
              console.error(
                `Error fetching data for video ID ${videoId}:`,
                error
              );
              return null;
            }
          });

          const videoDetails = await Promise.all(promises);
          return videoDetails;
        };

        fetchMovieDetails2()
          .then((result) => {
            const imageUrl = result.map((movie) => movie.data?.backdrop_path);
            const id = result.map((movie) => movie.data?.id);
            const title = result.map((movie) => movie.data?.title);
            const overview = result.map((movie) => movie.data?.overview);
            const runtime = result.map((movie) => movie.data?.runtime);
            const date = result.map((movie) => movie.data?.release_date);
            const genres = result.map((movie) => movie.data?.genres);

            const updateSlicingRange = () => {
              if (window.innerWidth > 1141) {
                // slicing image-url
                const slicedUrlsIMG1 = imageUrl.slice(0, 6);
                const slicedUrlsIMG2 = imageUrl.slice(7, 13);
                const slicedUrlsIMG3 = imageUrl.slice(13, 19);

                const IMGcont = [
                  [...slicedUrlsIMG2],
                  [...slicedUrlsIMG1],
                  [...slicedUrlsIMG3],
                ];
                setimageURLCont2([...IMGcont]);
                // slicing id
                const slicedUrlsID1 = id.slice(0, 6);
                const slicedUrlsID2 = id.slice(7, 13);
                const slicedUrlsID3 = id.slice(13, 19);

                const IDcont = [
                  [...slicedUrlsID2],
                  [...slicedUrlsID1],
                  [...slicedUrlsID3],
                ];
                setIdCont2([...IDcont]);

                // slicing title
                const slicedUrlsTI1 = title.slice(0, 6);
                const slicedUrlsTI2 = title.slice(7, 13);
                const slicedUrlsTI3 = title.slice(13, 19);

                const TIcont = [
                  [...slicedUrlsTI2],
                  [...slicedUrlsTI1],
                  [...slicedUrlsTI3],
                ];
                setTitleCont2([...TIcont]);

                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 6);
                const slicedUrlsOV2 = overview.slice(7, 13);
                const slicedUrlsOV3 = overview.slice(13, 19);

                const OVcont = [
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont2([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 6);
                const slicedUrlsLG2 = runtime.slice(7, 13);
                const slicedUrlsLG3 = runtime.slice(13, 19);

                const LGcont = [
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG3],
                ];
                setLengthCont2([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 6);
                const slicedUrlsDT2 = date.slice(7, 13);
                const slicedUrlsDT3 = date.slice(13, 19);

                const DTcont = [
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT3],
                ];
                setDateCont2([...DTcont]);

                // slicing genre
                const slicedUrlsGN1 = genres.slice(0, 6);
                const slicedUrlsGN2 = genres.slice(7, 13);
                const slicedUrlsGN3 = genres.slice(13, 19);

                const GNcont = [
                  [...slicedUrlsGN2],
                  [...slicedUrlsGN1],
                  [...slicedUrlsGN3],
                ];
                setGenreCont2([...GNcont]);
              } else if (window.innerWidth < 1140 && window.innerWidth > 800) {
                // slicing image-url
                const slicedUrlsIMG1 = imageUrl.slice(0, 4);
                const slicedUrlsIMG2 = imageUrl.slice(5, 9);
                const slicedUrlsIMG3 = imageUrl.slice(10, 14);

                const IMGcont = [
                  [...slicedUrlsIMG2],
                  [...slicedUrlsIMG1],
                  [...slicedUrlsIMG3],
                ];
                setimageURLCont2([...IMGcont]);

                // slicing id
                const slicedUrlsID1 = id.slice(0, 4);
                const slicedUrlsID2 = id.slice(5, 9);
                const slicedUrlsID3 = id.slice(10, 14);

                const IDcont = [
                  [...slicedUrlsID2],
                  [...slicedUrlsID1],
                  [...slicedUrlsID3],
                ];
                setIdCont2([...IDcont]);

                // slicing title
                const slicedUrlsTI1 = title.slice(0, 4);
                const slicedUrlsTI2 = title.slice(5, 9);
                const slicedUrlsTI3 = title.slice(10, 14);

                const TIcont = [
                  [...slicedUrlsTI2],
                  [...slicedUrlsTI1],
                  [...slicedUrlsTI3],
                ];
                setTitleCont2([...TIcont]);

                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 4);
                const slicedUrlsOV2 = overview.slice(5, 9);
                const slicedUrlsOV3 = overview.slice(10, 14);

                const OVcont = [
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont2([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 4);
                const slicedUrlsLG2 = runtime.slice(5, 9);
                const slicedUrlsLG3 = runtime.slice(10, 14);

                const LGcont = [
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG3],
                ];
                setLengthCont2([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 4);
                const slicedUrlsDT2 = date.slice(5, 9);
                const slicedUrlsDT3 = date.slice(10, 14);

                const DTcont = [
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT3],
                ];
                setDateCont2([...DTcont]);

                // slicing genre
                const slicedUrlsGN1 = genres.slice(0, 4);
                const slicedUrlsGN2 = genres.slice(5, 9);
                const slicedUrlsGN3 = genres.slice(10, 14);

                const GNcont = [
                  [...slicedUrlsGN2],
                  [...slicedUrlsGN1],
                  [...slicedUrlsGN3],
                ];
                setGenreCont2([...GNcont]);
              } else if (window.innerWidth < 800 && window.innerWidth > 450) {
                // slicing image-url
                const slicedUrlsIMG1 = imageUrl.slice(0, 3);
                const slicedUrlsIMG2 = imageUrl.slice(5, 8);
                const slicedUrlsIMG3 = imageUrl.slice(10, 13);

                const IMGcont = [
                  [...slicedUrlsIMG2],
                  [...slicedUrlsIMG1],
                  [...slicedUrlsIMG3],
                ];
                setimageURLCont2([...IMGcont]);

                // slicing id
                const slicedUrlsID1 = id.slice(0, 3);
                const slicedUrlsID2 = id.slice(5, 8);
                const slicedUrlsID3 = id.slice(10, 13);

                const IDcont = [
                  [...slicedUrlsID2],
                  [...slicedUrlsID1],
                  [...slicedUrlsID3],
                ];
                setIdCont2([...IDcont]);

                // slicing title
                const slicedUrlsTI1 = title.slice(0, 3);
                const slicedUrlsTI2 = title.slice(5, 8);
                const slicedUrlsTI3 = title.slice(10, 13);

                const TIcont = [
                  [...slicedUrlsTI2],
                  [...slicedUrlsTI1],
                  [...slicedUrlsTI3],
                ];
                setTitleCont2([...TIcont]);

                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 3);
                const slicedUrlsOV2 = overview.slice(5, 8);
                const slicedUrlsOV3 = overview.slice(10, 13);

                const OVcont = [
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont2([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 3);
                const slicedUrlsLG2 = runtime.slice(5, 8);
                const slicedUrlsLG3 = runtime.slice(10, 13);

                const LGcont = [
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG3],
                ];
                setLengthCont2([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 3);
                const slicedUrlsDT2 = date.slice(5, 8);
                const slicedUrlsDT3 = date.slice(10, 13);

                const DTcont = [
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT3],
                ];
                setDateCont2([...DTcont]);

                // slicing genre
                const slicedUrlsGN1 = genres.slice(0, 3);
                const slicedUrlsGN2 = genres.slice(5, 8);
                const slicedUrlsGN3 = genres.slice(10, 13);

                const GNcont = [
                  [...slicedUrlsGN2],
                  [...slicedUrlsGN1],
                  [...slicedUrlsGN3],
                ];
                setGenreCont2([...GNcont]);
              } else if (window.innerWidth < 450) {
                // slicing image-url
                const slicedUrlsIMG1 = imageUrl.slice(0, 2);
                const slicedUrlsIMG2 = imageUrl.slice(5, 7);
                const slicedUrlsIMG3 = imageUrl.slice(10, 12);

                const IMGcont = [
                  [...slicedUrlsIMG2],
                  [...slicedUrlsIMG1],
                  [...slicedUrlsIMG3],
                ];
                setimageURLCont2([...IMGcont]);

                // slicing id
                const slicedUrlsID1 = id.slice(0, 2);
                const slicedUrlsID2 = id.slice(5, 7);
                const slicedUrlsID3 = id.slice(10, 12);

                const IDcont = [
                  [...slicedUrlsID2],
                  [...slicedUrlsID1],
                  [...slicedUrlsID3],
                ];
                setIdCont2([...IDcont]);

                // slicing title
                const slicedUrlsTI1 = title.slice(0, 2);
                const slicedUrlsTI2 = title.slice(5, 7);
                const slicedUrlsTI3 = title.slice(10, 12);

                const TIcont = [
                  [...slicedUrlsTI2],
                  [...slicedUrlsTI1],
                  [...slicedUrlsTI3],
                ];
                setTitleCont2([...TIcont]);

                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 2);
                const slicedUrlsOV2 = overview.slice(5, 7);
                const slicedUrlsOV3 = overview.slice(10, 12);

                const OVcont = [
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont2([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 2);
                const slicedUrlsLG2 = runtime.slice(5, 7);
                const slicedUrlsLG3 = runtime.slice(10, 12);

                const LGcont = [
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG3],
                ];
                setLengthCont2([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 2);
                const slicedUrlsDT2 = date.slice(5, 7);
                const slicedUrlsDT3 = date.slice(10, 12);

                const DTcont = [
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT3],
                ];
                setDateCont2([...DTcont]);

                // slicing genre
                const slicedUrlsGN1 = genres.slice(0, 2);
                const slicedUrlsGN2 = genres.slice(5, 7);
                const slicedUrlsGN3 = genres.slice(10, 12);

                const GNcont = [
                  [...slicedUrlsGN2],
                  [...slicedUrlsGN1],
                  [...slicedUrlsGN3],
                ];
                setGenreCont2([...GNcont]);
              }
            };

            updateSlicingRange();
            updateSlicingRangeRef.current = updateSlicingRange;
            window.addEventListener("resize", updateSlicingRange);
          })
          .catch((error) => {
            console.error("Error fetching video details:", error);
          });

        // video-key retrieving
        const fetchVideoDetails2 = async () => {
          const promises = videoIds2.map(async (videoId) => {
            try {
              const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=${api_key}`
              );
              return response.data.results[0];
            } catch (error) {
              console.error(
                `Error fetching data for video ID ${videoId}:`,
                error
              );
              return null;
            }
          });

          const videoDetails = await Promise.all(promises);
          return videoDetails;
        };

        fetchVideoDetails2()
          .then((result) => {
            const videoKeys = result.map((movie) => movie?.key);

            const updateSlicingRange = () => {
              if (window.innerWidth > 1141) {
                // Adjust the range difference to 4 if window width is below 1141px
                const slicedUrls1 = videoKeys.slice(0, 6);
                const slicedUrls2 = videoKeys.slice(7, 13);
                const slicedUrls3 = videoKeys.slice(13, 19);

                const imageUrlCont = [
                  [...slicedUrls2],
                  [...slicedUrls1],
                  [...slicedUrls3],
                ];
                setVideoKeyCont2([...imageUrlCont]);
              } else if (window.innerWidth < 1140 && window.innerWidth > 800) {
                const slicedUrls1 = videoKeys.slice(0, 4);
                const slicedUrls2 = videoKeys.slice(5, 9);
                const slicedUrls3 = videoKeys.slice(10, 14);

                const imageUrlCont = [
                  [...slicedUrls2],
                  [...slicedUrls1],
                  [...slicedUrls3],
                ];
                setVideoKeyCont2([...imageUrlCont]);
              } else if (window.innerWidth < 800 && window.innerWidth > 450) {
                const slicedUrls1 = videoKeys.slice(0, 3);
                const slicedUrls2 = videoKeys.slice(5, 8);
                const slicedUrls3 = videoKeys.slice(10, 13);

                const imageUrlCont = [
                  [...slicedUrls2],
                  [...slicedUrls1],
                  [...slicedUrls3],
                ];
                setVideoKeyCont2([...imageUrlCont]);
              } else if (window.innerWidth < 450) {
                const slicedUrls1 = videoKeys.slice(0, 2);
                const slicedUrls2 = videoKeys.slice(5, 7);
                const slicedUrls3 = videoKeys.slice(10, 12);

                const imageUrlCont = [
                  [...slicedUrls2],
                  [...slicedUrls1],
                  [...slicedUrls3],
                ];
                setVideoKeyCont2([...imageUrlCont]);
              }
            };

            updateSlicingRange();
            updateSlicingRangeRef.current = updateSlicingRange;
            window.addEventListener("resize", updateSlicingRange);
          })
          .catch((error) => {
            console.error("Error fetching video details:", error);
          });

        //  image url retrieving
        const updateSlicingRange2 = () => {
          if (window.innerWidth > 1141) {
            // Adjust the range difference to 4 if window width is below 1141px
            const slicedUrls1 = backdropPaths.slice(0, 6);
            const slicedUrls2 = backdropPaths.slice(7, 13);
            const slicedUrls3 = backdropPaths.slice(13, 19);

            const imageUrlCont = [
              [...slicedUrls2],
              [...slicedUrls1],
              [...slicedUrls3],
            ];
            setMovieImageUrls2([...imageUrlCont]);
          } else if (window.innerWidth < 1140 && window.innerWidth > 800) {
            const slicedUrls1 = backdropPaths.slice(0, 4);
            const slicedUrls2 = backdropPaths.slice(5, 9);
            const slicedUrls3 = backdropPaths.slice(10, 14);

            const imageUrlCont = [
              [...slicedUrls2],
              [...slicedUrls1],
              [...slicedUrls3],
            ];
            setMovieImageUrls2([...imageUrlCont]);
          } else if (window.innerWidth < 800 && window.innerWidth > 450) {
            const slicedUrls1 = backdropPaths.slice(0, 3);
            const slicedUrls2 = backdropPaths.slice(5, 8);
            const slicedUrls3 = backdropPaths.slice(10, 13);

            const imageUrlCont = [
              [...slicedUrls2],
              [...slicedUrls1],
              [...slicedUrls3],
            ];
            setMovieImageUrls2([...imageUrlCont]);
          } else if (window.innerWidth < 450) {
            const slicedUrls1 = backdropPaths.slice(0, 2);
            const slicedUrls2 = backdropPaths.slice(5, 7);
            const slicedUrls3 = backdropPaths.slice(10, 12);

            const imageUrlCont = [
              [...slicedUrls2],
              [...slicedUrls1],
              [...slicedUrls3],
            ];
            setMovieImageUrls2([...imageUrlCont]);
          }
        };

        updateSlicingRange2();
        updateSlicingRangeRef2.current = updateSlicingRange2;
        window.addEventListener("resize", updateSlicingRange2);
      })
      .catch((error) => {
        console.error(error);
      });

    // #22222222222222222222222222

    axios
      .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}`)
      .then((response) => {
        const backdropPaths = response.data.results.map(
          (movie) => movie.backdrop_path
        );

        // 33333333333333333333
        const videoIds3 = response.data.results.map((movie) => {
          return movie.id;
        });
        // movie detail retrieving

        const fetchMovieDetails3 = async () => {
          const promises = videoIds3.map(async (videoId) => {
            try {
              const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${videoId}?api_key=${api_key}`
              );
              return response;
            } catch (error) {
              console.error(
                `Error fetching data for video ID ${videoId}:`,
                error
              );
              return null;
            }
          });

          const videoDetails = await Promise.all(promises);
          return videoDetails;
        };

        fetchMovieDetails3()
          .then((result) => {
            const imageUrl = result.map((movie) => movie.data?.backdrop_path);
            const id = result.map((movie) => movie.data?.id);
            const title = result.map((movie) => movie.data?.title);
            const overview = result.map((movie) => movie.data?.overview);
            const runtime = result.map((movie) => movie.data?.runtime);
            const date = result.map((movie) => movie.data?.release_date);
            const genres = result.map((movie) => movie.data?.genres);

            const updateSlicingRange = () => {
              if (window.innerWidth > 1141) {
                // slicing image-url
                const slicedUrlsIMG1 = imageUrl.slice(0, 6);
                const slicedUrlsIMG2 = imageUrl.slice(7, 13);
                const slicedUrlsIMG3 = imageUrl.slice(13, 19);

                const IMGcont = [
                  [...slicedUrlsIMG3],
                  [...slicedUrlsIMG2],
                  [...slicedUrlsIMG1],
                ];
                setimageURLCont3([...IMGcont]);
                // slicing id
                const slicedUrlsID1 = id.slice(0, 6);
                const slicedUrlsID2 = id.slice(7, 13);
                const slicedUrlsID3 = id.slice(13, 19);

                const IDcont = [
                  [...slicedUrlsID3],
                  [...slicedUrlsID2],
                  [...slicedUrlsID1],
                ];
                setIdCont3([...IDcont]);

                // slicing title
                const slicedUrlsTI1 = title.slice(0, 6);
                const slicedUrlsTI2 = title.slice(7, 13);
                const slicedUrlsTI3 = title.slice(13, 19);

                const TIcont = [
                  [...slicedUrlsTI3],
                  [...slicedUrlsTI2],
                  [...slicedUrlsTI1],
                ];
                setTitleCont3([...TIcont]);

                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 6);
                const slicedUrlsOV2 = overview.slice(7, 13);
                const slicedUrlsOV3 = overview.slice(13, 19);

                const OVcont = [
                  [...slicedUrlsOV3],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV1],
                ];
                setOverviewCont3([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 6);
                const slicedUrlsLG2 = runtime.slice(7, 13);
                const slicedUrlsLG3 = runtime.slice(13, 19);

                const LGcont = [
                  [...slicedUrlsLG3],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG1],
                ];
                setLengthCont3([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 6);
                const slicedUrlsDT2 = date.slice(7, 13);
                const slicedUrlsDT3 = date.slice(13, 19);

                const DTcont = [
                  [...slicedUrlsDT3],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT1],
                ];
                setDateCont3([...DTcont]);

                // slicing genre
                const slicedUrlsGN1 = genres.slice(0, 6);
                const slicedUrlsGN2 = genres.slice(7, 13);
                const slicedUrlsGN3 = genres.slice(13, 19);

                const GNcont = [
                  [...slicedUrlsGN3],
                  [...slicedUrlsGN2],
                  [...slicedUrlsGN1],
                ];
                setGenreCont3([...GNcont]);
              } else if (window.innerWidth < 1140 && window.innerWidth > 800) {
                // slicing image-url
                const slicedUrlsIMG1 = imageUrl.slice(0, 4);
                const slicedUrlsIMG2 = imageUrl.slice(5, 9);
                const slicedUrlsIMG3 = imageUrl.slice(10, 14);

                const IMGcont = [
                  [...slicedUrlsIMG3],
                  [...slicedUrlsIMG2],
                  [...slicedUrlsIMG1],
                ];
                setimageURLCont3([...IMGcont]);

                // slicing id
                const slicedUrlsID1 = id.slice(0, 4);
                const slicedUrlsID2 = id.slice(5, 9);
                const slicedUrlsID3 = id.slice(10, 14);

                const IDcont = [
                  [...slicedUrlsID3],
                  [...slicedUrlsID2],
                  [...slicedUrlsID1],
                ];
                setIdCont3([...IDcont]);

                // slicing title
                const slicedUrlsTI1 = title.slice(0, 4);
                const slicedUrlsTI2 = title.slice(5, 9);
                const slicedUrlsTI3 = title.slice(10, 14);

                const TIcont = [
                  [...slicedUrlsTI3],
                  [...slicedUrlsTI2],
                  [...slicedUrlsTI1],
                ];
                setTitleCont3([...TIcont]);

                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 4);
                const slicedUrlsOV2 = overview.slice(5, 9);
                const slicedUrlsOV3 = overview.slice(10, 14);

                const OVcont = [
                  [...slicedUrlsOV3],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV1],
                ];
                setOverviewCont3([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 4);
                const slicedUrlsLG2 = runtime.slice(5, 9);
                const slicedUrlsLG3 = runtime.slice(10, 14);

                const LGcont = [
                  [...slicedUrlsLG3],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG1],
                ];
                setLengthCont3([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 4);
                const slicedUrlsDT2 = date.slice(5, 9);
                const slicedUrlsDT3 = date.slice(10, 14);

                const DTcont = [
                  [...slicedUrlsDT3],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT1],
                ];
                setDateCont3([...DTcont]);

                // slicing genre
                const slicedUrlsGN1 = genres.slice(0, 4);
                const slicedUrlsGN2 = genres.slice(5, 9);
                const slicedUrlsGN3 = genres.slice(10, 14);

                const GNcont = [
                  [...slicedUrlsGN3],
                  [...slicedUrlsGN2],
                  [...slicedUrlsGN1],
                ];
                setGenreCont3([...GNcont]);
              } else if (window.innerWidth < 800 && window.innerWidth > 450) {
                // slicing image-url
                const slicedUrlsIMG1 = imageUrl.slice(0, 3);
                const slicedUrlsIMG2 = imageUrl.slice(5, 8);
                const slicedUrlsIMG3 = imageUrl.slice(10, 13);

                const IMGcont = [
                  [...slicedUrlsIMG3],
                  [...slicedUrlsIMG2],
                  [...slicedUrlsIMG1],
                ];
                setimageURLCont3([...IMGcont]);

                // slicing id
                const slicedUrlsID1 = id.slice(0, 3);
                const slicedUrlsID2 = id.slice(5, 8);
                const slicedUrlsID3 = id.slice(10, 13);

                const IDcont = [
                  [...slicedUrlsID3],
                  [...slicedUrlsID2],
                  [...slicedUrlsID1],
                ];
                setIdCont3([...IDcont]);

                // slicing title
                const slicedUrlsTI1 = title.slice(0, 3);
                const slicedUrlsTI2 = title.slice(5, 8);
                const slicedUrlsTI3 = title.slice(10, 13);

                const TIcont = [
                  [...slicedUrlsTI3],
                  [...slicedUrlsTI2],
                  [...slicedUrlsTI1],
                ];
                setTitleCont3([...TIcont]);

                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 3);
                const slicedUrlsOV2 = overview.slice(5, 8);
                const slicedUrlsOV3 = overview.slice(10, 13);

                const OVcont = [
                  [...slicedUrlsOV3],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV1],
                ];
                setOverviewCont3([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 3);
                const slicedUrlsLG2 = runtime.slice(5, 8);
                const slicedUrlsLG3 = runtime.slice(10, 13);

                const LGcont = [
                  [...slicedUrlsLG3],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG1],
                ];
                setLengthCont3([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 3);
                const slicedUrlsDT2 = date.slice(5, 8);
                const slicedUrlsDT3 = date.slice(10, 13);

                const DTcont = [
                  [...slicedUrlsDT3],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT1],
                ];
                setDateCont3([...DTcont]);

                // slicing genre
                const slicedUrlsGN1 = genres.slice(0, 3);
                const slicedUrlsGN2 = genres.slice(5, 8);
                const slicedUrlsGN3 = genres.slice(10, 13);

                const GNcont = [
                  [...slicedUrlsGN3],
                  [...slicedUrlsGN2],
                  [...slicedUrlsGN1],
                ];
                setGenreCont3([...GNcont]);
              } else if (window.innerWidth < 450) {
                // slicing image-url
                const slicedUrlsIMG1 = imageUrl.slice(0, 2);
                const slicedUrlsIMG2 = imageUrl.slice(5, 7);
                const slicedUrlsIMG3 = imageUrl.slice(10, 12);

                const IMGcont = [
                  [...slicedUrlsIMG3],
                  [...slicedUrlsIMG2],
                  [...slicedUrlsIMG1],
                ];
                setimageURLCont3([...IMGcont]);

                // slicing id
                const slicedUrlsID1 = id.slice(0, 2);
                const slicedUrlsID2 = id.slice(5, 7);
                const slicedUrlsID3 = id.slice(10, 12);

                const IDcont = [
                  [...slicedUrlsID3],
                  [...slicedUrlsID2],
                  [...slicedUrlsID1],
                ];
                setIdCont3([...IDcont]);

                // slicing title
                const slicedUrlsTI1 = title.slice(0, 2);
                const slicedUrlsTI2 = title.slice(5, 7);
                const slicedUrlsTI3 = title.slice(10, 12);

                const TIcont = [
                  [...slicedUrlsTI3],
                  [...slicedUrlsTI2],
                  [...slicedUrlsTI1],
                ];
                setTitleCont3([...TIcont]);

                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 2);
                const slicedUrlsOV2 = overview.slice(5, 7);
                const slicedUrlsOV3 = overview.slice(10, 12);

                const OVcont = [
                  [...slicedUrlsOV3],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV1],
                ];
                setOverviewCont3([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 2);
                const slicedUrlsLG2 = runtime.slice(5, 7);
                const slicedUrlsLG3 = runtime.slice(10, 12);

                const LGcont = [
                  [...slicedUrlsLG3],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG1],
                ];
                setLengthCont3([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 2);
                const slicedUrlsDT2 = date.slice(5, 7);
                const slicedUrlsDT3 = date.slice(10, 12);

                const DTcont = [
                  [...slicedUrlsDT3],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT1],
                ];
                setDateCont3([...DTcont]);

                // slicing genre
                const slicedUrlsGN1 = genres.slice(0, 2);
                const slicedUrlsGN2 = genres.slice(5, 7);
                const slicedUrlsGN3 = genres.slice(10, 12);

                const GNcont = [
                  [...slicedUrlsGN3],
                  [...slicedUrlsGN2],
                  [...slicedUrlsGN1],
                ];
                setGenreCont3([...GNcont]);
              }
            };

            updateSlicingRange();
            updateSlicingRangeRef.current = updateSlicingRange;
            window.addEventListener("resize", updateSlicingRange);
          })
          .catch((error) => {
            console.error("Error fetching video details:", error);
          });

        // video-key retrieving
        const fetchVideoDetails3 = async () => {
          const promises = videoIds3.map(async (videoId) => {
            try {
              const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=${api_key}`
              );
              return response.data.results[0];
            } catch (error) {
              console.error(
                `Error fetching data for video ID ${videoId}:`,
                error
              );
              return null;
            }
          });

          const videoDetails = await Promise.all(promises);
          return videoDetails;
        };

        fetchVideoDetails3()
          .then((result) => {
            const videoKeys = result.map((movie) => movie?.key);

            const updateSlicingRange = () => {
              if (window.innerWidth > 1141) {
                // Adjust the range difference to 4 if window width is below 1141px
                const slicedUrls1 = videoKeys.slice(0, 6);
                const slicedUrls2 = videoKeys.slice(7, 13);
                const slicedUrls3 = videoKeys.slice(13, 19);

                const imageUrlCont = [
                  [...slicedUrls3],
                  [...slicedUrls2],
                  [...slicedUrls1],
                ];
                setVideoKeyCont3([...imageUrlCont]);
              } else if (window.innerWidth < 1140 && window.innerWidth > 800) {
                const slicedUrls1 = videoKeys.slice(0, 4);
                const slicedUrls2 = videoKeys.slice(5, 9);
                const slicedUrls3 = videoKeys.slice(10, 14);

                const imageUrlCont = [
                  [...slicedUrls3],
                  [...slicedUrls2],
                  [...slicedUrls1],
                ];
                setVideoKeyCont3([...imageUrlCont]);
              } else if (window.innerWidth < 800 && window.innerWidth > 450) {
                const slicedUrls1 = videoKeys.slice(0, 3);
                const slicedUrls2 = videoKeys.slice(5, 8);
                const slicedUrls3 = videoKeys.slice(10, 13);

                const imageUrlCont = [
                  [...slicedUrls3],
                  [...slicedUrls2],
                  [...slicedUrls1],
                ];
                setVideoKeyCont3([...imageUrlCont]);
              } else if (window.innerWidth < 450) {
                const slicedUrls1 = videoKeys.slice(0, 2);
                const slicedUrls2 = videoKeys.slice(5, 7);
                const slicedUrls3 = videoKeys.slice(10, 12);

                const imageUrlCont = [
                  [...slicedUrls3],
                  [...slicedUrls2],
                  [...slicedUrls1],
                ];
                setVideoKeyCont3([...imageUrlCont]);
              }
            };

            updateSlicingRange();
            updateSlicingRangeRef.current = updateSlicingRange;
            window.addEventListener("resize", updateSlicingRange);
          })
          .catch((error) => {
            console.error("Error fetching video details:", error);
          });

        const updateSlicingRange3 = () => {
          if (window.innerWidth > 1141) {
            // Adjust the range difference to 4 if window width is below 1141px
            const slicedUrls1 = backdropPaths.slice(0, 6);
            const slicedUrls2 = backdropPaths.slice(7, 13);
            const slicedUrls3 = backdropPaths.slice(13, 19);

            const imageUrlCont = [
              [...slicedUrls3],
              [...slicedUrls2],
              [...slicedUrls1],
            ];
            setMovieImageUrls3([...imageUrlCont]);
          } else if (window.innerWidth < 1140 && window.innerWidth > 800) {
            const slicedUrls1 = backdropPaths.slice(0, 4);
            const slicedUrls2 = backdropPaths.slice(5, 9);
            const slicedUrls3 = backdropPaths.slice(10, 14);

            const imageUrlCont = [
              [...slicedUrls3],
              [...slicedUrls2],
              [...slicedUrls1],
            ];
            setMovieImageUrls3([...imageUrlCont]);
          } else if (window.innerWidth < 800 && window.innerWidth > 450) {
            const slicedUrls1 = backdropPaths.slice(0, 3);
            const slicedUrls2 = backdropPaths.slice(5, 8);
            const slicedUrls3 = backdropPaths.slice(10, 13);

            const imageUrlCont = [
              [...slicedUrls3],
              [...slicedUrls2],
              [...slicedUrls1],
            ];
            setMovieImageUrls3([...imageUrlCont]);
          } else if (window.innerWidth < 450) {
            const slicedUrls1 = backdropPaths.slice(0, 2);
            const slicedUrls2 = backdropPaths.slice(5, 7);
            const slicedUrls3 = backdropPaths.slice(10, 12);

            const imageUrlCont = [
              [...slicedUrls3],
              [...slicedUrls2],
              [...slicedUrls1],
            ];
            setMovieImageUrls3([...imageUrlCont]);
          }
        };

        // image url retrieving
        updateSlicingRange3();
        updateSlicingRangeRef3.current = updateSlicingRange3;
        window.addEventListener("resize", updateSlicingRange3);
      })

      // 333333333333333333333333333
      .catch((error) => {
        console.error(error);
      });

    return () => {
      window.removeEventListener(
        "resize",
        updateSlicingRangeRef.current,
        updateSlicingRangeRef2.current,
        updateSlicingRangeRef3.current
      );
      if (player.current) {
        player.current.dispose();
      }
    };
    // eslint-disable-next-line
  }, []);

  const handleMylistBtnClicked = (number) => {
    // Set state
    if (number === 1) {
      setMovieTitle(selectedTitle);
      setMovieImgURL(selectedImageURL);
      setMovieVideoKey(selectedKey);
      setMovieLength(selectedLength);
      setMovieDate(selectedDate);
      setMovieGenres(selectedGenres);
      setMovieDescription(selectedOverview);
    } else if (number === 2) {
      setMovieTitle(selectedTitle2);
      setMovieImgURL(selectedImageURL2);
      setMovieVideoKey(selectedKey2);
      setMovieLength(selectedLength2);
      setMovieDate(selectedDate2);
      setMovieGenres(selectedGenres2);
      setMovieDescription(selectedOverview2);
    } else if (number === 3) {
      setMovieTitle(selectedTitle3);
      setMovieImgURL(selectedImageURL3);
      setMovieVideoKey(selectedKey3);
      setMovieLength(selectedLength3);
      setMovieDate(selectedDate3);
      setMovieGenres(selectedGenres3);
      setMovieDescription(selectedOverview3);
    }
    setIsPlusBtnClicked(true);
    setTimeout(() => {
      setIsPlusBtnClicked(false);
    }, 500);
  };

  const plusBtnClicked = (plusBtnClickState) => {
    if (plusBtnClickState && isRandomMoviePlusBtnClicked) {
      setMovieTitle(title);
      setMovieImgURL(randomImage);
      setMovieVideoKey(randomVideoKey);
      setMovieLength(randomLength);
      setMovieDate(randomDate);
      setMovieGenres(randomGenres);
      setMovieDescription(description);
    } else if (plusBtnClickState && isCard1MoviePlusBtnClicked) {
      setMovieTitle(selectedTitle);
      setMovieImgURL(selectedImageURL);
      setMovieVideoKey(selectedKey);
      setMovieLength(selectedLength);
      setMovieDate(selectedDate);
      setMovieGenres(selectedGenres);
      setMovieDescription(selectedOverview);
    } else if (plusBtnClickState && isCard2MoviePlusBtnClicked) {
      setMovieTitle(selectedTitle2);
      setMovieImgURL(selectedImageURL2);
      setMovieVideoKey(selectedKey2);
      setMovieLength(selectedLength2);
      setMovieDate(selectedDate2);
      setMovieGenres(selectedGenres2);
      setMovieDescription(selectedOverview2);
    } else if (plusBtnClickState && isCard3MoviePlusBtnClicked) {
      setMovieTitle(selectedTitle3);
      setMovieImgURL(selectedImageURL3);
      setMovieVideoKey(selectedKey3);
      setMovieLength(selectedLength3);
      setMovieDate(selectedDate3);
      setMovieGenres(selectedGenres3);
      setMovieDescription(selectedOverview3);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "https://netflix-app-server.up.railway.app/user-movie-list";
        const data = {
          MovieTitle,
          MovieImgURL,
          MovieVideoKey,
          MovieLength,
          MovieDate,
          MovieGenres,
          MovieDescription,
        };
        const response = await axios.post(apiUrl, data);

        console.log("Server response:", response.data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    if (MovieTitle !== "") {
      fetchData();
    }
  }, [
    MovieTitle,
    MovieImgURL,
    MovieVideoKey,
    MovieLength,
    MovieDate,
    MovieGenres,
    MovieDescription,
  ]);

  return (
    <div className="main-page">
      <div className="main-child1">
        <Navbar />
        <div className="cover"></div>
        <video ref={videoNode} className="video-js" />
        <div className="movie-descr-cont">
          <h1>{title}</h1>
          <p className="movie-descr">{truncate(description, 150)}</p>
          <div className="descr-btn-cont">
            <div onClick={() => handlePlayClick(0)}>
              <i class="fa-solid fa-play"></i>
              <p>Play</p>
            </div>
            <div
              onClick={() => {
                handleClick(
                  id,
                  title,
                  randomVideoKey,
                  randomDate,
                  randomLength,
                  description,
                  randomGenres
                );
                setIsRandomMoviePlusBtnClicked(true);
                setTimeout(() => {
                  setIsRandomMoviePlusBtnClicked(false);
                }, 3000);
              }}
            >
              <img src="info.png" alt="" />
              <p>More Info</p>
            </div>
          </div>
        </div>
      </div>
      <div className="main-child2">
        <h1>Popular Movies</h1>
        <h1>Now Playing</h1>
        <h1>Upcoming</h1>
        <Slider {...settings}>
          {movieImageUrls.map((ImageUrlsCont, outerIndex) => (
            <div key={outerIndex} className="card-cont">
              {ImageUrlsCont.map((movieImageUrl, imageIndex) => (
                <div key={imageIndex} className="cards">
                  <div
                    onMouseEnter={() =>
                      handleMouseEnter(outerIndex, imageIndex)
                    }
                    onMouseLeave={handleMouseLeave}
                    className={`hovered-card`}
                  >
                    <div>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movieImageUrl}`}
                        alt=""
                      />
                      <div className="title">
                        <h3>{selectedTitle}</h3>
                      </div>
                    </div>
                    <div>
                      <div className="icons-cont">
                        <div>
                          <i
                            onClick={() => handlePlayClick(1)}
                            class="fa-solid fa-circle-play"
                          ></i>
                          <i
                            style={{
                              display: isPlusBtnClicked ? "none" : "flex",
                            }}
                            onClick={() => handleMylistBtnClicked(1)}
                            class="fa-solid fa-circle-plus"
                          ></i>
                          <i
                            style={{
                              display: isPlusBtnClicked ? "flex" : "none",
                            }}
                            class="fa-solid fa-circle-check check-icon"
                          ></i>
                          <i class="fa-regular fa-thumbs-up"></i>
                        </div>

                        <i
                          onClick={() => {
                            handleClick(
                              selectedId,
                              selectedTitle,
                              selectedKey,
                              selectedDate,
                              selectedLength,
                              selectedOverview,
                              selectedGenres
                            );
                            setIsCard1MoviePlusBtnClicked(true);
                            setTimeout(() => {
                              setIsCard1MoviePlusBtnClicked(false);
                            }, 3000);
                          }}
                          class="fa-solid fa-circle-chevron-down"
                        ></i>
                      </div>
                      <div className="info-cont">
                        <div>
                          <p>{selectedLength}</p>
                          <p>{selectedDate}</p>
                          <p>HD</p>
                        </div>

                        <li>
                          {selectedGenres.map((genres, index) => (
                            <ul key={index}>{genres.name}</ul>
                          ))}
                        </li>
                      </div>
                    </div>
                  </div>
                  <img
                    className="main-movie-img"
                    src={`https://image.tmdb.org/t/p/w500${movieImageUrl}`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          ))}
        </Slider>
        <div className="layered"></div>
        <Slider {...settings}>
          {movieImageUrls2.map((ImageUrlsCont, outerIndex) => (
            <div key={outerIndex} className="card-cont">
              {ImageUrlsCont.map((movieImageUrl, imageIndex) => (
                <div key={imageIndex} className="cards">
                  <div
                    onMouseEnter={() =>
                      handleMouseEnter2(outerIndex, imageIndex)
                    }
                    onMouseLeave={handleMouseLeave2}
                    className={`hovered-card`}
                  >
                    <div>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movieImageUrl}`}
                        alt=""
                      />
                      <div className="title">
                        <h3>{selectedTitle2}</h3>
                      </div>
                    </div>
                    <div>
                      <div className="icons-cont">
                        <div>
                          <i
                            onClick={() => handlePlayClick(2)}
                            class="fa-solid fa-circle-play"
                          ></i>
                          <i
                            style={{
                              display: isPlusBtnClicked ? "none" : "flex",
                            }}
                            onClick={() => handleMylistBtnClicked(2)}
                            class="fa-solid fa-circle-plus"
                          ></i>
                          <i
                            style={{
                              display: isPlusBtnClicked ? "flex" : "none",
                            }}
                            class="fa-solid fa-circle-check check-icon"
                          ></i>
                          <i class="fa-regular fa-thumbs-up"></i>
                        </div>

                        <i
                          onClick={() => {
                            handleClick(
                              selectedId2,
                              selectedTitle2,
                              selectedKey2,
                              selectedDate2,
                              selectedLength2,
                              selectedOverview2,
                              selectedGenres2
                            );
                            setIsCard2MoviePlusBtnClicked(true);
                            setTimeout(() => {
                              setIsCard2MoviePlusBtnClicked(false);
                            }, 3000);
                          }}
                          class="fa-solid fa-circle-chevron-down"
                        ></i>
                      </div>
                      <div className="info-cont">
                        <div>
                          <p>{selectedLength2}</p>
                          <p>{selectedDate2}</p>
                          <p>HD</p>
                        </div>

                        <li>
                          {selectedGenres2.map((genres, index) => (
                            <ul key={index}>{genres.name}</ul>
                          ))}
                        </li>
                      </div>
                    </div>
                  </div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movieImageUrl}`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          ))}
        </Slider>
        <div className="layered"></div>
        <Slider {...settings}>
          {movieImageUrls3.map((ImageUrlsCont, outerIndex) => (
            <div key={outerIndex} className="card-cont">
              {ImageUrlsCont.map((movieImageUrl, imageIndex) => (
                <div
                  onMouseEnter={() => handleMouseEnter3(outerIndex, imageIndex)}
                  onMouseLeave={handleMouseLeave3}
                  key={imageIndex}
                  className="cards"
                >
                  <div className={`hovered-card `}>
                    <div>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movieImageUrl}`}
                        alt=""
                      />
                      <div className="title">
                        <h3>{selectedTitle3}</h3>
                      </div>
                    </div>
                    <div>
                      <div className="icons-cont">
                        <div>
                          <i
                            onClick={() => handlePlayClick(3)}
                            class="fa-solid fa-circle-play"
                          ></i>
                          <i
                            style={{
                              display: isPlusBtnClicked ? "none" : "flex",
                            }}
                            onClick={() => handleMylistBtnClicked(3)}
                            class="fa-solid fa-circle-plus"
                          ></i>
                          <i
                            style={{
                              display: isPlusBtnClicked ? "flex" : "none",
                            }}
                            class="fa-solid fa-circle-check check-icon"
                          ></i>
                          <i class="fa-regular fa-thumbs-up"></i>
                        </div>

                        <i
                          onClick={() => {
                            handleClick(
                              selectedId3,
                              selectedTitle3,
                              selectedKey3,
                              selectedDate3,
                              selectedLength3,
                              selectedOverview3,
                              selectedGenres3
                            );
                            setIsCard3MoviePlusBtnClicked(true);
                            setTimeout(() => {
                              setIsCard3MoviePlusBtnClicked(false);
                            }, 3000);
                          }}
                          class="fa-solid fa-circle-chevron-down"
                        ></i>
                      </div>
                      <div className="info-cont">
                        <div>
                          <p>{selectedLength3}</p>
                          <p>{selectedDate3}</p>
                          <p>HD</p>
                        </div>

                        <li>
                          {selectedGenres3.map((genres, index) => (
                            <ul key={index}>{genres.name}</ul>
                          ))}
                        </li>
                      </div>
                    </div>
                  </div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movieImageUrl}`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          ))}
        </Slider>
      </div>
      <MovieDetail
        // selected card movie props
        clickedID={clickedID}
        clickedTitle={clickedTitle}
        clickedKey={clickedKey}
        clickedDate={clickedDate}
        clickedLength={clickedLength}
        clickedOverview={clickedOverview}
        clickedGenre={clickedGenre}
        btnClickState={isBtnClicked}
        handleChildData={handleChildData}
        plusBtnClicked={plusBtnClicked}
      />
    </div>
  );
}
