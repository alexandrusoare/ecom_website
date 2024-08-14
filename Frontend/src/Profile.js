import React, { useEffect, useState } from 'react';
import { useLogin } from './LoginContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css'

const Profile = () => {
  const { loggedIn,setLoggedIn, userId } = useLogin(); // Access loggedIn and userId from context
  const [userInfo, setUserInfo] = useState(null);
  const [rentedCourses, setRentedCourses] = useState([]);
  const [boughtCourses, setBoughtCourses] = useState([]);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO'); // Adjust locale as needed
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    navigate('/');
  }

  useEffect(() => {
    if (loggedIn && userId) {
      // Fetch the user's general info using userId
      fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(data => {
          setUserInfo(data); // Update the state with the user's info
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
  
      // Fetch the user's rented courses
      fetch(`/api/users/rented-courses/${userId}`)
        .then(response => response.json())
        .then(data => {
          setRentedCourses(data); // Update the state with the rented courses
        })
        .catch(error => {
          console.error('Error fetching rented courses:', error);
        });
  
      // Fetch the user's bought courses
      fetch(`/api/users/bought-courses/${userId}`)
        .then(response => response.json())
        .then(data => {
          setBoughtCourses(data);
          console.log(boughtCourses)
          console.log(rentedCourses)
          // Update the state with the bought courses
        })
        .catch(error => {
          console.error('Error fetching bought courses:', error);
        });
    }
  }, [loggedIn, userId]);

  return (<div>
    <button className='sign-out' onClick={handleSignOut}>Sign Out</button>
    <div className='general'>
      <h2 className='title'>General Information</h2>
      {userInfo ? (
        <div>
          <p><b>Name:</b> {userInfo.name}</p>
          <p><b>Username:</b> {userInfo.username}</p>
          <p><b>Email:</b> {userInfo.email}</p>
          <p><b>Phone:</b> {userInfo.phone}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
    <div className='general'>
  <h2 className='title'>Rented Courses</h2>
  {rentedCourses.length > 0 ? (
    <div>
    {
      rentedCourses.map(x=>{
        return(<div className='delimit'>
          <p><b>Title:</b> {x.course.title}</p>
          <p><b>Rental Start Date:</b> {formatDate(x.rentalStartDate)}</p>
          <p><b>Rental End Date:</b> {formatDate(x.rentalEndDate)}</p>
        </div>)

      })
    }</div>
  ) : (
    <p>No course rented yet</p>
  )}
</div>

<div className='general'>
  <h2 className='title'>Bought Courses</h2>
  {boughtCourses.length > 0 ? (
    <div >
    {
      boughtCourses.map(x=>{
        return(<div className='delimit'>
          <p><b>Title:</b> {x.course.title}</p>
          <p><b>Course Description:</b> {x.course.description}</p>
          <p><b>Course Price: </b> {x.course.price}</p>
          <p><b>Date of acquisition:</b> {formatDate(x.purchaseDate)}</p>
        </div>)
      })
    }</div>
  ) : (
    <p>No course bought yet</p>
  )}
</div>
    </div>
  );
};

export default Profile;
