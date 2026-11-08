// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'jaildbs',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Prison table and Data Management
app.get('/api/getData', (req, res) => {
  const query = 'SELECT *FROM prisoner INNER JOIN lockup ON prisoner.PID = lockup.prisoner_id ;'
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).send('Error retrieving data');
    } else {
      res.status(200).send(result);
    }
  });
});

// Add a route for the search functionality
app.get('/api/search/:keyword', (req, res) => {
  const keyword = req.params.keyword;
  const query = `
  SELECT * FROM prisoner LEFT JOIN lockup ON 
  prisoner.PID = lockup.prisoner_id WHERE prisoner.CNIC LIKE ?;`;
  // lockup.prisoner_id
  db.query(query, [`%${keyword}%`], (err, result) => {
    if (err) {
      console.error('Error searching data:', err);
      res.send('Error searching data');
    } else {
      res.status(200).send(result);
    }
  });
});

//  Post method for prisoner and lockup table
app.post('/api/AddData', (req, res) => {
  const { FullName, F_Name, CNIC, Address, City, Reason, Description, StartDate, EndDate, Duration, Location } = req.body;
  const sql = `INSERT INTO prisoner (PID, FullName, F_Name, CNIC, Address, City, Reason) 
  VALUES (NULL,'${FullName}', '${F_Name}','${CNIC}','${Address}','${City}','${Reason}' )`;
  db.query(sql, (err, result) => {
    if (err) throw err;

    const PID = result.insertId;
    console.log("The Record id is : ", PID)

    const sqlLockup = `INSERT INTO lockup (LID, prisoner_id, reason, StartDate, EndDate, Duration, location) 
    VALUES ('${PID}', '${PID}', '${Description}', '${StartDate}', '${EndDate}', '${Duration}', '${Location}')`;

    db.query(sqlLockup, (err, result) => {
      if (err) throw err;
      console.log("lockup Data Added");
    })
  });
});
//  deleting a prisoner by ID
app.delete('/api/deletePrisoner/:id', (req, res) => {
  const prisonerId = req.params.id;
  const {
    fullName,
    fName,
    cnic,
    address,
    city,
    Reason,
    Description,
    startDate,
    endDate,
    Duration,
    Location,
  } = req.body;

  // Begin a transaction to ensure atomicity
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error beginning transaction');
      return;
    }

    // Delete related lockup records (Because the Lockup is the Child of prisoner table)
    const deleteLockupSql = `DELETE FROM lockup WHERE prisoner_id = ?`;

    db.query(deleteLockupSql, [prisonerId], (err, lockupResult) => {
      if (err) {
        return db.rollback(() => {
          console.error(err);
          res.status(500).send('Error deleting lockup records');
        });
      }
      //Delete the prisoner record (Because the Child (Lockup Table) Delete first and then Child Table(prisoner))
      const deletePrisonerSql = `DELETE FROM prisoner WHERE PID = ?`;
      db.query(deletePrisonerSql, [prisonerId], (err, prisonerResult) => {
        if (err) {
          return db.rollback(() => {
            console.error(err);
            res.status(500).send('Error deleting prisoner record');
          });
        }
        // Commit the transaction
        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              console.error(err);
              res.status(500).send('Error committing transaction');
            });
          }
          // Data add to jailDelRecords table when deleted from prisoner and lockup tables.
          const prisonerDelRecords = `INSERT INTO jaildelrecords (PID, FullName, 
          F_Name, CNIC, Address, City, Reason, Description, StartDate,
          EndDate, Duration, Location) 
          VALUES ('${prisonerId}', '${fullName}', '${fName}', '${cnic}', '${address}',
           '${city}', '${Reason}', '${Description}', '${startDate}', '${endDate}', '${Duration}', 
           '${Location}') `;

          db.query(prisonerDelRecords, (err, result) => {
            if (err) throw err;
            console.log("Added to prisoner Deleted Table Successfully & id :", `${prisonerId}`);
          })
          res.status(200).send('Prisoner and related lockup records deleted successfully');
        });
      });
    });
  });
});

// Get Data from jaildelrecords Table
app.get('/api/getdelPrisonerRecords', (req, res) => {
  const query = 'SELECT *FROM jaildelrecords ;'
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).send('Error retrieving data');
    } else {
      res.status(200).send(result);
    }
  });
});

