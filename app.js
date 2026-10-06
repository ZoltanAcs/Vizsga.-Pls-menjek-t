import express, { json, response } from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
const PORT = 4890

app.use(cors());
app.use(express.json());

app.get("/api/rentals/", (req, res) => {
  const rentals = db.prepare("SELECT * FROM BikeRental").all();
  res.json(rentals);
});

app.get("/api/rentals/:id", (req, res) => {
  const rentals = db
    .prepare("SELECT * FROM BikeRental WHERE Id = ?")
    .get(req.params.id);
  res.json(rentals);
});

app.post("/api/rentals/", (req, res) => {
  const { StartStation, EndStation, RentalEnd, RentalStart, PriceHuf } =
    req.body;

  if (new Date(RentalStart) > new Date(RentalEnd)) {
    res
      .status(400)
      .json("A kölcsönzés vége nem lehet korábban a kölcsönzés kezdeténél");
    return;
  }

  const result = db
    .prepare(
      "INSERT INTO BikeRental (StartStation, EndStation, RentalStart, RentalEnd, PriceHuf) VALUES(?, ?, ?, ?, ?)",
    )
    .run(StartStation, EndStation, RentalStart, RentalEnd, PriceHuf);
  res.status(201).json({ message: "Sikeres Létrehozás\n", result });
});

app.put("/api/rentals/:id", (req, res) => {
  const { StartStation, EndStation, RentalEnd, RentalStart, PriceHuf } =
    req.body;

  if (new Date(RentalStart) > new Date(RentalEnd)) {
    res
      .status(400)
      .json("A kölcsönzés vége nem lehet korábban a kölcsönzés kezdeténél");
    return;
  }

  const result = db
    .prepare(
      "UPDATE BikeRental SET StartStation =?, EndStation=?, RentalStart=?, RentalEnd=?, PriceHuf=? WHERE Id = ?").run(StartStation, EndStation, RentalStart, RentalEnd, PriceHuf, req.params.id);
    res.status(200).json({message: "Sieres módositás", result})
});

app.delete("/api/rentals/:id",(req, res)=> {
    const rentals = db.prepare("DELETE FROM BikeRental WHERE Id = ?").run(req.params.id)
    res.status(200).json("Sikeres Törlés")
})

app.listen(PORT, ()=>{
    console.log("App runs on Port: "+PORT)
})