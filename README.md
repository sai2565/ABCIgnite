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
    - Cannot be in the past.
  - Bookings cannot exceed the class capacity.
  - Duplicate bookings for the same member on the same date are not allowed.
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
All errors are returned as JSON responses with appropriate HTTP status codes.
- **400 Bad Request:** Validation errors or invalid input data.
- **404 Not Found:** Resource not found.
- **500 Internal Server Error:** Unexpected server errors.

**Sample Error Response:**
```json
{
  "error": "Invalid class data. Ensure all fields are correct."
}
```