import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Card from "./components/Card";
const tarjetas = ["🍎", "🍌", "🍒", "🍇", "🍓", "🍑"];

export default function App() {
  const [board, setBoard] = React.useState(() =>
    shuffle([...tarjetas, ...tarjetas])
  );
  const [selectedCards, setSelectedCards] = React.useState([]);
  const [matchCards, setMatchCards] = React.useState([]);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    if (selectedCards.length < 2) return;
    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchCards([...matchCards, ...selectedCards]);
      setSelectedCards([]);
    } else {
      const timeoutId = setTimeout(() => setSelectedCards([]), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCards]);

  const handleTapCard = (index) => {
    if (selectedCards.length >= 2 || selectedCards.includes(index)) return;
    setSelectedCards([...selectedCards, index]);
    setScore(score + 1);
  };

  const didPlayerWin = () => matchCards.length === board.length;

  const resetGame = () => {
    setMatchCards([]);
    setScore(0);
    setSelectedCards([]);
    setBoard(shuffle([...tarjetas, ...tarjetas]));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {didPlayerWin() ? "Ganastee 🥳" : "Juego de memoria"}
      </Text>
      <Text style={styles.score}>Movimientos: {score}</Text>
      <View style={styles.board}>
        {board.map((tarjeta, index) => {
          const isTurnOver =
            selectedCards.includes(index) || matchCards.includes(index);
          return (
            <Card
              key={index}
              isTurnOver={isTurnOver}
              onPress={() => handleTapCard(index)}
            >
              {tarjeta}
            </Card>
          );
        })}
      </View>
      {didPlayerWin() && <Button title="Reiniciar" onPress={resetGame} />}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "900",
    marginBottom: 5,
  },
  score: {
    fontSize: 24,
    color: "white",
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    justifyContent: "center",
  },
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));

    [array[i], array[random]] = [array[random], array[i]];
  }
  return array;
}