// Delete from JailDelRecords   (Permanent Delete Records)
app.delete('/api/delPrisonerRecord/:id', (req, res) => {
  const prisonerId = req.params.id;

  // Begin a transaction to ensure atomicity
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error beginning transaction');
      return;
    }
    //Delete permanent from table
    const permanentdeletePrisonerRecords = `DELETE FROM jaildelrecords WHERE PID = ?`;
    db.query(permanentdeletePrisonerRecords, [prisonerId], (err, prisonerResult) => {
      if (err) {
        return db.rollback(() => {
          console.error(err);
          res.status(500).send('Error deleting jaildelrecords table row');
        });
      }
      // Commit the transaction
      db.commit((err) => {
        if (err) {
          return db.rollback(() => {
            console.error(err);
            res.status(500).send('Error committing transaction');
          });
        }
        res.status(200).send('Prisoner and related lockup records deleted successfully');
      });
    });
  });
});

//Reset the Prisoner Records...  /RestoredeletePrisoner
app.delete("/api/RestoredeletePrisoner/:PrisonerId", (req, res) => {
  const prisonerId = req.params.PrisonerId;
  const {
    fullName,
    fName, cnic,
    address, city,
    reason, Description,
    StartDate, EndDate,
    Duration, Location
  } = req.body;

  // Begin a transaction to ensure atomicity
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error beginning transaction');
      return;
    }
    // 1. Delete Records from empdelrecords table
    const deletePrisonerReset = `DELETE FROM jaildelrecords WHERE PID = ?`;
    db.query(deletePrisonerReset, [prisonerId], (err, PrisonerResult) => {
      if (err) {
        return db.rollback(() => {
          console.error(err);
          res.status(500).send('Error Reseting Prisoner records');
        });
      }
      // Commit the transaction
      db.commit((err) => {
        if (err) {
          return db.rollback(() => {
            console.error(err);
            res.status(500).send('Error committing transaction');
          });
        }
        //  Data added back to prisoner table
        const sql = `INSERT INTO prisoner(PID, FullName, F_Name, CNIC, Address, City, Reason) 
        VALUES (NULL, '${fullName}','${fName}', '${cnic}', '${address}', '${city}', '${reason}')`;

        db.query(sql, (err, result) => {
          if (err) throw err;

          const PID = result.insertId;
          console.log("Employee new Record id is : ", PID)

          const BackToLockup =
            `INSERT INTO lockup (LID, prisoner_id, reason, StartDate, EndDate, Duration, location)
           VALUES ('NULL', '${PID}', '${Description}', '${StartDate}', '${EndDate}', '${Duration}', '${Location}') `;

          db.query(BackToLockup, (err, result) => {
            if (err) throw err;
            console.log("Employee Data Added Successfully");
          })
        });
      });
    });
  });
});

// .................Employee..............
// Employee Tables and Data
app.get('/api/EmployeeData', (req, res) => {
  const query = 'SELECT *FROM employee INNER JOIN empstatus ON employee.EID = empstatus.EID ;'
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).send('Error retrieving data');
    } else {
      res.status(200).send(result);
    }
  });
});

// Search Employee Data (Employee and EmployeeStatus Table)
app.get('/api/EmpSearch/:keyword', (req, res) => {
  const keyword = req.params.keyword;
  const query = `SELECT * FROM employee LEFT JOIN empstatus ON 
  employee.EID = empstatus.EID WHERE employee.CNIC LIKE ?;`;
  db.query(query, [`%${keyword}%`], (err, result) => {
    if (err) {
      console.error('Error searching data:', err);
      res.send('Error searching data');
    } else {
      res.status(200).send(result);
    }
  });
});

//  Post method for Employee and EmployeeStatus table
app.post('/api/AddEmployee', (req, res) => {
  const { FullName, F_Name, CNIC, Address, City, Status, Age, Phone, DutyLocation, JoiningDate } = req.body;
  const sql = `INSERT INTO employee (EID, FullName, F_Name, CNIC, Phone, City, Address,Status, DOB)
   VALUES (NULL,'${FullName}', '${F_Name}','${CNIC}', '${Phone}','${City}','${Address}','${Status}','${Age}' )`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    const EID = result.insertId;
    console.log("Employee Record id is : ", EID)
    const sqlEmp = `INSERT INTO empstatus (SID, DutyLocation, JoiningDate, EID) 
    VALUES ('${EID}', '${DutyLocation}', '${JoiningDate}', '${EID}');`;
    db.query(sqlEmp, (err, result) => {
      if (err) throw err;
      console.log("Employee Data Added Successfully");
    })
  });
});

