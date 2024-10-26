import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import FirstEasyEx from "../../assets/firsteasyex.jpg";
import SecondEasyEx from "../../assets/secondeasyex.jpg";
import ThirdEasyEx from "../../assets/thirdeasyex.jpg";
import FourthEasyEx from "../../assets/fourtheasyex.jpg";
import FifthEasyEx from "../../assets/fiftheasyex.jpg";
import SixthEasyEx from "../../assets/sixtheasyex.jpg";
import SeventhEasyEx from "../../assets/seventheasyex.jpg";
import EigthEasyEx from "../../assets/eigtheasyex.jpg";
import NinthEasyEx from "../../assets/nintheasyex.jpg";
import TenthEasyEx from "../../assets/tentheasyex.jpg";

const Exeasysols = () => {
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const navigate = useNavigate();
  // Use user-specific keys
  const userPrefix = user ? `${user.uid}_` : "";

  const savedQuestionIndex =
    parseInt(localStorage.getItem(`${userPrefix}currentQuestionIndex`)) || 0;
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(savedQuestionIndex);
  const [submitted] = useState(false);
  const [showImage, setShowImage] = useState(false); // New state for image visibility
  // const [showPopup, setShowPopup] = useState(false);

  const questions = [
    {
      question: "1) What is Express.js, and why is it popular ?",
      options: [
        "a) A database system used for storing data",
        "b) A CSS framework for designing responsive web pages",
        "c) A web application framework for Node.js, known for its simplicity and flexibility",
        "d) A front-end library for creating user interfaces",
      ],
      correctAnswer:
        "c) A web application framework for Node.js, known for its simplicity and flexibility",
      image: FirstEasyEx,
    },
    {
      question: "2) How do you create a simple Express.js application ?",
      options: [
        "a) Define routes directly in the HTML file",
        "b) Import Express, create an app instance, define routes, and start a server with app.listen",
        "c) Use Express commands in the command line to automatically generate code",
        "d) Set up a React component and import Express into it",
      ],
      correctAnswer:
        "b) Import Express, create an app instance, define routes, and start a server with app.listen",
      image: SecondEasyEx,
    },
    {
      question: "3) What is middleware in Express.js, and how does it work ?",
      options: [
        "a) A built-in method that handles database connections in Express.js",
        "b) A module for handling front-end routing in Express.js",
        "c) A predefined set of functions in Express.js that runs before any route handler",
        "d) A function that has access to the request and response objects, and can modify or end the request-response cycle",
      ],
      correctAnswer:
        "d) A function that has access to the request and response objects, and can modify or end the request-response cycle",
      image: ThirdEasyEx,
    },
    {
      question:
        "4) What is the difference between app.use() and app.get() in Express.js ?",
      options: [
        "a) app.use() is for handling GET requests, while app.get() handles all types of requests",
        "b) app.use() is used to define routes, and app.get() is used to set up middleware",
        "c) app.use() is only used for error handling, while app.get() handles regular routes",
        "d) app.use() is for applying middleware to all routes, while app.get() is specifically for handling GET requests on a specific route",
      ],
      correctAnswer:
        "d) app.use() is for applying middleware to all routes, while app.get() is specifically for handling GET requests on a specific route",
      image: FourthEasyEx,
    },
    {
      question: "5) Explain how routing works in Express.js ?",
      options: [
        "a) Routing in Express.js allows you to define various endpoints (URLs) in the application that perform specific actions based on the HTTP method and URL pattern",
        "b) Routing in Express.js automatically sets up RESTful API routes that handle CRUD operations without additional configuration",
        "c) Routing in Express.js is used to specify middleware functions that execute only for POST requests",
        "d) Routing in Express.js requires defining all routes within a single file to ensure proper handling of HTTP requests",
      ],
      correctAnswer:
        "a) Routing in Express.js allows you to define various endpoints (URLs) in the application that perform specific actions based on the HTTP method and URL pattern",
      image: FifthEasyEx,
    },
    {
      question:
        "6) How do you handle different HTTP methods in Express (GET, POST, PUT, DELETE) ?",
      options: [
        "a) Express automatically identifies the HTTP method based on the route name without any specific method calls",
        "b) You can only handle GET and POST methods in Express; other methods require additional libraries",
        "c) All HTTP methods in Express are handled using the app.use() function",
        "d) You use specific functions like app.get(), app.post(), app.put(), and app.delete() to handle each HTTP method separately",
      ],
      correctAnswer:
        "d) You use specific functions like app.get(), app.post(), app.put(), and app.delete() to handle each HTTP method separately",
      image: SixthEasyEx,
    },
    {
      question: "7) How can you serve static files in Express.js ?",
      options: [
        "a) Use the express.static middleware to specify a folder for serving static files like images, CSS, and JavaScript",
        "b) Configure a route for each static file and manually send files using res.sendFile()",
        "c) Load static files directly in the HTML templates without any configuration in Express",
        "d) Static files cannot be served in Express.js, only dynamic content is supported",
      ],
      correctAnswer:
        "a) Use the express.static middleware to specify a folder for serving static files like images, CSS, and JavaScript",
      image: SeventhEasyEx,
    },
    {
      question:
        "8) What is the role of the next() function in Express.js middleware ?",
      options: [
        "a) It stops the request-response cycle and sends the response back to the client immediately",
        "b) It passes control to the next middleware function in the stack or to the next route handler if no middleware remains",
        "c) It restarts the request from the beginning of the middleware stack",
        "d) It logs the details of the current request and then ends the response",
      ],
      correctAnswer:
        "b) It passes control to the next middleware function in the stack or to the next route handler if no middleware remains",
      image: EigthEasyEx,
    },
    {
      question: "9) How can you implement error handling in Express.js ?",
      options: [
        "a) Use the default error handler by calling next() without any parameters",
        "b) Implement error handling in Express by wrapping all route handlers in a try-catch block",
        "c) Set a global error handler function that automatically catches all errors without being explicitly defined",
        "d) Define an error-handling middleware function with four parameters: err, req, res, and next",
      ],
      correctAnswer:
        "d) Define an error-handling middleware function with four parameters: err, req, res, and next",
      image: NinthEasyEx,
    },
    {
      question:
        "10) Explain how to set up a basic authentication mechanism in Express.js ?",
      options: [
        "a) Use the express-basic-auth middleware to automatically handle all authentication tasks without additional configuration",
        "b) Implement middleware to check for a valid username and password in the request headers and respond accordingly",
        "c) Rely on session cookies to manage user authentication without requiring any password verification",
        "d) Configure authentication by simply defining routes that restrict access based on the HTTP method",
      ],
      correctAnswer:
        "b) Implement middleware to check for a valid username and password in the request headers and respond accordingly",
      image: TenthEasyEx,
    },
  ];

  // Fetch user's answers from localStorage
  const storedAnswers =
    JSON.parse(localStorage.getItem(`${userPrefix}quizAnswers`)) || [];

  // Handle next question
  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      localStorage.setItem(
        `${userPrefix}currentQuestionIndex`,
        currentQuestionIndex + 1
      );
    }
    setShowImage(false); // Hide image on next question
  };

  // Handle previous question
  const handlePrevClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      localStorage.setItem(
        `${userPrefix}currentQuestionIndex`,
        currentQuestionIndex - 1
      );
    }
    setShowImage(false); // Hide image on previous question
  };

  const handleImageClick = () => {
    setShowImage(!showImage); // Toggle image visibility
  };

  // Pagination handler
  const handlePaginationClick = (index) => {
    setCurrentQuestionIndex(index);
    localStorage.setItem(`${userPrefix}currentQuestionIndex`, index);
    setShowImage(false); // Hide image when changing questions
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
      {!submitted && (
        <div className="lg:w-[70vw] w-[100vw] lg:h-full bg-black bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg lg:p-12 p-4">
          {/* onClick={() => navigate('/javascript')} */}
          <div>
            <button
              className="text-purple-400 "
              onClick={() => navigate("/express")}
            >
              <IoArrowBackCircle size={40} />
            </button>
          </div>

          {/* Pagination */}
          <div className=" lg:w-full w-[100%] flex items-center justify-center mb-8 space-x-2">
            {questions.map((question, index) => {
              const userAnswer = storedAnswers[index];
              const isAnswered = userAnswer !== undefined;
              const isCorrect =
                isAnswered && userAnswer === question.correctAnswer;

              // Determine background color based on answer status
              const bgColor = isAnswered
                ? isCorrect
                  ? "bg-green-500"
                  : "bg-red-500"
                : "bg-yellow-500";

              return (
                <button
                  key={index}
                  className={`lg:px-4 px-2 lg:py-2 py-0 m-2 rounded-full border transition-colors ${
                    currentQuestionIndex === index
                      ? "bg-blue-500 text-white"
                      : ""
                  } ${bgColor} text-white`}
                  onClick={() => handlePaginationClick(index)}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          <h2 className="text-2xl font-bold mb-8 text-white ">
            {questions[currentQuestionIndex].question}
          </h2>
          <div className="flex flex-col gap-6 mb-8">
            {questions[currentQuestionIndex].options.map((option, index) => {
              const userAnswer = storedAnswers[currentQuestionIndex];
              const isCorrect =
                option === questions[currentQuestionIndex].correctAnswer;
              const isUserAnswer = option === userAnswer;

              return (
                <button
                  key={index}
                  className={`py-4 px-6 text-left w-full rounded-lg bg-white bg-opacity-20 text-white transition 
                ${
                  isCorrect
                    ? "ring-4 ring-green-600 bg-green-700 bg-opacity-40"
                    : ""
                }
                ${
                  !isCorrect && isUserAnswer
                    ? "ring-4 ring-red-600 bg-red-700 bg-opacity-40"
                    : ""
                }`}
                >
                  {option}
                  <div>
                    {isCorrect && (
                      <span className=" text-xs text-green-200">
                        Correct answer
                      </span>
                    )}
                    {!isCorrect && isUserAnswer && (
                      <span className="ml-2 text-xs text-red-200">
                        Your Answer
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex flex-row space-x-3 justify-center">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevClick}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Prev
              </button>
            )}
            {currentQuestionIndex < questions.length - 1 && (
              <button
                onClick={handleNextClick}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Next
              </button>
            )}
          </div>

          {/* Button to open the image */}

          <div className="lg:mb-4 lg:mt-0 mt-4">
            <button
              onClick={handleImageClick}
              className="py-2 px-4 bg-yellow-700 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              {showImage ? "Hide Solution" : "Show Solution"}
            </button>
          </div>
        </div>
      )}

      {/* Conditionally render the image */}
      {showImage && (
        <div className="bg-black lg:w-[70%] w-full mt-4 rounded-lg">
          <img
            src={questions[currentQuestionIndex].image}
            alt="Related"
            className="w-full h-auto"
          />
        </div>
      )}
    </div>
  );
};

export default Exeasysols;
