"use strict";
// // src/controllers/authController.ts
// import { Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// export const register = async (req: Request, res: Response) => {
//     try {
//         const { username, email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ username, email, password: hashedPassword });
//         await user.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };
// export const login = async (req: Request, res: Response) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }
//         const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
//         res.cookie('token', token, { httpOnly: true, secure: true });
//         res.json({ message: 'Login successful' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
passport_1.default.use(new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: "SECRET_KEY"
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return done(null, payload.user);
    }
    catch (error) {
        done(error);
    }
})));
exports.default = passport_1.default;
