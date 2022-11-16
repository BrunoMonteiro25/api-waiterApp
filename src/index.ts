import path from 'node:path'
import express from 'express'
import mongoose from 'mongoose'
import { router } from './router'

mongoose.connect('mongodb://127.0.0.1:27017/waiterApp')
  .then(() => {
    const app = express()
    const port = 3001

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
    app.use(express.json())
    app.use(router)

    app.listen(3001, () => {
      console.log(`Server rodando em http://localhost:${port}`)
    })
  })
  .catch(() => console.log('erro ao conectar no mongodb'))

