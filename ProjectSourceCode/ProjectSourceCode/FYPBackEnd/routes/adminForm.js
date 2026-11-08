import express from 'express';
import nodemailer from 'nodemailer';
const router = express.Router();


import db from '../dbconnection.js';
// http://localhost:3000/blog/
router.get('/', (req, res) => {
    // Fetch data from students table
    const fetchStudentsQuery = `SELECT * FROM students`;
    db.query(fetchStudentsQuery, (error, studentResults) => {
        if (error) {
            console.error("Error fetching data from students table:", error);
            res.status(500).send('Error fetching data from students table.');
            return;
        }
        // Send combined data as response
        res.json(studentResults);
    });
});

router.post('/verifiedData', (req, res) => {
    const { Student_ID } = req.body;
    const { email } = req.body;
    const {full_name} = req.body;
    const {address} = req.body;

    console.log("Varified Data form Student ID ", Student_ID)
    console.log(" Email ",email);
    console.log("  name ",full_name);
    console.log("address",address);

    db.beginTransaction((err) => {
        if (err) {
            return res.status(500).send('Transaction Error: ' + err);
        }

        const insertQueryVarified = `
                    INSERT INTO varifieddata (Student_ID, full_name, father_name, email, date_of_birth, cnic, domicile, gender, province, city, phone, address, program_of_study, apply_for, batch, semester, cms_id, registration_no, matric_certificate, registration_card, clearance_certificate, cnic_photostate, photograph, custom_document)
                    SELECT Student_ID, full_name, father_name, email, date_of_birth, cnic, domicile, gender, province, city, phone, address, program_of_study, apply_for, batch, semester, cms_id, registration_no, matric_certificate, registration_card, clearance_certificate, cnic_photostate, photograph, custom_document
                    FROM students
                    WHERE Student_ID = ?`;

        db.query(insertQueryVarified, [Student_ID], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    res.status(500).send('Insert Query Error in "Varified Data" : ' + err);
                });
            }

            const deleteQuery = 'DELETE FROM students WHERE Student_ID = ?';

            db.query(deleteQuery, [Student_ID], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(500).send('Delete Query Error in "Varified Data" : ' + err);
                    });
                }

                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).send('Transaction Commit Error in "Varified Data" : ' + err);
                        });
                    }
                    res.send('Data verified and moved successfully');
                });
            });
        });
    });


// call EmailSend function to send email to TCS and Students
EmailSend(email, full_name);
EmailToTCS(address);

});

 // send email Student
const EmailSend = async (Emailing, full_name) => {

    const confirmationLink = "http://localhost:5173/ConfirmationForm";

    const subject = `Your Educational Document has been verified and sent`;
    const html = `
      <p>Dear ${full_name},</p>
      <p>It has been informed to you from <strong>Baluchistan University of Information Technology, Engineering and Management Sciences</strong> that your Educational Document has been given to TCS and you will be collecting it in <strong>three to seven days</strong>.</p>
      <p>Please, when you collect your document, click on the following link to fill out the form and give confirmation to us. <strong>Thank you</strong>.</p>
      <p><a href="${confirmationLink}">Click here to confirm receipt</a></p>
    `;


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Hassanjabbar2017@gmail.com',
            pass: 'poljeaszpdjiywtk'
        }
    });
    const mailOptions = {
        from: 'Hassanjabbar2017@gmail.com',
        to: `${Emailing}`,
        subject: subject,
        html: html,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);

    }

}

// Email to TCS to collect the educational Document and dispatch

const EmailToTCS = async(address)=>{

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Hassanjabbar2017@gmail.com',
            pass: 'poljeaszpdjiywtk'
        }
    });
    const mailOptions = {
        from: 'Hassanjabbar2017@gmail.com',
        to: `s143rosh@gmail.com`,
        subject: `Your Educational Document has been varified and sent`,
        html: `<p>Dear TCS!</p> 
        <p>It has been informed you to collect Educational Document from <strong>Baluchistan University of Information Technolog, Engineering and Management Sciences </strog> to give to the following Address. </p>
        <p><strong> Address: ${address} </strong> </p>.<strong>Thank you</strong>`, 
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);

    }

}

// Fetch all student Table data and send to admin (VerifyingData.jsx)
router.get('/StudentData', (req, res) => {
    const VerifiedValue = "SELECT * FROM `students`";
    db.query(VerifiedValue, (err, result) => {
        if (err) {
            console.error("Error fetching data:", err);
            res.status(500).json({ error: "Error fetching data" });
        } else {

            console.log("Data fetch from student Table");
            res.status(200).json(result);
        }
    });
})

