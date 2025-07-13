import React, { useState, useEffect } from "react";
import { fromIlsToCoin } from "./Utils";

const DonationProgressBar = ({ currentSum, numOfDon, coin }) => {
  const [goal] = useState(1000000);

  const currentCoin = coin || { type: 'SHEKEL', dollarRate: 3.5 };

  const displayedAmount = fromIlsToCoin(currentSum, currentCoin.type, currentCoin.dollarRate);
  const displayedGoal = fromIlsToCoin(goal, currentCoin.type, currentCoin.dollarRate);

  const currencySymbol = currentCoin.type === 'SHEKEL' ? '₪' : '$';

  const progressPercentage = displayedGoal > 0 ? Math.min((displayedAmount / displayedGoal) * 100, 100) : 0;

  return (
    <div className="progress-container">
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progressPercentage.toFixed(2)}%` }}
        ></div>
      </div>
      <div className="progress-info">
        <span>{currencySymbol}{Math.floor(displayedAmount)}</span> מתוך <span>{currencySymbol}{Math.floor(displayedGoal)}</span>
        <br />
        <span>{progressPercentage.toFixed(1)}%</span> הושג ע"י{" "}
        <span>{numOfDon}</span> תורמים
        <br />
        {progressPercentage >= 100 && (
          <span style={{ color: "crimson", fontWeight: "bold" }}>
            עברת את היעד בהצלחה!
          </span>
        )}
      </div>
    </div>
  );
};

export default DonationProgressBar;
