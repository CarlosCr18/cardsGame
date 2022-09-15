import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

interface props {
  setStatus: Dispatch<SetStateAction<string>>;
}

const Defeat = ({ setStatus }: props) => {
  const [isLoadedDefeat, setIsLoadedDefeat] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadedDefeat(true);
    }, 500);
  }, []);

  return (
    <div className="container d-flex flex-column justify-content-around align-items-center">
      <div className="logo">
        <p>oops you didn’t find them all</p>
      </div>
      <Button
        onClick={() => {
          setStatus("Game");
        }}
        size="lg"
        variant="success"
        className={
          isLoadedDefeat ? "startButton bounce" : "startButton slideInBottom"
        }
      >
        Play again
      </Button>{" "}
    </div>
  );
};

export default Defeat;
