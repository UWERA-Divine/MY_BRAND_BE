"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SchemaComment = new mongoose_1.Schema({
    name: { type: String, required: false },
    comment: { type: String, required: true },
    blogId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'post', },
    date: { type: Date, required: true, default: new Date() },
});
const comment = (0, mongoose_1.model)('Comments', SchemaComment);
exports.default = comment;
