import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import OpengraphReactComponent from 'opengraph-react';

const App = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");

  const handleShorten = async (event) => {
    async function fetchData(longUrl) {
      try {
        const response = await fetch('http://localhost:5000/api/url/shorten', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "longUrl": longUrl })
        });
        const jsonResponse = await response.json();
        setShortUrl(jsonResponse.shortUrl);
      } catch (error) {
        console.log('Failed to get shortUrl!', error);
      }
    };
    event.preventDefault()
    const longUrl = event.target.elements.longUrl.value
    setLongUrl(longUrl)
    fetchData(longUrl);
  };
  let OpengraphDom = <p></p>
  if (longUrl) {
    OpengraphDom = <OpengraphReactComponent
      site={longUrl}
      appId="a82760be-e6fb-4fa0-96b1-fb17c670fedc"
      size={'small'}
    />
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleShorten}>
          <input type="text" name="longUrl" placeholder="Put longUrl here!" />
          <button type="submit">Shorten URL!</button>
        </form>

        <p>
          Here's your short URL:
          <a href={shortUrl} target="_blank">{shortUrl}</a>
        </p>
        {OpengraphDom}

      </header>
    </div>
  );
};

export default App;