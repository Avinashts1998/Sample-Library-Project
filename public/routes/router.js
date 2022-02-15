"use strict";
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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const libaray_model_1 = require("../models/libaray.model");
const router = express_1.default.Router();
exports.router = router;
// POST API // 
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, description, Language, no, Auther, Publisher, Year } = req.body;
    const items = libaray_model_1.Libaray.set({ id, title, description, Language, Auther, Publisher, Year });
    yield items.save();
    return res.status(200).json({
        data: "Data saved successfully..."
    });
}));
// GET ALL API //
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield libaray_model_1.Libaray.find({});
        return res.status(200).json({
            data: items
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error,
        });
    }
}));
// GET BY ID API //
router.get('/:_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield libaray_model_1.Libaray.findById(req.params._id);
        res.status(200).json({
            data: items
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error
        });
    }
}));
// UPDATE BOOK //
router.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            title: req.body.title,
        };
        const update = {
            id: req.body.id,
        };
        const items = yield libaray_model_1.Libaray.updateOne(filter, update, {
            new: true
        });
        return res.status(200).json({
            data: items,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error
        });
    }
}));
//  Delete Book API  //
router.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            title: req.body.title,
        };
        const item = yield libaray_model_1.Libaray.deleteOne(filter).then((data) => res.json({
            data: "deleted successfully..!!"
        })).catch((e) => {
            console.log(e);
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error
        });
    }
}));
