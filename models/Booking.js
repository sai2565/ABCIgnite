class Booking {
    constructor(memberName, classId, participationDate) {
      this.memberName = memberName;
      this.classId = classId;
      this.participationDate = participationDate;
      this.bookedOn = new Date();
      this.id = `${Date.now()}-${Math.random()}`;
    }
  }
  
  module.exports = Booking;