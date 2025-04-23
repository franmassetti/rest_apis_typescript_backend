import {Router} from 'express'
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from './handlers/product'
import { body, param} from 'express-validator'
import { handleInputErrors } from './middleware'

const router = Router()
/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The product ID
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The product name
 *                  example: Monitor Curvo de 49 pulgadas
 *              price:
 *                  type: number
 *                  description: The product price
 *                  example: 300
 *              availability:
 *                  type: boolean
 *                  description: The product availability
 *                  example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 * 
 */
router.get('/', getProducts) // GET (todos los productos)

/**
 * @swagger
 * /api/produts/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags: 
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID
 *                                  
 */

router.get('/:id', // GET (uno solo, por id)
    param('id').isInt().withMessage('Id no válido'),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo de 49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid input data
 */

router.post('/', 
    // Validación para enviar campos SIEMPRE COMIENZA CON AWAIT (se usa express validator).
    body('name')
        .notEmpty().withMessage('El nombre de producto no puede ir vacío'),
    body('price')
        .notEmpty().withMessage('El precio no puede ir vacío')
        .isNumeric().withMessage('Valor no válido')
        .custom(value => value > 0).withMessage('Ingrese un precio válido mayor a 0'),
 
    handleInputErrors, // Middleware
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer 
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo de 49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product Not found
 *          400:
 *              description: Bad Request - Invalid ID - Invalid Input Data
 *          
 * 
 */


router.put('/:id', // PUT

    // validacion
    param('id').isInt().withMessage('Id no válido'),
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom( value => value > 0).withMessage('Precio no válido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update product availability
 *      tags: 
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer 
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product Not found
 *          400:
 *              description: Bad Request - Invalid ID
 */

router.patch('/:id', // PATCH
    param('id').isInt().withMessage('Id no válido'),
    handleInputErrors,
    updateAvailability
) 

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes a product by a given ID
 *      tags: 
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *          schema:
 *              type: integer 
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Producto eliminado'
 *          404:
 *              description: Product Not found
 *          400:
 *              description: Bad Request - Invalid ID
 */

router.delete('/:id', 
    param('id').isInt().withMessage('Id no válido'),
    handleInputErrors,
    deleteProduct
)

router.head('/', (req, res) => {
})

export default router