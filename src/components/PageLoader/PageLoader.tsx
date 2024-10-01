import React from 'react';
import './PageLoader.scss';

const PageLoader: React.FC = () => {
  return (
    <div className="page-loader">
      <div className="spinner"></div>
    </div>
  );
};

export default PageLoader;