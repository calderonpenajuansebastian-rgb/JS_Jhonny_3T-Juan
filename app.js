import express from "express";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Hola ficha 3407184, estamos aprendiendo Express en el SENA");
});

app.get("/productos", (req, res) => {
    res.send(`
        <h1>Listado de productos</h1>
        <ol>
            <li>Televisor</li>
            <li>Celular</li>
            <li>Impresora</li>
        </ol>
    `);
});

app.get("/saludo/:nombre", (req, res) => {

    const { nombre } = req.params;

    if (nombre.length < 3) {
        return res.status(400).json({
            error: "El nombre debe tener mínimo 3 letras."
        });
    }

    res.send(`Hola ${nombre}, bienvenido`);

});

app.get("/productos/:nombre", (req, res) => {

    const { nombre } = req.params;

    const producto = {
        id: 1,
        nombre: nombre,
        cantidadStock: 30,
        precioUnitario: 2500000,
        categoria: "Tecnología"
    };

    res.json(producto);

});

app.get("/productos/:categoria/:id", (req, res) => {

    const { categoria, id } = req.params;

    res.json({
        producto: id,
        categoria: categoria,
        servidor: "Servidor Express ADSO"
    });

});

app.get("/usuarios/:id/posts", (req, res) => {

    const { id } = req.params;
    const { orden } = req.query;

    let publicaciones = [
        {
            id: 1,
            titulo: "Mi primera publicación"
        },
        {
            id: 2,
            titulo: "Aprendiendo Express"
        },
        {
            id: 3,
            titulo: "Uso de parámetros"
        }
    ];

    if (orden === "desc") {
        publicaciones.reverse();
    }

    res.json({
        usuario: id,
        orden: orden || "asc",
        publicaciones
    });

});

app.get("/aprendices/:nombre", (req, res) => {

    const { nombre } = req.params;

    res.json({
        nombre: nombre,
        stock: 5,
        categoria: "Tecnología"
    });

});

app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});