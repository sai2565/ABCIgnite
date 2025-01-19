class Class {
    constructor(name, startDate, endDate, startTime, duration, capacity) {
      this.name = name;
      this.startDate = startDate;
      this.endDate = endDate;
      this.startTime = startTime;
      this.duration = duration;
      this.capacity = capacity;
      this.id = `${Date.now()}-${Math.random()}`;
    }
  }
  
  module.exports = Class;