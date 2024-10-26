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

const Nodemedium = () => {
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
        "1) Explain async/await in Node.js and how they improve code readability?",
      options: [
        "a) Async/await is a way to handle synchronous operations in Node.js, making the code execute faster and improving performance.",
        "b) Async/await simplifies error handling in Node.js by converting all errors into promises that can be caught with catch blocks.",
        "c) Async/await allows asynchronous code to be written in a more synchronous fashion, improving readability and making it easier to understand the flow of the code.",
        "d) Async/await is a library that enhances the performance of callback functions in Node.js applications.",
      ],
      correctAnswer:
        "c) Async/await allows asynchronous code to be written in a more synchronous fashion, improving readability and making it easier to understand the flow of the code.",
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
    },
    {
      question: "5) What is npm, and what is the role of package.json?",
      options: [
        "a) npm is a Node.js library manager that automatically updates code files, while package.json is used to store user preferences.",
        "b) npm is a command-line tool for running Node.js applications, and package.json is used to compile JavaScript code.",
        "c) npm is the Node.js package manager that allows developers to install and manage packages, while package.json contains metadata about the project and its dependencies.",
        "d) npm is a web framework for building applications in Node.js, and package.json is a file that lists all the available APIs.",
      ],
      correctAnswer:
        "c) npm is the Node.js package manager that allows developers to install and manage packages, while package.json contains metadata about the project and its dependencies.",
    },
    {
      question: "6) What is the purpose of package-lock.json in Node.js?",
      options: [
        "a) package-lock.json is used to manage user permissions for accessing packages in a Node.js application.",
        "b) package-lock.json records the exact versions of dependencies and their sub-dependencies installed, ensuring consistent installs across different environments.",
        "c) package-lock.json is a temporary file used to cache installed packages for faster access during development.",
        "d) package-lock.json is primarily used to store environment variables for the application.",
      ],
      correctAnswer:
        "b) package-lock.json records the exact versions of dependencies and their sub-dependencies installed, ensuring consistent installs across different environments.",
    },
    {
      question: "7) How do you handle exceptions in Node.js?",
      options: [
        "a) Exceptions can be handled using try/catch blocks, and unhandled exceptions can be managed using the process.on('uncaughtException') event.",
        "b) Exceptions in Node.js can only be handled using global error handlers, which must be set up at the application level.",
        "c) In Node.js, exceptions are ignored by default, and developers must use callback functions to manage errors.",
        "d) Exceptions can be managed by throwing custom errors, which are then automatically logged by the Node.js runtime.",
      ],
      correctAnswer:
        "a) Exceptions can be handled using try/catch blocks, and unhandled exceptions can be managed using the process.on('uncaughtException') event.",
    },
    {
      question:
        "8) What are global objects in Node.js? Provide examples like __dirname, __filename?",
      options: [
        "a) Global objects are objects available only within a specific module and cannot be accessed globally in Node.js applications.",
        "b) Global objects in Node.js are user-defined variables that can be accessed anywhere in the application.",
        "c) Global objects are special types of objects that hold configuration settings for the Node.js runtime environment.",
        "d) Global objects in Node.js are accessible throughout the application, such as __dirname and __filename, which provide the directory and filename of the current module.",
      ],
      correctAnswer:
        "d) Global objects in Node.js are accessible throughout the application, such as __dirname and __filename, which provide the directory and filename of the current module.",
    },
    {
      question:
        "9) What are common built-in modules in Node.js (e.g., fs, http, path)?",
      options: [
        "a) Built-in modules in Node.js are third-party packages that must be installed separately to use in an application.",
        "b) Built-in modules in Node.js are only available for use in the browser environment and cannot be utilized on the server-side.",
        "c) Built-in modules in Node.js are functions that are automatically included in the Node.js runtime and require no installation.",
        "d) Common built-in modules in Node.js include fs (file system), http (HTTP server), and path (file and directory paths), which provide essential functionalities for development.",
      ],
      correctAnswer:
        "d) Common built-in modules in Node.js include fs (file system), http (HTTP server), and path (file and directory paths), which provide essential functionalities for development.",
    },
    {
      question:
        "10) What is clustering in Node.js, and how does it improve application performance?",
      options: [
        "a) Clustering is a method used to combine multiple Node.js applications into a single process to save memory and resources.",
        "b) Clustering allows Node.js to run multiple instances of the same application on different servers, distributing the load evenly.",
        "c) Clustering involves creating multiple child processes that share the same server port, allowing better utilization of multicore systems and improving application performance by handling more requests simultaneously.",
        "d) Clustering in Node.js is primarily used to manage user sessions across different instances of an application for better scalability.",
      ],
      correctAnswer:
        "c) Clustering involves creating multiple child processes that share the same server port, allowing better utilization of multicore systems and improving application performance by handling more requests simultaneously.",
    },
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
    const isMediumNodeTestCompleted = localStorage.getItem(
      `${userPrefix}mediumnodetestCompleted`
    );
    if (isMediumNodeTestCompleted) {
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
        where("difficulty", "==", "mediumnode")
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
          difficulty: "mediumnode",
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
      localStorage.setItem(`${userPrefix}mediumnodetestCompleted`, true);

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
    navigate("/nodejs/mediumnodejssols");
    localStorage.removeItem(`${userPrefix}currentQuestionIndex`);
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

export default Nodemedium;
