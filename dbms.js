const readline = require('readline');
const mysql = require('mysql');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// MySQL connection configuration
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Replace with your MySQL password
    database: "my_database",
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:\n', err);
        return;
    }
    console.log('\nConnected to MySQL database');

    // After connection, create tables
    createTables();
});

// Function to create tables
function createTables() {
    // const createMembersTableQuery = `
    //     CREATE TABLE IF NOT EXISTS Members (
    //         id INT AUTO_INCREMENT PRIMARY KEY,
    //         name VARCHAR(255),
    //         address VARCHAR(255),
    //         phoneNumber VARCHAR(20),
    //         email VARCHAR(255)
    //     )
    // `;

    const createCouriersTableQuery = `
        CREATE TABLE IF NOT EXISTS Couriers (
            trackingNumber VARCHAR(50) PRIMARY KEY,
            senderName VARCHAR(255),
            receiverName VARCHAR(255),
            destination VARCHAR(255),
            status VARCHAR(50),
            deliveryDate DATE
        )
    `;

    const createAgentsTableQuery = `
    CREATE TABLE IF NOT EXISTS Agents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        address VARCHAR(255),
        phoneNumber VARCHAR(20),
        email VARCHAR(255)
    )
`;

    const createCourierAgentTableQuery = `
    CREATE TABLE IF NOT EXISTS CourierAgents (
        courierId VARCHAR(50),
        agentId INT,
        FOREIGN KEY (courierId) REFERENCES Couriers(trackingNumber),
        FOREIGN KEY (agentId) REFERENCES Agents(id),
        PRIMARY KEY (courierId, agentId)
    )
`;

    const createCourierStatusTableQuery = `
    CREATE TABLE IF NOT EXISTS CourierStatus (
        id INT AUTO_INCREMENT PRIMARY KEY,
        courierId VARCHAR(50),
        status VARCHAR(50),
        statusDate DATE,
        FOREIGN KEY (courierId) REFERENCES Couriers(trackingNumber)
    )
`;

    // connection.query(createMembersTableQuery, (err) => {
    //     if (err) {
    //         console.error('Error creating Members table:', err);
    //     } else {
    //         console.log('Members table created successfully');
    //     }
    // });

    connection.query(createCouriersTableQuery, (err) => {
        if (err) {
            console.error('Error creating Couriers table:', err);
        } else {
            console.log('Couriers table created successfully');
        }
    });

    connection.query(createAgentsTableQuery, (err) => {
        if (err) {
            console.error('Error creating Agents table:', err);
        } else {
            console.log('Agents table created successfully');
        }
    });

    connection.query(createCourierAgentTableQuery, (err) => {
        if (err) {
            console.error('Error creating CourierAgents table:', err);
        } else {
            console.log('CourierAgents table created successfully');
        }
    });

    connection.query(createCourierStatusTableQuery, (err) => {
        if (err) {
            console.error('Error creating CourierStatus table:', err);
        } else {
            console.log('CourierStatus table created successfully');
        }
        // After tables are created, display the menu
        displayMenu();
        processInput();
    });
}

// Function to display menu
function displayMenu() {
    console.log("\nCourier Management System");
    console.log("1. Add Member");
    console.log("2. Add Courier");
    console.log("3. Delete Member");
    console.log("4. Delete Courier");
    console.log("5. Search Member");
    console.log("6. Search Courier");
    console.log("7. Update Member");
    console.log("8. Update Courier");
    console.log("9. Add Agent");
    console.log("10. Link Courier to Agent");
    console.log("11. Print Couriers Related to Agent");
    console.log("12. Update Receiver Address");
    // console.log("13. Update Sender Address");
    console.log("13. Print All Couriers");
    console.log("14. Exit");
}

// Function to handle user input
function handleInput(choice) {
    switch (choice) {
        case '1':
            addMember();
            break;
        case '2':
            addCourier();
            break;
        case '3':
            deleteMember();
            break;
        case '4':
            deleteCourier();
            break;
        case '5':
            searchMember();
            break;
        case '6':
            searchCourier();
            break;
        case '7':
            updateMember();
            break;
        case '8':
            updateCourier();
            break;
        case '9':
            addAgent();
            break;
        case '10':
            linkCourierToAgent();
            break;
        case '11':
            printCouriersRelatedToAgent();
            break;
        case '12':
            updateCourierDestination();
            break;
        // case '13':
        //     updateSenderAddress();
        //     break;
        case '13':
            printAllCouriers();
            break;
        case '14':
            connection.end(); // Close MySQL connection
            rl.close(); // Close readline interface
            break;
        default:
            console.log("Invalid choice. Please choose again.");
            displayMenu();
            processInput();
    }
}

