import Task from "../../models/task";
import Boom from "boom";
import ProductSchema from "./validations";

const Create = async (req, res, next) => {
	// when files are uploaded via multer they appear in req.files
	const input = { ...req.body };

	if (req.files) {
		if (req.files.fbaEtiket && req.files.fbaEtiket[0]) {
			// store only filename so client can build /uploads/:filename URL
			input.fbaEtiket = req.files.fbaEtiket[0].filename;
		}
		if (req.files.dhlEtiket && req.files.dhlEtiket[0]) {
			input.dhlEtiket = req.files.dhlEtiket[0].filename;
		}
	}

	const { error } = ProductSchema.validate(input);

	if (error) {
		return next(Boom.badRequest(error.details[0].message));
	}

	try {
		const task = new Task(input);
		const savedData = await task.save();

		res.json(savedData);
	} catch (e) {
		next(e);
	}
};

const Get = async (req, res, next) => {
	const { task_id } = req.params;

	if (!task_id) {
		return next(Boom.badRequest("Missing paramter (:task_id)"));
	}

	try {
		const task = await Task.findById(task_id);

		res.json(task);
	} catch (e) {
		next(e);
	}
};

const Update = async (req, res, next) => {
	const { task_id } = req.params;

	try {
		const updated = await Task.findByIdAndUpdate(task_id, req.body, {
			new: true,
		});

		res.json(updated);
	} catch (e) {
		next(e);
	}
};

const Delete = async (req, res, next) => {
	const { task_id } = req.params;

	try {
		const deleted = await Task.findByIdAndDelete(task_id);

		if (!deleted) {
			throw Boom.badRequest("Task not found.");
		}

		res.json(deleted);
	} catch (e) {
		next(e);
	}
};

const limit = 100;
const GetList = async (req, res, next) => {
	let { page } = req.query;

	if (page < 1) {
		page = 1;
	}

	const skip = (parseInt(page) - 1) * limit;

	try {
		const tasks = await Task.find({})
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);

		res.json(tasks);
	} catch (e) {
		next(e);
	}
};

export default {
	Create,
	Get,
	Update,
	Delete,
	GetList,
};
