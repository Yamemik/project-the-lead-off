import { body } from 'express-validator';


export const createRegionValidation = [
    body('country','Введите страну').isLength({ min: 3 }),
    body('city','Введите город').isLength({ min: 3 })
 ]
 
 export const createCaregoryValidation = [
    body('group','Введите родителя').isLength({ min: 3 }),
    body('name','Введите название').isLength({ min: 3 })
 ]

 export const createTBValidation = [
    body('name','Введите родителя').isLength({ min: 3 })
 ]



 
 export const updateIndexValidation = [
    body('index','Введите индекс').isNumeric().isLength({ min: 1 })
 ]
