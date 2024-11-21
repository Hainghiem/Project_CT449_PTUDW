const { ObjectId } = require("mongodb");
const PublisherService = require("./publisher.service");

class BookService {
  constructor(client) {
    this.Book = client.db().collection("book");
    this.publisherService = new PublisherService(client);
  }

  extractBookData(payload) {
    const book = {
      name: payload.name,
      authorName: payload.authorName,
      publisherName: payload.publisherName,
      publisherAddress: payload.publisherAddress,
      price: payload.price,
      publishYear: payload.publishYear,
      imageURL: payload.imageURL,
    };

    Object.keys(book).forEach(
      (key) => book[key] === undefined && delete book[key]
    );
    return book;
  }

  async create(payload) {
    const book = this.extractBookData(payload);
    const result = await this.Book.findOneAndUpdate(
      book,
      { $set: { bookDetail: [] } },
      { returnDocument: "after", upsert: true }
    );
    return result;
  }

  //Cập nhật book detail
  async updateDetail(id) {
    let detail = new ObjectId();
    await this.Book.updateOne(
      { _id: new ObjectId(id) },
      {
        $push: {
          bookDetail: [detail],
        },
      }
    );
    return detail;
  }

  async find(filter) {
    const cursor = await this.Book.find(filter);
    return await cursor.toArray();
  }
  async count(filter) {
    const cursor = await this.Book.find(filter).count();
    return await cursor;
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Book.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractBookData(payload);
    const result = await this.Book.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }

  async delete(id) {
    const result = await this.Book.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAll() {
    const result = await this.Book.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = BookService;
