import { body } from 'express-validator';

export const createOrderValidation = [
    body('category1','').isString().isLength({ min: 3 }),
    body('category2','').isString().isLength({ min: 3 }),
    body('category3','').isString().isLength({ min: 3 }),
    body('region','').isLength({ min: 3 }),
    body('text','Выберите форму организации').optional().isString(),
    body('upload','Неверный путь').optional().isString(),
    body('email','Укажите почту').isEmail(),
    body('telephone','Укажите номера').isArray(),
    body('fio','Укажите ФИО').isString().isLength({ min: 3 }),
    body('score','').isString().isLength({ min: 3 }),
    body('typeOfBuyer','').isString().isLength({ min: 3 }),
    body('isTender','').isString().isLength({ min: 3 }),
    body('isImmediate','').isString().isLength({ min: 3 }),
    body('isOpen','').isBoolean(),
    body('price','').optional().isNumeric()
 ]

 export const findDublicateOrderValidation = [
    body('email','Укажите почту').isEmail(),
    body('telephone','Укажите номера').isArray()
 ]