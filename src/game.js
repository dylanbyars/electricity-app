const Deck = require('card-deck')

const CARDS = [
  '♠2',
  '♠3',
  '♠4',
  '♠5',
  '♠6',
  '♠7',
  '♠8',
  '♠9',
  '♠10',
  '♠J',
  '♠Q',
  '♠K',
  '♠A',
  '♦2',
  '♦3',
  '♦4',
  '♦5',
  '♦6',
  '♦7',
  '♦8',
  '♦9',
  '♦10',
  '♦J',
  '♦Q',
  '♦K',
  '♦A',
  '♥2',
  '♥3',
  '♥4',
  '♥5',
  '♥6',
  '♥7',
  '♥8',
  '♥9',
  '♥10',
  '♥J',
  '♥Q',
  '♥K',
  '♥A',
  '♣2',
  '♣3',
  '♣4',
  '♣5',
  '♣6',
  '♣7',
  '♣8',
  '♣9',
  '♣10',
  '♣J',
  '♣Q',
  '♣K',
  '♣A'
].map(card => [card[0], card.slice(1)])

const SUITS = ['♠', '♦', '♥', '♣']

const startingDeck = () => {
  let deck = new Deck(CARDS)
  return deck.shuffle()
}

const draw = deck => {
  let drawnCard = deck.draw()
  return {
    drawnCard,
    newDeck: deck
  }
}

const buzz = (prevCard, currentCard) => {
  return prevCard[0] === currentCard[0] || prevCard[1] === currentCard[1]
}

export { SUITS, startingDeck, draw, buzz }
