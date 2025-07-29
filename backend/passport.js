// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const userModel = require("./models/userModel");
// const passport = require("passport");

// const jwt = require("jsonwebtoken");

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK_URL,
//     passReqToCallback: true
// }, async (req, accessToken, refreshToken, profile, done) => {
//     try {
//         let user = await userModel.findOne({ email: profile.emails[0].value });

//         if (!user) {
//             user = new userModel({
//                 googleId: profile.id,
//                 name: profile.displayName,
//                 email: profile.emails[0].value,
//                 profilePic: profile.photos[0].value,
//                 role: "GENERAL",
//             });
//             await user.save();
//         } else if (!user.googleId) {
//             user.googleId = profile.id;
//             if (!user.profilePic) {
//                 user.profilePic = profile.photos[0].value;
//             }
//             await user.save();
//         }

//         // Generate JWT token
//         const tokenData = {
//             _id: user._id,
//             email: user.email
//         };
//         const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: "7d" });

//         user.token = token; // Attach token to user object
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// }));

// passport.serializeUser((user, done) => {
//     done(null, user._id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await userModel.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// });

// module.exports = passport;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/userModel');
const passport = require("passport");
const jwt = require('jsonwebtoken');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ 
        $or: [
          { email: profile.emails[0].value },
          { googleId: profile.id }
        ]
      });
      
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          profilePic: profile.photos[0]?.value || "",
          isVerified: true,
          // Add any other required fields with default values
          password: "", // You might want to generate a random password
          address: "",
          phone: ""
        });
      } else if (!user.googleId) {
        // Update existing user with Google ID
        user.googleId = profile.id;
        await user.save();
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});