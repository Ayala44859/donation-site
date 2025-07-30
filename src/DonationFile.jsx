// DonationFile.jsx
/**
 * Donation form component.
 * Handles input validation (name, amount), manages form state, and calls the add-donation handler on submit.
 */

import React, { useEffect, useState } from 'react';

const DonationFile = ({ onSave, editingDonationId, donations }) => {
    const [formData, setFormData] = useState({
        name: "",
        sum: "",
        dedication: "",
        id: null,
        date: null,
    });

    const [myErrors, setMyErrors] = useState({});

    useEffect(() => {
        if (editingDonationId) {
            const donationToEdit = donations.find(d => d._id === editingDonationId); // **חפש לפי _id מה-Backend**
            if (donationToEdit) {
                setFormData({
                    name: donationToEdit.name,
                    sum: donationToEdit.sum,
                    dedication: donationToEdit.dedication,
                    id: donationToEdit._id, // **ב-MongoDB, ה-ID הוא _id**
                    date: donationToEdit.date,
                });
            }
        } else {
            setFormData({
                name: "",
                sum: "",
                dedication: "",
                id: null,
                date: null,
            });
        }
        setMyErrors({});
    }, [editingDonationId, donations]);

    const validate = () => {
        let err = {};
        if (!formData.name) err.name = "שם הוא שדה חובה";
        else if (formData.name.length < 3) err.name = "חובה לפחות 3 תווים";

        if (!formData.sum) err.sum = "סכום תרומה הוא שדה חובה";
        else if (formData.sum <= 0) err.sum = "סכום לא תקין";

        return err;
    };

    const save = (e) => {
        e.preventDefault();
        const result = validate();
        if (Object.keys(result).length === 0) {
            onSave({ ...formData, date: new Date() });
        } else {
            setMyErrors(result);
        }
    };

    const change = (e) => {
        let { name, value, type } = e.target;
        if (type === "number") value = +value;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    return (
        <>
            <form className="donFile" onSubmit={save}>
                <label>שם התורם</label>
                {myErrors.name && <div style={{ background: "pink" }}>{myErrors.name}</div>}
                <input type="text" name="name" value={formData.name} onChange={change} />

                <label>סכום התרומה</label>
                {myErrors.sum && <div style={{ background: "pink" }}>{myErrors.sum}</div>}
                <input type="number" name="sum" value={formData.sum} step="0.5" onChange={change} />

                <label>הקדשה</label>
                <input type="text" name="dedication" value={formData.dedication} onChange={change} />

                <input type="submit" value={editingDonationId ? "עדכן תרומה" : "תרום עכשיו"} />
            </form>
        </>
    );
}

export default DonationFile;