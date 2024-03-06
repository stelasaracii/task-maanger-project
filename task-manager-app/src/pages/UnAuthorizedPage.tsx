import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const UnauthorizedScreen = () => {
  return (
    <div className="text-center p-4">
      <h2 className="mb-4 font-weight-bold">
        Unauthorized Access
      </h2>
      <p className="mb-4" style={{fontSize: '1.25rem'}}>
        You don't have permission to access this page.
      </p>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="primary">Go to Home</Button> 
      </Link>
    </div>
  );
};

export default UnauthorizedScreen;
