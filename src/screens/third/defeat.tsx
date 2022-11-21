import { Dispatch, SetStateAction } from "react";
import Button from "react-bootstrap/Button";
import { gameStates } from "../../App";

interface props {
  setStatus: Dispatch<SetStateAction<gameStates>>;
}

const Defeat = ({ setStatus }: props) => {
  return (
    <div className="container d-flex flex-column justify-content-around align-items-center">
      <div className="logo">
        <p>oops you didn’t find them all</p>
      </div>
      <Button
        onClick={() => {
          setStatus(gameStates.Game);
        }}
        size="lg"
        variant="success"
        className={"startButton bounce"}>
        Play again
      </Button>{" "}
    </div>
  );
};

export default Defeat;