// Delete Data From Employee and EmployeeStatus Table
//  deleting a Employee by ID
app.delete("/api/deleteEmployee/:EmployeeId", (req, res) => {
  const employeeId = req.params.EmployeeId;
  const {
    fullName,
    fName,
    cnic,
    address,
    city,
    status,
    dob,
    phone,
    dutylocation,
    joiningdata,
  } = req.body;

  console.log('Full Name : ', fullName);
  console.log("age ", dob);
  // Begin a transaction to ensure atomicity
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error beginning transaction');
      return;
    }
    // Delete related Employeestatus records (Because the EmployeeStatus is the Child of Employee table)
    const deleteEmployeeStatusSql = `DELETE FROM empstatus WHERE EID = ?`;
    db.query(deleteEmployeeStatusSql, [employeeId], (err, EmpResult) => {
      if (err) {
        return db.rollback(() => {
          console.error(err);
          res.status(500).send('Error deleting EmployeeStatus records');
        });
      }
      //Delete the Employee record (Because the Child (EmployeeStatus Table) Delete first and then Parent Table(Employee))
      const deletePrisonerSql = `DELETE FROM employee WHERE EID = ?`;
      db.query(deletePrisonerSql, [employeeId], (err, prisonerResult) => {
        if (err) {
          return db.rollback(() => {
            console.error(err);
            res.status(500).send('Error deleting Employee record');
          });
        }
        // Commit the transaction
        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              console.error(err);
              res.status(500).send('Error committing transaction');
            });
          }
          const DelRecords = `INSERT INTO empdelrecords 
          (EID, FullName, F_Name, CNIC, Address, City, Status, DOB, Phone, DutyLocation, 
          JoiningDate) VALUES ('${employeeId}', '${fullName}', '${fName}', '${cnic}', '${address}', '${city}', '${status}', '${dob}',
          '${phone}', '${dutylocation}', '${joiningdata}')`;
          db.query(DelRecords, (err, result) => {
            if (err) throw err;
            console.log("Deleted Data Added to Deleted Table Successfully & id :", `${employeeId}`);
          })
          res.status(200).send('Employee and related EmployeeStatus records deleted successfully');
        });
      });
    });
  });
});

// Get from empdelrecords table (Employee Deleted Records) 
app.get('/api/DeleteEmployeeRecords', (req, res) => {
  const query = 'SELECT * FROM empdelrecords'
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).send('Error retrieving data');
    } else {
      res.status(200).send(result);
    }
  });
});

app.delete("/api/permanentDelEmpRecords/:EmployeeId", (req, res) => {

  const EID = req.params.EmployeeId;

  // Begin a transaction to ensure atomicity
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error beginning transaction');
      return;
    }

    // Delete DeleteempRecord from empdelrecords table
    const deleteEmpRecordSql = `DELETE FROM empdelrecords WHERE EID = ?`;

    db.query(deleteEmpRecordSql, [EID], (err, lockupResult) => {
      if (err) {
        return db.rollback(() => {
          console.error(err);
          res.status(500).send('Error deleting lockup records');
        });
      }
      // Commit the transaction
      db.commit((err) => {
        if (err) {
          return db.rollback(() => {
            console.error(err);
            res.status(500).send('Error committing transaction');
          });
        }
        res.status(200).send('Deleted records delete successfully');
      });
    });
  });
});



