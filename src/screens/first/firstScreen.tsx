import { Dispatch, SetStateAction } from "react";
import Button from "react-bootstrap/Button";
import logo from "../../assets/logo.svg";
import { gameStates } from "../../App";

interface props {
  setStatus: Dispatch<SetStateAction<gameStates>>;
}

const FirstScreen = ({ setStatus }: props) => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <div className="logo">
        <img src={logo} alt="logo" width={500} />
      </div>
      <Button
        onClick={() => {
          setStatus(gameStates.Game);
        }}
        size="lg"
        variant="success"
        className={"startButton homeButtonAnimation"}>
        Start
      </Button>{" "}
    </div>
  );
};

export default FirstScreen;
