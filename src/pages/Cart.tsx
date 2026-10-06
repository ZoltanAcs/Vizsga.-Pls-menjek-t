import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import type { Movie } from "../types/Movie";
import { Card, Col } from "react-bootstrap";

const Cart = () => {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [kosar, setKosar] = useState<Array<number>>(
    JSON.parse(localStorage.getItem("kosar") ?? "[]"),
  );

  useEffect(() => {
    apiClient
      .get("/movies")
      .then((res) => setMovies(res.data))
      .catch(() => toast.error("Sikertelen"));
  }, []);

  useEffect(() => {
    localStorage.setItem("kosar", JSON.stringify(kosar));
  }, [kosar]);

  const deleteItem = (id, index) =>{
    kosar.filter((_, i) => id == index)
  }

  const sum = (total, item) =>{
    const movie = movies.find(item)
    return total + Number(movie?.price)
  }

  return(
    <Col>
    {kosar.length > 0 ? (
        <h1>Kosar</h1>
        
        {kosar.map((id, index)=>{
            const movie = movies.()

        })}
    ):(
        <h2>A kosar ures</h2>
    )}
    </Col>
  )
}

export default Cart