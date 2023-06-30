import jwt from 'jsonwebtoken';

import UserModel from '../models/User.js';


export default async (req, res, next) => {
   const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

   if (token) {
      try {
         const decoded = jwt.verify(token, 'leads_user');

         req.userId = decoded._id;

         const user = await UserModel.findById(decoded._id).catch((err) => {
            return res.status(404).json({
               message: 'user not found'
            })
         });

         if (!user.is_admin) {
            return res.status(403).json({
               message: "no access (is not admin)"
            });
         }

         next();
      } catch (e) {
         return res.status(403).json({
            message: "no access2"
         });
      }
   } else {
      return res.status(403).json({
         message: "no access3"
      });
   }
}