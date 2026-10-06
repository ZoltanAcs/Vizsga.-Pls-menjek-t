import { useEffect, useState } from "react";
import type { Movie } from "../types/Movie";
import apiClient, { baseURL } from "../api/apiClient";
import { toast } from "react-toastify";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";

const All = () => {
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

  const slideItem = (url: Movie) => {
    <Carousel.Item>
      <img src={`${url}/images/${baseURL}`} width={350} height={450} />
    </Carousel.Item>;
  };

  const generateCard = (m: Movie) => {
    return (
      <Col>
        <Row>
          <Card>
            <Carousel interval={null}>
              {movies.map((i) => slideItem(i))}
            </Carousel>
            <Card.Body>
              <Card.Title>Cim: {m.title}</Card.Title>
              <Card.Text>
                Megjelenés Éve: {m.release_year}
              </Card.Text>
              <Card.Text>
                Kategoria: {m.genre}
              </Card.Text>
              <Card.Text>
                Ár: {m.price}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
            <Col>
            <Row>
                <Button variant="success" onClick={() => {
                    if(kosar.includes(Number(m.id))){
                        toast.error("A kosárban már szerepel ilyen film")
                    }
                    else {
                        setKosar([...kosar, Number(m.id)])
                        toast.success("Kosárba rakva")
                    }
                }}>
                    Kosárba
                </Button>
            </Row>
            </Col>
            </Card.Footer>
          </Card>
        </Row>
      </Col>
    );
  };

  return(
    <Container>
        <Col>
        <Row lg={4} className="g-4">
            {movies.map((i) => generateCard(i))}
        </Row>
        </Col>
    </Container>
  )


};

export default All;
