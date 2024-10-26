import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import FirstHardReactJs from "../../assets/firsthardreactjs.jpg";
import SecondHardReactJs from "../../assets/secondhardreactjs.jpg";
import ThirdHardReactJs from "../../assets/thirdhardreactjs.jpg";
import FourthHardReactJs from "../../assets/fourthhardreactjs.jpg";
import FifthHardReactJs from "../../assets/fifthhardreactjs.jpg";
import SixthHardReactJs from "../../assets/sixthhardreactjs.jpg";
import SeventhHardReactJs from "../../assets/seventhhardreactjs.jpg";
import EigthHardReactJs from "../../assets/eigthhardreactjs.jpg";
import NinthHardReactJs from "../../assets/ninthhardreactjs.jpg";
import TenthHardReactJs from "../../assets/tenthhardreactjs.jpg";

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
  // const [showPopup, setShowPopup] = useState(false);

  const questions = [
    {
      question: "1) What is code splitting in React ?",
      options: [
        "a) Code splitting in React is a technique used to optimize the performance of a React application by breaking down the app into smaller, more manageable chunks or bundles.",
        "b) Code splitting in React is used to combine multiple components into a single bundle for faster initial loading.",
        "c) Code splitting in React refers to separating styling logic from component logic for better maintainability.",
        "d) Code splitting in React is a technique that renders all components at once but hides them from the user until they are needed.",
      ],
      correctAnswer:
        "a) Code splitting in React is a technique used to optimize the performance of a React application by breaking down the app into smaller, more manageable chunks or bundles.",
      image: FirstHardReactJs,
    },
    {
      question: "2) What is params in React ?",
      options: [
        "a) Params refers to a special React state hook that stores user input from forms.",
        "b) Params typically refers to Route parameters, & to take values from the URL.",
        "c) Params are used to pass CSS styles dynamically between components in React.",
        "d) Params in React is a method used to pass props between parent and child components during rendering.",
      ],
      correctAnswer:
        "b) Params typically refers to Route parameters, & to take values from the URL.",
      image: SecondHardReactJs,
    },
    {
      question: "3) What is memoization in React ?",
      options: [
        "a) Memoization in React refers to a method of storing component state outside the main component tree to preserve it across renders.",
        "b) Memoization is a technique in React that forces components to re-render every time their props or state change.",
        "c) Memoization is used to combine multiple components into one and render them as a single component to improve UI performance.",
        "d) Memoization in React is an optimization technique used to improve the performance of components.",
      ],
      correctAnswer:
        "d) Memoization in React is an optimization technique used to improve the performance of components.",
      image: ThirdHardReactJs,
    },
    {
      question: "4) What are the strategies to optimize performance in React ?",
      options: [
        "a) Include Inline Functions.",
        "b) use React.memo",
        "c) Both options a and b are correct.",
        "d) Both options a and b are wrong.",
      ],
      correctAnswer: "b) use React.memo",
      image: FourthHardReactJs,
    },
    {
      question: "5) What are key props in React ?",
      options: [
        "a) Key props are special attributes in React used to define the unique identity of an event handler.",
        "b) Key props in React are used to manage the lifecycle methods of a component and optimize rendering.",
        "c) Key props in React are essential properties used to pass data between components.",
        "d) Key props are used in React to define the visual style of dynamic elements in a component.",
      ],
      correctAnswer:
        "c) Key props in React are essential properties used to pass data between components.",
      image: FifthHardReactJs,
    },
    {
      question: "6) What are Fragments in React ?",
      options: [
        "a) React fragments allow you to group a list of children elements without adding extra nodes to the DOM.",
        "b) React fragments are special functions that help manage state between parent and child components.",
        "c) React fragments are used to pass props between deeply nested components without explicitly using context.",
        "d) React fragments are lifecycle methods in React used to handle component rendering during updates.",
      ],
      correctAnswer:
        "a) React fragments allow you to group a list of children elements without adding extra nodes to the DOM.",
      image: SixthHardReactJs,
    },
    {
      question:
        "7) Which of the following options are correct for controlled and uncontrolled components ?",
      options: [
        "a) In controlled components, the form data is managed by React's state.",
        "b) Uncontrolled components store their data inside the DOM, in React's state.",
        "c) a is correct and b is wrong.",
        "d) a is wrong and b is correct.",
      ],
      correctAnswer: "c) a is correct and b is wrong.",
      image: SeventhHardReactJs,
    },
    {
      question: "8) What is local storage ?",
      options: [
        "a) Local storage is a server-side storage system used to store large files and media for React applications.",
        "b) Local storage in React refers to using the browser's localStorage API to store key-value data on the user's device. This data is persisted even when the browser is closed and reopened.",
        "c) Local storage is a temporary storage solution in React where data is only available during the session and is cleared when the browser is closed.",
        "d) Local storage is a feature in React that allows components to communicate and share state across different pages.",
      ],
      correctAnswer:
        "b) Local storage in React refers to using the browser's localStorage API to store key-value data on the user's device. This data is persisted even when the browser is closed and reopened.",
      image: EigthHardReactJs,
    },
    {
      question: "9) What is session storage?",
      options: [
        "a) Session storage is a permanent storage system that allows you to store data even after the browser is closed.",
        "b) Session storage is used to store data on the server, making it accessible across multiple devices.",
        "c) Session storage is used to store temporary data that automatically syncs with local storage for long-term use.",
        "d) It allows you to store data in the browser for the duration of a page session. A session lasts as long as the browser is open and will only persist while the page is open in that tab or window.",
      ],
      correctAnswer:
        "d) It allows you to store data in the browser for the duration of a page session. A session lasts as long as the browser is open and will only persist while the page is open in that tab or window.",
      image: NinthHardReactJs,
    },
    {
      question:
        "10) What is the difference between createElement and cloneElement?",
      options: [
        "a) createElement is used to create custom HTML tags, while cloneElement is used to copy event handlers between elements.",
        "b) createElement is mainly used for making components dynamic, while cloneElement is only used with functional components.",
        "c) JSX elements will be transpiled to React.createElement() functions to create React elements which are going to be used for the object representation of UI. Whereas cloneElement is used to clone an element and pass it new props.",
        "d) createElement can only be used to create new elements, while cloneElement is used to modify existing CSS properties.",
      ],
      correctAnswer:
        "c) JSX elements will be transpiled to React.createElement() functions to create React elements which are going to be used for the object representation of UI. Whereas cloneElement is used to clone an element and pass it new props.",
      image: TenthHardReactJs,
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
              onClick={() => navigate('/reactjs')}
            >
              <IoArrowBackCircle size={40} />
            </button>
          </div>

          {/* Pagination */}
          {/* <div className="flex justify-center mb-8 space-x-2">
            {questions.map((_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full border ${
                  currentQuestionIndex === index
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => handlePaginationClick(index)}
              >
                {index + 1}
              </button>
            ))}
          </div> */}

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
