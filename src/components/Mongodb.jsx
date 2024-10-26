import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";

const Mongodb = () => {
  const [, setTimeLeft] = useState(1200); // 60 seconds for the timer
  const [, setSubmitted] = useState(false);
  const [, setAnswers] = useState(Array(10).fill(null));
  const [, setCurrentQuestionIndex] = useState(0);
  const [showSolutionLink, ] = useState(false); // New state for showing the link

  


  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const navigate=useNavigate(); 
  // Use user-specific keys
  const userPrefix = user ? `${user.uid}_` : "";

  const EasyTestCompleted = localStorage.getItem(`${userPrefix}easymongotestCompleted`) === "true";
  const MediumTestCompleted = localStorage.getItem(`${userPrefix}mediummongotestCompleted`) === "true";
  const HardTestCompleted = localStorage.getItem(`${userPrefix}hardmongotestCompleted`) === "true";


  const handleEasyMongo = () => {
    localStorage.removeItem(`${userPrefix}timeLeft`);
    setTimeLeft(1200); // Reset the timer state to 60 seconds

    localStorage.removeItem(`${userPrefix}currentQuestionIndex`);
    setAnswers(Array(10).fill(null));
    setCurrentQuestionIndex(0);

    localStorage.removeItem(`${userPrefix}quizAnswers`);
    setSubmitted(true);

    // Set isCompleted to true when the test is completed
    localStorage.removeItem(`${userPrefix}easymongotestCompleted`, "true");
    
   
  };

  const handleMediumMongo = () => {
    localStorage.removeItem(`${userPrefix}timeLeft`);
    setTimeLeft(1200); // Reset the timer state to 60 seconds

    localStorage.removeItem(`${userPrefix}currentQuestionIndex`);
    setAnswers(Array(10).fill(null));
    setCurrentQuestionIndex(0);

    localStorage.removeItem(`${userPrefix}quizAnswers`);
    setSubmitted(true);

    // Set isCompleted to true when the test is completed
    
    localStorage.removeItem(`${userPrefix}mediummongotestCompleted`, "true");
    
   
  };

  const handleHardMongo = () => {
    localStorage.removeItem(`${userPrefix}timeLeft`);
    setTimeLeft(1200); // Reset the timer state to 60 seconds

    localStorage.removeItem(`${userPrefix}currentQuestionIndex`);
    setAnswers(Array(10).fill(null));
    setCurrentQuestionIndex(0);

    localStorage.removeItem(`${userPrefix}quizAnswers`);
    setSubmitted(true);

    // Set isCompleted to true when the test is completed
    
    localStorage.removeItem(`${userPrefix}hardmongotestCompleted`, "true");
   
  };

  const handleMongoSol = () => {
    localStorage.removeItem(`${userPrefix}currentQuestionIndex`);
    setAnswers(Array(10).fill(null));
    setCurrentQuestionIndex(0);   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="lg:h-[80vh] lg:w-[90vw] w-[95vw] relative flex flex-col items-center gap-12 justify-center rounded-lg shadow-lg bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg p-8">
        {/* Container for content with a frosted glass effect */}
        <div className="absolute left-2 top-2" onClick={() => navigate('/intro')} >
            <button className="text-purple-400"><IoArrowBackCircle  size={40} /></button>
            
          </div>

        {/* Main heading section */}
        <div className="text-white flex flex-col gap-6 items-center text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Choose Your Challenge
          </h1>
          <p className=" text-lg md:text-2xl">
            Select a difficulty level to start practicing and enhance your
            skills.
          </p>
        </div>

        {/* Difficulty level containers */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
         
            {/* Easy Level Container */}
          <div className="flex flex-col gap-y-4" >
        
          <Link to="/mongodb/easymongo" onClick={handleEasyMongo}>
          <div className="w-64 h-40 border-4 border-green-500 rounded-lg p-6 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:bg-green-200 group">
            <h2 className="text-2xl font-bold text-green-500">Easy</h2>
            <p className="text-center mt-2 text-white group-hover:text-gray-600">
              Start with the basics.
            </p>
          </div>
          </Link>
        
           
           {/* Conditionally render the Easy Solutions card */}
           {EasyTestCompleted ? (
              <Link to="/mongodb/easymongosols" onClick={handleMongoSol}>
                <div className="w-64 h-40 border-4 border-green-500 rounded-lg p-6 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:bg-green-200 group">
                  <h2 className="text-2xl font-bold text-green-500">Easy Soln</h2>
                  <p className="text-center mt-2 text-white group-hover:text-gray-600">
                    Correct Yourself By referring to the solutions
                  </p>
                </div>
              </Link>
            ) : (
              <div className="w-64 h-40 border-4 border-gray-500 rounded-lg p-6 flex flex-col justify-center items-center opacity-50 cursor-not-allowed">
                <h2 className="text-2xl font-bold text-gray-500">Easy Soln </h2>
                <div className="text-2xl text-gray-700"> <IoIosLock size={28} /></div>
               
                <p className="text-center mt-2 text-white">
                  Complete the mock to unlock.
                </p>
              </div>
            )}

         
          </div>
          


          

          {/* Medium Level Container */}
          <div className="flex flex-col gap-y-4" >

          <Link to="/mongodb/mediummongo" onClick={handleMediumMongo}>
          <div className="w-64 h-40 border-4 border-yellow-600 rounded-lg p-6 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:bg-yellow-200 group">
            <h2 className="text-2xl font-bold text-yellow-600">Medium</h2>
            <p className="text-center mt-2 text-white group-hover:text-gray-600">
              Challenge yourself with more complexity.
            </p>
          </div>
          </Link>

          {/* {showSolutionLink && ( */}
          {MediumTestCompleted ? (
          <Link to="/mongodb/mediummongosols" onClick={handleMongoSol}>
          <div className="w-64 h-40 border-4 border-yellow-600 rounded-lg p-6 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:bg-yellow-200 group">
            <h2 className="text-2xl font-bold text-yellow-600 ml-12">Medium Soln</h2>
            <p className="text-center mt-2 text-white group-hover:text-gray-600">
              Corect Yourself By reffering to the solutions
            </p>
          </div>
          </Link>
           ) : (<div className="w-64 h-40 border-4 border-gray-500 rounded-lg p-6 flex flex-col justify-center items-center opacity-50 cursor-not-allowed">
            <h2 className="text-2xl font-bold text-gray-500">Medium Soln </h2>
            <div className="text-2xl text-gray-700"> <IoIosLock size={28} /></div>
           
            <p className="text-center mt-2 text-white">
              Complete the mock to unlock.
            </p>
          </div>
        )}

          {/* )} */}

          </div>

          {/* Hard Level Container */}
          <div className="flex flex-col gap-y-4" >

          <Link to="/mongodb/hardmongo" onClick={handleHardMongo}>
          <div className="w-64 h-40 border-4 border-red-500 rounded-lg p-6 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:bg-red-200 group">
            <h2 className="text-2xl font-bold text-red-500">Hard</h2>
            <p className="text-center mt-2 text-white group-hover:text-gray-600">
              Test your skills with advanced questions.
            </p>
          </div>
          </Link>

          {/* {showSolutionLink && ( */}
          {HardTestCompleted ? (
          <Link to="/mongodb/hardmongosols" onClick={handleMongoSol}>
          <div className="w-64 h-40 border-4 border-red-600 rounded-lg p-6 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:bg-yellow-200 group">
            <h2 className="text-2xl font-bold text-red-600">Hard Soln</h2>
            <p className="text-center mt-2 text-white group-hover:text-gray-600">
              Corect Yourself By reffering to the solutions
            </p>
          </div>
          </Link> ) : (<div className="w-64 h-40 border-4 border-gray-500 rounded-lg p-6 flex flex-col justify-center items-center opacity-50 cursor-not-allowed">
            <h2 className="text-2xl font-bold text-gray-500">Hard Soln </h2>
            <div className="text-2xl text-gray-700"> <IoIosLock size={28} /></div>
           
            <p className="text-center mt-2 text-white">
              Complete the mock to unlock.
            </p>
          </div>
        )}

          {/* )} */}

          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Mongodb;


