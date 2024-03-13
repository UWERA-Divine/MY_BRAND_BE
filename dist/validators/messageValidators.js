"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.messageSchema = joi_1.default.object({
    description: joi_1.default.string().min(5).required(),
    email: joi_1.default.string().email().required(),
    name: joi_1.default.string().min(4).required()
});
