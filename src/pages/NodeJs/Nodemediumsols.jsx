import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import FirstMediumNode from "../../assets/firstmediumnode.jpg";
import SecondMediumNode from "../../assets/secondmediumnode.jpg";
import ThirdMediumNode from "../../assets/thirdmediumnode.jpg";
import FourthMediumNode from "../../assets/fourthmediumnode.jpg";
import FifthMediumNode from "../../assets/fifthmediumnode.jpg";
import SixthMediumNode from "../../assets/sixthmediumnode.jpg";
import SeventhMediumNode from "../../assets/seventhmediumnode.jpg";
import EigthMediumNode from "../../assets/eigthmediumnode.jpg";
import NinthMediumNode from "../../assets/ninthmediumnode.jpg";
import TenthMediumNode from "../../assets/tenthmediumnode.jpg";

const Nodemediumsols = () => {
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
        "1) Explain async/await in Node.js and how they improve code readability?",
      options: [
        "a) Async/await is a way to handle synchronous operations in Node.js, making the code execute faster and improving performance.",
        "b) Async/await simplifies error handling in Node.js by converting all errors into promises that can be caught with catch blocks.",
        "c) Async/await allows asynchronous code to be written in a more synchronous fashion, improving readability and making it easier to understand the flow of the code.",
        "d) Async/await is a library that enhances the performance of callback functions in Node.js applications.",
      ],
      correctAnswer:
        "c) Async/await allows asynchronous code to be written in a more synchronous fashion, improving readability and making it easier to understand the flow of the code.",
      image: FirstMediumNode,
    },
    {
      question: "2) What is the purpose of the buffer module in Node.js?",
      options: [
        "a) The buffer module provides a way to handle binary data directly, allowing for efficient manipulation of raw memory allocation.",
        "b) The buffer module is used to store user session data in Node.js applications, ensuring that user data is persisted across requests.",
        "c) The buffer module encrypts data before sending it over the network, enhancing security in Node.js applications.",
        "d) The buffer module is primarily used for managing environment variables in Node.js applications.",
      ],
      correctAnswer:
        "a) The buffer module provides a way to handle binary data directly, allowing for efficient manipulation of raw memory allocation.",
      image: SecondMediumNode,
    },
    {
      question: "3) What is middleware in Node.js?",
      options: [
        "a) Middleware is a built-in function in Node.js that automatically handles routing and HTTP requests.",
        "b) Middleware is a special type of database that stores user data and application settings in Node.js applications.",
        "c) Middleware refers to the components that are used to build user interfaces in Node.js applications.",
        "d) Middleware is a function or set of functions that execute during the request-response cycle, allowing for processing of requests and responses in an Express application.",
      ],
      correctAnswer:
        "d) Middleware is a function or set of functions that execute during the request-response cycle, allowing for processing of requests and responses in an Express application.",
      image: ThirdMediumNode,
    },
    {
      question:
        "4) How can you manage environment variables in a Node.js application?",
      options: [
        "a) Environment variables are managed using a configuration file stored in the public directory of the application.",
        "b) Environment variables can be managed using the dotenv package to load them from a .env file into process.env.",
        "c) Environment variables are hardcoded directly into the source code to ensure easy access and readability.",
        "d) Environment variables can only be managed through the Node.js command line interface when starting the application.",
      ],
      correctAnswer:
        "b) Environment variables can be managed using the dotenv package to load them from a .env file into process.env.",
      image: FourthMediumNode,
    },
    {
      question: "5) What is npm, and what is the role of package.json ?",
      options: [
        "a) npm is a Node.js library manager that automatically updates code files, while package.json is used to store user preferences.",
        "b) npm is a command-line tool for running Node.js applications, and package.json is used to compile JavaScript code.",
        "c) npm is the Node.js package manager that allows developers to install and manage packages, while package.json contains metadata about the project and its dependencies.",
        "d) npm is a web framework for building applications in Node.js, and package.json is a file that lists all the available APIs.",
      ],
      correctAnswer:
        "c) npm is the Node.js package manager that allows developers to install and manage packages, while package.json contains metadata about the project and its dependencies.",
      image: FifthMediumNode,
    },
    {
      question: "6) What is the purpose of package-lock.json in Node.js ?",
      options: [
        "a) package-lock.json is used to manage user permissions for accessing packages in a Node.js application.",
        "b) package-lock.json records the exact versions of dependencies and their sub-dependencies installed, ensuring consistent installs across different environments.",
        "c) package-lock.json is a temporary file used to cache installed packages for faster access during development.",
        "d) package-lock.json is primarily used to store environment variables for the application.",
      ],
      correctAnswer:
        "b) package-lock.json records the exact versions of dependencies and their sub-dependencies installed, ensuring consistent installs across different environments.",
      image: SixthMediumNode,
    },
    {
      question: "7) How do you handle exceptions in Node.js ?",
      options: [
        "a) Exceptions can be handled using try/catch blocks, and unhandled exceptions can be managed using the process.on('uncaughtException') event.",
        "b) Exceptions in Node.js can only be handled using global error handlers, which must be set up at the application level.",
        "c) In Node.js, exceptions are ignored by default, and developers must use callback functions to manage errors.",
        "d) Exceptions can be managed by throwing custom errors, which are then automatically logged by the Node.js runtime.",
      ],
      correctAnswer:
        "a) Exceptions can be handled using try/catch blocks, and unhandled exceptions can be managed using the process.on('uncaughtException') event.",
      image: SeventhMediumNode,
    },
    {
      question:
        "8) What are global objects in Node.js? Provide examples like __dirname, __filename ?",
      options: [
        "a) Global objects are objects available only within a specific module and cannot be accessed globally in Node.js applications.",
        "b) Global objects in Node.js are user-defined variables that can be accessed anywhere in the application.",
        "c) Global objects are special types of objects that hold configuration settings for the Node.js runtime environment.",
        "d) Global objects in Node.js are accessible throughout the application, such as __dirname and __filename, which provide the directory and filename of the current module.",
      ],
      correctAnswer:
        "d) Global objects in Node.js are accessible throughout the application, such as __dirname and __filename, which provide the directory and filename of the current module.",
      image: EigthMediumNode,
    },
    {
      question:
        "9) What are common built-in modules in Node.js (e.g., fs, http, path) ?",
      options: [
        "a) Built-in modules in Node.js are third-party packages that must be installed separately to use in an application.",
        "b) Built-in modules in Node.js are only available for use in the browser environment and cannot be utilized on the server-side.",
        "c) Built-in modules in Node.js are functions that are automatically included in the Node.js runtime and require no installation.",
        "d) Common built-in modules in Node.js include fs (file system), http (HTTP server), and path (file and directory paths), which provide essential functionalities for development.",
      ],
      correctAnswer:
        "d) Common built-in modules in Node.js include fs (file system), http (HTTP server), and path (file and directory paths), which provide essential functionalities for development.",
      image: NinthMediumNode,
    },
    {
      question:
        "10) What is clustering in Node.js, and how does it improve application performance ?",
      options: [
        "a) Clustering is a method used to combine multiple Node.js applications into a single process to save memory and resources.",
        "b) Clustering allows Node.js to run multiple instances of the same application on different servers, distributing the load evenly.",
        "c) Clustering involves creating multiple child processes that share the same server port, allowing better utilization of multicore systems and improving application performance by handling more requests simultaneously.",
        "d) Clustering in Node.js is primarily used to manage user sessions across different instances of an application for better scalability.",
      ],
      correctAnswer:
        "c) Clustering involves creating multiple child processes that share the same server port, allowing better utilization of multicore systems and improving application performance by handling more requests simultaneously.",
      image: TenthMediumNode,
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
          
          <div>
            <button
              className="text-purple-400 "
              onClick={() => navigate("/nodejs")}
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

export default Nodemediumsols;
