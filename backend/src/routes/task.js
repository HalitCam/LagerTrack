import express from "express";
const router = express.Router();

import Task from "../controllers/task";
// import cache from '../cache';

import grantAccess from "../middlewares/grantAccess";
import { verifyAccessToken } from "../helpers/jwt";

router.post(
	"/",
	verifyAccessToken,
	grantAccess("createAny", "task"),
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
