import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UploadedFiles = () => {
  const [fileUrl, setFileUrl] = useState([]);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        
        const response = await axios.get(`/api/public/`);
        setFileUrl(response); // Assuming the file path is returned
      } catch (error) {
        console.error('Error fetching file', error);
      }
    };

    console.log("file url", fileUrl);
    fetchFile();
  }, []);

  return (
    <div>
      <h2>Uploaded File</h2>
      <image src = {'api/public/1721158910349-Saeed-CoverLatter.pdf'}/>
      <ul>
        <li>
            ssss
            <image></image>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">Download File</a>
        </li>
      </ul>
    </div>
  );
};

export default UploadedFiles;
