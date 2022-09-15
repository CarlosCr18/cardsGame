import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Countdown from "react-countdown";
import Card, { cardStatus, cardValue } from "./card";
import GameModal from "./modal";
import soundOn from "./soundon.svg";
import soundOff from "./soundoff.svg";
let backgroundSound = require("./background.mp3");

interface props {
  setStatus: Dispatch<SetStateAction<string>>;
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
  const [previousCard, setPreviousCard] = useState({ value: "", index: -1 });
  const [pairs, setPairs] = useState(0);
  const [backgroundMusic, setBackgroundMusic] = useState(false);
  const [modalValue, setModalValue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [startCountdown, setStartCountdown] = useState(false);
  let cardValues = [...Object.values(cardValue), ...Object.values(cardValue)];

  const incorrect: HTMLAudioElement = new Audio(require("./incorrect.mp3"));
  const correct: HTMLAudioElement = new Audio(require("./correct.mp3"));
  const ticking: HTMLAudioElement = new Audio(require("./ticking.mp3"));

  let backgroundRef = useRef<any>();
  let secondsRef = useRef<any>(30000);
  const renderer = ({ seconds, total }: any) => {
    if (seconds == 10) {
      ticking.play();
    }
    secondsRef.current = total;
    return <span>{seconds + "s"}</span>;
  };

  const revealCard = async (index: number) => {
    if (disableCards) return;
    let calls = [];
    if (cardArray) {
      let newCardArray = cardArray;

      newCardArray[index].status = "visible";
      newCardArray[index].disabled = true;

      calls.push(setDisableCards(true));
      calls.push(setCardArray(newCardArray));
      calls.push(await new Promise((resolve) => setTimeout(resolve, 300)));
      if (activeCard) {
        if (previousCard.value == newCardArray[index].value) {
            if (pairs+1 === 4) {
                setStatus("Victory");
            }
            let previousIndex = previousCard.index;
          newCardArray[index].paired = true;
          newCardArray[previousIndex].paired = true;

        
          calls.push(setPairs(pairs + 1));
          calls.push(setModalValue(true));
          correct.play();
        } else {
          let previousIndex = previousCard.index;
          newCardArray[index].status = "hidden";
          newCardArray[previousIndex].status = "hidden";
          newCardArray[index].disabled = false;
          newCardArray[previousIndex].disabled = false;
          calls.push(setModalValue(false));
          incorrect.play();
        }
        calls.push(await new Promise((resolve) => setTimeout(resolve, 150)));
        calls.push(setShowModal(true));
        calls.push(setActiveCard(false));
        calls.push(setCardArray(newCardArray));
      } else {
        calls.push(setCardArray(newCardArray));
        calls.push(
          setPreviousCard({ value: newCardArray[index].value, index })
        );
        calls.push(setActiveCard(true));
        calls.push(await new Promise((resolve) => setTimeout(resolve, 150)));
      }
    }
    calls.push(setDisableCards(false));
    await Promise.all(calls);
  };
  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  useEffect(() => {
    if (!isLoading) return;
    const startingValues = async () => {
      await shuffleArray(cardValues);
      let cardArray = await cardValues.map((element, index) => {
        return {
          value: element,
          status: cardStatus.HIDDEN,
          disabled: false,
          index: index,
          paired: false,
        };
      });
      await setCardArray(cardArray);
      await setIsLoading(false);
      await setStartCountdown(true);
    };
    startingValues();
  }, []);

  useEffect(() => {
    if (!backgroundRef.current) return;
    if (backgroundMusic && backgroundRef.current) {
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
    <div className="container grid">
      <audio id="background" ref={(e) => (backgroundRef.current = e)}>
        <source src={backgroundSound}></source>
      </audio>
      <button
        className="soundButton"
        onClick={() => {
          setBackgroundMusic(!backgroundMusic);
        }}
      >
        <img alt="soundIcon" src={backgroundMusic ? soundOff : soundOn}></img>
      </button>
      <div className="countdown">
        {startCountdown && (
          <Countdown
            intervalDelay={0}
            precision={3}
            onComplete={()=>setStatus("Defeat")}
            date={Date.now() + secondsRef.current}
            renderer={renderer}
          />
        )}
      </div>
      {cardArray?.map((card, index) => {
        return (
          <Card
            key={"Card_" + index}
            value={card.value}
            status={card.status}
            revealCard={revealCard}
            disabled={card.disabled}
            index={card.index}
            paired={card.paired}
          ></Card>
        );
      })}
      <GameModal
        value={modalValue}
        showModal={showModal}
        setShowModal={setShowModal}
      ></GameModal>
    </div>
  );
};

export default SecondScreen;
