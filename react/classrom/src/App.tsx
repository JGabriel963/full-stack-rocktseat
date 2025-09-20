import { Header } from "./components/header";
import styles from "./app.module.css";
import { Tip } from "./components/tip";

function App() {
  function handleRestartGame() {
    alert("Reiniciar o jogo!");
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={2} max={10} onRestart={handleRestartGame} />
        <Tip tip="Linguagem de programação dinâmica" />
      </main>
    </div>
  );
}

export default App;
