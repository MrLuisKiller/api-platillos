require('dotenv').config()

const express = require('express')
const app = express()
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

app.get('/platillos', (req, res) => {
    res.json({
        message: 'Platillos displonibles',
        data: platillos
    })
})

app.post('/platillos', (req, res) => {
    platillos.push(req.body)
    res.json({
        message: 'Se agrego el platillo',
        data: req.body
    })
})

app.put('/platillos', (req, res) => {
    const id = parseInt(req.query.id)
    let status = 404
    let message = 'Platillo inexistente'
    if (platillos.find(platillo => platillo.id == id)) {
        const { nombre, precio } = req.body
        const index = platillos.findIndex(platillo => platillo.id == id)
        platillos[index].nombre = nombre
        platillos[index].precio = precio
        status = 200
        message = 'Se actualizo el platillo'
    }
    res.status(status).json({
        message,
        data: null
    })
})

app.delete('/platillos', (req, res) => {
    const id = parseInt(req.query.id)
    let status = 404
    let message = 'Platillo inexistente'
    if (platillos.find(platillo => platillo.id == id)) {
        const index = platillos.findIndex(platillo => platillo.id == id)
        platillos.splice(index, 1)
        status = 200
        message = 'Se elimino el platillo'
    }
    res.status(status).json({
        message,
        data: null
    })
})



app.listen(port, () => console.log(`Servidor escuchando en http://localhost:${port}`))