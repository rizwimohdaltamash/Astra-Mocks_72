import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import FirstHardEx from "../../assets/firsthardex.jpg";
import SecondHardEx from "../../assets/secondhardex.jpg";
import ThirdHardEx from "../../assets/thirdhardex.jpg";
import FourthHardEx from "../../assets/fourthhardex.jpg";
import FifthHardEx from "../../assets/fifthhardex.jpg";
import SixthHardEx from "../../assets/sixthhardex.jpg";
import SeventhHardEx from "../../assets/seventhhardex.jpg";
import EigthHardEx from "../../assets/eigthhardex.jpg";
import NinthHardEx from "../../assets/ninthhardex.jpg";
import TenthHardEx from "../../assets/tenthhardex.jpg";

const Jshardsols = () => {
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

  const questions = [
    {
      question:
        "1) How do you use template engines (e.g., EJS, Pug) in Express.js ?",
      options: [
        "a) By directly sending HTML files without any templating capabilities",
        "b) By using third-party libraries only without any integration in Express.js",
        "c) By setting the view engine in Express, creating views with template syntax, and rendering them in routes",
        "d) By replacing the Express.js routing system with the template engine's own routing capabilities",
      ],
      correctAnswer:
        "c) By setting the view engine in Express, creating views with template syntax, and rendering them in routes",
      image: FirstHardEx,
    },
    {
      question:
        "2) How do you configure Express.js for different environments (development, production) ?",
      options: [
        "a) By creating separate application instances for each environment and managing them independently",
        "b) By using hard-coded values in the application for both environments without any flexibility",
        "c) By relying solely on environment variables without any additional configuration options",
        "d) By using environment variables to set configurations, such as enabling/disabling middleware, setting logging levels, and connecting to the appropriate databases",
      ],
      correctAnswer:
        "d) By using environment variables to set configurations, such as enabling/disabling middleware, setting logging levels, and connecting to the appropriate databases",
      image: SecondHardEx,
    },
    {
      question:
        "3) What are Express.js route parameters, and how do you define them ?",
      options: [
        "a) Route parameters are named segments of the URL that are used to capture values and are defined using a colon (:) in the route path, e.g., /user/:id",
        "b) Route parameters are static segments of the URL that cannot change, defined without any special characters",
        "c) Route parameters are used only in GET requests to fetch data from the server, and they are defined using square brackets",
        "d) Route parameters are optional parts of the URL that can be included or excluded, defined with curly braces",
      ],
      correctAnswer:
        "a) Route parameters are named segments of the URL that are used to capture values and are defined using a colon (:) in the route path, e.g., /user/:id",
      image: ThirdHardEx,
    },
    {
      question:
        "4) How do you structure a large-scale Express.js application ?",
      options: [
        "a) By keeping all the code in a single file for simplicity and ease of access",
        "b) By using a flat directory structure without any organization to keep it minimal",
        "c) By organizing code into separate modules for routes, controllers, models, and middleware, and using a clear directory structure to promote maintainability",
        "d) By relying solely on third-party frameworks to manage the application's structure and organization",
      ],
      correctAnswer:
        "c) By organizing code into separate modules for routes, controllers, models, and middleware, and using a clear directory structure to promote maintainability",
      image: FourthHardEx,
    },
    {
      question: "5) What is body-parser, and why is it used in Express.js ?",
      options: [
        "a) Body-parser is a built-in middleware function that formats the request body into a readable format, allowing the server to easily parse incoming data.",
        "b) Body-parser is a library that compresses incoming requests to reduce data size, optimizing performance for large payloads.",
        "c) Body-parser is an external module that secures the request body by encrypting sensitive data before it reaches the server.",
        "d) Body-parser is a middleware that parses the request body, making it accessible in the request object for handling form submissions and JSON data.",
      ],
      correctAnswer:
        "d) Body-parser is a middleware that parses the request body, making it accessible in the request object for handling form submissions and JSON data.",
      image: FifthHardEx,
    },
    {
      question: "6) How do you implement API versioning in Express.js ?",
      options: [
        "a) By creating separate files for each version of the API and routing to them based on the version number in the URL.",
        "b) By using a version prefix in the URL (e.g., /api/v1/) to distinguish between different versions of the API, allowing for easy upgrades.",
        "c) By modifying the existing API routes and adjusting the functionality dynamically to handle versioning internally without any URL changes.",
        "d) By utilizing query parameters to specify the API version in requests, enabling multiple versions to coexist with the same endpoint structure.",
      ],
      correctAnswer:
        "b) By using a version prefix in the URL (e.g., /api/v1/) to distinguish between different versions of the API, allowing for easy upgrades.",
      image: SixthHardEx,
    },
    {
      question: "7) What are best practices for error handling in Express.js ?",
      options: [
        "a) Implement centralized error handling middleware to manage errors consistently and log error details for easier debugging.",
        "b) Use console logs directly in route handlers to output error messages, allowing for quick troubleshooting during development.",
        "c) Handle errors in each individual route without any middleware, ensuring that specific errors are managed directly in the route logic.",
        "d) Return generic error messages to the client without exposing stack traces, maintaining application security while providing minimal feedback.",
      ],
      correctAnswer:
        "a) Implement centralized error handling middleware to manage errors consistently and log error details for easier debugging.",
      image: SeventhHardEx,
    },
    {
      question: "8) How do you throttle or rate-limit requests in Express.js ?",
      options: [
        "a) By manually tracking request counts for each user and blocking them after a certain threshold is reached, ensuring limited access.",
        "b) By configuring server settings to limit connections from specific IP addresses, preventing abuse from those sources.",
        "c) By using middleware like express-rate-limit to set up rate limiting based on specific criteria, controlling the number of requests.",
        "d) By employing a load balancer that automatically distributes incoming requests to multiple servers, mitigating excessive load.",
      ],
      correctAnswer:
        "c) By using middleware like express-rate-limit to set up rate limiting based on specific criteria, controlling the number of requests.",
      image: EigthHardEx,
    },
    {
      question:
        "9) How do you deploy an Express.js application to production (e.g., Heroku, AWS) ?",
      options: [
        "a) By running the application directly from your local machine, allowing users to access it through your personal IP address.",
        "b) By containerizing the application with Docker and deploying it to a container orchestration service for scalability and management.",
        "c) By creating a virtual machine on a cloud provider and manually installing Node.js and all dependencies for the app.",
        "d) By using a Platform as a Service (PaaS) like Heroku, where you can easily deploy and manage your application without server management.",
      ],
      correctAnswer:
        "d) By using a Platform as a Service (PaaS) like Heroku, where you can easily deploy and manage your application without server management.",
      image: NinthHardEx,
    },
    {
      question: "10) What are the differences between Express.js and Koa.js ?",
      options: [
        "a) Express.js is built on callbacks, while Koa.js utilizes async/await syntax for cleaner, more manageable code.",
        "b) Express.js has a larger community and more middleware options, whereas Koa.js is designed to be minimal and lightweight.",
        "c) Koa.js includes built-in support for handling HTTP requests, while Express.js requires additional libraries for such functionalities.",
        "d) Express.js is focused on simplicity, whereas Koa.js emphasizes modularity and provides a more flexible architecture.",
      ],
      correctAnswer:
        "a) Express.js is built on callbacks, while Koa.js utilizes async/await syntax for cleaner, more manageable code.",
      image: TenthHardEx,
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

export default Jshardsols;