// Function to process user input
function processInput() {
    rl.question("Enter your choice: ", choice => {
        handleInput(choice);
    });
}

// Function to add member
function addMember() {
    rl.question("Enter Name: ", name => {
        rl.question("Enter Address: ", address => {
            rl.question("Enter Phone Number: ", phoneNumber => {
                rl.question("Enter Email: ", email => {
                    const insertQuery = `
                        INSERT INTO Members (name, address, phoneNumber, email) 
                        VALUES (?, ?, ?, ?)
                    `;
                    connection.query(insertQuery, [name, address, phoneNumber, email], (err) => {
                        if (err) {
                            console.log("Error:", err.message);
                        } else {
                            console.log("Member added successfully!");
                        }
                        displayMenu();
                        processInput();
                    });
                });
            });
        });
    });
}

// Function to add courier
function addCourier() {
    rl.question("Enter Tracking Number: ", trackingNumber => {
        rl.question("Enter Sender Name: ", senderName => {
            rl.question("Enter Receiver Name: ", receiverName => {
    
                    rl.question("Enter Destination: ", destination => {
                        rl.question("Enter Status: ", status => {
                            rl.question("Enter Delivery Date (YYYY-MM-DD): ", deliveryDate => {
                                const insertQuery = `
                                    INSERT INTO Couriers (trackingNumber, senderName, receiverName, destination, status, deliveryDate) 
                                    VALUES (?, ?, ?, ?, ?, ?, ?)
                                `;
                                connection.query(insertQuery, [trackingNumber, senderName, receiverName, destination, status, deliveryDate], (err) => {
                                    if (err) {
                                        console.log("Error:", err.message);
                                    } else {
                                        console.log("Courier added successfully!");
                                    }
                                    displayMenu();
                                    processInput();
                                });
                            });
                        });
                    });
                
            });
        });
    });
}


// Function to add an agent
function addAgent() {
    rl.question("Enter Agent ID: ", id => {
        rl.question("Enter Agent Name: ", name => {
            rl.question("Enter Agent Address: ", address => {
                rl.question("Enter Agent Phone Number: ", phoneNumber => {
                    rl.question("Enter Agent Email: ", email => {
                        const insertQuery = `
                            INSERT INTO Agents (id, name, address, phoneNumber, email) 
                            VALUES (?, ?, ?, ?, ?)
                        `;
                        connection.query(insertQuery, [id, name, address, phoneNumber, email], (err) => {
                            if (err) {
                                console.log("Error:", err.message);
                            } else {
                                console.log("Agent added successfully!");
                            }
                            displayMenu();
                            processInput();
                        });
                    });
                });
            });
        });
    });
}

// Function to link courier to an agent
function linkCourierToAgent() {
    rl.question("Enter Tracking Number of Courier: ", courierId => {
        rl.question("Enter Agent ID: ", agentId => {
            const insertQuery = `
                INSERT INTO CourierAgents (courierId, agentId) 
                VALUES (?, ?)
            `;
            connection.query(insertQuery, [courierId, agentId], (err) => {
                if (err) {
                    console.log("Error:", err.message);
                } else {
                    console.log("Courier linked to agent successfully!");
                }
                displayMenu();
                processInput();
            });
        });
    });
}

// Function to print couriers related to an agent
function printCouriersRelatedToAgent() {
    rl.question("Enter Agent ID: ", agentId => {
        const selectQuery = `
            SELECT Couriers.* 
            FROM Couriers
            INNER JOIN CourierAgents ON Couriers.trackingNumber = CourierAgents.courierId
            WHERE CourierAgents.agentId = ?
        `;
        connection.query(selectQuery, [agentId], (err, rows) => {
            if (err) {
                console.log("Error:", err.message);
            } else if (rows.length > 0) {
                console.log("Couriers related to Agent ID " + agentId + ":");
                rows.forEach(courier => {
                    console.log(courier);
                });
            } else {
                console.log("No couriers related to this agent.");
            }
            displayMenu();
            processInput();
        });
    });
}

