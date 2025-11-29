import React, { useState } from 'react';
import { Card, Button, Input, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import authService from '../services/authService';

const SignInPage = ({ onSignIn }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      message.error('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      await authService.login(credentials);
      message.success('Login successful!');
      onSignIn();
    } catch (error) {

      message.error(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Courier Management POC</h1>
          <h2 className="text-xl font-semibold text-gray-600">Welcome Back</h2>
        </div>
        <div className="space-y-4">
          <form onSubmit={handleSignIn}>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input 
                prefix={<MailOutlined />} 
                placeholder="Enter your email" 
                size="large" 
                value={credentials.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                type="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Enter your password" 
                size="large" 
                value={credentials.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
            </div>
            <Button 
              type="primary" 
              size="large" 
              block 
              htmlType="submit"
              loading={loading}
              className="bg-gradient-to-r from-blue-500 to-purple-500 border-0 h-12 font-semibold"
            >
              Sign In
            </Button>
          </form>
          <div className="text-center mt-4">
            <a href="#" className="text-blue-500 hover:text-blue-700">Forgot Password?</a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignInPage;
