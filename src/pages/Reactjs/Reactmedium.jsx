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

const Reactmedium = () => {
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
      question: "1) What are higher-order components (HOC's) in React ?",
      options: [
        "a) HOC's are React hooks used to manage state and side effects within functional components.",
        "b) HOC's are functions that take a component as an argument and return a new component with additional props or functionality.",
        "c) HOC's are built-in React methods used to directly manipulate the DOM elements in a component.",
        "d) HOC's are special types of components used only for rendering static content in a React application."
      ],
      correctAnswer: "b) HOC's are functions that take a component as an argument and return a new component with additional props or functionality."
       },
    {
      question: "2) What is context API in React ?",
      options: [
        "a) Context API is a built-in React hook used to handle side effects like data fetching and timers in functional components.",
        "b) Context API is a special syntax for managing routing between pages in a React application.",
        "c) Context API is used for handling form validation and managing user input in React components.",
        "d) It is used to pass global variables anywhere in the code. It helps when there is a need for sharing b/w a lot of nested components."
     ],
     correctAnswer: "d) It is used to pass global variables anywhere in the code. It helps when there is a need for sharing b/w a lot of nested components."

    },
    {
      question: "3) What is React Redux ?",
      options: [
      "a) React Redux provides a way to manage & share the application's state across multiple components in React.",
      "b) React Redux is a tool used for managing routing and navigation between different pages in a React application.",
      "c) React Redux is a library specifically designed to handle animations and transitions in React components.",
      "d) React Redux is a testing library used to perform unit testing and integration testing for React components."
    ],
    correctAnswer: "a) React Redux provides a way to manage & share the application's state across multiple components in React."

    },
    {
      question: "4) What are benefits of Context API over React Redux ?",
      options: [
      "a) Multiple stores/contexts can be created using context, whereas Redux creates just a single store.",
      "b) Context API allows for asynchronous data fetching, which Redux does not support.",
      "c) Context API automatically handles routing and page transitions, while Redux requires additional libraries for navigation.",
      "d) Context API is specifically designed for large-scale applications, while Redux is only meant for small applications with simple state management."
    ],
    correctAnswer: "a) Multiple stores/contexts can be created using context, whereas Redux creates just a single store."

    },
    {
      question: "5) What are React life cycle methods ?",
      options: [
      "a) React lifecycle methods are used to manage event listeners and handle user interactions like clicks and form submissions.",
      "b) React life cycle methods are special methods that get called at different stages of a component's existence. These stages can be categorized into 3 phases: Mounting, Updating & Unmounting.",
      "c) React lifecycle methods are responsible for managing asynchronous data fetching during the render phase of a component.",
      "d) React lifecycle methods are used for styling components dynamically based on state and props changes."
    ],
    correctAnswer: "b) React life cycle methods are special methods that get called at different stages of a component's existence. These stages can be categorized into 3 phases: Mounting, Updating & Unmounting."
      
    },
    {
      question: "6) What is the purpose of componentDidMount() ?",
      options: [
      "a) componentDidMount() is a method used to update the state of a component before it is rendered for the first time.",
      "b) componentDidMount() is a lifecycle method used to remove a component from the DOM when it is no longer needed.",
      "c) componentDidMount() is a lifecycle method in React class components that is invoked immediately after a component is mounted (i.e., inserted into the DOM).",
      "d) componentDidMount() is a method that triggers re-rendering of a component whenever there is a change in the component's props."
    ],
    correctAnswer: "c) componentDidMount() is a lifecycle method in React class components that is invoked immediately after a component is mounted (i.e., inserted into the DOM)."

    },
    {
      question: "7) What is the purpose of componentDidUpdate() ?",
      options: [
        "a) componentDidUpdate() is a lifecycle method used to initialize state or props before a component renders for the first time.",
        "b) componentDidUpdate() is a lifecycle method that is called when a component is removed from the DOM.",
        "c) componentDidUpdate() is a method that automatically saves component data to local storage whenever it mounts.",
        "d) The componentDidUpdate() method is a lifecycle method in React that is called after a component has been updated, meaning after a re-render."
      ],
      correctAnswer: "d) The componentDidUpdate() method is a lifecycle method in React that is called after a component has been updated, meaning after a re-render."
          },
    {
      question: "8) What is the purpose of componentWillUnmount() ?",
      options: [
      "a) componentWillUnmount() is used to reset the state of a component when it is about to be updated.",
      "b) componentWillUnmount() is a lifecycle method in React class components. It is invoked just before a component is removed (unmounted) from the DOM.",
      "c) componentWillUnmount() is used to re-render the component when its props change.",
      "d) componentWillUnmount() automatically reinitializes component data when a user interacts with the component."
       ],
      correctAnswer: "b) componentWillUnmount() is a lifecycle method in React class components. It is invoked just before a component is removed (unmounted) from the DOM."
    },
      {
        question: "9) What is React Route ?",
        options: [
       "a) React Route is a built-in React function used for managing state within components.",
       "b) React Route is a method for fetching data from APIs and displaying it in React components.",
       "c) React Router is a standard library used for routing in React applications.",
       "d) React Route is a lifecycle method in React that triggers re-rendering when the component's state changes."
       ],
      correctAnswer: "c) React Router is a standard library used for routing in React applications."
      },
      {
        question: "10) What is lazy loading in React ?",
        options: [
          "a) Lazy loading in React is a technique used to optimize the performance of your application by loading components or resources only when they are needed.",
          "b) Lazy loading is a method used to preload all components and resources at the start of the application for faster future rendering.",
          "c) Lazy loading in React means loading components in the background even if they are not immediately visible to the user.",
          "d) Lazy loading is used to delay the initial rendering of the entire application until all data is fetched from the server."
        ],
        correctAnswer: "a) Lazy loading in React is a technique used to optimize the performance of your application by loading components or resources only when they are needed."
         
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
    const isMediumReactJSTestCompleted = localStorage.getItem(`${userPrefix}mediumreactjstestCompleted`);
    if (isMediumReactJSTestCompleted) {
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
        where("difficulty", "==", "mediumreactjs")
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
          difficulty: "mediumreactjs",
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
      localStorage.setItem(`${userPrefix}mediumreactjstestCompleted`, true);
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
    navigate("/reactjs/mediumreactjssols");
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

export default Reactmedium;
