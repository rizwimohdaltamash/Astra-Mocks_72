import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import FirstMediumReactJs from "../../assets/firstmediumreactjs.jpg";
import SecondMediumReactJs from "../../assets/secondmediumreactjs.jpg";
import ThirdMediumReactJs from "../../assets/thirdmediumreactjs.jpg";
import FourthMediumReactJs from "../../assets/fourthmediumreactjs.jpg";
import FifthMediumReactJs from "../../assets/fifthmediumreactjs.jpg";
import SixthMediumReactJs from "../../assets/sixthmediumreactjs.jpg";
import SeventhMediumReactJs from "../../assets/seventhmediumreactjs.jpg";
import EigthMediumReactJs from "../../assets/eigthmediumreactjs.jpg";
import NinthMediumReactJs from "../../assets/ninthmediumreactjs.jpg";
import TenthMediumReactJs from "../../assets/tenthmediumreactjs.jpg";


const Reactmediumsols = () => {
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
      question: "1) What are higher-order components (HOC's) in React ?",
      options: [
        "a) HOC's are React hooks used to manage state and side effects within functional components.",
        "b) HOC's are functions that take a component as an argument and return a new component with additional props or functionality.",
        "c) HOC's are built-in React methods used to directly manipulate the DOM elements in a component.",
        "d) HOC's are special types of components used only for rendering static content in a React application."
      ],
      correctAnswer: "b) HOC's are functions that take a component as an argument and return a new component with additional props or functionality.",
      image: FirstMediumReactJs,
    },
    {
      question: "2) What is context API in React ?",
      options: [
        "a) Context API is a built-in React hook used to handle side effects like data fetching and timers in functional components.",
        "b) Context API is a special syntax for managing routing between pages in a React application.",
        "c) Context API is used for handling form validation and managing user input in React components.",
        "d) It is used to pass global variables anywhere in the code. It helps when there is a need for sharing b/w a lot of nested components."
     ],
     correctAnswer: "d) It is used to pass global variables anywhere in the code. It helps when there is a need for sharing b/w a lot of nested components.",
     image: SecondMediumReactJs,
    },
    {
      question: "3) What is React Redux ?",
      options: [
        "a) React Redux provides a way to manage & share the application's state across multiple components in React.",
        "b) React Redux is a tool used for managing routing and navigation between different pages in a React application.",
        "c) React Redux is a library specifically designed to handle animations and transitions in React components.",
        "d) React Redux is a testing library used to perform unit testing and integration testing for React components."
      ],
      correctAnswer: "a) React Redux provides a way to manage & share the application's state across multiple components in React.",
        image: ThirdMediumReactJs,
    },
    {
      question: "4) What are benefits of Context API over React Redux ?",
      options: [
        "a) Multiple stores/contexts can be created using context, whereas Redux creates just a single store.",
        "b) Context API allows for asynchronous data fetching, which Redux does not support.",
        "c) Context API automatically handles routing and page transitions, while Redux requires additional libraries for navigation.",
        "d) Context API is specifically designed for large-scale applications, while Redux is only meant for small applications with simple state management."
      ],
      correctAnswer: "a) Multiple stores/contexts can be created using context, whereas Redux creates just a single store.",
      image: FourthMediumReactJs,
    },
    {
      question: "5) What are React life cycle methods ?",
      options: [
      "a) React lifecycle methods are used to manage event listeners and handle user interactions like clicks and form submissions.",
      "b) React life cycle methods are special methods that get called at different stages of a component's existence. These stages can be categorized into 3 phases: Mounting, Updating & Unmounting.",
      "c) React lifecycle methods are responsible for managing asynchronous data fetching during the render phase of a component.",
      "d) React lifecycle methods are used for styling components dynamically based on state and props changes."
    ],
    correctAnswer: "b) React life cycle methods are special methods that get called at different stages of a component's existence. These stages can be categorized into 3 phases: Mounting, Updating & Unmounting.",
       image: FifthMediumReactJs,
    },
    {
      question: "6) What is the purpose of componentDidMount() ?",
      options: [
      "a) componentDidMount() is a method used to update the state of a component before it is rendered for the first time.",
      "b) componentDidMount() is a lifecycle method used to remove a component from the DOM when it is no longer needed.",
      "c) componentDidMount() is a lifecycle method in React class components that is invoked immediately after a component is mounted (i.e., inserted into the DOM).",
      "d) componentDidMount() is a method that triggers re-rendering of a component whenever there is a change in the component's props."
    ],
    correctAnswer: "c) componentDidMount() is a lifecycle method in React class components that is invoked immediately after a component is mounted (i.e., inserted into the DOM).",
    image: SixthMediumReactJs,
    },
    {
      question: "7) What is the purpose of componentDidUpdate() ?",
      options: [
        "a) componentDidUpdate() is a lifecycle method used to initialize state or props before a component renders for the first time.",
        "b) componentDidUpdate() is a lifecycle method that is called when a component is removed from the DOM.",
        "c) componentDidUpdate() is a method that automatically saves component data to local storage whenever it mounts.",
        "d) The componentDidUpdate() method is a lifecycle method in React that is called after a component has been updated, meaning after a re-render."
      ],
      correctAnswer: "d) The componentDidUpdate() method is a lifecycle method in React that is called after a component has been updated, meaning after a re-render.",
       image: SeventhMediumReactJs,
    },
    {
      question: "8) What is the purpose of componentWillUnmount() ?",
      options: [
        "a) componentWillUnmount() is used to reset the state of a component when it is about to be updated.",
        "b) componentWillUnmount() is a lifecycle method in React class components. It is invoked just before a component is removed (unmounted) from the DOM.",
        "c) componentWillUnmount() is used to re-render the component when its props change.",
        "d) componentWillUnmount() automatically reinitializes component data when a user interacts with the component."
      ],
      correctAnswer: "b) componentWillUnmount() is a lifecycle method in React class components. It is invoked just before a component is removed (unmounted) from the DOM.",
      
        image: EigthMediumReactJs,
    },
    {
      question: "9) What is React Route ?",
      options: [
        "a) React Route is a built-in React function used for managing state within components.",
        "b) React Route is a method for fetching data from APIs and displaying it in React components.",
        "c) React Router is a standard library used for routing in React applications.",
        "d) React Route is a lifecycle method in React that triggers re-rendering when the component's state changes."
      ],
      correctAnswer: "c) React Router is a standard library used for routing in React applications.",
            image: NinthMediumReactJs,
    },
    {
      question: "10) What is lazy loading in React ?",
      options: [
        "a) Lazy loading in React is a technique used to optimize the performance of your application by loading components or resources only when they are needed.",
        "b) Lazy loading is a method used to preload all components and resources at the start of the application for faster future rendering.",
        "c) Lazy loading in React means loading components in the background even if they are not immediately visible to the user.",
        "d) Lazy loading is used to delay the initial rendering of the entire application until all data is fetched from the server."
      ],
      correctAnswer: "a) Lazy loading in React is a technique used to optimize the performance of your application by loading components or resources only when they are needed.",
      image: TenthMediumReactJs,
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



export default Reactmediumsols;
