import passport from 'passport';
import { Strategy } from 'passport-local';
import { users, IUser } from '../database';
import { hash, compare } from 'bcryptjs';


/* SIGNUP */
passport.use('signup', new Strategy({
   usernameField: 'email',
   passwordField: 'password',
   passReqToCallback: false, // Para poder pasarle un req por parámetro al callback
}, async (email, password, done) => {
   const userAlreadyExists = users.find(u => u.email === email);
   if(userAlreadyExists){
      done(null, false, { message: "User already exists" })
      return;
   }

   const encryptedPassword = await hash(password, 10)
   const newUser: IUser = { email, password: encryptedPassword }
   users.push(newUser)

   done(null, newUser)
}));

/* LOGIN */
passport.use('login', new Strategy({
   usernameField: 'email',
   passwordField: 'password',
   passReqToCallback: false,
}, async (email, password, done) => {
   const user = users.find((u) => u.email === email);
   if (!user) {
      done(null, false, { message: "User Not Found" });
      return;
   }

   const isEqual: boolean = await compare(password, user.password);
   if (!isEqual) {
      done(null, false, { message: "Password incorrect" });
      return;
   }

   done(null, user);
}))


/* Serial */

passport.serializeUser((user: IUser, done) => {
   done(null, user.email)
})

passport.deserializeUser((email, done) => {
   const user = users.find(u => u.email === email);
   if(!user) {
      done(null, false)
      return;
   }
   done(null, user)
})






