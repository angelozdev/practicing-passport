import express, { Application } from 'express';

// Middlewares
import passport from 'passport';
import morgan from 'morgan';
import expressSession from 'express-session';
import flash from 'connect-flash';

// Routes
import indexRoutes from './routes/index.routes';

import dotenv from 'dotenv';
import path from 'path';


// Initializations
const app: Application = express();
import './passport/auth';
dotenv.config()


/****************************************************************************
*                                 Middlewares
**************************************************************************/
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// 1. Express Session
app.use(expressSession({
   resave: true,
   secret: process.env.EXPRESS_SESSION_SECRET || "mysecret",
   saveUninitialized: false,
}))
// 2. Flash
app.use(flash())
// 3. Passport Initialize
app.use(passport.initialize())
// 4. Passport Session
app.use(passport.session())
// 5. Guardar los mensajes globalmente
app.use((req, res, next) => {
   res.locals.error = req.flash('error');
   res.locals.user = req.user || null
   next()
})
/****************************************************************************
*                                   Routes
**************************************************************************/
app.use('/', indexRoutes)

/****************************************************************************
*                            Serve Frontend Content
**************************************************************************/

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use("*", (req, res, next) => {
   res.send('Not Found')
})


// Export Server
export default app;