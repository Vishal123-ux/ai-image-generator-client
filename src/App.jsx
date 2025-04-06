import { useState } from 'react';
import './App.css';
import Header from './Components/Header.jsx';

function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const generateImage = async () => {
    if (!prompt.trim()) return alert('Please enter a prompt.');
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (data.url) {
        setResults(prev => [...prev, { prompt, url: data.url }]);
        setPrompt('');
      } else {
        alert('No image URL returned.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Header />

      <main className={`main ${results.length > 0 ? 'shrink' : ''}`}>
        <div className="results">
          {results.map((item, index) => (
            <div key={index} className="result-card" onClick={() => setSelectedImage(item)}>
              <img src={item.url} alt="Result" className="result-image" />
              <p className="result-prompt">{item.prompt}</p>
            </div>
          ))}
        </div>

        <div className="input-group">
          <input
            type="text"
            className="input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A futuristic city at sunset"
          />
          <button
            className="button"
            onClick={generateImage}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </main>

      {selectedImage && (
        <div className="overlay" onClick={() => setSelectedImage(null)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.url} alt="Full View" className="popup-image" />
            <p className="popup-prompt">{selectedImage.prompt}</p>
            <a href={selectedImage.url} download className="download-button">Download</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
