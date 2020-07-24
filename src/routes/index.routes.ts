import {
   Router,
   Request,
   Response,
} from 'express';
import passport from 'passport';
import { users } from '../database';
import { isAuthenticated, isNotAuthenticated } from '../passport/isAuth';

const router: Router = Router();

router.get('/', (_req: Request, res: Response): void => {
   res.render('pages/', { title: 'Home' });
});


router.get('/signup', isNotAuthenticated, (req: Request, res: Response): void => {
   res.render('pages/signup', { title: 'Signup' });
});

router.post('/signup', passport.authenticate('signup', {
   successRedirect: '/users',
   failureRedirect: '/signup',
   failureFlash: true
}));

router.get('/login', isNotAuthenticated, (_, res) => {
   res.render('pages/login', { title: 'Login' });
});

router.post('/login', isNotAuthenticated, passport.authenticate('login', {
   failureRedirect: '/login',
   successRedirect: '/users',
   failureFlash: true,
}));



router.get('/users', isAuthenticated, (_, res) => {
   res.json(users);
});

router.get('/logout', isAuthenticated, (req, res, next) => {
   req.logout();
   res.redirect('/')
})

export default router;
