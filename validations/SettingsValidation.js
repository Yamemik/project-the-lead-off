import { body } from 'express-validator';


export const createRegionValidation = [
    body('country','Введите страну').optional().isString(),
    body('city','Введите город').optional().isString(),
    body('index','Введите индекс').optional().isNumeric()
 ]
 
 export const createGroupValidation = [
   body('parent','Введите родителя').optional().isString(),
   body('name','Введите название').optional().isString()
]
export const createCategoryValidation = [
   body('basePrice','Введите родителя').optional().isNumeric(),
   body('name','Введите название').optional().isString()
]

 export const createValidationIndexes = [
   body('score','Введите название').optional().isArray(),
   body('type_buyer','Введите название').optional().isArray(),
   body('type_order','Введите название').optional().isArray(),
   body('is_urgent','Введите название').optional().isArray(),
   body('is_express','Введите название').optional().isArray(),
   body('count_region','Введите название').optional().isArray(),
   body('is_open','Введите название').optional().isArray(),
   body('is_sale','Введите индекс').optional().isArray()
 ]

