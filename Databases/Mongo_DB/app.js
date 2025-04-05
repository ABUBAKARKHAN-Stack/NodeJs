import express, { json, urlencoded } from 'express'
import 'dotenv/config'
import { connectDb } from './config/connectDb.js';

const app = express();

app.use(urlencoded({
    extended: true
}))
app.use(json({
    limit: "64kb",
}))

//* Importing Routes
import crudRoutes from './routes/curd.routes.js';
app.use('/crud', crudRoutes); //? Base URL for all routes


const PORT = process.env.PORT || 3001

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`App is listening on PORT ${PORT}`);
    })
})