import { body } from 'express-validator';

export const registerValidation = [
   body('family','Введите фамилию').isLength({ min: 3 }),
   body('name','Введите имя').isLength({ min: 3 }),
   body('password','Короткий пароль (от 8 символов)').isLength({ min: 8 }),
]
export const loginValidation = [
   body('login','Введите логин').isLength({ min: 3 }),
   body('password','Введите пароль').isLength({ min: 6 })
]

export const lessonCreateValidation = [
   body('title','Введите заголовок статьи').isLength({ min: 3 }).isString(),
   body('text','Введите текст статьи').isLength({ min: 3 }).isString(),
   body('imageUrl','Введите текст статьи').optional().isString(),
   body('rate','Укажите тариф').isLength({ min: 3 }),
]

export const rateCreateValidation = [
   body('name','Введите название тарифа').isString().isLength({ min: 3 }),
   body('price','Укажите стоимость').isLength({ min: 3 }).isNumeric(),
   body('description','Описание строкой').optional().isString(),
   body('advantages','адвантагес').optional().isArray(),
   body('isRecommended','Рекомендации').optional().isBoolean(),
   //body('image','Описание строкой').optional().isString(),
]

export const roleCreateValidation = [
   body('name','Введите название тарифа').isString().isLength({ min: 3 }),
]

export const resentPasswordlidation = [
   body('email','Введите email').isEmail()
]
