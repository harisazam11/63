import express from 'express';
import cors from 'cors';
import db from './dbconnection';
import TodoList from './TodoApp/TodoList';

const app = express();

// middle ware
app.use(cors());
app.use("/api/TodoList", TodoList);

app.get('/', (request, response) => {
     response.send("this is backend ....")
})

const port = process.env.PORT || 8081

app.listen(port, () => {
    console.log(`Server is Listening ${port}` )
})