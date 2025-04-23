import { Request, Response} from 'express'
import Product from '../models/Product.model'

export const getProducts = async (req: Request, res: Response) : Promise<void> => {
    const products = await Product.findAll({
        order: [ // ordenar por un valor
            ['id', 'DESC']
        ],
        // attributes: {exclude: ['createdAt', 'updatedAt', 'availability']} --> evitar que muestre algunos atributos
    })
    res.json({data: products})
}

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if(!product) {
        res.status(404).json({
            error: 'Producto no encontrado'
        })
        return
    }

    res.json({data: product})
}
 
export const createProduct = async (req : Request, res : Response) => {
    const product = await Product.create(req.body)
    res.status(201).json({data: product})
}

export const updateProduct = async (req : Request, res : Response) : Promise<void> => {

    // verificar que el producto exista

    const { id } = req.params
    const product = await Product.findByPk(id)
    if(!product) {
        res.status(404).json({
            error: 'Producto no encontrado'
        })
        return
    }

    // actualizar el producto entero 
    await product.update(req.body)
    await product.save()

    res.json({data: product})
}

export const updateAvailability = async (req : Request, res : Response) : Promise<void> => {

    // verificar que el producto exista
    const { id } = req.params
    const product = await Product.findByPk(id)
    if(!product) {
        res.status(404).json({
            error: 'Producto no encontrado'
        })
        return
    }

    // actualizar solo la disponibilidad
    product.availability = !product.dataValues.availability // cambia por el valor opuesto (en este caso es boolean)
    await product.save()

    res.json({data: product})
}

export const deleteProduct = async (req : Request, res : Response) : Promise<void> => {
    // verificar que el producto exista
    const { id } = req.params
    const product = await Product.findByPk(id)
    if(!product) {
        res.status(404).json({
            error: 'Producto no encontrado'
        })
        return
    }

    // eliminar el producto
    await product.destroy()
    res.json({data: 'Producto Eliminado'})
    
}