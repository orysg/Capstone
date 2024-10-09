import React from 'react';
import Sidebar from './Sidebar'; // Adjust the path as needed

const withSidebar = (WrappedComponent) => {
  return (props) => (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        <WrappedComponent {...props} />
      </div>
    </div>
  );
};

export default withSidebar;
