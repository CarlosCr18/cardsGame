import { Dispatch, SetStateAction, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import logo from "../../assets/logo.svg";

interface props {
  setStatus: Dispatch<SetStateAction<string>>;
}

const FirstScreen = ({ setStatus }: props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  return (
    <div className="container d-flex flex-column justify-content-around align-items-center">
      <div className="logo">
        <img src={logo} alt="logo" width={500} />
      </div>
      <Button
        onClick={() => {
          setStatus("Game");
        }}
        size="lg"
        variant="success"
        className={
          isLoaded ? "startButton bouncing" : "startButton slideInBottom"
        }
      >
        Start
      </Button>{" "}
    </div>
  );
};

export default FirstScreen;
