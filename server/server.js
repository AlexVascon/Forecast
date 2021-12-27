import 'dotenv/config'
import path from 'path'
import express from 'express'
const server = express()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import weatherRoutes from './routes.js'

server.set('trust proxy', 1)

server.use(cors({origin: process.env.CLIENT_URL}))
server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(cookieParser())

server.use('/', weatherRoutes)

const PORT = process.env.PORT || 5005

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})