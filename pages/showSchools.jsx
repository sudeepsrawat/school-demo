"use client";
import { useEffect, useState } from "react";
import "../styles/ShowSchools.css";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch("/api/getSchools")
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);

  return (
    <div className="schools-container">
      {schools.length > 0 ? (
        schools.map((school) => (
          <div key={school.id} className="school-card">
            <img
              src={school.image}
              alt={school.name}
              className="school-image"
            />
            <div className="school-info">
              <h2 className="school-name">{school.name}</h2>
              <p className="school-address">
                {school.address}, {school.city}
              </p>
              <p className="school-contact">📞 {school.contact}</p>
              <p className="school-email">✉️ {school.email_id}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="no-data">No schools found.</p>
      )}
    </div>
  );
}
