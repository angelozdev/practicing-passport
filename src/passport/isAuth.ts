import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
   if(req.isAuthenticated()){
      next();
      return;
   }
   req.flash('error', 'Unauthorizate')
   res.redirect('/login')
}

export const isNotAuthenticated = (req: Request, res: Response, next: NextFunction) => {
   if(!req.isAuthenticated()){
      next();
      return;
   }
   res.redirect('/')
}