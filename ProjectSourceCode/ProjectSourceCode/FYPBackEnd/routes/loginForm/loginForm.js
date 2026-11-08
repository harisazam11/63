// routes/RegistrationForm.js
// routes/RegistrationForm.js
import express from 'express';
import db from '../../dbconnection.js'; // Import db as default
import nodemailer from 'nodemailer';
const router = express.Router();

//  store password and send email to user
router.post('/', async (req, res) => {
    console.log("Data inserting....")
    const {CMSmu} = req.body;
    console.log("CMSmu..........", CMSmu); 

    const {  CMS, passgenerate, Email, encryptPass, encryptCMS   } = req.body;
    const confirmationLink = "http://localhost:5173/ForgetForm";


    console.log("CMS", CMS);
    const student  = "Student";
    console.log("Passgenerate", passgenerate);
    console.log("Email", Email);
    console.log("encrytped pass " , encryptPass);
    console.log("ecnrypt CMS", encryptCMS);



    const sql = `INSERT INTO loginscreen (LID, CMS, Password, Role) VALUES (NULL, ?, ?, ?)`;
    db.query(sql, [encryptCMS, encryptPass, student], async (err, result) => {   
        // store in DB the encrypted password and email passgenerate to user
        if (err) {
            console.error("Error inserting data:", err);
            res.status(500).json({ error: "An error occurred while registering." });
            return;
        } else {
            console.log("Data added to loginScreen Table");
            // Send email after registration....
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'Hassanjabbar2017@gmail.com',
                    pass: 'poljeaszpdjiywtk'
                }
            });
            const mailOptions = {
                from: 'Hassanjabbar2017@gmail.com',
                to: `${Email}`,
                subject: `Your BUITEMS Account has been created`,
                html: `<p>Your BUITEMS Account password is <strong>${passgenerate}</strong> and CMS is <strong> ${CMS}</strong></p>
                <p>If you want to update or change your password then click on the following link</p> <strong>Thank You!</strong>
                <p><p><a href="${confirmationLink}">Click here to confirm receipt</a></p>`,
            };
            try {
                await transporter.sendMail(mailOptions);
                console.log("Email sent successfully");
                res.status(200).json({ message: "Registration successful." });
            } catch (error) {
                console.error("Error sending email:", error);
                res.status(500).json({ error: "An error occurred while sending email." });
            }
        }
    });
});

// Create account in loginScreen table through admin registration
router.post('/RegisterAdmin', (req, res) => {
    const { CMS, PassText, selectedRole, userEmail, EmailCMS, Emailpassword } = req.body;
  
    const RegisterQuery = `INSERT INTO loginscreen (LID, CMS, Password, Role) VALUES (NULL, ?, ?, ?)`;
  
    db.query(RegisterQuery, [CMS, PassText, selectedRole], (err, result) => {
      if (err) {
        console.error("Error in Registration of Account:", err);
        return res.status(500).send("Error in Registration of Account");
      }
  
      console.log("Data added to loginScreen Table");
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'Hassanjabbar2017@gmail.com',
          pass: 'poljeaszpdjiywtk'
        }
      });
  
      const mailOptions = {
        from: 'Hassanjabbar2017@gmail.com',
        to: userEmail,
        subject: 'Your BUITEMS Account has been created',
        html: `<p>Your BUITEMS Account has been created.<br><b>Password:</b> <strong>${Emailpassword}</strong><br><b>CMS:</b> <strong>${EmailCMS}</strong></p>`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ error: "An error occurred while sending email." });
        }
        console.log("Email sent successfully:", info.response);
        res.status(200).json({ message: "Registration successful." });
      });
    });
  });

// Get Data from loginScreen table
router.get('/LoginScreenForm', (req, res) => {
    const login = 'SELECT * FROM loginscreen';
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

//   Delete data in loginScreen Table
router.delete('/DeleteUserAccount', (req, res) => {
    const { LID } = req.body; 
    console.log("LID", LID);
  
    db.beginTransaction((err) => {
      if (err) {
        return res.status(500).send('Transaction Error: ' + err);
      }
  
      const userAccountQuery = 'DELETE FROM `loginscreen` WHERE LID = ?';
      db.query(userAccountQuery, [LID], (err, results) => {
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
          res.send('User account deleted successfully');
        });
      });
    });
  });
  



// Update password (forget password)
router.put('/updatePassword', (req, res) => {   //EmailCMS, EmailPassword,
    const {encryptedCMS, encryptedPassword,  Emailing, UserCMS_email, UserPassword_email} = req.body;
    console.log("CMS: ", encryptedCMS);
    console.log("Password : ", encryptedPassword);
    console.log("email CMS", UserCMS_email);
    console.log("Email Password", UserPassword_email);
    const query = `UPDATE loginscreen SET Password = ? WHERE CMS = ?`;    
    db.query(query, [encryptedPassword, encryptedCMS], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error updating password');
      } else {
        res.send('Password updated successfully');
 EmailSending( Emailing, UserCMS_email, UserPassword_email); //EmailCMS, EmailPassword,
        
      }
    });

    const EmailSending = async (Emailing, UserCMS_email, UserPassword_email) => {
      // Send email after Update password....
      console.log("After Emailing.....", Emailing);
      console.log("UserCms", UserCMS_email);
      console.log("userPassword", UserPassword_email);
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
          subject: `Your BUITEMS Account has been updated`,
          text: `Your BUITEMS Account updated \n CMS: ${UserCMS_email} \n password: ${UserPassword_email}`, //${EmailPassword} and CMS is: ${EmailCMS}
      };
      try {
          await transporter.sendMail(mailOptions);
          console.log("Email sent successfully");          
      } catch (error) {
          console.error("Error sending email:", error);
          
      }
  } 

  });
  
export default router;
