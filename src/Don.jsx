/**
 * Single donation item component.
 * Displays a donation, including formatted date and currency conversion.
 */

import React from 'react';
import { fromIlsToCoin } from "./Utils";


const Don = ({ r, coin }) => {

  const currencySymbol = coin.type === "SHEKEL" ? "₪" : "$";

  function formatDonationDate(date) {

    const donationTime = new Date(date);
    const now = new Date();

    // מחשבים את ההפרש במילישניות
    const diffInMs = now - donationTime;

    // המרות למידות זמן שונות
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // בדיקות לוגיות והחזרה של טקסט מתאים
    if (days > 0) {
      if (days === 1) return `לפני יום אחד`;
      return `לפני ${days} ימים`;
    }

    if (hours > 0) {
      if (hours === 1) return `לפני שעה`;
      return `לפני ${hours} שעות`;
    }

    if (minutes > 0) {
      if (minutes === 1) return `לפני דקה`;
      return `לפני ${minutes} דקות`;
    }

    return `ברגע זה`;
  }
  return (
    <div>
      <p>שם התורם:  {r.name}</p>
      <p>סך תרומה:  {currencySymbol}{Math.floor(fromIlsToCoin(r.sum, coin.type, coin.dollarRate))}</p>
      <p>הקדשה:  {r.dedication}</p>
      <p>תאריך תרומה:  {formatDonationDate(r.date)}</p>
    </div>
  );
}
export default Don;
