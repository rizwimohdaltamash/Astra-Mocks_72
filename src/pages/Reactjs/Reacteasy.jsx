import React, { useState, useEffect } from "react";
import { fireDB } from "../../firebase/ConfigFirebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const getProgressCircleColor = (percentage) => {
  if (percentage < 25) return "red";
  if (percentage < 75) return "yellow";
  return "green";
};

const ProgressCircle = ({ score, total }) => {
  const radius = 75; // radius of the circle
  const strokeWidth = 3; // width of the stroke
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / total) * circumference;
  const percentage = (score / total) * 100;

  return (
    <div className="relative flex items-center justify-center  h-[30vh] ">
      <svg
        width={radius * 2}
        height={radius * 2}
        className=" transform rotate-[-90deg] "
      >
        <circle
          stroke="#e0e0e0"
          fill="none"
          cx={radius}
          cy={radius}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          stroke={getProgressCircleColor(percentage)}
          fill="none"
          cx={radius}
          cy={radius}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute text-white text-4xl font-semibold">
        {/* {Math.round(percentage)}% */}
        <p className="text-lg">Total Score</p>
        {score}/40
      </div>
    </div>
  );
};

const Reacteasy = () => {
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Use user-specific keys
  const userPrefix = user ? `${user.uid}_` : "";

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 60 seconds for the timer
  const [totalScore, setTotalScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [unattemptedCount, setUnattemptedCount] = useState(0);  

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
      
      }
  ];

  // Handle option click
  const handleOptionClick = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);

    localStorage.setItem(
      `${userPrefix}quizAnswers`,
      JSON.stringify(newAnswers)
    );
  };

  // Handle next question
  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      localStorage.setItem(
        `${userPrefix}currentQuestionIndex`,
        currentQuestionIndex + 1
      );
    }
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
  };

  // Check local storage for test completion status
  useEffect(() => {
    const isEasyReactJSTestCompleted = localStorage.getItem(`${userPrefix}easyreactjstestCompleted`);
    if (isEasyReactJSTestCompleted) {
      setSubmitted(true); // set submitted state if test was already completed
    }
  }, []);

  // Handle quiz submission
  const handleSubmit = async () => {
    const result = questions.map((q, index) => ({
      question: q.question,
      chosenAnswer: answers[index],
      isCorrect: answers[index] === q.correctAnswer,
      score:
        answers[index] === null
          ? 0
          : answers[index] === q.correctAnswer
          ? 4
          : -1,
    }));

    const totalScore = result.reduce((acc, curr) => acc + curr.score, 0);
    const correctCount = result.filter((r) => r.isCorrect).length;
    const incorrectCount = result.filter(
      (r) => r.chosenAnswer !== null && !r.isCorrect
    ).length;
    const unattemptedCount = result.filter(
      (r) => r.chosenAnswer === null
    ).length;

    setTotalScore(totalScore);
    setCorrectCount(correctCount);
    setIncorrectCount(incorrectCount);
    setUnattemptedCount(unattemptedCount);

    try {
      // Check if the user already has a result in the database
      const quizResultsRef = collection(fireDB, "quizResults");
      const q = query(
        quizResultsRef,
        where("userId", "==", user.uid),
        where("difficulty", "==", "easyreactjs")
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If the document exists, update it
        const docRef = doc(fireDB, "quizResults", querySnapshot.docs[0].id);
        await updateDoc(docRef, {
          result,
          totalScore,
          correctCount,
          incorrectCount,
          unattemptedCount,
          timestamp: new Date(),
        });
      } else {
        // If the document doesn't exist, create a new one
        await addDoc(collection(fireDB, "quizResults"), {
          userId: user.uid,
          userName: user.name, // Assuming 'user.name' holds the user's name
          email: user.email, // Adding email field
          difficulty: "easyreactjs",
          result,
          totalScore,
          correctCount,
          incorrectCount,
          unattemptedCount,
          timestamp: new Date(),
        });
      }
      localStorage.removeItem(`${userPrefix}timeLeft`);
      setTimeLeft(1200); // Reset the timer state to 60 seconds
      
      // Update local storage to indicate the test is completed
      localStorage.setItem(`${userPrefix}easyreactjstestCompleted`, true);
      setSubmitted(true);
    } catch (e) {
      console.error("Error adding/updating document: ", e);
    }
  };

  useEffect(() => {
    // Load answers from localStorage
    const savedAnswers = localStorage.getItem(`${userPrefix}quizAnswers`);
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }

    // Load the current question index from localStorage
    const savedQuestionIndex = localStorage.getItem(
      `${userPrefix}currentQuestionIndex`
    );
    if (savedQuestionIndex) {
      setCurrentQuestionIndex(parseInt(savedQuestionIndex, 10));
    }

    // Load timer value from localStorage
    const savedTimeLeft = localStorage.getItem(`${userPrefix}timeLeft`);
    if (savedTimeLeft) {
      setTimeLeft(parseInt(savedTimeLeft, 10));
    }

    // Timer logic
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        localStorage.setItem(`${userPrefix}timeLeft`, timeLeft - 1); // Store updated timeLeft in localStorage
      }, 1000);

      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit(); // Automatically submit the quiz when the time is up
    }
  }, [timeLeft, submitted]);

  const navigate = useNavigate();

   // Pagination handler
   const handlePaginationClick = (index) => {
    setCurrentQuestionIndex(index);
    localStorage.setItem(`${userPrefix}currentQuestionIndex`, index);
  };

  // Handle navigation to the solution page
  const navigateToSolutions = () => {
    navigate("/reactjs/easyreactjssols");
    localStorage.removeItem(`${userPrefix}currentQuestionIndex`)
  };

  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
      {!submitted ? (
        <div className="lg:w-[70vw] w-[100vw] lg:h-full bg-black bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg lg:p-12 p-4">
          <div className="flex flex-row justify-center">
            <div className="flex items-center justify-center border-4 border-blue-500  text-white rounded-full w-20 h-20 ">
              <p className="text-2xl font-semibold"> {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
            </div>
          </div>
          {/* Pagination */}
          <div className="flex justify-center lg:w-full w-[100%]  mt-2 mb-8 space-x-2  ">
            {questions.map((_, index) => (
              <button
                key={index}
                className={`lg:px-4 px-2 lg:py-2 py-0 m-2 rounded-full border ${
                  currentQuestionIndex === index
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => handlePaginationClick(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <h2 className="lg:text-2xl text-md font-bold mb-8 text-white">
            {questions[currentQuestionIndex].question}
          </h2>
          <div className="flex flex-col gap-6 mb-8">
            {questions[currentQuestionIndex].options.map((option) => (
              <button
                key={option}
                className={` py-4 px-6 text-left w-full rounded-lg bg-white bg-opacity-20 text-white hover:bg-opacity-40 transition ${
                  answers[currentQuestionIndex] === option
                    ? "ring-4 ring-blue-600 bg-blue-800 bg-opacity-40"
                    : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
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
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNextClick}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="lg:w-full lg:h-full lg:max-w-4xl bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg lg:p-12 p-2 text-center">
          <div className="flex w-full  flex-row space-x-6 lg:h-[20vh] justify-center items-center">
            <div className="flex items-center justify-center border-4 border-red-700  text-white rounded-full w-24 h-24 lg:w-32 lg:h-32">
              <p className="lg:text-lg text-sm">
                InCorrect <br /> {incorrectCount}
              </p>
            </div>
            <div className="flex items-center justify-center border-4 border-green-700  text-white rounded-full w-24 h-24 lg:w-32 lg:h-32">
              <p className="lg:text-lg text-sm">
                Correct <br /> {correctCount}
              </p>
            </div>

            <div className="flex items-center justify-center border-4 border-yellow-700  text-white rounded-full w-24 h-24 lg:w-32 lg:h-32">
              <p className="lg:text-lg text-sm">
                Unattemped <br /> {unattemptedCount}
              </p>
            </div>
          </div>

          <ProgressCircle score={totalScore} total={20} />

          <h2 className="text-xl font-bold text-white mb-4">
            Test Completed !
          </h2>
          <p className="text-lg text-white mb-4">
            Thank you for completing the test {user?.name}.
          </p>

          <button
            onClick={navigateToSolutions}
            className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition mt-6 mb-6"
          >
            View Solution
          </button>
        </div>
      )}
    </div>
  );
};

export default Reacteasy;
