import React, { useEffect, useState } from 'react';
import './Courses.css';
import { useLogin } from './LoginContext';

function Courses() {
  const [courses, setCourses] = useState([]);
  const { addToCart } = useLogin();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    price: '',
    rentalPrice: '',
    duration: '',
  });

  

  useEffect(() => {
    // Fetch courses data from your API
    fetch('/api/courses')
      .then(response => response.json())
      .then(data => {
        setCourses(data); // Update the courses state with fetched data
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleBuyClick = (course) => {
    addToCart(course, 'buy'); // Call addToCart function with the course and type
  };

  const handleRentClick = (course) => {
    addToCart(course, 'rent'); // Call addToCart function with the course and type
  };

  const handleAddCourse = async () => {
    if (!newCourse.title || !newCourse.description || !newCourse.price || !newCourse.rentalPrice || !newCourse.duration) {
      console.error('All fields are required.');
      return;
    }
  
    // Validate that price, rentalPrice, and duration are numbers
    if (isNaN(newCourse.price) || isNaN(newCourse.rentalPrice) || isNaN(newCourse.duration)) {
      console.error('Price, rentalPrice, and duration must be numbers.');
      return;
    }
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse),
      });

      if (response.ok) {
        const addedCourse = await response.json();
        setCourses([...courses, addedCourse]);
        setIsPopupVisible(false);
        setNewCourse({
          title: '',
          description: '',
          price: '',
          rentalPrice: '',
          duration: '',
        });
      } else {
        console.error('Error adding course:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className="container">
      <h2 id="title">Courses</h2>
      <button
        id="add"
        title="Add course"
        onClick={() => setIsPopupVisible(true)}
      >
        <span className="plus">+</span>
      </button>
      {isPopupVisible && (
        <div className="popup-card">
          <h2 id="popup-title">Add Course</h2>
          {Object.keys(newCourse).map((key) => (
            <div className="popup-grid" key={key}>
              <label className="popup-label">{key}</label>
              <input
                className="popup-input"
                value={newCourse[key]}
                onChange={(e) =>
                  setNewCourse((prevCourse) => ({
                    ...prevCourse,
                    [key]: e.target.value,
                  }))
                }
              />
            </div>
          ))}
          <div id="btn-popup">
            <button onClick={() => setIsPopupVisible(false)}>Cancel</button>
            <button onClick={handleAddCourse}>Add course</button>
          </div>
        </div>
      )}
      <div className="card-container">
        {courses.map((course, index) => (
          <div key={course._id} className="card">
            <div className="thumbnail">
              <p className="tbh-title">{`Course #${index + 1}`}</p>
            </div>
            <h3 className="title">{course.title}</h3>
            <p>{course.description}</p>
            <p className="price">
              <b>Buy Price:</b> ${course.price}
            </p>
            <p className="price">
              <b>Rental Price:</b> ${course.rentalPrice}
            </p>
            <div className="btn-container">
              <button
                className="rent"
                onClick={() => handleRentClick(course)}
              >
                Rent
              </button>
              <button className="buy" onClick={() => handleBuyClick(course)}>
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
