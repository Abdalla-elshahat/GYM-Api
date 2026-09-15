const Class = require("../models/Class");
const Member = require("../models/member");
const MemberWithClass = require("../models/MemberWithClass");

class MemberClassRepository {
  findClassWithMembers(classId) {
    return Class.findByPk(classId, {
      include: [
        {
          model: Member,
          through: MemberWithClass,
          attributes: { exclude: ["password"] },
        },
      ],
    });
  }

  findMemberWithClasses(memberId) {
    return Member.findByPk(memberId, {
      include: [{ model: Class, through: MemberWithClass }],
    });
  }

  findMemberById(memberId) {
    return Member.findByPk(memberId);
  }

  findClassById(classId) {
    return Class.findByPk(classId);
  }

  incrementClassMembers(classItem) {
    return classItem.update({ numofmember: classItem.numofmember + 1 });
  }

  decrementClassMembers(classItem) {
    return classItem.update({ numofmember: classItem.numofmember - 1 });
  }

  addMemberToClass(memberId, classId) {
    return MemberWithClass.create({ member_id: memberId, class_id: classId });
  }

  findMembership(memberId, classId) {
    return MemberWithClass.findOne({ where: { member_id: memberId, class_id: classId } });
  }

  removeMembership(record) {
    return record.destroy();
  }
}

module.exports = new MemberClassRepository();
