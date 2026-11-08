import express from 'express';
import db from '../dbconnection.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Route for simple welcome message
router.get('/', (req, res) => {
  res.send('Hello welcome To student Form...!');
});

// Route for about message
router.get('/about', (req, res) => {
  res.send('Got a request (Hello About Blog...)');
}).get('/user/:parameter', (req, res) => {
  res.send(`'Got a get request at /user' ${req.params.parameter}`);
});

// Route for storing data
router.post('/storedata', (req, res) => {
  const { stdData } = req.body;
  console.log('Student Data:', stdData);
  
  const insertStudentQuery = `INSERT INTO students 
  (full_name, father_name, email, date_of_birth, cnic, domicile, gender, province, city, phone, address,
  program_of_study, apply_for, batch, semester, cms_id, registration_no,
  matric_certificate, registration_card, clearance_certificate, cnic_photostate, photograph, custom_document
  ) VALUES 
  ('${stdData.FullName}', '${stdData.FatherName}', '${stdData.EmailAddress}', 
  '${stdData.DateOfBirth}', '${stdData.CNIC}', '${stdData.LocalDomicile}',
  '${stdData.gender}', '${stdData.Province}', '${stdData.City}', '${stdData.MobileNumber}', 
  '${stdData.Address}', 
  '${stdData.studyProgram}', '${stdData.ApplyProgram}','${stdData.Batch}', '${stdData.Semester}', '${stdData.CMSID}', '${stdData.RegistrationNumber}',
  '${stdData.MatricCertificate}', '${stdData.RegistrationCard}', '${stdData.ClearanceCertificate}', '${stdData.CNICPhotostate}', '${stdData.Photograph}', 
  '${stdData.CustomDocument}'
  )`;

  db.query(insertStudentQuery, (error, result) => {
    if (error) {
      console.error('Error inserting data into students table:', error);
      res.status(500).send('Error inserting data into students table.');
      return;
    }
    console.log('Data added into students table');
    res.status(200).send('Data added successfully');
  });
});

//file upload through using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/'); // Adjust the destination directory as needed
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
      // Define your file filter logic if needed
      // For example, accept only specific file types
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
          cb(null, true);
      } else {
          cb(new Error('Unsupported file type'), false);
      }
  }
});
  
  // Route to handle file upload
  router.post('/upload', upload.any(), (req, res) => {
    const CNIC = req.body.CNIC;
    console.log("CNIC outer ", CNIC);
    
    res.status(200).send('File uploaded successfully');
  });


router.put('/about', (req, res) => {
  console.log('working ....');
  res.send('Got a put request (Hello About put...)');
});

export default router;
