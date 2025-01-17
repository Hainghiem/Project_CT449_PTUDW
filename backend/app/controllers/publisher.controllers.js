const ApiError = require("../api-error");

const PublisherService = require("../services/publisher.service");

const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
  try {
    const publisherService = new PublisherService(MongoDB.client);
    const document = await publisherService.create(req.body);
    return res.send(document);
  } catch (err) {
    return next(new ApiError(500, "Đã có lỗi xảy ra"));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const publisherService = new PublisherService(MongoDB.client);
    const documents = await publisherService.findAll();
    return res.send(documents);
  } catch (err) {
    return next(new ApiError(500, "Lỗi xảy ra khi truy xuất"));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const publisherService = new PublisherService(MongoDB.client);
    const document = await publisherService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy"));
    }
    return res.send(document);
  } catch (err) {
    return next(new ApiError(500, `Lỗi khi truy xuất có id=${req.params.id}`));
  }
};

exports.searchByName = async (req, res, next) => {
  try {
    const publisherService = new PublisherService(MongoDB.client);
    const document = await publisherService.findByName(req.query.name);

    if (!document || document.length === 0) {
      return next(new ApiError(404, "Không tìm thấy "));
    }
    return res.send(document);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi tìm kiếm "));
  }
};

exports.update = async (req, res, next) => {
  try {
    const publisherService = new PublisherService(MongoDB.client);
    const document = await publisherService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy "));
    }
    return res.send({ message: "Cập nhật thông tin thành công" });
  } catch (err) {
    return next(new ApiError(500, `Lỗi khi cập nhật có id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const publisherService = new PublisherService(MongoDB.client);
    const document = await publisherService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy"));
    }
    return res.send({ message: "Xóa thành công" });
  } catch (err) {
    return next(new ApiError(500, `Lỗi khi xóa có id=${req.params.id}`));
  }
};
