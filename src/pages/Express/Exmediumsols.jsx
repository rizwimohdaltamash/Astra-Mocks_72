import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import FirstMediumEx from "../../assets/firstmediumex.jpg";
import SecondMediumEx from "../../assets/secondmediumex.jpg";
import ThirdMediumEx from "../../assets/thirdmediumex.jpg";
import FourthMediumEx from "../../assets/fourthmediumex.jpg";
import FifthMediumEx from "../../assets/fifthmediumex.jpg";
import SixthMediumEx from "../../assets/sixthmediumex.jpg";
import SeventhMediumEx from "../../assets/seventhmediumex.jpg";
import EigthMediumEx from "../../assets/eigthmediumex.jpg";
import NinthMediumEx from "../../assets/ninthmediumex.jpg";
import TenthMediumEx from "../../assets/tenthmediumex.jpg";

const Exmediumsols = () => {
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
      question: "1) How can you use middleware to log requests in Express.js ?",
      options: [
        "a) Create a middleware function that logs the request method and URL, and use app.use() to apply it to all routes",
        "b) Express automatically logs all requests without needing any middleware setup",
        "c) Define a custom logging middleware that uses console.log() to display request details and attach it to specific routes",
        "d) Implement logging by adding a logRequest() function directly in each route handler to log details",
      ],
      correctAnswer:
        "a) Create a middleware function that logs the request method and URL, and use app.use() to apply it to all routes",
      image: FirstMediumEx,
    },
    {
      question:
        "2) How do you work with query parameters and URL parameters in Express.js ?",
      options: [
        "a) Use req.query to access query parameters and req.params to access URL parameters defined in the route",
        "b) URL parameters are automatically extracted from the request body without needing special handling",
        "c) Query parameters can only be accessed using middleware, while URL parameters are not supported in Express",
        "d) You can only use query parameters for GET requests and URL parameters for POST requests in Express.js",
      ],
      correctAnswer:
        "a) Use req.query to access query parameters and req.params to access URL parameters defined in the route",
      image: SecondMediumEx,
    },
    {
      question:
        "3) What is CORS, and how do you enable it in an Express.js application ?",
      options: [
        "a) CORS stands for Cross-Origin Resource Sharing, and it can be enabled by adding custom headers in each response",
        "b) CORS is a security feature that prevents any cross-origin requests, and it is enabled by default in Express.js",
        "c) CORS is used to allow secure access to resources from different domains, and you enable it using a specific environment variable",
        "d) CORS stands for Cross-Origin Resource Sharing, and you can enable it in Express.js by using the cors middleware package",
      ],
      correctAnswer:
        "d) CORS stands for Cross-Origin Resource Sharing, and you can enable it in Express.js by using the cors middleware package",
      image: ThirdMediumEx,
    },
    {
      question: "4) How do you handle file uploads in Express.js ?",
      options: [
        "a) Use the built-in body-parser middleware to process files sent as form data",
        "b) Utilize the multer middleware to handle multipart/form-data, which is used for uploading files",
        "c) Express.js automatically handles file uploads without any additional middleware",
        "d) File uploads can only be managed by saving them directly to the file system without middleware support",
      ],
      correctAnswer:
        "b) Utilize the multer middleware to handle multipart/form-data, which is used for uploading files",
      image: FourthMediumEx,
    },
    {
      question:
        "5) How can you connect an Express.js application to a MongoDB database ?",
      options: [
        "a) Use the built-in MongoDB driver to establish a connection using MongoClient.connect() directly in your app",
        "b) Create a connection pool using native JavaScript promises to manage database connections",
        "c) Utilize the Mongoose library to connect and interact with MongoDB using schemas and models",
        "d) Express.js has a built-in method for connecting to MongoDB without any external libraries",
      ],
      correctAnswer:
        "c) Utilize the Mongoose library to connect and interact with MongoDB using schemas and models",
      image: FifthMediumEx,
    },
    {
      question: "6) How do you handle session management in Express.js ?",
      options: [
        "a) Store user session data directly in the client-side cookies without any server-side management",
        "b) Use the express-session middleware to manage sessions and store session data on the server",
        "c) Sessions are managed automatically by Express.js, so no additional setup is required",
        "d) Handle sessions by passing session information through the URL for each request",
      ],
      correctAnswer:
        "b) Use the express-session middleware to manage sessions and store session data on the server",
      image: SixthMediumEx,
    },
    {
      question:
        "7) What is the difference between app.listen() and app.use() in Express ?",
      options: [
        "a) app.listen() is used to start the server, while app.use() is used to register middleware functions",
        "b) app.use() is used to start the server, while app.listen() is used to define routes",
        "c) app.listen() is for defining routes, while app.use() handles HTTP methods only",
        "d) app.use() is only for serving static files, while app.listen() is used for dynamic content",
      ],
      correctAnswer:
        "a) app.listen() is used to start the server, while app.use() is used to register middleware functions",
      image: SeventhMediumEx,
    },
    {
      question:
        "8) How do you secure an Express.js app from common web vulnerabilities (e.g., CSRF, XSS) ?",
      options: [
        "a) Use a single security measure, like input validation, to protect against all vulnerabilities",
        "b) Rely on the default security settings of Express.js, as they are sufficient for most applications",
        "c) Only implement security measures for user authentication and ignore other parts of the app",
        "d) Implement multiple security measures such as using Helmet for HTTP headers, CSRF tokens, and input sanitization",
      ],
      correctAnswer:
        "d) Implement multiple security measures such as using Helmet for HTTP headers, CSRF tokens, and input sanitization",
      image: EigthMediumEx,
    },
    {
      question: "9) What is req and res in Express.js, and how do they work ?",
      options: [
        "a) req is the request object that contains data sent by the client, while res is the response object that sends data back to the client",
        "b) req and res are functions that handle HTTP requests and responses without storing any data",
        "c) req represents the response object, while res represents the request object in an Express app",
        "d) req is the request object that contains data sent by the client, while res is the response object that sends data back to the client, allowing for request handling and response management",
      ],
      correctAnswer:
        "d) req is the request object that contains data sent by the client, while res is the response object that sends data back to the client, allowing for request handling and response management",
      image: NinthMediumEx,
    },
    {
      question: "10) How can you implement JWT authentication in Express.js ?",
      options: [
        "a) Store user credentials in a database and retrieve them on every request to verify authentication",
        "b) Use sessions and cookies instead of JWT for managing user authentication in Express.js",
        "c) Generate a JWT upon user login, send it to the client, and use it to authenticate subsequent requests by verifying the token on the server",
        "d) Rely on basic authentication methods by sending username and password with every request",
      ],
      correctAnswer:
        "c) Generate a JWT upon user login, send it to the client, and use it to authenticate subsequent requests by verifying the token on the server",
      image: TenthMediumEx,
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

export default Exmediumsols;
