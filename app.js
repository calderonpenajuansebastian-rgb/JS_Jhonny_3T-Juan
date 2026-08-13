import express from "express";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 4000;

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
const datosAprendiz = listaAprendices.filter(
    aprendiz => aprendiz.nombre === nombre
);
res.json(datosAprendiz);
});

app.get("/productos/:categoria/:id", (req, res) => {

    const { categoria, id } = req.params;

    res.json({
        producto: id,
        categoria: categoria,
        servidor: "Servidor Express ADSO"
    });

});


app.listen(port, () => {

    console.log(`Servidor funcionando en el puerto ${port}`);

});