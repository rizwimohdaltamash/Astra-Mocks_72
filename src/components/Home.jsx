import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillDingtalkCircle } from "react-icons/ai";

const Home = () => {

    const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/intro');  // Uncommented this line
    }, 2000);

    return () => clearTimeout(timer);  // Cleanup the timeout if the component unmounts
  }, [navigate]);
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      // This div serves as the background container with a gradient that spans the entire screen height
    >
      <div className="h-[96vh] w-[97vw] flex flex-col items-center gap-20 justify-center rounded-lg shadow-lg bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg">
        {/* Container for content with a frosted glass effect */}

        {/* Image or logo section */}
        <div className="flex flex-col items-center text-white">
         
          <AiFillDingtalkCircle size={108} />
          {/* Replace 'your-logo-url-here' with the actual URL of your logo */}
        </div>

        {/* Main heading section */}
        <div className="text-white flex flex-col gap-12 items-center text-center justify-center">
          <div className="text-xl md:text-4xl lg:text-5xl font-bold md:font-bold w-full md:w-[50%] lg:w-[40%]">
            <h1>Master Your Technical Interviews</h1>
            {/* Main headline for your website */}
          </div>

          {/* Subheading or description section */}
          <div className="text-lg md:text-3xl lg:text-2xl md:font-normal w-[95%] md:w-[80%] lg:w-[36%]">
            <p>
              Practice with hundreds of curated questions in JavaScript, ReactJS, MongoDB, ExpressJS, Firebase, and more. Elevate your coding skills and ace your next interview!
              <br />
              {/* Brief description of your website's purpose */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
