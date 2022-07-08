import { body } from "express-validator";

export const loginValidation = [
    body("email", "Invalid Email").isEmail(),
    body("password", "Invalid Password min 5 words").isLength({ min: 5 }),
];

export const registerValidation = [
    body("email", "Invalid Email").isEmail(),
    body("password", "Invalid Password min 5 words").isLength({ min: 5 }),
    body("fullName", "Invalid Full Name min 3 words").isLength({ min: 3 }),
    body("avatarUrl", "Invalid Avatar Url").optional().isURL(),
];

export const postCreateValidation = [
    body("title", "Enter post title").isLength({ min: 3 }).isString(),
    body("text", "Enter post text").isLength({ min: 3 }).isString(),
    body("tags", "Incorrect tags format").optional().isString(),
    body("imageUrl", "Incorrect image Url").optional().isString(),
];
