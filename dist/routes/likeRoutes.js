"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likeController_1 = require("../controllers/likeController");
const router = express_1.default.Router();
router.post('/:id/likes', likeController_1.createLike);
router.get('/:id/likes', likeController_1.getLikes);
router.delete('/:id/likes', likeController_1.deleteLike);
exports.default = router;
