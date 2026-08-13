import express from "express";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const listaAprendices = [
    {
        nombre: "Pepe",
        edad: 21,
        Correo: "pepe@mail.com",
        imagen: "url"
    },
    {
        nombre: "Luis",
        edad: 22,
        Correo: "luis@mail.com",
        imagen: "url"
    },
    {
        nombre: "Juan",
        edad: 20,
        Correo: "juan@mail.com",
        imagen: "url"
    }
];

app.get("/api/aprendices", (req, res) => {

    res.json(listaAprendices);

});

app.get("/api/aprendices/:nombre", (req, res) => {

    const { nombre } = req.params;

    const aprendiz = listaAprendices.find(
        aprendiz =>
            aprendiz.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (!aprendiz) {
        return res.status(404).json({
            mensaje: "Aprendiz no encontrado"
        });
    }

    res.json({
        datosAprendiz: aprendiz
    });

});

app.get("/productos/:categoria/:id", (req, res) => {

    const { categoria, id } = req.params;

    res.json({
        producto: id,
        categoria: categoria,
        servidor: "Servidor Express ADSO"
    });

});

app.post("/api/aprendices", (req, res) => {

    const { nombre, edad, Correo, imagen } = req.body;

    if (!nombre || nombre.trim().length < 3) {

        return res.status(400).json({
            mensaje: "El nombre debe tener mínimo 3 letras"
        });

    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!Correo || !correoValido.test(Correo)) {

        return res.status(400).json({
            mensaje: "El correo electrónico no es válido"
        });

    }

    const nuevoAprendiz = {
        nombre: nombre,
        edad: edad,
        Correo: Correo,
        imagen: imagen || "url"
    };

    listaAprendices.push(nuevoAprendiz);

    // Respuesta
    res.status(201).json({
        mensaje: "Aprendiz creado correctamente",
        aprendiz: nuevoAprendiz
    });

});

app.listen(port, () => {

    console.log(`Servidor funcionando en el puerto ${port}`);

});