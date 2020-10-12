import React from 'react';
import { useParams } from "react-router-dom";

const View = () => {
  const params = useParams();
  const datasource = params.datasource || 'local';
  return (
    <div>
      <h1>View</h1>
      <ul>
        <li>I am a view of { params.path }</li>
        <li>I am a view from { datasource }</li>
      </ul>
    </div>
  );
};

export default View;
