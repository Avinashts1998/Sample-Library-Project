"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Libaray = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const libaraySchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    Language: {
        type: String,
        required: true
    },
    Auther: {
        type: String,
        required: true
    },
    Publisher: {
        type: String,
        required: true
    },
    Year: {
        type: Number,
        required: false
    }
});
libaraySchema.statics.set = (x) => {
    return new Libaray(x);
};
const Libaray = mongoose_1.default.model("Libaray", libaraySchema);
exports.Libaray = Libaray;
Libaray.set({
    id: 1,
    title: "Some titles",
    description: "Some descriptions",
    Language: "some languages",
    Auther: 'Some authers',
    Publisher: 'some publisher',
    Year: 1998
});
