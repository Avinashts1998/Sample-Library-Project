import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import {router} from './routes/router'


dotenv.config()
const app = express()

mongoose.connect(process.env.MONGO_URL as string,
()=>{
    console.log("DB Connected")
})



app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/', router)

app.listen(process.env.PORT, ()=>{
    console.log(`Server connected on ${process.env.PORT}`)
})