// updata in student table and then store in editable table 
router.put('/updateData', (req, res) => {
    const editedData = req.body;
    console.log("Edited Data ", editedData);

    const {
        Student_ID,
        full_name,
        father_name,
        email,
        date_of_birth,
        cnic,
        domicile,
        gender,
        province,
        city,
        phone,
        address,
        program_of_study,
        apply_for,
        batch,
        semester,
        cms_id,
        registration_no
    } = editedData;

    const updatedDataQuery = `
        UPDATE students 
        SET 
            full_name = ?, 
            father_name = ?, 
            email = ?, 
            date_of_birth = ?, 
            cnic = ?, 
            domicile = ?, 
            gender = ?, 
            province = ?, 
            city = ?, 
            phone = ?, 
            address = ?, 
            program_of_study = ?, 
            apply_for = ?, 
            batch = ?, 
            semester = ?, 
            cms_id = ?,
            registration_no = ?
        WHERE Student_ID = ?;
    `;

    db.query(
        updatedDataQuery,
        [
            full_name,
            father_name,
            email,
            date_of_birth,
            cnic,
            domicile,
            gender,
            province,
            city,
            phone,
            address,
            program_of_study,
            apply_for,
            batch,
            semester,
            cms_id,
            registration_no,
            Student_ID
        ],
        (err, result) => {
            if (err) {
                console.error('Error updating data: ', err);
                return res.status(500).send('Error updating data');
            } else {
                const editableQuery = `
                    INSERT INTO editableusers 
                    (Student_ID, full_name, father_name, email, date_of_birth, cnic, domicile, gender, province, city, phone, address, program_of_study, apply_for, batch, semester, cms_id, registration_no) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                db.query(
                    editableQuery,
                    [
                        Student_ID,
                        full_name,
                        father_name,
                        email,
                        date_of_birth,
                        cnic,
                        domicile,
                        gender,
                        province,
                        city,
                        phone,
                        address,
                        program_of_study,
                        apply_for,
                        batch,
                        semester,
                        cms_id,
                        registration_no
                    ],
                    (err, result) => {
                        if (err) {
                            console.error('Error adding to editable table: ', err);
                            return res.status(500).send('Error adding to editable table');
                        } else {
                            res.send('Data updated successfully in students table and added to editable table');
                        }
                    }
                );
            }
        }
    );
});

// Fetch Data from editableusers Table
router.get('/EditedDataForm', (req, res) => {
    const EditedDataQuery = `SELECT * FROM editableusers`;
    db.query(EditedDataQuery, (err, result) => {
        if (err) {
            console.error('Error fetching from editableusers table: ', err);
            return res.status(500).send('Error fetching editableusers table');
        } else {
            console.log('Data fetched successfully from editableusers table');
            res.json(result);
        }
    });
    console.log("Data taken from Editableusers table");
});

// Delete data from editableusers
//   Delete data in loginScreen Table
router.delete('/DeletedDataForm', (req, res) => {
    const { SID } = req.body;
    console.log("Student_ID ", SID);

    db.beginTransaction((err) => {
        if (err) {
            return res.status(500).send('Transaction Error: ' + err);
        }

        const DeleteEditedQuery = 'DELETE FROM `editableusers` WHERE Student_ID = ?';
        db.query(DeleteEditedQuery, [SID], (err, results) => {
            if (err) {
                return db.rollback(() => {
                    res.status(500).send('Query Error: ' + err);
                });
            }

            db.commit((err) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(500).send('Transaction Commit Error: ' + err);
                    });
                }
                res.send('Data deleted from editableusers table successfully');
            });
        });
    });
});


router.post('/ConfirmationReceivedDocument', (req, res) => {
    const { FullName, CMS, CNIC, Received } = req.body; // Destructure fields from request body

    console.log("FullName:", FullName);
    console.log("CMS:", CMS);
    console.log("CNIC:", CNIC);
    console.log("Received:", Received);

    const insertQuery = 'INSERT INTO confirmationstudents (CID, Name, CMS, CNIC, Received) VALUES (NULL, ?, ?, ?, ?)';

    db.query(insertQuery, [FullName, CMS, CNIC, Received], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error submitting Confirmation form');
        } else {
            res.send('Data added successfully to confirmationstudents table');
        }
    });
});

// Get Data from ConfirmationStudent table
router.get('/getConfirmationReceivedDocument', (req, res)=>{
    const GetRecivedData = 'SELECT * FROM `confirmationstudents`';
    db.query(GetRecivedData, (err, result) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Error fetching data" });
      } else {
  
        console.log("Data fetch from confirmationStudents Table");
        res.status(200).json(result);
      }
    });
  
})


export default router;