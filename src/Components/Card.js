import React from "react";
class Card extends React.Component {
  render() {
    return (
      <div className={this.props.card.flipped ? "card" : "unflipped"}>
        <span>
          {this.props.card.flipped ? this.props.card.cardValue : "unknown"}
        </span>
      </div>
    );
  }
}

export default Card;
