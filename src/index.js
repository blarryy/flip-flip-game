import React from "react";
import ReactDOM from "react-dom";
import style from "./style.css";
import createArray from "./utils/createArray";
import shuffleArray from "./utils/shuffleArray";
import Card from "./Components/Card";

const gameStatus = {
  noCardFlipped: "NO_CARD_FLIPPED",
  oneCardFlipped: "ONE_CARD_FLIPPED",
  wrongAnswer: "WRONG_ANSWER"
};
let counter = 0;
class Layout extends React.Component {
  constructor(props) {
    super(props);
    if ((props.width * props.height) % 2 == 1) {
      alert("odd number");
    }
    let cards = createArray(props.height, props.width);
    let numbers = [];
    for (var i = 0; i < props.height * props.width; i++) {
      numbers.push(Math.floor(i / 2) + 1);
    }
    shuffleArray(numbers);
    for (var row = 0; row < props.height; row++) {
      for (var col = 0; col < props.width; col++) {
        cards[row][col] = {
          cardValue: numbers[row * props.width + col],
          flipped: false,
          rowIndex: row,
          colIndex: col
        };
      }
    }
    this.state = {
      cards: cards,
      gameStatus: gameStatus.noCardFlipped,
      firstCard: null,
      secondCard: null
    };
    this.onReset = this.onReset.bind(this);
  }
  cardClick(card) {
    if (!card.flipped) {
      switch (this.state.gameStatus) {
        case gameStatus.noCardFlipped:
          this.setState(state => {
            const obj = state.cards;
            obj[card.rowIndex][card.colIndex].flipped = !obj[card.rowIndex][
              card.colIndex
            ].flipped;
            return {
              ...state,
              cards: obj,
              firstCard: card,
              gameStatus: gameStatus.oneCardFlipped
            };
          });
          break;
        case gameStatus.oneCardFlipped:
          this.setState(state => {
            const obj = state.cards;
            obj[card.rowIndex][card.colIndex].flipped = !obj[card.rowIndex][
              card.colIndex
            ].flipped;
            return {
              ...state,
              cards: obj,
              secondCard: card,
              gameStatus: gameStatus.oneCardFlipped
            };
          });
          if (this.state.firstCard.cardValue === card.cardValue) {
            counter = counter + 2;
            this.setState(state => {
              return {
                ...state,
                firstCard: null,
                gameStatus: gameStatus.noCardFlipped
              };
            });
            if (counter == this.props.height * this.props.width) {
              alert("You've won!");
            }
          } else {
            this.setState(state => {
              return {
                ...state,
                gameStatus: gameStatus.wrongAnswer,
                secondCard: card
              };
            });
          }
          break;
        case gameStatus.wrongAnswer:
          this.setState(state => {
            const obj = state.cards;
            obj[this.state.firstCard.rowIndex][
              this.state.firstCard.colIndex
            ].flipped = false;
            obj[this.state.secondCard.rowIndex][
              this.state.secondCard.colIndex
            ].flipped = false;
            obj[card.rowIndex][card.colIndex].flipped = !obj[card.rowIndex][
              card.colIndex
            ].flipped;
            return {
              ...state,
              cards: obj,
              firstCard: card,
              secondCard: null,
              gameStatus: gameStatus.oneCardFlipped
            };
          });
          break;
      }
    }
  }
  onReset() {
    counter = 0;
    this.setState(state => {
      const obj = state.cards;
      for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
          obj[i][j].flipped = false;
        }
      }
      return {
        ...state,
        cards: obj,
        firstCard: null,
        secondCard: null,
        gameStatus: gameStatus.noCardFlipped
      };
    });
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.playzone}>
          <table>
            <tbody>
              {this.state.cards.map(rowOfCards => (
                <tr>
                  {rowOfCards.map(card => (
                    <td onClick={() => this.cardClick(card)}>
                      <Card card={card} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={style.control}>
          <h2>
            Flip cards, if two cards match they will stay flipped. You win when
            all cards are flipped.
          </h2>
          <h1>Your score is {counter} </h1>
          <button onClick={this.onReset}> Reset </button>
          <h3>Creator:Barry Zhang</h3>
          <h4>Thank you for your time</h4>
        </div>
      </div>
    );
  }
}

// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <div className="playarea">
//           <Layout />
//         </div>
//         <div className="control">
//           <Control difficulty />
//         </div>
//       </div>
//     );
//   }
// }

ReactDOM.render(
  <Layout width={6} height={6} />,
  document.getElementById("index")
);
