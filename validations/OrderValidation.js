import { body } from 'express-validator';

export const createValidation = [
    body('productGroup','Введите фио').isLength({ min: 3 }),
    nomenclature('email','Введите почту').isLength({ min: 3 }),
    body('country','Введите почту').isLength({ min: 3 }),
    body('text','Выберите форму организации').isString(),
    body('upload','Укажите страну').isLength({ min: 3 }),
    body('email','Укажите город').isLength({ min: 3 }),
    //body('telephone','Укажите город').isArray(),
    body('fio','Выберите доступ').isLength({ min: 3 }),
    body('score','').isLength({ min: 3 }),
    body('typeOfBuyer','').isLength({ min: 3 }),
    body('buy','').isLength({ min: 3 }),
    body('isImmediate','').isBoolean(),
    body('isOpen','').isLength({ min: 3 }),
    body('price','').isNumeric()
 ]