import moon from "./../../assets/moon.svg";
import star from "./../../assets/star.svg";
import sun from "./../../assets/sun.svg";
import comet from "./../../assets/comet.svg";

import React, { useEffect, useState } from "react";

export enum cardStatus {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

export enum cardValue {
  MOON = "moon",
  STAR = "star",
  SUN = "sun",
  COMET = "comet",
}

interface cardProps {
  value: string;
  status: string;
  revealCard(index: number): void;
  disabled: boolean;
  index: number;
  paired: boolean;
}

const Card = ({
  value,
  status,
  revealCard,
  disabled,
  index,
  paired,
}: cardProps) => {
  const [animation, setAnimation] = useState("cardContainer flip-card");
  let image;
  switch (value) {
    case "moon":
      image = moon;
      break;
    case "star":
      image = star;
      break;
    case "sun":
      image = sun;
      break;
    case "comet":
      image = comet;
      break;
  }
  useEffect(() => {
    if (status == "visible") {
      setAnimation("cardContainer flip-card flipping");
    } else {
      setAnimation("cardContainer flip-card hiddenCard");
    }
  }, [status]);

  return (
    <button
      className={animation}
      disabled={paired || disabled}
      onClick={() => {
        revealCard(index);
      }}
    >
      <div className="flip-card-inner">
        {status == "visible" ? (
          <img
            className={
              status == "visible"
                ? "visibleCard flip-card-front"
                : "visibleCard flip-card-back"
            }
            alt="cardImage"
            src={image}
          ></img>
        ) : (
          <div
            className={
              status == "visible"
                ? "visibleCard flip-card-back"
                : "visibleCard flip-card-front"
            }
          >
            <span>?</span>
          </div>
        )}
      </div>
    </button>
  );
};

export default Card;
