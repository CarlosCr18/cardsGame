import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Countdown from "react-countdown";
import Card, { cardStatus, cardValue } from "./card";
import soundOn from "./soundon.svg";
import soundOff from "./soundoff.svg";
import { gameStates } from "../../App";
import toast from "react-hot-toast";
let backgroundSound = require("./background.mp3");

interface props {
  setStatus: Dispatch<SetStateAction<gameStates>>;
}
interface cardInterface {
  value: cardValue | string;
  status: cardStatus | string;
  disabled: boolean;
  index: number;
  paired: boolean;
}

const SecondScreen = ({ setStatus }: props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cardArray, setCardArray] = useState<cardInterface[] | undefined>();
  const [disableCards, setDisableCards] = useState(false);
  const [activeCard, setActiveCard] = useState(false);
  const [backgroundMusic, setBackgroundMusic] = useState(false);
  const [startCountdown, setStartCountdown] = useState(false);

  let cardValues = [...Object.values(cardValue), ...Object.values(cardValue)];
  let pairs = useRef(0);
  let backgroundRef = useRef<any>();
  let secondsRef = useRef(30000);
  let selectedCard = useRef({ value: "", index: -1 });
  let previousCard = useRef({ value: "", index: -1 });
  const tickingSoundRef = useRef<HTMLAudioElement>(new Audio(require("./ticking.mp3")));
  const incorrectSoundRef = useRef<HTMLAudioElement>(new Audio(require("./incorrect.mp3")));
  const correctSoundRef = useRef<HTMLAudioElement>(new Audio(require("./correct.mp3")));
  const pairsTimeout = useRef<any>();

  incorrectSoundRef.current.volume = 0.3;

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const renderer = ({ seconds, total }: any) => {
    if (seconds === 10 && tickingSoundRef.current.paused) {
      tickingSoundRef.current.play();
    }
    secondsRef.current = total;
    return <span>{seconds + "s"}</span>;
  };

  const revealCard = (index: number) => {
    if (disableCards) return;
    if (cardArray) {
      let newCardArray = cardArray;

      newCardArray[index].status = "visible";
      newCardArray[index].disabled = true;
      selectedCard.current = { value: newCardArray[index].value, index };
      setCardArray(() => newCardArray);
      setDisableCards(true);
    }
  };

  useEffect(() => {
    const cardsLogic = async () => {
      if (disableCards) {
        if (cardArray && activeCard) {
          let newCardArray = [...cardArray];
          let previousIndex = previousCard.current.index;
          let index = selectedCard.current.index;

          if (previousCard.current.value === selectedCard.current.value) {
            correctSoundRef.current.play();
            if (pairs.current + 1 === 4) {
              pairsTimeout.current = new Promise((resolve) => setTimeout(resolve, 500));
              await pairsTimeout.current;
              toast.dismiss();
              setStatus(gameStates.Victory);
            } else {
              newCardArray[index].paired = true;
              newCardArray[previousIndex].paired = true;
              pairs.current = pairs.current + 1;
              toast.success("It's a pair!", { duration: 1000, position: "top-center" });
            }
          } else {
            pairsTimeout.current = new Promise((resolve) => setTimeout(resolve, 500));
            await pairsTimeout.current;
            newCardArray[index].status = "hidden";
            newCardArray[previousIndex].status = "hidden";
            newCardArray[index].disabled = false;
            newCardArray[previousIndex].disabled = false;
            toast.error("It's not a pair!", { duration: 1000, position: "top-center" });
            incorrectSoundRef.current.play();
          }
          setActiveCard(false);
          setDisableCards(false);
          setCardArray(newCardArray);
        } else {
          previousCard.current = selectedCard.current;

          setActiveCard(true);
          setDisableCards(false);
        }
      } else {
        setDisableCards(false);
      }
    };
    cardsLogic();
  }, [disableCards]);

  useEffect(() => {
    if (!isLoading) return;
    const startingValues = async () =>
      new Promise((resolve, reject) => {
        try {
          shuffleArray(cardValues);
          let cardArray = cardValues.map((element, index) => {
            return {
              value: element,
              status: cardStatus.HIDDEN,
              disabled: false,
              index: index,
              paired: false,
            };
          });
          setCardArray(cardArray);
          resolve("start game");
        } catch (error) {
          reject("failed");
        }
      });
    startingValues().then((value) => {
      if (value === "start game") {
        setIsLoading(false);
        setStartCountdown(true);
        setBackgroundMusic(true)
      } else {
        setStatus(gameStates.Home);
      }
    });
  }, []);

  useEffect(() => {
    if (!backgroundRef.current) return;
    if (backgroundMusic && backgroundRef.current) {
      backgroundRef.current.volume = 0.25;
      backgroundRef.current.play();
    } else {
      backgroundRef.current.pause();
    }
  }, [backgroundMusic]);

  if (isLoading) {
    return (
      <div className="container d-flex flex-column justify-content-around align-items-center">
        <div>
          Getting everything ready... <Spinner animation="border" />
        </div>
      </div>
    );
  }

  return (
    <div className="gameContainer">
      <div className="countdown">
        {startCountdown && (
          <Countdown
            intervalDelay={0}
            precision={3}
            onComplete={() => setStatus(gameStates.Defeat)}
            date={Date.now() + secondsRef.current}
            renderer={renderer}
          />
        )}
      </div>
      <div className="container grid">
        <audio id="background" ref={(e) => (backgroundRef.current = e)}>
          <source src={backgroundSound}></source>
        </audio>
        <button
          className="soundButton"
          onClick={() => {
            setBackgroundMusic(!backgroundMusic);
          }}>
          <img alt="soundIcon" src={backgroundMusic ? soundOff : soundOn}></img>
        </button>
        {cardArray?.map((card, index) => {
          return (
            <Card
              key={"Card_" + index}
              value={card.value}
              status={card.status}
              revealCard={revealCard}
              disabled={card.disabled}
              index={card.index}
              paired={card.paired}></Card>
          );
        })}
      </div>
    </div>
  );
};

export default SecondScreen;
