import React, {useState} from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleChange = e => {
    const newImage = e.target.files[0];
    setImage(newImage)
  }

  const handleSubmit = async () => {
    setUploading(true)

    const formData = new FormData()

    
    formData.append('addImg_file', image);
    formData.append('addImg_dev', 5);

    console.log('formData', formData)
    
    try {
      const response = await fetch(`http://test2.inel.gda.pl/img.json`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-type': 'multipart/form-data',
          'inel-token': 'dGVzdHxUZXN0VXNlcjF8dGVzdA==',
          'Access-Control-Allow-Origin': '*'
        },
      })

      const data = response.json()
      console.log('data', data)
      setUploading(false)

    } catch (error) {

      setUploading(false)
      console.log('uploadImage error:', error)
      
    }
    
      
  }

  const handleDownload = async () => {
    const resp = await fetch(`http://test2.inel.gda.pl/gimg.json`)
    const data = resp.json()
    console.log(data)
  }

  return (
    <div className="App">
      <input type="file" onChange={handleChange} />
      <button onClick={handleSubmit}>Post</button>
      <button onClick={handleDownload}>Get</button>
      {uploading && <h1>Loading</h1>}
    </div>
  );
}

export default App;
