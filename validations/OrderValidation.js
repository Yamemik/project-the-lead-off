import { body } from 'express-validator';

export const createOrderValidation = [
    body('nomeclature','').optional().isArray(),
    body('region','').optional().isArray(),
    body('text','is string size>1').optional().isString(),
    body('upload','is array').optional().isArray(),
    body('email','Укажите почту').optional().isEmail(),
    body('telephone','Укажите номера').optional().isArray(),
    body('fio','Укажите ФИО').optional().isString(),
    body('score','').optional().isString(),
    body('type_buyer','').optional().isString(),
    body('type_order','').optional().isString(),
    body('is_urgent','').optional().isString(),
    body('is_open','').optional().isBoolean(),
    body('price','').optional().isNumeric()
 ]

 export const updateOrderValidation = [
   body('nomeclature').optional().isArray(),
   body('region').optional().isArray(),
   body('text').optional().isString(),
   body('upload').optional().isArray(),
   body('email').optional().isEmail(),
   body('telephone').optional().isArray(),
   body('fio').optional().isString(),
   body('score').optional().isString(),
   body('type_buyer').optional().isString(),
   body('type_order').optional().isString(),
   body('is_urgent').optional().isString(),
   body('is_open').optional().isString(),
   body('price').optional().isNumeric()
]

 export const findDublicateOrderValidation = [
    body('email','Укажите почту').optional().isEmail(),
    body('telephone','Укажите номера').optional().isArray()
 ]