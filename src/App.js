import "./assets/main.css";
import Container from "./Components/Container";
import Tile from "./Components/Tile";

function App() {
  return (
    <Container>
      <Tile r={10} c={4} />
    </Container>
  );
}

export default App;
