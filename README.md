# Class Booking System API

## **Overview**
This project is a **Class Booking System API** that provides functionality to manage classes and bookings. It supports operations like creating classes, fetching all classes, creating bookings, and searching bookings based on various filters.

The system includes:
- **Class Management:** Create and retrieve classes.
- **Booking Management:** Create bookings for classes and search bookings with filters.
- **Validations:** Comprehensive checks to ensure data integrity and consistency.

---

## **API Functionalities**

### **Class Management**

#### 1. **Create a Class**
- **Endpoint:** `POST /classes`
- **Description:** Creates a new class with details like name, date range, start time, duration, and capacity.
- **Validations:**
  - All fields (`name`, `startDate`, `endDate`, `startTime`, `duration`, `capacity`) are required.
  - `name` must be at least 3 characters long.
  - `startDate` and `endDate` must be in valid Date format.
  - `startDate` must be before `endDate`.
  - `endDate` must be in the future.
  - `capacity` must be an integer greater than or equal to 1.
- **Sample Request Body:**
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

#### 2. **Get All Classes**
- **Endpoint:** `GET /classes`
- **Description:** Retrieves a list of all available classes.
- **Sample Response:**
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
    }
  ]
  ```

---

### **Booking Management**

#### 1. **Create a Booking**
- **Endpoint:** `POST /bookings`
- **Description:** Creates a new booking for a class.
- **Validations:**
  - All fields (`memberName`, `classId`, `participationDate`) are required.
  - `memberName` must be at least 3 characters long.
  - `classId` must refer to an existing class.
  - `participationDate`:
    - Must be in valid Date format.
    - Must be within the date range of the class.
    - Must be in the future.
  - Bookings for a date cannot exceed the class capacity.
  - Member can book multiple classes for same date and time but duplicate bookings for the same class for same member on the same date are not allowed.
- **Sample Request Body:**
  ```json
  {
    "memberName": "Sharan",
    "classId": "1737285020539-0.5471042612337986",
    "participationDate": "2025-02-20"
  }
  ```

#### 2. **Search Bookings**
- **Endpoint:** `GET /bookings`
- **Description:** Retrieves a list of bookings based on filters like member name and date range.
- **Validations:**
  - If `startDate` and `endDate` are provided, `startDate` must be earlier than `endDate`.
- **Query Parameters:**
  - `memberName` (optional)
  - `startDate` (optional)
  - `endDate` (optional)
- **Sample Request:**
  ```
  GET /bookings?memberName=Sharan&startDate=2025-02-01&endDate=2025-02-28
  ```
- **Sample Response:**
  ```json
  [
    {
      "memberName": "Sharan",
      "classId": "1737285020539-0.5471042612337986",
      "participationDate": "2025-02-20",
      "bookedOn": "2025-01-19T11:11:38.503Z",
      "id": "1737285098503-0.07342564777621208",
      "className": "Yoga Class",
      "classStartTime": "10:00 AM",
      "classStartDate": "2025-02-01",
      "classEndDate": "2025-02-28"
    }
  ]
  ```

---

## **Setup and Usage**

### **Prerequisites**
- Node.js (>= 14.x)
- NPM

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/sai2565/class-booking-system.git
   ```
2. Navigate to the project directory:
   ```bash
   cd class-booking-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### **Run the Application**
1. Start the server:
   ```bash
   npm start
   ```
2. The server will be running on `http://localhost:3000`.

### **Run Tests**
- To run the test suite:
  ```bash
  npm test
  ```

---

## **File Structure**
- `controllers/`
  - Handles API requests and responses.
- `services/`
  - Contains business logic and calls repositories.
- `repositories/`
  - Manages data storage and retrieval.
- `utils/`
  - Contains utility functions like validations and file operations.
- `data/`
  - Stores JSON files for classes and bookings.

---

## **Error Handling**
All errors are returned as JSON responses with appropriate HTTP status codes by the error handler middleware.
- **400 Bad Request:** Validation errors or invalid input data.
- **500 Internal Server Error:** Unexpected server errors.

**Sample Error Response:**
```json
{
  "error": "Invalid class data. Ensure all fields are correct."
}
```

---
# **Manual Testing Helper**

## **Test Environment**
- **Base URL:** http://localhost:3000
- **Tools:** Postman, Bruno or any REST client
- **Dependencies:** Ensure all dependencies are installed, and the server is running before testing. ( Refer to Setup and Usage for steps )

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
| 2     | Missing required fields                          | Omit `name`                                      | Returns 400 status with an error: "Invalid class data. Ensure all fields are correct."                              |
| 3     | Capacity less than 1                             | Set `capacity` to -1                              | Returns 400 status with an error: "Capacity must be at least 1."                   |
| 4     | End date is in the past                          | Set `endDate` to "2023-12-31"                    | Returns 400 status with an error: "End date must be in the future."                |
| 5     | Start date is after end date                     | Set `startDate` to "2025-03-01"                 | Returns 400 status with an error: "Start date must be before the end date."         |

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
| 2     | Missing required fields                          | Omit `memberName`                                 | Returns 400 status with an error: "Invalid booking data. Ensure all fields are correct."                        |
| 3     | Invalid member name length                       | Set `memberName` to "SS"                         | Returns 400 status with an error: "Member name must be at least 3 characters long." |
| 4     | Invalid class ID                                 | Set `classId` to "invalid-class-id"              | Returns 400 status with an error: "Class ID does not exist."                        |
| 5     | Participation date in the past                   | Set `participationDate` to "2023-03-01"          | Returns 400 status with an error: "Participation date must be in the future." |
| 6     | Participation date outside class date range      | Set `participationDate` to "2025-03-01"          | Returns 400 status with an error: "Participation date must be within the class date range." |
| 7     | Duplicate booking                                | Repeat booking data as above                     | Returns 400 status with an error: "Member already booked for this class on the given date."          |
| 8     | Booking exceeds class capacity                  | Book a class beyond its capacity                 | Returns 400 status with an error: "Class is full."                        |

---

#### **2.2 Search Bookings**
**Endpoint:** `GET /bookings`

**Sample Query Parameters:**
```
?memberName=Sharan&startDate=2025-02-01&endDate=2025-02-28
```

**Test Cases:**
| **#** | **Test Case Description**                         | **Query Parameters**                              | **Expected Outcome**                                                                 |
|-------|---------------------------------------------------|---------------------------------------------------|-------------------------------------------------------------------------------------|
| 1     | Search by valid member name                      | `memberName=Sharan`                                | Returns a 200 status with matching bookings.                                         |
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