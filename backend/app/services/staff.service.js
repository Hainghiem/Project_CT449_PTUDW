const { ObjectId } = require("mongodb");

class StaffService {
    constructor(client) {
        this.Staff = client.db().collection("staff");
    }

    extractStaffData(payload){
        const staff = {
            username: payload.username,
            password: payload.password,
            phone: payload.phone,
            address: payload.address,
            role: payload.role,
        };

        Object.keys(staff).forEach(
            (key) => staff[key] === undefined && delete staff[key]
        );
        return staff;
    }

    async create(payload) {
        const staff = this.extractStaffData(payload);
        const result = await this.Staff.findOneAndUpdate(
            staff,
            { $set: {}},
            {returnDocument: "after", upsert: true}
        );
        return result;
    }

    async find(filter){
        const cursor = await this.Staff.find(filter);
        return await cursor.toArray();
    }

    async count(filter){
        const cursor = await this.Staff.find(filter).count();
        return await cursor;
    }

    async findByName(username){
        return await this.find({
            username: {$regex: new RegExp(username), $options: "i"},
        });
    }

    async findById(id){
        return await this.Staff.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractStaffData(payload);
        const result  = await this.Staff.findOneAndUpdate(
            filter,
            { $set: update},
            { returnDocument: "after"}
        );
        return result;
    }

    async delete(id) {
        const result = await this.Staff.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll(){
        const result = await this.Staff.deleteMany({});
        return result.deletedCount;
    }

    async findUser(Username, Password){
        return await this.Staff.findOne({
            username: Username,
            password: Password,
        });
    }
}

module.exports = StaffService;