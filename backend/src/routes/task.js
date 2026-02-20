import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
const router = express.Router();

import Task from "../controllers/task";
// import cache from '../cache';

import grantAccess from "../middlewares/grantAccess";
import { verifyAccessToken } from "../helpers/jwt";

// prepare upload dir
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadDir);
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({ storage });

router.post(
	"/",
	verifyAccessToken,
	grantAccess("createAny", "task"),
	// accept two optional PDF files
	upload.fields([
		{ name: "fbaEtiket", maxCount: 1 },
		{ name: "dhlEtiket", maxCount: 1 },
	]),
	Task.Create
);
router.get(
	"/:task_id",
	// verifyAccessToken,
	// grantAccess('readAny', 'task'),
	// cache.route(),
	Task.Get
);
// router.get('/', cache.route(), Task.GetList);
router.get("/", Task.GetList);
router.put("/:task_id", Task.Update);
router.delete("/:task_id", Task.Delete);

export default router;
