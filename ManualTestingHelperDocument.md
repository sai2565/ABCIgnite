# **Manual Testing Document for Class Booking System API**

## **Overview**
This document provides a detailed manual testing guide for the Class Booking System API, covering all endpoints, sample data, and possible test scenarios.

---

## **Test Environment**
- **Base URL:** http://localhost:3000
- **Tools:** Postman or any REST client, JSON validator
- **Dependencies:** Ensure all dependencies are installed, and the server is running before testing.

---

## **Test Scenarios**

### **1. Class Management**
#### **1.1 Create a Class**
**Endpoint:** `POST /classes`

**Sample Request Body:**
```json
{
  "name": "Yoga Class",
  "startDate": "2025-02-01",
  "endDate": "2025-02-28",
  "startTime": "10:00 AM",
  "duration": 60,
  "capacity": 10
}
```

**Test Cases:**
| **#** | **Test Case Description**                         | **Input Data**                                    | **Expected Outcome**                                                                 |
|-------|---------------------------------------------------|--------------------------------------------------|-------------------------------------------------------------------------------------|
| 1     | Create a valid class                              | Valid data as shown above                        | Class is created successfully with a 201 status.                                   |
| 2     | Missing required fields                          | Omit `name`                                      | Returns 400 status with an error: "Name is required."                              |
| 3     | Capacity less than 1                             | Set `capacity` to 0                              | Returns 400 status with an error: "Capacity must be at least 1."                   |
| 4     | End date is in the past                          | Set `endDate` to "2023-12-31"                    | Returns 400 status with an error: "End date must be in the future."                |
| 5     | Start date is after end date                     | Set `startDate` to "2025-03-01"                 | Returns 400 status with an error: "Start date must be before the end date."         |
| 6     | Invalid duration                                 | Set `duration` to "two hours"                   | Returns 400 status with an error: "Duration must be a valid number."               |

---

#### **1.2 Get All Classes**
**Endpoint:** `GET /classes`

**Test Cases:**
| **#** | **Test Case Description**               | **Expected Outcome**                                                                 |
|-------|-----------------------------------------|-------------------------------------------------------------------------------------|
| 1     | Retrieve all classes when data exists   | Returns a 200 status with a list of all classes.                                    |
| 2     | Retrieve classes when no data exists    | Returns a 200 status with an empty array.                                           |

---

### **2. Booking Management**
#### **2.1 Create a Booking**
**Endpoint:** `POST /bookings`

**Sample Request Body:**
```json
{
  "memberName": "Sharan",
  "classId": "1737285020539-0.5471042612337986",
  "participationDate": "2025-02-20"
}
```

**Test Cases:**
| **#** | **Test Case Description**                         | **Input Data**                                     | **Expected Outcome**                                                                 |
|-------|---------------------------------------------------|---------------------------------------------------|-------------------------------------------------------------------------------------|
| 1     | Create a valid booking                           | Valid data as shown above                         | Booking is created successfully with a 201 status.                                  |
| 2     | Missing required fields                          | Omit `memberName`                                 | Returns 400 status with an error: "Member name is required."                        |
| 3     | Invalid member name length                       | Set `memberName` to "JD"                         | Returns 400 status with an error: "Member name must be at least 3 characters long." |
| 4     | Invalid class ID                                 | Set `classId` to "invalid-class-id"              | Returns 400 status with an error: "Class ID does not exist."                        |
| 5     | Participation date outside class date range      | Set `participationDate` to "2025-03-01"          | Returns 400 status with an error: "Participation date must be within the class date range." |
| 6     | Duplicate booking                                | Repeat booking data as above                     | Returns 400 status with an error: "Duplicate booking for the same member."          |
| 7     | Booking exceeds class capacity                  | Book a class beyond its capacity                 | Returns 400 status with an error: "Class capacity exceeded."                        |

---

#### **2.2 Search Bookings**
**Endpoint:** `GET /bookings`

**Sample Query Parameters:**
```
?memberName=John&startDate=2025-02-01&endDate=2025-02-28
```

**Test Cases:**
| **#** | **Test Case Description**                         | **Query Parameters**                              | **Expected Outcome**                                                                 |
|-------|---------------------------------------------------|---------------------------------------------------|-------------------------------------------------------------------------------------|
| 1     | Search by valid member name                      | `memberName=John`                                | Returns a 200 status with matching bookings.                                         |
| 2     | Search by valid date range                       | `startDate=2025-02-01&endDate=2025-02-28`        | Returns a 200 status with bookings within the date range.                           |
| 3     | Search with no filters                           | No query parameters                              | Returns a 200 status with all bookings.                                             |
| 4     | Search with invalid date range                  | `startDate=2025-03-01&endDate=2025-02-01`        | Returns 400 status with an error: "Start date must be before end date."             |
| 5     | Search for non-existent bookings                | `memberName=NonExistent`                         | Returns a 200 status with an empty array.                                           |

---

## **Test Data**
### **Sample Classes:**
```json
[
  {
    "name": "Yoga Class",
    "startDate": "2025-02-01",
    "endDate": "2025-02-28",
    "startTime": "10:00 AM",
    "duration": 60,
    "capacity": 10,
    "id": "1737285020539-0.5471042612337986"
  },
  {
    "name": "Dance Class",
    "startDate": "2025-03-01",
    "endDate": "2025-03-31",
    "startTime": "2:00 PM",
    "duration": 90,
    "capacity": 20,
    "id": "1737285020540-0.1231042562370913"
  }
]
```

### **Sample Bookings:**
```json
[
  {
    "memberName": "Sharan",
    "classId": "1737285020539-0.5471042612337986",
    "participationDate": "2025-02-20",
    "bookedOn": "2025-01-19T10:00:00.000Z",
    "id": "1737285098503-0.07342564777621208"
  }
]
```

---

This document ensures comprehensive coverage of all test scenarios and edge cases for the Class Booking System API.

