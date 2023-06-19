import { body } from 'express-validator';

export const registerValidation = [
   body('fio','Введите фио').isLength({ min: 3 }),
   body('email','Введите почту').isEmail(),
   body('telephone','Введите ').isString(),
   body('organization','Выберите форму организации').optional().isBoolean(),
   body('region','Укажите страну').optional().isArray(),
   body('business_line','').optional().isArray(),
   body('access_to_open','Выберите доступ').optional().isBoolean(),
   body('isAdmin','').isBoolean(),
   body('balance','').optional().isNumeric()
]

export const loginValidation = [
   body('login','Введите логин').isLength({ min: 3 }),
   body('password','Введите пароль').isLength({ min: 6 })
]
