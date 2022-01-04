import 'dotenv/config'
import path from 'path'
import express from 'express'
import cors from 'cors'
const server = express()
import cookieParser from 'cookie-parser'
import weatherRoutes from './routes.js'

server.set('trust proxy', 1)

server.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
)

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(cookieParser())

server.use('/', weatherRoutes)

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, '/client/build')))

  server.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

const PORT = process.env.PORT || 5005

server.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV}, listening on port http://localhost:${PORT}`
  )
})
