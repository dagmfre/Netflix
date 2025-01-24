const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const mongodbConnectionString = process.env.MONGODB_URI;
const opts = {};

// use and initializing express, express-session and passport modules
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "https://netflix-app-clonee.vercel.app",
  })
);

app.use(
  session({
    secret: "Our big secret!",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    cookie: {
      sameSite: "none",
      secure: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// connecting to mongodb server
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongodbConnectionString);
}

// Creating Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  googleId: String,
  secret: String,
  facebookId: String,
});

const movieListSchema = new mongoose.Schema({
  MovieTitle: String,
  MovieImgURL: String,
  MovieVideoKey: String,
  MovieLength: String,
  MovieDate: String,
  MovieGenres: [
    {
      id: Number,
      name: String,
    },
  ],
  MovieDescription: String,
});

// pluging in the passort-local-mongoose module
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// DB Model
const User = mongoose.model("User", userSchema);
const MovieList = mongoose.model("MovieList", movieListSchema);

// let passport use our cookies by serializing and deserialising
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Google & FB usage codes
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://netflix-app-server.up.railway.app/auth-netflix-account",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        { googleId: profile.id, username: profile.displayName },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_APP_ID,
      clientSecret: process.env.FB_APP_SECRET,
      callbackURL:
        "https://netflix-app-server.up.railway.app/fb/auth-netflix-account",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        { facebookId: profile.id, username: profile.displayName },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to Netflix Server");
});

// Creating Routes for Google & FB authentication
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

app.get(
  "/auth-netflix-account",
  passport.authenticate("google", {
    failureRedirect: "https://netflix-app-clonee.vercel.app/login",
    successRedirect:
      "https://netflix-app-clonee.vercel.app/auth-netflix-account",
  })
);

app.get("/check-user-auth", (req, res) => {
  if (req.user) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: "User is Unauthorized" });
  }
});

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/fb/auth-netflix-account",
  passport.authenticate("facebook", {
    failureRedirect: "https://netflix-app-clonee.vercel.app/login",

    successRedirect:
      "https://netflix-app-clonee.vercel.app/auth-netflix-account",
  })
);

app.post("/user-movie-list", async (req, res) => {
  try {
    // Create a new document based on the request data
    const userMovieList = new MovieList(req.body);

    // Save the document to the database
    await userMovieList.save();

    // Send a success response
    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/user-movie-list/:id", async (req, res) => {
  const movieTitle = req.params.id;
  try {
    const deletedItem = await MovieList.deleteOne({ MovieTitle: movieTitle });

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    } else {
      res.status(200).json({ message: "Item deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/delete-movie-list", async (req, res) => {
  try {
    await MovieList.deleteMany();
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/user-movie-list", async (req, res) => {
  try {
    const movieInfo = await MovieList.find();

    res.status(200).json(movieInfo);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Local authentication code using passport, passport-jwt, passport-local-mongoose and express-session

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "Random string";

passport.use(
  new JwtStrategy(opts, async (jwt_payload) => {
    try {
      const user = await User.findById(jwt_payload._id);
      if (user) {
        return user; // Return the user if found
      } else {
        return false; // Indicate user not found
      }
    } catch (err) {
      console.error(err); // Log the error
      throw err; // Rethrow the error to be handled appropriately
    }
  })
);

app.post("/register", (req, res) => {
  const user = new User({
    email: req.body.email,
    password: hashSync(req.body.password, 10),
  });
  const payload = {
    email: user.email,
    id: user._id,
  };
  const token = jwt.sign(payload, "Random string", { expiresIn: "1d" });

  // check if user already exists
  User.findOne({ email: req.body.email }).then((user) => {
    // User found
    if (user) {
      return res.status(401).send({
        success: false,
        message: "User already exists.",
      });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: hashSync(req.body.password, 10),
      });

      newUser
        .save()
        .then((user) => {
          res.send({
            success: true,
            message: "User created successfully.",
            token: "Bearer " + token,
            user: {
              id: user._id,
              email: user.email,
            },
          });
        })
        .catch((err) => {
          res.send({
            success: false,
            message: "Something went wrong",
            error: err,
          });
        });
    }
  });
});

app.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    //No user found
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Could not find the user.",
      });
    }

    //Incorrect password
    if (!compareSync(req.body.password, user.password)) {
      return res.status(401).send({
        success: false,
        message: "Incorrect password",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
    };

    const token = jwt.sign(payload, "Random string", { expiresIn: "1d" });

    return res.status(200).send({
      success: true,
      message: "Logged in successfully!",
      token: "Bearer " + token,
    });
  });
});

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).send({
      success: true,
      user: {
        id: req.user._id,
        email: req.user.email,
      },
    });
  }
);

app.listen(port, "0.0.0.0", function () {
  console.log("Listening to port 3001");
});
