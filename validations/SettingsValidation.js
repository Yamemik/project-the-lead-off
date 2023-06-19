import { body } from 'express-validator';


export const createRegionValidation = [
    body('country','Введите страну').isLength({ min: 3 }),
    body('city','Введите город').isLength({ min: 3 }),
    body('index','Введите индекс').isNumeric().isLength({ min: 1 })
 ]
 
 export const createGroupValidation = [
    body('parent','Введите родителя').isLength({ min: 3 }),
    body('name','Введите название').isLength({ min: 3 })
 ]

 export const createValidationName = [
    body('name','Введите название').isLength({ min: 1 }),
    body('index','Введите индекс').isNumeric()
 ]

 export const updateIndexValidation = [
   body('name','Введите название').optional().isString(),
   body('index','Введите индекс').optional().isNumeric()
 ]
