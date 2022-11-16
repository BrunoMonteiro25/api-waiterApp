import path from 'node:path'
import { Router } from 'express'
import multer from 'multer'
import { listCategories } from './app/useCases/categories/listCategories'
import { createCategory } from './app/useCases/categories/createCategory'
import { listProducts } from './app/useCases/products/listProducts'
import { createProduct } from './app/useCases/products/createProduct'
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory'
import { listOrders } from './app/useCases/orders/listOrders'
import { createOrder } from './app/useCases/orders/createOrder'
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus'
import { cancelOrder } from './app/useCases/orders/cancelOrder'

export const router = Router()

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback){
      callback(null, path.resolve(__dirname, '..', 'uploads'))
    },
    filename(req, file, callback){
      callback(null, `${Date.now()}-${file.originalname}`)
    }
  })
})

//Listar as categorias
router.get('/categories', listCategories)

//Criar categorias
router.post('/categories', createCategory)

//Listar produtos
router.get('/products', listProducts)

//Criar produtos
router.post('/products', upload.single('image'), createProduct)

//Pegar produtos pela categoria
router.get('/categories/:categoryId/products', listProductsByCategory)

//List orders - dashboard web listar todos os pedidos
router.get('/orders', listOrders)

//Create order - fazer os pedidos dentro do aplicativo
router.post('/orders', createOrder)

//Mudar o status do pedido
router.patch('/orders/:orderId', changeOrderStatus)

//Deletar ou cancelar um pedido
router.delete('/orders/:orderId', cancelOrder)