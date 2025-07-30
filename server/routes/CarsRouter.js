const express = require("express");
const CarsController = require("../controller/CarsController");
const CarsRouter = express.Router();

CarsRouter.get("/", CarsController.CarsGet);
CarsRouter.get("/:id", CarsController.CarGet);

router.get("/", async (req, res) => {
    console.log("GET /cars called");
    try {
      const result = await db.query("SELECT * FROM cars");
      console.log("Query result:", result.rows);
      res.json(result.rows);
    } catch (err) {
      console.error("DB error:", err);
      res.status(500).send("Server error");
    }
  });

  

module.exports = CarsRouter;
