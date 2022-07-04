import express from "express";
import multer from "multer";
import cors from "cors";

import mongoose from "mongoose";

import {
    registerValidation,
    loginValidation,
    postCreateValidation,
} from "./validations.js";

import { checkAuth, handleValidationErrors } from "./utils/index.js";

import { PostController, UserController } from "./controllers/index.js";

mongoose
    .connect(
        // "mongodb+srv://admin:123@cluster0.r2yk4p0.mongodb.net/blog?retryWrites=true&w=majority"
        "mongodb://admin:123@ac-gsmzegu-shard-00-00.r2yk4p0.mongodb.net:27017,ac-gsmzegu-shard-00-01.r2yk4p0.mongodb.net:27017,ac-gsmzegu-shard-00-02.r2yk4p0.mongodb.net:27017/blog?ssl=true&replicaSet=atlas-c0z872-shard-0&authSource=admin&retryWrites=true&w=majority"
    )
    .then(() => console.log("DB ok"))
    .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads");
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post(
    "/auth/login",
    loginValidation,
    handleValidationErrors,
    UserController.login
);
app.post(
    "/auth/register",
    registerValidation,
    handleValidationErrors,
    UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post(
    "/posts",
    checkAuth,
    postCreateValidation,
    handleValidationErrors,
    PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
    "/posts/:id",
    checkAuth,
    postCreateValidation,
    handleValidationErrors,
    PostController.update
);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("Server OK!");
});
