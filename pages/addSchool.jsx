import { useState } from "react";
import "../styles/AddSchoolForm.css";

export default function AddSchool() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    email_id: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "School name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.contact) newErrors.contact = "Contact is required";
    if (!formData.email_id) {
      newErrors.email_id = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email_id)) {
      newErrors.email_id = "Invalid email format";
    }
    if (!formData.image) newErrors.image = "Please select an image";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setMessage("");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setMessage("School added successfully ✅");
        setFormData({
          name: "",
          address: "",
          city: "",
          state: "",
          contact: "",
          email_id: "",
          image: null,
        });
        document.getElementById("imageInput").value = "";
      } else {
        setMessage("Error adding school ❌");
      }
    } catch (err) {
      setMessage("Server error ❌");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New School</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="school-form">
        <div className="form-group">
          <label>School Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && <span className="error">{errors.city}</span>}
          </div>

          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
            {errors.state && <span className="error">{errors.state}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
            {errors.contact && <span className="error">{errors.contact}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email_id"
              value={formData.email_id}
              onChange={handleChange}
            />
            {errors.email_id && (
              <span className="error">{errors.email_id}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Upload Image</label>
          <input
            type="file"
            id="imageInput"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          {errors.image && <span className="error">{errors.image}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Add School
        </button>
      </form>
    </div>
  );
}
