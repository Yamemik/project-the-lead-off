import { body } from 'express-validator';

export const registerValidation = [
   body('fio','Введите фио').isString(),
   body('email','Введите почту').isEmail(),
   body('telephone','Введите ').isString(),
   body('organization','Выберите форму организации').isString(),
   body('region','Укажите страну').optional().isArray(),
   body('business_line','').optional().isArray(),
   body('access_to_open','Выберите доступ').optional().isBoolean(),
   body('is_admin','').optional().isBoolean(),
   body('balance','').optional().isNumeric()
]

export const loginValidation = [
   body('login','Введите логин').isLength({ min: 3 }),
   body('password','Введите пароль').isLength({ min: 6 })
]

export const resentPassValidation = [
   body('email','Введите email').isEmail()
]

export const updateValidation = [
   body('fio','Введите фио').optional().isLength({ min: 3 }),
   body('email','Введите почту').optional().isEmail(),
   body('telephone','Введите ').optional().isString(),
   body('organization','Выберите форму организации').optional().isString(),
   body('region','Укажите страну').optional().isArray(),
   body('business_line','').optional().isArray(),
   body('access_to_open','Выберите доступ').optional().isBoolean(),
   body('is_admin','').optional().isBoolean(),
   body('balance','').optional().isNumeric()
]