import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

interface props {
  setStatus: Dispatch<SetStateAction<string>>;
}

const Defeat = ({ setStatus }: props) => {
  const [isLoadedVictory, setIsLoadedVictory] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadedVictory(true);
    }, 500);
  }, []);

  return (
    <div className="container d-flex flex-column justify-content-around align-items-center">
      <div className="logo">
        <p>you did it</p>
      </div>
      <Button
        onClick={() => {
          setStatus("Game");
        }}
        size="lg"
        variant="success"
        className={
          isLoadedVictory ? "startButton bounce" : "startButton slideInBottom"
        }
      >
        Play again
      </Button>{" "}
    </div>
  );
};

export default Defeat;
