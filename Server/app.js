const express = require("express");
const app = express();
const cors = require("cors");
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
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
    origin: "http://localhost:3000",
  })
);
app.use(
  session({
    secret: "Our big secret!",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// connecting to mongodb server
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/netflixDB");
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

// pluging in the passort-local-mongoose module
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// DB Model
const User = mongoose.model("User", userSchema);

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
      callbackURL: "http://localhost:3001/auth-netflix-account",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      console.log("profile");
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
      callbackURL: "http://localhost:3001/auth-netflix-account",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
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

// Creating Routes for Google & FB authentication
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

app.get("/success", (req, res) => {
  const successMessage = req.query.message;
  console.log(successMessage);
});

app.get(
  "/auth-netflix-account",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
    successRedirect: "http://localhost:3000/auth-netflix-account",
  })
);

app.get("/check-auth-status", (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "user Login", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth-netflix-account",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:3000/login",
    successRedirect: "http://localhost:3000/auth-netflix-account",
  })
);

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
  console.log(req.body);
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

app.listen(3001, () => console.log("Listening to port 3001"));