// server.js
import express from 'express';
import bodyParser from 'body-parser';
import registrationForm from './routes/loginForm/loginForm.js';
import studentForm from './routes/StudentForm.js';
import db from './dbconnection.js';
import adminForm from './routes/adminForm.js';
import varifiedForm from './routes/VarifiedForm.js';
import path from 'path';


const app = express();
// middleware
app.use('/api/registrationForm', registrationForm);
app.use(bodyParser.json());
app.use('/api/studentForm', studentForm);
app.use('/public', express.static(path.join('public')));
app.use('/api/adminForm', adminForm);
app.use('/api/VarifiedData', varifiedForm);

app.get('/', (request, response) => {
    response.send("Server is running....");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
