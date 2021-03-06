import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './registration-view.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';


export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');

  // Allows login with random credentials for existing user, no functionality for new users yet
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(Username, Password, Email, BirthDate);

    // Send a request to the server for authentication then call props.onLoggedIn(Username)
    props.onLoggedIn(Username);
  };

  axios.post('https://myflixapp0051.herokuapp.com/users', {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthDate
  })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });

  return (
    <div className="registration-view">
      <h3>Register as a New MyFlix User</h3>

      <Form className="registration-form">
        <Form.Group controlId="formBasicUsername" className="registration-item">
          <Form.Label>Create Username: </Form.Label>
          <Form.Control type="text" value={username} onChange={e => setusername(e.target.value)} placeholder="Username" />
          <Form.Text className="text-muted">Must be alphanumberic and have a minimum of 8 characters.</Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="registration-item">
          <Form.Label>Create Password: </Form.Label>
          <Form.Control type="password" value={password} onChange={e => setpassword(e.target.value)} placeholder="Password" />
          <Form.Text className="text-muted">Must be alphanumberic and have 8-15 characters.</Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail" className="registration-item">
          <Form.Label>Enter Email Address: </Form.Label>
          <Form.Control type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicBirthdate" className="registration-item">
          <Form.Label>Enter Date of Birth: </Form.Label>
          <Form.Control type="date" placeholder="YYYY-MM-DD" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
        </Form.Group>
      </Form>
      <div className="btns-reg">
        <Button type="submit" variant="success" className="button-registration" onClick={handleRegister}>Register</Button>
        {/* <Link to={"/"}>  */}
        <Button variant="secondary" className="button-cancel">Cancel</Button>
        {/* </Link>  */}
      </div>


    </div>
  );
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.instanceOf(Date).isRequired
  })
};