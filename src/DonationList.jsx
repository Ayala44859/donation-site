/**
 * Donation list component.
 * Shows all donations, supports searching by donor name and sorting by amount or date.
 * Uses the Don component for each donation.
 */

import React, { useState } from "react";
import Don from './Don'; 

const DonationList = ({ donations, coin }) => { 
  const [searchName, setSearchName] = useState(""); 
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

 const filteredAndSortedDonations = [...donations]
    .filter((donation) =>
      donation.name.toLowerCase().includes(searchName.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  return (
    <div className="donation-list">
      <h2>רשימת תרומות</h2>

      <input
        type="text"
        placeholder="חפש תרומה לפי שם"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />

      <div>
        <button onClick={() => requestSort('sum')}>
          מיון לפי סכום
        </button>
        <button onClick={() => requestSort('date')}>
          מיון לפי תאריך
        </button>
      </div>

      {/* 3. התיקון המרכזי - שימוש בקומפוננטה Don */}
      <ul>
        {filteredAndSortedDonations.map((donation) => (
          <li key={donation.id}>
            <Don r={donation} coin={coin} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonationList;