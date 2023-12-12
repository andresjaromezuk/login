import express, { json, urlencoded } from 'express'
import methodOverride from 'method-override' 
import {apiRouter} from './router/api/apiRouter.js'
import {webRouter} from './router/web/webRouter.js'
import {engine} from 'express-handlebars'
import { sessions } from './middleware/sessions.js'

import path from 'path'
import __dirname from './util.js'
import mongoose from 'mongoose'


//MongoDB
import {MONGODB_CNX_STR} from './config/mongodb.config.js'
const db = await mongoose.connect(MONGODB_CNX_STR)
console.log("Se conectó correctamente a la DB")

//Express
import {PORT} from './config/server.config.js'
const app = express()


//Middlewares 
app.use('/static', express.static(path.join(__dirname, '../static')))

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(methodOverride('_method'))

app.use(sessions)

app.engine('handlebars', engine())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

const server = app.listen(PORT, ()=>{console.log(`Servidor escuchando en puerto ${PORT}`)})

//Rutas
app.use('/api', apiRouter)
app.use('/', webRouter)
