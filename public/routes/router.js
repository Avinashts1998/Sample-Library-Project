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
const libarayss = libaray_model_1.Libaray.find();
const router = express_1.default.Router();
exports.router = router;
console.log("router called");
// Display in a table //
router.get('/get', function (req, res, next) {
    libarayss.exec(function (err, data) {
        if (err)
            throw err;
        res.render('table', { title: 'books records', records: data });
    });
});
// POST API // 
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, description, Language, no, Auther, Publisher, Year } = req.body;
    const items = libaray_model_1.Libaray.set({ id, title, description, Language, Auther, Publisher, Year });
    yield items.save();
    return res.status(200).json({
        data: "Data saved successfully...", items
    });
}));
// Pagination Sheet //
router.get('/get/books/:pages', (req, res, next) => {
    var perPage = 2;
    let page = req.params.pages || 1;
    let books = libaray_model_1.Libaray
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, books) {
        //   console.log("result is : ", util.inspect(meetingss, { depth: null }));
        libaray_model_1.Libaray.count().exec(function (err, count) {
            if (err)
                return next(err);
            res.render('table', {
                books: books,
                current: page,
                pages: Math.ceil(count / perPage)
            });
        });
    });
});
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
            data: " Data deleted successfully..!!"
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
