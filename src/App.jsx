import { useState } from 'react'
import './output.css';
import NotificationAlert from './NotificationAlert';
import ErrorAlert from './ErrorAlert';
import ReactPlayer from 'react-player/youtube';
import useMeasure from 'react-use-measure';

function App() {

  const [emailAddress, setEmailAddress] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [ref, bounds] = useMeasure();

  const videoURL = "https://youtu.be/TTwCqraaTRE"

  async function sendPostRequest() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailAddress)) {
      setShowAlert(true)
      return;
    }
    // Add your post request logic here
    const url = "https://i7o5ucp4jb.execute-api.eu-north-1.amazonaws.com/Prod/signup";
    const data = {
      // Your data here
      email: emailAddress
    };

    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((response) => {
        if (response.status === 200) {
          setShowInfo(true);
        }
        if (response.status === 500) {
          alert(response.statusText);
          console.error(response);
        }

        if (!response.ok) {
          console.error(response);
          throw new Error('Network response was not ok');
        }

        const responseData = response.json();
        console.log('Success:', responseData);
      });

      setEmailAddress('');

    } catch (error) {
      console.error('Error:', error);
    }
  };

  let videoHeight = (bounds.width/1920)*1080;
  console.log(videoHeight);

  return (
    <div>
      {showAlert ? <ErrorAlert message="Please enter a valid email address." onClose={() => setShowAlert(false)}/> : null}
      {showInfo ? <NotificationAlert message="Thank you for your interest! We will contact you shortly." onClose={() => setShowInfo(false)}/> : null}
      <div id="hero" className="mt-[5vh] mx-[5vw] lg:mx-64 py-8 bg-white/70 md:mx-auto max-w-fit">
        <p className="pl-5 text-5xl text-left font-black font-[Palatino] drop-shadow-xl">
          Focus on Work,
          <br /> Not the Search
        </p>
        <div ref={ref} className="px-4 text-lg justify-normal">
          <p className="mt-10">
          Do you have dozens of files but don’t know which one contains the information you need?
            <br />
            Standard search tools rely on keywords, but what if you don’t know the correct one?
          </p>
          <p className="mt-8">
            Check <span className="font-bold italic">datalogue!</span>
            <br />
             Create a collection of documents you need, ask your question,
            <br />
            and get precise answers with sources — saving you time and effort.
          </p>
          <ReactPlayer url={videoURL} className="mt-4 md:mx-auto max-w-full" style={{ maxHeight: `${videoHeight}px` }} />
          
          <p className="mt-10 font-semibold text-lg">Key Benefits:</p>
          <ul className="*:text-lg">
            <li>
              <span className="italic underline underline-offset-4">Save Time:</span> Get accurate answers without
              digging through files.
            </li>
            <li>
              <span className="italic underline underline-offset-4">Effortless Selection:</span> Quickly choose which
              documents to use.
            </li>
            <li>
              <span className="italic underline underline-offset-4">Verified Answers:</span> Always see the sources
              behind every response.
            </li>
          </ul>
          <p className="mt-16">
            Take control of your document-driven tasks today!
            <br />
            Leave your contact to book a demo.
          </p>
          <form className="flex flex-row items-center space-x-4 max-w-[400px] mt-4">
            <label className="block flex-grow">
              <input
                id="emailAddres"
                type="email"
                className="w-full placeholder:text-sm placeholder:text-slate-400 placeholder:px-2 border-[1px] border-black shadow-lg"
                placeholder="Leave your email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </label>
            <button
              className="shadow-lg bg-black hover:bg-blue-900 text-white text-sm font-semibold py-2 px-4 transition-colors duration-300"
              type="button"
              onClick={sendPostRequest}
            >
              Book demo
            </button>
          </form>
        </div>
      </div>
      <div id="footer" className="mx-auto bottom-0 w-full bg-white/70 text-center py-4">
        Designed by Paweł Czajkowski 2025
      </div>
    </div>
  );
}

export default App