// RestoredeleteEmployee
app.delete("/api/RestoredeleteEmployee/:EmployeeId", (req, res) => {
  const employeeId = req.params.EmployeeId;
  const {
    fullName,
    fName,
    cnic,
    address,
    city,
    status,
    dob,
    phone,
    dutylocation,
    joiningdata,
  } = req.body;

  // Begin a transaction to ensure atomicity
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error beginning transaction');
      return;
    }
    // 1. Delete Records from empdelrecords table
    const deleteEmployeeStatusSql = `DELETE FROM empdelrecords WHERE EID = ?`;
    db.query(deleteEmployeeStatusSql, [employeeId], (err, EmpResult) => {
      if (err) {
        return db.rollback(() => {
          console.error(err);
          res.status(500).send('Error deleting EmployeeStatus records');
        });
      }
      // Commit the transaction
      db.commit((err) => {
        if (err) {
          return db.rollback(() => {
            console.error(err);
            res.status(500).send('Error committing transaction');
          });
        }

        const sql = `INSERT INTO employee (EID, FullName, F_Name, CNIC, Phone, City, Address,Status, DOB)
           VALUES (NULL,'${fullName}', '${fName}','${cnic}', '${phone}','${city}','${address}','${status}','${dob}' )`;

        db.query(sql, (err, result) => {
          if (err) throw err;

          const EID = result.insertId;
          console.log("Employee new Record id is : ", EID)

          const sqlEmp = `INSERT INTO empstatus (SID, DutyLocation, JoiningDate, EID) 
            VALUES ('${EID}', '${dutylocation}', '${joiningdata}', '${EID}');`;
          db.query(sqlEmp, (err, result) => {
            if (err) throw err;
            console.log("Employee Data Added Successfully");
          })
        });
      });
    });
  });
});

// Email Sending to Employee
app.post('/api/send-email', (req, res) => {
  const { email, subject, message } = req.body;
  console.log('Received data:', { email, subject, message });
  console.log(email)
  res.status(200).json({ success: true });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'Hassanjabbar2017@gmail.com',
      pass: 'poljeaszpdjiywtk'
    }
  })

  const mailOption = {
    from: 'Hassanjabbar2017@gmail.com',
    to: `${email}`,
    subject: `${subject}`,
    text: `${message}`,
  }

  try {
    const result = transporter.sendMail(mailOption);
    console.log("Message has been sent");
  }
  catch (err) { console.log("error is: ", err) }
});

//  ...............Login.........RegistrationFrom
// Post data into loginScreen table
app.post('/api/RegistrationFrom', (req, res) => {
  const { CNIC, PassText, selectedRole } = req.body;
  const sql = `INSERT INTO loginscreen (LID, CNIC, Password, Role) VALUES (NULL, '${CNIC}', '${PassText}','${selectedRole}') `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Data added to loginScreen Table");
  })
});

// Get Data from loginScreen table
app.get('/api/LoginScreenForm', (req, res) => {
  const login = 'SELECT * FROM `loginscreen`';
  db.query(login, (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Error fetching data" });
    } else {

      console.log("Data fetch from loginscreen Table");
      res.status(200).json(result);
    }
  });
});

// ............Forget Form...............
// Get Data from loginscreen table
app.get('/api/ForgetForm', (req, res) => {
  const login = 'SELECT * FROM `loginscreen`';
  db.query(login, (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Error fetching data" });
    } else {
      console.log("Data fetch from loginscreen Table");
      res.status(200).json(result);
    }
  });
});

// update Data <Forget Form>
app.put('/api/updatePassword', (req, res) => {
  const { encryptedCNIC, encryptedPassword } = req.body;
  console.log("CNIC: ", encryptedCNIC);
  console.log("Password : ", encryptedPassword);
  const query = `UPDATE loginscreen SET Password = ? WHERE CNIC = ?`;
  db.query(query, [encryptedPassword, encryptedCNIC], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error updating password');
    } else {
      res.send('Password updated successfully');
    }
  });
});

// Delete Account from Loginscreen Table 
app.delete("/api/DeleteLoginScreenForm/:lid", (req, res) => {
  const lid = req.params.lid;

  // Begin a transaction to ensure atomicity
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error beginning transaction');
      return;
    }
    // 1. Delete Records from empdelrecords table
    const deleteLoginscreenAccountSql = `DELETE FROM loginscreen WHERE LID=?`;
    db.query(deleteLoginscreenAccountSql, [lid], (err, EmpResult) => {
      if (err) {
        return db.rollback(() => {
          console.error(err);
          res.status(500).send('Error deleting Loginscreen Tableaccount records');
        });
      }
      // Commit the transaction
      db.commit((err) => {
        if (err) {
          return db.rollback(() => {
            console.error(err);
            res.status(500).send('Error committing transaction');
          });
        }
      });
    });
  });
});

// Listen by 5000 port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});