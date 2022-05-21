import user from '../../images/user.png';
import lock from '../../images/lock.png';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

function LoginForm() {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
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
    if (!values.username || !values.password) {
      errors.name = 'Error';
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
        <div className="loginbutton">
          <ColorButton variant="contained" type="submit">
            Log In
          </ColorButton>
        </div>
      </form>
      <div className={styles.link}>
        <a href="#">Forgot password?</a> or <Link to="/signup">Sign Up</Link>
        <p>
          <Link to="/Home"> Go to Dashboard (test) </Link>
        </p>
      </div>
      <span style={{ color: 'red' }}>{formErrors.name}</span>
      <br />
      {JSON.stringify(credentials)}
    </div>
  );
}

export default LoginForm;
