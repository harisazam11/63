import express from 'express';
const router = express.Router()
import db from '../dbconnection.js';

router.get('/VarifiedStudent', (req, res) => {
    // Fetch data from VarifiedData table
    const VarifiedStudentsQuery = `SELECT * FROM varifieddata`;
    db.query(VarifiedStudentsQuery, (error, studentResults) => {
        if (error) {
            console.error("Error fetching data from students table:", error);
            res.status(500).send('Error fetching data from students table.');
            return;
        }
                // Send combined data as response
                res.json(studentResults);
            });
        });

        router.put('/VarifiedStudent', (req, res) => {
            const { stdID } = req.body;
        
            const VarifiedStudentsQuery = `DELETE FROM varifieddata WHERE Student_ID = ?`;
            db.query(VarifiedStudentsQuery, [stdID], (error, studentResults) => {
                if (error) {
                    console.error("Error in deleting data from verified table:", error);
                    res.status(500).send('Error deleting data from verified table.');
                    return;
                }
        
                console.log(`Deleted student with ID ${stdID}`);
                res.sendStatus(200); // Send success response
            });
        });
   
export default router;