// Function to update courier receiver address
function updateCourierDestination() {
    rl.question("Enter Tracking Number of Courier: ", trackingNumber => {
        rl.question("Enter New Destination: ", newDestination => {
            const updateQuery = `UPDATE Couriers SET destination = ? WHERE trackingNumber = ?`;
            connection.query(updateQuery, [newDestination, trackingNumber], (err) => {
                if (err) {
                    console.log("Error:", err.message);
                } else {
                    console.log("Courier destination updated successfully!");
                }
                displayMenu();
                processInput();
            });
        });
    });
}
// Function to update courier sender address
// Function to update sender address
// Function to update sender address
// function updateSenderAddress() {
//     rl.question("Enter Tracking Number of Courier: ", trackingNumber => {
//         rl.question("Enter New Sender Address: ", newAddress => {
//             const updateQuery = `UPDATE Couriers SET senderAddress = ? WHERE trackingNumber = ?`;
//             connection.query(updateQuery, [newAddress, trackingNumber], (err, result) => {
//                 if (err) {
//                     console.log("Error:", err.message);
//                 } else {
//                     if (result.affectedRows === 0) {
//                         console.log("No courier found with the provided tracking number.");
//                     } else {
//                         console.log("Sender address updated successfully!");
//                     }
//                 }
//                 displayMenu();
//                 processInput();
//             });
//         });
//     });
// }


// Function to print all couriers
function printAllCouriers() {
    const selectQuery = `SELECT * FROM Couriers`;
    connection.query(selectQuery, (err, rows) => {
        if (err) {
            console.log("Error:", err.message);
        } else if (rows.length > 0) {
            console.log("All Couriers:");
            rows.forEach(courier => {
                console.log(courier);
            });
        } else {
            console.log("No couriers found.");
        }
        displayMenu();
        processInput();
    });
}

// Function to delete member
function deleteMember() {
    rl.question("Enter Member ID to delete: ", id => {
        const deleteQuery = `DELETE FROM Members WHERE id = ?`;
        connection.query(deleteQuery, [id], (err) => {
            if (err) {
                console.log("Error:", err.message);
            } else {
                console.log("Member deleted successfully!");
            }
            displayMenu();
            processInput();
        });
    });
}

// Function to delete courier
function deleteCourier() {
    rl.question("Enter Tracking Number to delete: ", trackingNumber => {
        const deleteQuery = `DELETE FROM Couriers WHERE trackingNumber = ?`;
        connection.query(deleteQuery, [trackingNumber], (err) => {
            if (err) {
                console.log("Error:", err.message);
            } else {
                console.log("Courier deleted successfully!");
            }
            displayMenu();
            processInput();
        });
    });
}

// Function to search member
function searchMember() {
    rl.question("Enter Member ID to search: ", id => {
        const selectQuery = `SELECT * FROM Members WHERE id = ?`;
        connection.query(selectQuery, [id], (err, rows) => {
            if (err) {
                console.log("Error:", err.message);
            } else if (rows.length > 0) {
                console.log("Member found:", rows[0]);
            } else {
                console.log("Member not found.");
            }
            displayMenu();
            processInput();
        });
    });
}

// Function to search courier
function searchCourier() {
    rl.question("Enter Tracking Number to search: ", trackingNumber => {
        const selectQuery = `SELECT * FROM Couriers WHERE trackingNumber = ?`;
        connection.query(selectQuery, [trackingNumber], (err, rows) => {
            if (err) {
                console.log("Error:", err.message);
            } else if (rows.length > 0) {
                console.log("Courier found:", rows[0]);
            } else {
                console.log("Courier not found.");
            }
            displayMenu();
            processInput();
        });
    });
}

// Function to update member
function updateMember() {
    rl.question("Enter Member ID to update: ", id => {
        rl.question("Enter New Phone Number: ", phoneNumber => {
            const updateQuery = `UPDATE Members SET phoneNumber = ? WHERE id = ?`;
            connection.query(updateQuery, [phoneNumber, id], (err) => {
                if (err) {
                    console.log("Error:", err.message);
                } else {
                    console.log("Member updated successfully!");
                }
                displayMenu();
                processInput();
            });
        });
    });
}

// Function to update courier
function updateCourier() {
    rl.question("Enter Tracking Number to update: ", trackingNumber => {
        rl.question("Enter New Status: ", status => {
            const updateQuery = `UPDATE Couriers SET status = ? WHERE trackingNumber = ?`;
            connection.query(updateQuery, [status, trackingNumber], (err) => {
                if (err) {
                    console.log("Error:", err.message);
                } else {
                    console.log("Courier updated successfully!");
                }
                displayMenu();
                processInput();
            });
        });
    });
}

// Starting point
function startApp() {
    displayMenu();
    processInput();
}

// Start the application
startApp();
