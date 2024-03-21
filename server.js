
import express from 'express';
import router from './router.js/books.js';
import connect from './connect/database.js';
const app = express();
const port = 3000;
app.use(express.json());
app.use('/',router)
app.listen(port,async ()=>{
    await connect();
    console.log(`Endpoint: http://localhost:${port}`);
})