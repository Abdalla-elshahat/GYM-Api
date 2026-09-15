const Attendance = require("../models/Attendance");
const Member = require("../models/member");
const { Op } = require("sequelize");

class AttendanceRepository {
  count() {
    return Attendance.count();
  }

  findAllPaginated({ sort, order, limit, offset }) {
    return Attendance.findAll({
      include: Member,
      order: [[sort, order]],
      limit,
      offset,
    });
  }

  findByMemberId(memberId) {
    return Attendance.findAll({ where: { MemberID: memberId }, include: Member });
  }

  findByDate(date) {
    return Attendance.findAll({ where: { Date: date }, include: [{ model: Member }] });
  }

  findByDateRange(startDate, endDate) {
    return Attendance.findAll({
      where: { Date: { [Op.between]: [startDate, endDate] } },
      include: Member,
    });
  }

  findMemberById(memberId) {
    return Member.findOne({ where: { MemberID: memberId } });
  }

  updateMemberLesson(memberId, lesson) {
    return Member.update({ lesson }, { where: { MemberID: memberId } });
  }

  findTodayCheckIn(memberId, date) {
    return Attendance.findOne({ where: { MemberID: memberId, Date: date } });
  }

  createCheckIn(data) {
    return Attendance.create(data);
  }

  findOpenCheckIn(memberId, date) {
    return Attendance.findOne({
      where: { MemberID: memberId, CheckOutTime: null, Date: date },
    });
  }

  findById(recordId) {
    return Attendance.findByPk(recordId);
  }

  save(record) {
    return record.save();
  }

  delete(record) {
    return record.destroy();
  }
}

module.exports = new AttendanceRepository();
