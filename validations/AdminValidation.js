import { body } from 'express-validator';

export const registerValidation = [
   body('fio','Введите фио').isLength({ min: 3 }),
   body('email','Введите почту').isEmail(),
   body('telephone','Введите номер телефона').isLength({ min: 3 }),
   body('organization','Выберите форму организации').isLength({ min: 3 }),
   body('country','Укажите страну').isLength({ min: 3 }),
   body('city','Укажите город').isLength({ min: 3 }),
   body('business_line','Выберите направления бизнеса').isLength({ min: 3 }),
   body('access_to_open','Выберите доступ').isLength({ min: 3 }),
   body('balance','').isNumeric()
]
export const loginValidation = [
   body('login','Введите логин').isLength({ min: 3 }),
   body('password','Введите пароль').isLength({ min: 6 })
]

