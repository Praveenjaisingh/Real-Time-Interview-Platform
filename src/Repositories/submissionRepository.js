const { CodingSubmissions } = require("../Models");

class submissionRepository {

    async create(payload) {
        return await CodingSubmissions.create(payload);
    }

    async findByUser(userId) {
        return await CodingSubmissions.findAll({
            where: { userId }
        });
    }
}

module.exports = new submissionRepository();