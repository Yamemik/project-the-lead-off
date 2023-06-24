import { body } from 'express-validator';

export const createOrderValidation = [
    body('nomeclature','').isArray(),
    body('region','').isArray(),
    body('text','is string size>1').optional().isString(),
    body('upload','is array').optional().isArray(),
    body('email','Укажите почту').isEmail(),
    body('telephone','Укажите номера').isArray(),
    body('fio','Укажите ФИО').isString().isLength({ min: 1 }),
    body('score','').isString().isLength({ min: 1 }),
    body('typeBuyer','').isString().isLength({ min: 1 }),
    body('isTender','').isString().isLength({ min: 1 }),
    body('isImmediate','').isString().isLength({ min: 1 }),
    body('isOpen','').isBoolean(),
    body('price','').isNumeric()
 ]

 export const updateOrderValidation = [
   body('nomeclature').optional().isArray(),
   body('region').optional().isArray(),
   body('text').optional().isString(),
   body('upload').optional().isArray(),
   body('email').optional().isEmail(),
   body('telephone').optional().isArray(),
   body('fio').optional().isString().isLength({ min: 1 }),
   body('score').optional().isString().isLength({ min: 1 }),
   body('typeBuyer').optional().isString().isLength({ min: 1 }),
   body('isTender').optional().isString(),
   body('isImmediate').optional().isBoolean(),
   body('isOpen').optional().isBoolean(),
   body('price').optional().isNumeric()
]

 export const findDublicateOrderValidation = [
    body('email','Укажите почту').isEmail(),
    body('telephone','Укажите номера').isArray()
 ]