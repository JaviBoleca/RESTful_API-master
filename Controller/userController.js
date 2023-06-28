// importamos express
const express = require("express");
//Metodo para gestionar las rutas
const router = express.Router();
//Importamos el modelo correspondiente
const Model = require("../Model/userModel");
const { verifyToken } = require("../lib/utils");

//Escuchar peticiones GET
router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await Model.find();
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res.status(404).json({ status: "Failed", data, error: error.message });
  }
});

//Obtener documentos por ID
router.get("/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    console.log(data);
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
});

//Añadir usuario
router.post("/", (req, res) => {
  const data = new Model({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    role: req.body.role,
    skills: req.body.skills,
    personality: req.body.personality,
  });

  data
    .save()
    .then(() => {
      res.status(200).json({ status: "succeeded", data, error: null });
    })
    .catch((error) => {
      res.status(404).json({ status: "Failed", data, error: error.message });
    });
});

//Actualizar un documento
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Model.findByIdAndUpdate(id, data, { new: true }) //new: true devuelve el documento actualizado
    .then((user) => {
      console.log(user);
      res.status(200).json({ status: "succeeded", data, error: null });
    })
    .catch((error) => {
      res.status(404).json({ status: "Failed", data, error: error.message });
    });
});

//Borrar un documento
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Model.findByIdAndDelete(id)
    .then((data) => {
      res.status(200).json({ status: "succeeded", data, error: null });
    })
    .catch((error) => {
      res.status(404).json({ status: "Failed", data, error: error.message });
    });
});

module.exports = router;
