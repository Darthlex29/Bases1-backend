import express from "express";
import cors from "cors";
import session from "express-session";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import mensajeRoutes from "./routes/mensaje.routes.js";
import paisesRoutes from "./routes/pais.routes.js";
import cors from "cors";
/*
import testRoute from "./routes/test.routes.js"; // Rutas de prueba
*/

const app = express();

// Configuración básica de CORS (permite todas las solicitudes)
app.use(cors());

app.use(express.json());

app.use(cors());

//Configuracion de la sesion
app.use(
  session({
    secret: "secreto_super_seguro",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Si usas HTTPS, cambia a true
  })
);

app.use(userRoutes);
app.use(authRoutes);
app.use(contactRoutes);
app.use(mensajeRoutes);
app.use(paisesRoutes);

/*
app.use(testRoute);
*/

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor en puerto: 3000");
});
