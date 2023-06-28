// Importar los módulos express y mongoose
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.set("strictQuery", true);
const PORT = 8000;

// Así se crea una aplicación Express, de esta forma tendremos todas las funcionalidades que nos proporciona Express
const app = express();

// Analizar los archivos JSON
app.use(express.json());

// Analizar las URL codificadas
app.use(cors());

// Esto nos permite obtener la información de configuración de ".env"
require("dotenv").config();

// Obtenemos la cadena de conexión a la base de datos desde las variables de entorno
const mongoString = process.env.DATABASE_URL_DEV;

// Conectar con la base de datos.
// useNewUrlParser le indica a mongoose que utilice el nuevo analizador de URL para la cadena de conexión.
mongoose.connect(mongoString, { useNewUrlParser: true });

// Guardar la conexión
const db = mongoose.connection;

// Verificar si la conexión ha sido correcta
db.on("error", (error) => {
  console.error("Error:", error);
});

// Una vez que la conexión se ha establecido correctamente
db.once("connected", () => {
  console.log("Success connect");
});

// Si la conexión se ha desconectado
db.on("disconected", () => {
  console.log("mongoose default connection is disconnected");
});

const users = require("./Controller/userController");
const login = require("./Controller/loginController");
app.use("/users", users);
app.use("/auth", login);

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server running at https://localhost:${PORT}`);
});
