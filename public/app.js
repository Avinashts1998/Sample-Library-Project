"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = require("./routes/router");
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default.connect(process.env.MONGO_URL, () => {
    console.log("DB Connected");
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/', router_1.router);
app.listen(process.env.PORT, () => {
    console.log(`Server connected on ${process.env.PORT}`);
});
