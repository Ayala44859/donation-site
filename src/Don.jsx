// src/Don.jsx
/**
 * Single donation item component.
 * Displays a donation, including formatted date and currency conversion.
 */

import React from 'react';
import { fromIlsToCoin } from "./Utils";


const Don = ({ r, coin, onDelete, onEditStart }) => {

  const currencySymbol = coin.type === "SHEKEL" ? "₪" : "$";

  function formatDonationDate(date) {
    const donationTime = new Date(date);
    const now = new Date();
    const diffInMs = now - donationTime;
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

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
    <div className='donation-item'> {/* ודא שהקלאס הזה קיים ומוגדר ב-CSS */}
      <p>שם התורם:  {r.name}</p>
      <p>סך תרומה:  {currencySymbol}{Math.floor(fromIlsToCoin(r.sum, coin.type, coin.dollarRate))}</p>
      <p>הקדשה:  {r.dedication}</p>
      <p>תאריך תרומה:  {formatDonationDate(r.date)}</p>
      {/* וודא שהקלאס הוא `donation-actions` */}
      <div className='donation-actions'>
        <button onClick={() => onEditStart(r._id)}>ערוך</button>
        <button onClick={() => onDelete(r._id)}>מחק</button>
      </div>
    </div>
  );
}
export default Don;