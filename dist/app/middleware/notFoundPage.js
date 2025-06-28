"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundPage = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
};
exports.default = notFoundPage;
