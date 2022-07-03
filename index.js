import express from "express";
import mongoose from "mongoose";

import { registerValidation } from "./validations/auth.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";

mongoose
    .connect(
        // "mongodb+srv://admin:123@cluster0.r2yk4p0.mongodb.net/blog?retryWrites=true&w=majority"
        "mongodb://admin:123@ac-gsmzegu-shard-00-00.r2yk4p0.mongodb.net:27017,ac-gsmzegu-shard-00-01.r2yk4p0.mongodb.net:27017,ac-gsmzegu-shard-00-02.r2yk4p0.mongodb.net:27017/blog?ssl=true&replicaSet=atlas-c0z872-shard-0&authSource=admin&retryWrites=true&w=majority"
    )
    .then(() => console.log("DB ok"))
    .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());

app.post("/auth/login", UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("Server OK!");
});
