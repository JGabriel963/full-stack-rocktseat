import { Header } from "./components/header";
import styles from "./app.module.css";
import { Tip } from "./components/tip";
import { Letter } from "./components/letter";
import { Input } from "./components/input";
import { Button } from "./components/button";
import { LetterUsed, type LettersUsedProps } from "./components/letter-used";
import { type Challenge, WORDS } from "./utils/words";
import { useEffect, useState } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [letter, setLetter] = useState("");
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  function handleRestartGame() {
    const isConfirmed = window.confirm(
      "Você têm certez que deseja reiniciar o jogo?"
    );

    if (isConfirmed) {
      startGame();
    }
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const word = WORDS[index];

    setChallenge(word);

    setScore(0);
    setLetter("");
    setLettersUsed([]);
  }

  function handleConfirm() {
    if (!challenge) {
      return;
    }

    if (!letter.trim()) {
      return alert("Digite uma letra");
    }

    const value = letter.toLowerCase();
    const exists = lettersUsed.find(
      (used) => used.value.toLowerCase() === value
    );

    if (exists) {
      setLetter("");
      return alert("Você já utilizou a letra " + value);
    }

    const hits = challenge.word
      .toLowerCase()
      .split("")
      .filter((char) => char === value).length;

    const correct = hits > 0;
    const currentScore = score + hits;

    setLettersUsed((prevState) => [...prevState, { value, correct }]);
    setScore(currentScore);
    setLetter("");
  }

  function endGame(message: string) {
    alert(message);
    startGame();
  }

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (!challenge) {
      return;
    }

    setTimeout(() => {
      if (score === challenge.word.length) {
        return endGame("Parabéns! Você venceu");
      }

      const attemptLimit = challenge.word.length + 5;
      if (lettersUsed.length === attemptLimit) {
        return endGame("Que pena, você usou todas as tentativas");
      }
    }, 200);
  }, [score, lettersUsed.length]);

  if (!challenge) return null;

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={lettersUsed.length}
          max={challenge.word.length + 5}
          onRestart={handleRestartGame}
        />
        <Tip tip={challenge.tip} />
        <div className={styles.word}>
          {challenge.word.split("").map((letter, index) => {
            const letterUsed = lettersUsed.find(
              (used) => used.value.toLowerCase() === letter.toLowerCase()
            );

            return (
              <Letter
                value={letterUsed?.value}
                key={index}
                color={letterUsed?.correct ? "correct" : "default"}
              />
            );
          })}
        </div>

        <h4>Palpite</h4>

        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />
          <Button title="Confirmar" onClick={handleConfirm} />
        </div>

        <LetterUsed data={lettersUsed} />
      </main>
    </div>
  );
}

export default App;
