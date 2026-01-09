import express from 'express' 
import { configDotenv } from 'dotenv'
import { connectDB } from './connectDB.js'
import todoRoutes from './routes/todoRoutes.js'
import cors from 'cors'

const app = express()
configDotenv()
app.use(cors({
  origin: '*'
}))
app.use(express.json())
app.use('/api', todoRoutes)

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`${process.env.BACKEND_URL}:${process.env.PORT}`)
  })
})
.catch(() => console.log('Connection failded cant listen on server'))
