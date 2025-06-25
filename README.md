# 📦 Courier Management System (Node.js + MySQL)

This is a **CLI-based Courier Management System** developed in **Node.js** with a **MySQL** backend. It allows you to manage members, couriers, and agents efficiently, including adding, updating, linking, and viewing details through a text-based interface.

---

## 🚀 Features

- Add / Update / Delete:
  - Couriers
  - Members
  - Agents
- Track courier status and delivery
- Link couriers with agents
- Update courier destinations
- View all couriers or filter by agent

---

## 🛠️ Technologies Used

- **Node.js**
- **MySQL**
- **Readline** (for CLI interaction)

---

## 🗃️ Database Schema

### `Members`
| Column       | Type          |
|--------------|---------------|
| id           | INT, PK, AI   |
| name         | VARCHAR(255)  |
| address      | VARCHAR(255)  |
| phoneNumber  | VARCHAR(20)   |
| email        | VARCHAR(255)  |

### `Couriers`
| Column         | Type          |
|----------------|---------------|
| trackingNumber | VARCHAR(50), PK |
| senderName     | VARCHAR(255)  |
| receiverName   | VARCHAR(255)  |
| destination    | VARCHAR(255)  |
| status         | VARCHAR(50)   |
| deliveryDate   | DATE          |

### `Agents`
| Column       | Type          |
|--------------|---------------|
| id           | INT, PK, AI   |
| name         | VARCHAR(255)  |
| address      | VARCHAR(255)  |
| phoneNumber  | VARCHAR(20)   |
| email        | VARCHAR(255)  |

### `CourierAgents`
| Column     | Type        |
|------------|-------------|
| courierId  | VARCHAR(50), FK → Couriers(trackingNumber) |
| agentId    | INT, FK → Agents(id) |
| **PK**     | (courierId, agentId) |

### `CourierStatus`
| Column     | Type        |
|------------|-------------|
| id         | INT, PK, AI |
| courierId  | VARCHAR(50), FK |
| status     | VARCHAR(50) |
| statusDate | DATE        |

---

## 📋 Prerequisites

- Node.js installed
- MySQL server running
- A database named `my_database` (or change in code)

---

## ⚙️ Setup Instructions

1. **Clone or Download the Project**

2. **Install Dependencies**
   ```bash
   npm install mysql readline
   ```

3. **Set Up MySQL**
   - Create a database:
     ```sql
     CREATE DATABASE my_database;
     ```
   - (Optional) Manually create the `Members` table if it's used.

4. **Run the Application**
   ```bash
   node e9e203e3-888d-4861-adce-676249fbe887.js
   ```

5. **Follow the CLI Menu**

---

## 📖 Sample Menu Options

```
1. Add Member
2. Add Courier
3. Delete Member
4. Delete Courier
5. Search Member
6. Search Courier
7. Update Member
8. Update Courier
9. Add Agent
10. Link Courier to Agent
11. Print Couriers Related to Agent
12. Update Receiver Address
13. Print All Couriers
14. Exit
```

---

## 📝 Notes

- The system uses `readline` for synchronous command-line input.
- Some functions (like updating sender address) are commented out and can be extended.
- Proper input validation is recommended for production.

---

## 📌 Author

Made by Nirmal Patel  
Feel free to contribute, fork, or raise issues.
