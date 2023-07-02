const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const Document = await Model.findOneAndDelete(id);
    if (!Document) {
      return next(new ApiError(`No Document for this id ${id}`, 404));
    }
    res.status(200).json({ msg: "Document Deleted!" });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const Document = await Model.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!Document) {
      return next(new ApiError(`No Document for this id ${id}`, 404));

      // @ To Fix
      // Fixing it's doesn't go inside!
    }
    res.status(200).json({ data: Document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const Document = await Model.create(req.body);
    res.status(201).json({ data: Document });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const Document = await Model.findById(req.params.id);
    if (!Document) {
      // res.status(404).json({ msg: `No Document for this id ${id}` });
      return next(
        new ApiError(`No Document for this id ${req.params.id}`, 404)
      );
      // @ To Fix
      // Fixing it's doesn't go inside!
    }
    res.status(200).json({ data: Document });
  });

exports.getAll = (Model, modelname) =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    const doncumentCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(doncumentCounts)
      .filter()
      .search(modelname)
      .limitFields()
      .sort();
    const { mongooseQuery, paginationResult } = apiFeatures;
    const Document = await mongooseQuery;
    res
      .status(200)
      .json({ results: Document.length, paginationResult, data: Document });
  });
