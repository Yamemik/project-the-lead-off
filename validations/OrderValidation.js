import { body } from 'express-validator';

export const createOrderValidation = [
    body('productGroup','').isString().isLength({ min: 3 }),
    body('nomenclature','').isString().isLength({ min: 3 }),
    body('region','').isLength({ min: 3 }),
    body('text','Выберите форму организации').optional().isString(),
    body('upload','Неверный путь').optional().isString(),
    body('email','Укажите почту').isEmail(),
    body('telephone','Укажите номера').isArray(),
    body('fio','Укажите ФИО').isString().isLength({ min: 3 }),
    body('score','').isLength({ min: 3 }),
    body('typeOfBuyer','').isBoolean(),
    body('isTender','').isBoolean(),
    body('isImmediate','').isBoolean(),
    body('isOpen','').isBoolean(),
    body('price','').isNumeric()
 ]

 export const findDublicateOrderValidation = [
    body('email','Укажите почту').isEmail(),
    body('telephone','Укажите номера').isArray()
 ]