import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import FirstHardNode from "../../assets/firsthardnode.jpg";
import SecondHardNode from "../../assets/secondhardnode.jpg";
import ThirdHardNode from "../../assets/thirdhardnode.jpg";
import FourthHardNode from "../../assets/fourthhardnode.jpg";
import FifthHardNode from "../../assets/fifthhardnode.jpg";
import SixthHardNode from "../../assets/sixthhardnode.jpg";
import SeventhHardNode from "../../assets/seventhhardnode.jpg";
import EigthHardNode from "../../assets/eigthhardnode.jpg";
import NinthHardNode from "../../assets/ninthhardnode.jpg";
import TenthHardNode from "../../assets/tenthhardnode.jpg";


const Nodehardsols = () => {
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const navigate = useNavigate();
  // Use user-specific keys
  const userPrefix = user ? `${user.uid}_` : "";

  const savedQuestionIndex = parseInt(localStorage.getItem(`${userPrefix}currentQuestionIndex`)) || 0;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(savedQuestionIndex);
  const [submitted] = useState(false);
  const [showImage, setShowImage] = useState(false); // New state for image visibility
  

  const questions = [
    {
      question:
        "1) Explain the difference between synchronous and asynchronous functions in Node.js ?",
      options: [
        "a) Synchronous functions block the execution of code until they complete, while asynchronous functions allow the execution of other code while waiting for the operation to finish.",
        "b) Synchronous functions are executed in parallel, while asynchronous functions run sequentially one after the other.",
        "c) Synchronous functions use callbacks to handle results, whereas asynchronous functions can be executed in a single-threaded manner without blocking the event loop.",
        "d) Synchronous functions can only be used with APIs, while asynchronous functions are specific to file system operations.",
      ],
      correctAnswer:
        "a) Synchronous functions block the execution of code until they complete, while asynchronous functions allow the execution of other code while waiting for the operation to finish.",
  image: FirstHardNode,
    },
    {
      question: "2) What is the use of require and module.exports in Node.js ?",
      options: [
        "a) require is used to load HTML files, while module.exports is used to send data to the client-side.",
        "b) require is a method that allows the loading of external modules, while module.exports is used to define which parts of a module are accessible to other modules.",
        "c) require is for creating global variables, while module.exports is used to configure middleware in Express applications.",
        "d) require is a built-in function to import packages, and module.exports is used to export modules or functions so they can be used in other files.",
      ],
      correctAnswer:
        "b) require is a method that allows the loading of external modules, while module.exports is used to define which parts of a module are accessible to other modules.",
    image: SecondHardNode,
    },
    {
      question:
      "3) What is the difference between CommonJS and ES6 module systems in Node.js ?",
    options: [
      "a) CommonJS uses require and module.exports for importing and exporting modules, while ES6 modules use import and export syntax.",
      "b) CommonJS is asynchronous, whereas ES6 modules are synchronous in nature.",
      "c) CommonJS modules are only used in the browser, while ES6 modules are used exclusively in Node.js.",
      "d) CommonJS allows dynamic loading of modules, while ES6 modules require static import statements.",
    ],
    correctAnswer:
      "a) CommonJS uses require and module.exports for importing and exporting modules, while ES6 modules use import and export syntax.",
 image: ThirdHardNode,
    },
    {
      question:
        "4) Explain how to read and write files using the fs module in Node.js ?",
      options: [
        "a) The fs module is used only for reading files synchronously, and writing files is handled by the http module.",
        "b) The fs module allows reading and writing files through HTTP requests, making it easier to manage files over the network.",
        "c) The fs module provides methods like fs.readFile() to read files and fs.writeFile() to write files, supporting both asynchronous and synchronous operations.",
        "d) The fs module can only read files but not write, and it requires a callback function to handle the output.",
      ],
      correctAnswer:
        "c) The fs module provides methods like fs.readFile() to read files and fs.writeFile() to write files, supporting both asynchronous and synchronous operations.",
     image: FourthHardNode,
    },
    {
      question: "5) What is an EventEmitter in Node.js, and how does it work ?",
      options: [
        "a) An EventEmitter is a class that manages the event loop in Node.js, allowing for multi-threaded execution.",
        "b) An EventEmitter is a built-in function used for error handling in Node.js applications.",
        "c) An EventEmitter is an object that allows communication between different parts of an application by emitting and listening to events.",
        "d) An EventEmitter is a module that helps in debugging Node.js applications by providing hooks for events.",
      ],
      correctAnswer:
        "c) An EventEmitter is an object that allows communication between different parts of an application by emitting and listening to events.",
   image: FifthHardNode,
    },
    {
      question:
        "6) What are Node.js worker threads, and when would you use them ?",
      options: [
        "a) Node.js worker threads are used to execute JavaScript code in the main event loop for improved performance.",
        "b) Node.js worker threads allow for running JavaScript in parallel on multiple threads, making it suitable for CPU-intensive tasks.",
        "c) Node.js worker threads are primarily used for managing asynchronous I/O operations in a single-threaded environment.",
        "d) Node.js worker threads are only for handling file system operations, ensuring non-blocking execution.",
      ],
      correctAnswer:
        "b) Node.js worker threads allow for running JavaScript in parallel on multiple threads, making it suitable for CPU-intensive tasks.",
   image: SixthHardNode,
    },
    {
      question:
        "7) What is the difference between spawn, exec, and fork in the child_process module ?",
      options: [
        "a) spawn is used to create a new process with a stream interface, exec is used for running a shell command and buffers the output, and fork is used specifically for creating new Node.js processes that can communicate with the parent.",
        "b) spawn creates multiple child processes, exec runs commands in the background, and fork creates threads for multithreading.",
        "c) spawn and exec are used for executing Node.js scripts, while fork is used for creating web servers.",
        "d) spawn is asynchronous, exec is synchronous, and fork is used only for performance optimization.",
      ],
      correctAnswer:
        "a) spawn is used to create a new process with a stream interface, exec is used for running a shell command and buffers the output, and fork is used specifically for creating new Node.js processes that can communicate with the parent.",
   image: SeventhHardNode,
    },
    {
      question:
        "8) What is process management in Node.js, and what tools are used (e.g., PM2) ?",
      options: [
        "a) Process management in Node.js involves monitoring and controlling application processes using various built-in functions.",
        "b) Process management includes managing resource allocation for applications, ensuring they run efficiently and effectively.",
        "c) Process management refers to handling the lifecycle of Node.js applications, utilizing tools like PM2 for monitoring and scaling.",
        "d) Process management involves optimizing application performance and using tools like Docker for deployment and scaling.",
      ],
      correctAnswer:
        "c) Process management refers to handling the lifecycle of Node.js applications, utilizing tools like PM2 for monitoring and scaling.",
   image: EigthHardNode,
    },
    {
      question: "9) How would you implement WebSockets in Node.js ?",
      options: [
        "a) You can implement WebSockets by using the built-in net module to create TCP servers and clients for communication.",
        "b) WebSockets can be implemented by leveraging the Express framework along with additional middleware for socket handling.",
        "c) Implementing WebSockets in Node.js requires using the HTTP module to upgrade connections and manage them manually.",
        "d) To implement WebSockets, you typically use the ws library, which simplifies the process of establishing and managing WebSocket connections.",
      ],
      correctAnswer:
        "d) To implement WebSockets, you typically use the ws library, which simplifies the process of establishing and managing WebSocket connections.",
       image: NinthHardNode,
    },
    {
      question: "10) How do you secure a Node.js application ?",
      options: [
        "a) Securing a Node.js application involves implementing proper authentication, data validation, and using HTTPS to encrypt data.",
        "b) To secure a Node.js app, you need to limit the number of dependencies and avoid using any third-party libraries.",
        "c) You can enhance security by using firewalls and ensuring all environment variables are stored in plaintext for easy access.",
        "d) Securing your Node.js application means only using the latest version of Node.js and ignoring any vulnerability warnings.",
      ],
      correctAnswer:
        "a) Securing a Node.js application involves implementing proper authentication, data validation, and using HTTPS to encrypt data.",
    image: TenthHardNode,
    }
    
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
              onClick={() => navigate('/nodejs')}
            >
              <IoArrowBackCircle size={40} />
            </button>
          </div>

          

          {/* Pagination */}
          <div className=" lg:w-full w-[100%] flex items-center justify-center mb-8 space-x-2">
  {questions.map((question, index) => {
    const userAnswer = storedAnswers[index];
    const isAnswered = userAnswer !== undefined;
    const isCorrect = isAnswered && userAnswer === question.correctAnswer;

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
          currentQuestionIndex === index ? "bg-blue-500 text-white" : ""
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
      <span className=" text-xs text-green-200">Correct answer</span>
    )}
    {!isCorrect && isUserAnswer && (
      <span className="ml-2 text-xs text-red-200">Your Answer</span>
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

      {/* {showPopup && (
       <Popup
       onCancel={() => setShowPopup(false)}
       onConfirm={() => navigate("/javascript")}
     />
     
      )} */}

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



export default Nodehardsols;
