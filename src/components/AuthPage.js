import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
    userType: 'regular',
  });
  const navigate = useNavigate();

  const handleToggle = (value) => {
    setIsLogin(value === 1);
    setFormData({ ...formData, email: '', confirmPassword: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'register';
    axios.post(`http://localhost:3001/${endpoint}`, formData)
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          navigate('/admin');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <ToggleButtonGroup type="radio" name="authType" defaultValue={1} className="mb-3" onChange={handleToggle}>
            <ToggleButton id="tbg-radio-1" value={1}>
              Sign In
            </ToggleButton>
            <ToggleButton id="tbg-radio-2" value={2}>
              Sign Up
            </ToggleButton>
          </ToggleButtonGroup>
          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
              </Form.Group>
            )}

            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" name="username" value={formData.username} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
            </Form.Group>

            {!isLogin && (
              <>
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formUserType">
                  <Form.Label>User Type</Form.Label>
                  <Form.Control as="select" name="userType" value={formData.userType} onChange={handleChange}>
                    <option value="regular">Regular User</option>
                    <option value="super">Super User</option>
                  </Form.Control>
                </Form.Group>
              </>
            )}

            <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AuthPage;
