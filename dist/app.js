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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFoundPage_1 = __importDefault(require("./app/middleware/notFoundPage"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// routes
// testing
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Server Is Running!!!');
});
app.get('/', test);
app.use(globalErrorHandler_1.default);
app.use('*', notFoundPage_1.default);
exports.default = app;
