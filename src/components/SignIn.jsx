import React from 'react';
import { Card, Button, Input } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';


const SignInPage = ({ onSignIn }) => {
  const handleSignIn = (e) => {
    e.preventDefault();
    onSignIn();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Courier Management POC</h1>
          <h2 className="text-xl font-semibold text-gray-600">Welcome Back</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <Input prefix={<MailOutlined />} placeholder="Enter your email" size="large" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" size="large" />
          </div>
          <Button 
            type="primary" 
            size="large" 
            block 
            onClick={handleSignIn}
            className="bg-gradient-to-r from-blue-500 to-purple-500 border-0 h-12 font-semibold"
          >
            Sign In
          </Button>
          <div className="text-center mt-4">
            <a href="#" className="text-blue-500 hover:text-blue-700">Forgot Password?</a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignInPage;
