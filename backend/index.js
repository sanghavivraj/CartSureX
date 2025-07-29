const express = require('express');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

const connectDB = require('./config/db');
const router = require('./routes');
const webhookRoutes = require('./routes/webhookRoute');
require('./passport'); // Google strategy

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
// app.use("/api/webhook", webhookRoutes);
app.use('/api/webhook', express.raw({ type: 'application/json' }), webhookRoutes);
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: 'cartSureSecret123',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // true in production
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Google Auth Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: `${process.env.FRONTEND_URL}/login-failed`,
        session: true
    }),
    (req, res) => {
        res.redirect(`${process.env.FRONTEND_URL}/`);
    }
);

app.get("/google/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "User authenticated",
            user: req.user,
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Not authenticated",
        });
    }
});

app.use("/api", router);
// app.use("/api/webhook", webhookRoutes);

const PORT = process.env.PORT || 8080;
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log("✅ Connected to DB");
            console.log(`🚀 Server is running on PORT ${PORT}`);
// console.log("Redirect URI:", process.env.GOOGLE_REDIRECT_URI);
        });
    })
    .catch((err) => {
        console.error("❌ Database connection failed:", err);
        process.exit(1);
    });
