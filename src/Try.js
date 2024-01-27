import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    taskname: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3005/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Details stored successfully!");
        alert('Successful store the details!');
        
        // Clear the form fields
        setFormData({
          taskname: "",
          description: "",
        });
        
        // You can redirect the user to a different page after successful signup
      } else {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="top-margin"></div>
      <div className="signup-container">
        <div className="signup-form">
          <h1 className="signup-heading"></h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="taskname">Task Name</label>
              <input
                type="text"
                className="form-control"
                id="taskname"
                placeholder="Enter Task Name"
                name="taskname"
                value={formData.taskname}
                onChange={handleChange}
                required
              />
            </div>

            {/* Additional form fields */}
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Enter Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="text-center">
              <button
                className="signup-button"
                type="submit"
                disabled={!formData.taskname || !formData.description}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="bottom-margin"></div>
      <div style={{ margin: '40px 0' }}></div>
    </>
  );
};

export default Signup;
