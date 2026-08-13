import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Tercera rama creada por Juan Calderon");
});


app.get("/FUTBOLISTAS", (req, res) => {
    res.send(`
        <h1>Lista de Jugadores</h1>
        <ol>
            <li>Cristiano Ronaldo</li>
            <li>Messi</li>
            <li>Neymar Jr</li>
            <li>Kylian Mbappé</li>
            <li>Vinícius Jr</li>
        </ol>
    `);
});

app.get("/dorsal/:nombre", (req, res) => {

    const { nombre } = req.params;

    if (nombre.length < 3) {
        return res.status(400).json({
            error: "El nombre debe tener mínimo 3 letras."
        });
    }

    res.send(`Hola ${nombre}, bienvenido`);
});


// =======================================
app.get("/productos/:nombre", (req, res) => {

    const { nombre } = req.params;

    const producto = {
        dorsal: 10,
        nombre: nombre,
        categoria: "FUTBOLISTA"
    };

    res.json(producto);
});


app.get("/FUTBOLISTA/:EDAD/:DORSAL", (req, res) => {

    const { EDAD, DORSAL } = req.params;

    res.json([
        {
            edad: 37,
            dorsal: 10,
            futbolista: "Messi",
            servidor: "Servidor Desarrollo rama 3"
        },
        {
            edad: 41,
            dorsal: 7,
            futbolista: "Cristiano Ronaldo",
            servidor: "Servidor Desarrollo rama 3"
        },
        {
            edad: 32,
            dorsal: 11,
            futbolista: "Neymar Jr",
            servidor: "Servidor Desarrollo rama 3"
        }
    ]);

});

app.get("/jugadores/:id/posts", (req, res) => {

    const { id } = req.params;
    const { orden } = req.query;

    let jugadores = [
        {
            id: 1,
            nombre: "Cristiano Ronaldo",
            edad: 41,
            dorsal: 7
        },
        {
            id: 2,
            nombre: "Messi",
            edad: 37,
            dorsal: 10
        },
        {
            id: 3,
            nombre: "Neymar Jr",
            edad: 32,
            dorsal: 11
        }
    ];

    if (orden === "desc") {
        jugadores.reverse();
    }

    res.json({
        usuario: id,
        orden: orden || "asc",
        jugadores
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

// =======================================
app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});