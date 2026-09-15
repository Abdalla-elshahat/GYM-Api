const ClassRepository = require("../repositories/ClassRepository");
const ApiError = require("../utils/ApiError");

class ClassService {
  getAllClasses() {
    return ClassRepository.findAll();
  }

  getClassById(id) {
    return ClassRepository.findById(id);
  }

  createClass(data) {
    const { TrainerID, ClassName, ClassDate, Duration, MaxParticipants } = data;
    if (!TrainerID || !ClassName || !ClassDate || !Duration || !MaxParticipants) {
      throw new ApiError(400, "All fields are required");
    }
    return ClassRepository.create(data);
  }

  async updateClass(id, data) {
    const classData = await ClassRepository.findById(id);
    if (!classData) throw new ApiError(404, "Class not found");
    await ClassRepository.update(id, data);
    return ClassRepository.findById(id);
  }

  async deleteClass(id) {
    const classData = await ClassRepository.findById(id);
    if (!classData) throw new ApiError(404, "Class not found");
    await ClassRepository.delete(id);
  }
}

module.exports = new ClassService();
