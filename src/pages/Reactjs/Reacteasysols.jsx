import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import FirstEasyReactJs from "../../assets/firsteasyreactjs.jpg";
import SecondEasyReactJs from "../../assets/secondeasyreactjs.jpg";
import ThirdEasyReactJs from "../../assets/thirdeasyreactjs.jpg";
import FourthEasyReactJs from "../../assets/fourtheasyreactjs.jpg";
import FifthEasyReactJs from "../../assets/fiftheasyreactjs.jpg";
import SixthEasyReactJs from "../../assets/sixtheasyreactjs.jpg";
import SeventhEasyReactJs from "../../assets/seventheasyreactjs.jpg";
import EigthEasyReactJs from "../../assets/eigtheasyreactjs.jpg";
import NinthEasyReactJs from "../../assets/nintheasyreactjs.jpg";
import TenthEasyReactJs from "../../assets/tentheasyreactjs.jpg";


const Reacteasysols = () => {
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const navigate = useNavigate();
  // Use user-specific keys
  const userPrefix = user ? `${user.uid}_` : "";

  const savedQuestionIndex = parseInt(localStorage.getItem(`${userPrefix}currentQuestionIndex`)) || 0;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(savedQuestionIndex);
  const [submitted] = useState(false);
  const [showImage, setShowImage] = useState(false); // New state for image visibility
  // const [showPopup, setShowPopup] = useState(false);

  const questions = [
    {
      question:
        "1) What is React and its features ?",
      options: [
        "a) React is a back-end framework for building server-side applications.",
        "b) React is a database management system used for storing data.",
        "c) React is an open-source front-end Java Script library that is used for building composable user interfaces.",
        "d) React is a programming language used for developing native mobile apps.",
      ],
      correctAnswer:
        "c) React is an open-source front-end Java Script library that is used for building composable user interfaces.",      
      image: FirstEasyReactJs,
    },
    {
      question:
        "2) What is the JSX in React ?",
      options: [
        "a) JSX is a programming language for building React applications.",
        "b) JSX stands for JavaScript Extension, used to extend JavaScript functionality.",
        "c) JSX is a templating engine similar to EJS or Handlebars.",
        "d) JSX stands for JavaScript XML & you can write html in Java Script.",
      ],
      correctAnswer:
        "d) JSX stands for JavaScript XML & you can write html in Java Script.",
      image: SecondEasyReactJs,
    },
    {
      question:
        "3) What are components & their types in React ?",
      options: [
        "a) Components are static elements that can't be reused in React applications.",
        "b) Components are the building blocks of a React application. They allow you to split the UI into independent, reusable pieces, making it easier to think about the structure of the application.They are of 2 types Class and Functional Components.",
        "c) Components are predefined modules in React that handle state management only.",
        "d) Components are used only for handling user input and managing forms in React.",
      ],
      correctAnswer:
        "b) Components are the building blocks of a React application. They allow you to split the UI into independent, reusable pieces, making it easier to think about the structure of the application.They are of 2 types Class and Functional Components.",
     image: ThirdEasyReactJs,
    },
    {
      question:
      "4) What are State in React ?",
    options: [
      "a) State in React refers to the global configuration of the application.",
      "b) State is a static value that remains constant throughout the lifecycle of the component.",
      "c) State of a component is an object, that holds some information , that may change overtime.", 
      "d) State is used only for styling components and managing CSS classes.",
    ],
    correctAnswer: "c) State of a component is an object, that holds some information , that may change overtime.",
    image: FourthEasyReactJs,
    },
    {
      question: "5) What are props in React ?",
      options: [
        "a) props are used to pass data from one component to another , typically from parent to child component.",
        "b) props are used to manage state within a component.",
        "c) props are special keywords in React that handle styling and animations.",
        "d) props are only used for triggering lifecycle methods in React components.",
      ],
      correctAnswer:
        "a) props are used to pass data from one component to another , typically from parent to child component.",
      image: FifthEasyReactJs,
    },
    {
      question:
      "6) What is Virtual DOM & Real DOM ?",
    options: [
      "a) The Real DOM is the actual representation of the UI rendered in the browser.",
      "b) The Virtual DOM is a lightweight, in-memory representation of the Real DOM, created and maintained by React.",
      "c) Both a & b options are correct.",
      "d) Only a option is correct",
    ],
    correctAnswer:
      "c) Both a & b options are correct.",
    image: SixthEasyReactJs,
    },
    {
      question:
      "7) What is React Hook ?",
    options: [
      "a) React Hooks are event handlers used for managing user inputs like onClick and onChange, primarily to handle user interactions with the UI.",
      "b) React Hooks are lifecycle methods designed to control the mounting and unmounting of class components. They are only usable in class-based components, not in functional components.",
      "c) React Hooks are special Functions, that allow you to use state & other React features in functional components , which were only possible in class components.",
      "d) React Hooks are used to directly manipulate the DOM elements within functional components.",
    ],
    correctAnswer:
      "c) React Hooks are special Functions, that allow you to use state & other React features in functional components , which were only possible in class components.",      
     image: SeventhEasyReactJs,
    },
    {
      question:
      "8) Explain the useEffect hook ?",
    options: [
      "a) The useEffect hook is used to manage and update the state of a functional component directly, similar to the useState hook.",
      "b) UseEffect hook in React is used to perform side effects in functional components. Eg: Fetching the data,intersecting with DOM,setting up subscription, or timers.",
      "c) The useEffect hook is a special hook designed only to handle form submissions and user input validations in functional components.",
      "d) useEffect is primarily used for routing purposes in React applications, allowing components to navigate between different pages without reloading.",
    ],
    correctAnswer:
      "b) UseEffect hook in React is used to perform side effects in functional components. Eg: Fetching the data,intersecting with DOM,setting up subscription, or timers.",
      image: EigthEasyReactJs,
    },
    {
      question:
      "9) What is useContext ?",
    options: [
      "a) useContext is a React hook that allows you to access and share values between components,without having to pass props through every level of component tree.",
      "b) useContext is used to directly modify the global state of the application and update it across all components without any limitations or restrictions.",
      "c) useContext is a hook that manages the local state of a single component and is not used for sharing data between multiple components.",
      "d) useContext is primarily used for managing event listeners and handling user interactions like button clicks or form submissions.",
    ],
    correctAnswer:
      "a) useContext is a React hook that allows you to access and share values between components,without having to pass props through every level of component tree.",       
     image: NinthEasyReactJs,
    },
    {
      question:
      "10) What is useReducer ?",
    options: [
      "a) useReducer is a hook in React that allows you to fetch and cache API data automatically in functional components.",
      "b) useReducer is a hook in React that is used to manage complex state logic in components.",
      "c) useReducer is a state management tool that can only be used in class components to handle the component's lifecycle events.",
      "d) useReducer is a hook that simplifies routing in React applications by managing the navigation between different pages.",
    ],
    correctAnswer:
      "b) useReducer is a hook in React that is used to manage complex state logic in components.",     
    image: TenthEasyReactJs,
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



export default Reacteasysols;
