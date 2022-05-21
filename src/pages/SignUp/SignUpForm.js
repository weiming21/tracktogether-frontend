import user from '../../images/user.png';
import lock from '../../images/lock.png';
import emailicon from '../../images/email.png';
import phone from '../../images/phone.png';
import React, { useState, useEffect } from 'react';
import styles from './SignUp.module.css';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

function SignUpForm() {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    contactNo: '',
    password: '',
    cfmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    setFormErrors(validate(credentials));
    setIsSubmit(true);
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(credentials);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (
      !values.username ||
      !values.email ||
      !values.contactNo ||
      !values.password ||
      !values.cfmPassword
    ) {
      errors.name = 'Please key in all required fields';
    }
    return errors;
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <p>
          <img src={user} alt="user" className={styles.icon} />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={styles.field}
            value={credentials.username}
            onChange={handleChange}
          />
        </p>
        <p>
          <img src={emailicon} alt="email" className={styles.icon} />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className={styles.field}
            value={credentials.email}
            onChange={handleChange}
          />
        </p>
        <p>
          <img src={phone} alt="contactNo" className={styles.icon} />
          <input
            type="text"
            name="contactNo"
            placeholder="Contact Number"
            className={styles.field}
            value={credentials.contactNo}
            onChange={handleChange}
          />
        </p>
        <p>
          <img src={lock} alt="password" className={styles.icon} />
          <input
            type="text"
            name="password"
            placeholder="Password"
            className={styles.field}
            value={credentials.password}
            onChange={handleChange}
          />
        </p>
        <p>
          <img src={lock} alt="password" className={styles.icon} />
          <input
            type="text"
            name="cfmPassword"
            placeholder="Confirm Password"
            className={styles.field}
            value={credentials.cfmPassword}
            onChange={handleChange}
          />
        </p>
        <ColorButton variant="contained" type="submit">
          Sign Up
        </ColorButton>
      </form>
      <p>
        <span style={{ color: 'red' }}>{formErrors.name}</span>
      </p>
      {/* <br />
      {JSON.stringify(credentials)} */}
    </div>
  );
}

export default SignUpForm;
