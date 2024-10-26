import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import FirstEasyNode from "../../assets/firsteasynode.jpg";
import SecondEasyNode from "../../assets/secondeasynode.jpg";
import ThirdEasyNode from "../../assets/thirdeasynode.jpg";
import FourthEasyNode from "../../assets/fourtheasynode.jpg";
import FifthEasyNode from "../../assets/fiftheasynode.jpg";
import SixthEasyNode from "../../assets/sixtheasynode.jpg";
import SeventhEasyNode from "../../assets/seventheasynode.jpg";
import EigthEasyNode from "../../assets/eigtheasynode.jpg";
import NinthEasyNode from "../../assets/nintheasynode.jpg";
import TenthEasyNode from "../../assets/tentheasynode.jpg";

const Nodeeasysols = () => {
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
        "1) What is Node.js, and how is it different from traditional server-side technologies ?",
      options: [
        "a) Node.js is a programming language used exclusively for frontend development.",
        "b) Node.js is a database system that helps in managing data efficiently.",
        "c) Node.js is a JavaScript runtime environment that allows JavaScript to run on the server-side, using an event-driven, non-blocking I/O model.",
        "d) Node.js is a framework designed for building mobile applications.",
      ],
      correctAnswer:
        "c) Node.js is a JavaScript runtime environment that allows JavaScript to run on the server-side, using an event-driven, non-blocking I/O model.",
      image: FirstEasyNode,
    },
    {
      question: "2) What is the V8 engine, and how does it relate to Node.js? ",
      options: [
        "a) The V8 engine is a part of Node.js that handles HTTP requests and responses.",
        "b) The V8 engine is an open-source JavaScript engine developed by Google that compiles JavaScript into machine code, and Node.js uses it to execute JavaScript outside the browser.",
        "c) The V8 engine is a tool used in Node.js for managing package dependencies.",
        "d) The V8 engine is a database system integrated with Node.js for data storage.",
      ],
      correctAnswer:
        "b) The V8 engine is an open-source JavaScript engine developed by Google that compiles JavaScript into machine code, and Node.js uses it to execute JavaScript outside the browser.",
      image: SecondEasyNode,
    },
    {
      question: "3) Explain the event-driven architecture of Node.js ?",
      options: [
        "a) In Node.js, every function runs sequentially, and the next function starts only after the previous one has completed.",
        "b) Node.js uses a multi-threaded model where each event is handled by a new thread.",
        "c) Node.js processes each request immediately without queuing them, which is why it is faster than other architectures.",
        "d) Node.js follows an event-driven architecture where an event loop listens for and handles events asynchronously, allowing non-blocking I/O operations.",
      ],
      correctAnswer:
        "d) Node.js follows an event-driven architecture where an event loop listens for and handles events asynchronously, allowing non-blocking I/O operations.",
      image: ThirdEasyNode,
    },
    {
      question: "4) What are the key features of Node.js ?",
      options: [
        "a) Node.js supports multi-threading and synchronous code execution for faster performance.",
        "b) Node.js is a frontend framework used to build interactive user interfaces.",
        "c) Node.js requires complex configurations to manage basic I/O operations.",
        "d) Node.js is lightweight, uses a non-blocking, event-driven model, and is built on the V8 JavaScript engine, making it highly scalable.",
      ],
      correctAnswer:
        "d) Node.js is lightweight, uses a non-blocking, event-driven model, and is built on the V8 JavaScript engine, making it highly scalable.",
      image: FourthEasyNode,
    },
    {
      question: "5)  What is the role of the event loop in Node.js? ",
      options: [
        "a) The event loop in Node.js handles asynchronous operations by continuously monitoring and executing callback functions, enabling non-blocking I/O.",
        "b) The event loop in Node.js handles synchronous operations and ensures that tasks are executed one after another in a blocking manner.",
        "c) The event loop in Node.js creates new threads for each request, allowing the system to process multiple operations in parallel.",
        "d) The event loop in Node.js is responsible for compiling JavaScript code into machine language, improving execution speed.",
      ],
      correctAnswer:
        "a) The event loop in Node.js handles asynchronous operations by continuously monitoring and executing callback functions, enabling non-blocking I/O.",
      image: FifthEasyNode,
    },
    {
      question:
        "6) What are the differences between setTimeout, setImmediate, and process.nextTick()?",
      options: [
        "a) setTimeout executes after the event loop, setImmediate is placed in the timer phase, and process.nextTick is used for I/O callbacks.",
        "b) setTimeout executes before the event loop starts, setImmediate handles promise rejections, and process.nextTick is for logging errors.",
        "c) setTimeout is used for asynchronous operations, setImmediate is for synchronous tasks, and process.nextTick is for debugging.",
        "d) setTimeout schedules a callback after a delay, setImmediate queues a callback after I/O events, and process.nextTick prioritizes callbacks to run immediately after the current operation.",
      ],
      correctAnswer:
        "d) setTimeout schedules a callback after a delay, setImmediate queues a callback after I/O events, and process.nextTick prioritizes callbacks to run immediately after the current operation.",
      image: SixthEasyNode,
    },
    {
      question:
        "7) Explain the concept of streams in Node.js. What are their types?",
      options: [
        "a) Streams are objects that let you read data or write data continuously. The main types are readable, writable, duplex, and transform.",
        "b) Streams in Node.js are only used for handling HTTP requests and come in two types: synchronous and asynchronous.",
        "c) Streams in Node.js are used for database operations and file management, and their types are static and dynamic.",
        "d) Streams are used exclusively for error handling in Node.js, with types such as error streams and log streams.",
      ],
      correctAnswer:
        "a) Streams are objects that let you read data or write data continuously. The main types are readable, writable, duplex, and transform. ",
      image: SeventhEasyNode,
    },
    {
      question: "8) How does Node.js handle asynchronous operations?",
      options: [
        "a) Node.js handles asynchronous operations by creating new threads for each request, ensuring tasks run in parallel.",
        "b) Node.js uses an event-driven, non-blocking I/O model, where the event loop manages asynchronous operations and executes callbacks when tasks are completed.",
        "c) Node.js processes asynchronous operations using promises exclusively, without using callbacks or the event loop.",
        "d) Node.js handles asynchronous operations by executing them synchronously in the order they were received.",
      ],
      correctAnswer:
        "b) Node.js uses an event-driven, non-blocking I/O model, where the event loop manages asynchronous operations and executes callbacks when tasks are completed.",
      image: EigthEasyNode,
    },
    {
      question:
        "9) What is a callback function, and what are callback hell and how to avoid it?",
      options: [
        "a) A callback function is a function that runs before another function. Callback hell can be avoided by using synchronous functions.",
        "b) A callback function is executed after a certain event, while callback hell refers to the confusion caused by using too many global variables.",
        "c) A callback function is a function passed as an argument, and callback hell occurs when callbacks are nested too deeply, making code difficult to read. It can be avoided by using modular code.",
        "d) A callback function is a function passed as an argument to another function, and callback hell occurs with excessive nesting of callbacks, which can be avoided by using promises or async/await syntax.",
      ],
      correctAnswer:
        "d) A callback function is a function passed as an argument to another function, and callback hell occurs with excessive nesting of callbacks, which can be avoided by using promises or async/await syntax. ",
      image: NinthEasyNode,
    },
    {
      question: "10) What are Promises, and how do they work in Node.js?",
      options: [
        "a) Promises are used to handle synchronous operations, allowing functions to execute in a linear manner without callbacks.",
        "b) Promises are objects that represent the eventual completion (or failure) of an asynchronous operation and its resulting value. They allow chaining of asynchronous calls.",
        "c) Promises are functions that execute immediately and do not support any asynchronous behavior in Node.js.",
        "d) Promises are a way to handle errors in synchronous code, improving code readability and performance.",
      ],
      correctAnswer:
        "b) Promises are objects that represent the eventual completion (or failure) of an asynchronous operation and its resulting value. They allow chaining of asynchronous calls.",
      image: TenthEasyNode,
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
                    ? "ring-4 ring-green-600 bg-green-800 bg-opacity-40"
                    : ""
                }
                ${
                  !isCorrect && isUserAnswer
                    ? "ring-4 ring-red-600 bg-red-800 bg-opacity-40"
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

export default Nodeeasysols;
