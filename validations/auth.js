import { body } from "express-validator";

export const registerValidation = [
    body("email", "Invalid Email").isEmail(),
    body("password", "Invalid Password min 5 words").isLength({ min: 5 }),
    body("fullName", "Invalid Full Name min 3 words").isLength({ min: 3 }),
    body("avatarUrl", "Invalid Avatar Url").optional().isURL(),
];
