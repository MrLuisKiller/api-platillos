require('dotenv').config()

const express = require('express')
const app = express()
const router = express.Router()
const cors = require('cors')
const port = process.env.PORT

app.use(express.json())
app.use(cors())

let platillos = [
    {
        id: 1,
        nombre: 'Guacamole',
        precio: 20.35
    }
]

app.get('/', (req, res) => {
    res.send('API de Platillos UCamp v1.0')
})

app.use('/platillos', router)

router.get('/', (req, res) => {
    let status = 404
    let message = 'Ningun platillo disponible'
    let data = null
    if (platillos.length > 0) {
        status = 200
        message = 'Platillos disponibles'
        data = platillos
    }
    res.status(status).json({
        message,
        data
    })
})

router.post('/', (req, res) => {
    let status = 400
    let message = 'ID existente'
    const { id } = req.body
    if (!platillos.find(platillo => platillo.id == id)) {
        status = 200
        message = 'Se agrego el platillo'
        platillos.push(req.body)
    }
    res.status(status).json({
        message,
        data: req.body
    })
})

router.put('/', (req, res) => {
    const id = parseInt(req.query.id)
    let status = 400
    let message = 'ID necesaria'
    if (id) {
        message = 'nombre o precio necesarios'
        const { nombre, precio } = req.body
        if (nombre || precio) {
            status = 404
            message = 'Platillo inexistente'
            if (platillos.find(platillo => platillo.id == id)) {
                const index = platillos.findIndex(platillo => platillo.id == id)
                if (nombre)
                    platillos[index].nombre = nombre
                if (precio)
                    platillos[index].precio = precio
                status = 200
                message = 'Se actualizo el platillo'
            }
        }
    }
    res.status(status).json({
        message,
        data: null
    })
})

router.delete('/', (req, res) => {
    const id = parseInt(req.query.id)
    let status = 400
    let message = 'ID necesaria'
    if (id) {
        status = 404
        message = 'Platillo inexistente'
        if (platillos.find(platillo => platillo.id == id)) {
            const index = platillos.findIndex(platillo => platillo.id == id)
            platillos.splice(index, 1)
            status = 200
            message = 'Se elimino el platillo'
        }
    }
    res.status(status).json({
        message,
        data: null
    })
})

app.listen(port, () => console.log(`Servidor escuchando en http://localhost:${port}`))