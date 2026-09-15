const AttendanceRepository = require("../repositories/AttendanceRepository");
const ApiError = require("../utils/ApiError");

const VALID_SORT_FIELDS = ["AttendanceID", "MemberID", "CheckInTime", "CheckOutTime", "Date"];
const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

class AttendanceService {
  async getAllAttendance({ limit = 10, page = 1, sort = "AttendanceID", order = "asc" }) {
    const parsedLimit = parseInt(limit) || 10;
    const parsedPage = parseInt(page) || 1;
    const parsedOrder = order.toLowerCase() === "desc" ? "DESC" : "ASC";
    const offset = (parsedPage - 1) * parsedLimit;

    if (!VALID_SORT_FIELDS.includes(sort)) {
      throw new ApiError(400, "Invalid sort field");
    }

    const totalCount = await AttendanceRepository.count();
    const totalPages = Math.ceil(totalCount / parsedLimit);
    const attendanceRecords = await AttendanceRepository.findAllPaginated({
      sort,
      order: parsedOrder,
      limit: parsedLimit,
      offset,
    });

    return {
      data: attendanceRecords,
      pagination: {
        totalRecords: totalCount,
        totalPages,
        currentPage: parsedPage,
        perPage: parsedLimit,
      },
    };
  }

  getAttendanceByMember(memberId) {
    return AttendanceRepository.findByMemberId(memberId);
  }

  async getAttendanceByDate(date) {
    if (!DATE_FORMAT.test(date)) {
      throw new ApiError(400, "Invalid date format. Use YYYY-MM-DD");
    }
    const records = await AttendanceRepository.findByDate(date);
    if (!records.length) {
      throw new ApiError(404, "No attendance records found for this date.");
    }
    return records;
  }

  getAttendanceByRange(startDate, endDate) {
    return AttendanceRepository.findByDateRange(startDate, endDate);
  }

  async checkIn(memberId) {
    const MemberID = parseInt(memberId);
    const today = new Date().toISOString().split("T")[0];

    const member = await AttendanceRepository.findMemberById(MemberID);
    if (!member) throw new ApiError(404, "Member not found");
    if (member.lesson <= 0) throw new ApiError(400, "اشتراكك انتهى، يرجى التجديد");

    const existingCheckIn = await AttendanceRepository.findTodayCheckIn(MemberID, today);
    if (existingCheckIn) throw new ApiError(400, "لقد قمت بتسجيل الدخول بالفعل اليوم");

    await AttendanceRepository.updateMemberLesson(MemberID, member.lesson - 1);

    const checkInTime = new Date();
    return AttendanceRepository.createCheckIn({
      MemberID,
      CheckInTime: checkInTime.toISOString().split("T")[1],
      Date: today,
    });
  }

  async checkOut(memberId) {
    const MemberID = parseInt(memberId);
    const today = new Date().toISOString().split("T")[0];

    const member = await AttendanceRepository.findMemberById(MemberID);
    if (!member) throw new ApiError(404, "User not found");

    const record = await AttendanceRepository.findOpenCheckIn(MemberID, today);
    if (!record) throw new ApiError(404, "No check-in record found for today");

    const checkOutTime = new Date();
    record.CheckOutTime = checkOutTime.toISOString().split("T")[1];
    await AttendanceRepository.save(record);
    return record;
  }

  async deleteAttendance(recordId) {
    const record = await AttendanceRepository.findById(recordId);
    if (!record) throw new ApiError(404, "Attendance record not found");
    await AttendanceRepository.delete(record);
  }
}

module.exports = new AttendanceService();
