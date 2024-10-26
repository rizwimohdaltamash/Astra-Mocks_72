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

const Nodehard = () => {
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
        "1) Explain the difference between synchronous and asynchronous functions in Node.js?",
      options: [
        "a) Synchronous functions block the execution of code until they complete, while asynchronous functions allow the execution of other code while waiting for the operation to finish.",
        "b) Synchronous functions are executed in parallel, while asynchronous functions run sequentially one after the other.",
        "c) Synchronous functions use callbacks to handle results, whereas asynchronous functions can be executed in a single-threaded manner without blocking the event loop.",
        "d) Synchronous functions can only be used with APIs, while asynchronous functions are specific to file system operations.",
      ],
      correctAnswer:
        "a) Synchronous functions block the execution of code until they complete, while asynchronous functions allow the execution of other code while waiting for the operation to finish.",
    },
    {
      question: "2) What is the use of require and module.exports in Node.js?",
      options: [
        "a) require is used to load HTML files, while module.exports is used to send data to the client-side.",
        "b) require is a method that allows the loading of external modules, while module.exports is used to define which parts of a module are accessible to other modules.",
        "c) require is for creating global variables, while module.exports is used to configure middleware in Express applications.",
        "d) require is a built-in function to import packages, and module.exports is used to export modules or functions so they can be used in other files.",
      ],
      correctAnswer:
        "b) require is a method that allows the loading of external modules, while module.exports is used to define which parts of a module are accessible to other modules.",
    },
    {
      question:
        "3) What is the difference between CommonJS and ES6 module systems in Node.js?",
      options: [
        "a) CommonJS uses require and module.exports for importing and exporting modules, while ES6 modules use import and export syntax.",
        "b) CommonJS is asynchronous, whereas ES6 modules are synchronous in nature.",
        "c) CommonJS modules are only used in the browser, while ES6 modules are used exclusively in Node.js.",
        "d) CommonJS allows dynamic loading of modules, while ES6 modules require static import statements.",
      ],
      correctAnswer:
        "a) CommonJS uses require and module.exports for importing and exporting modules, while ES6 modules use import and export syntax.",
    },
    {
      question:
        "4) Explain how to read and write files using the fs module in Node.js?",
      options: [
        "a) The fs module is used only for reading files synchronously, and writing files is handled by the http module.",
        "b) The fs module allows reading and writing files through HTTP requests, making it easier to manage files over the network.",
        "c) The fs module provides methods like fs.readFile() to read files and fs.writeFile() to write files, supporting both asynchronous and synchronous operations.",
        "d) The fs module can only read files but not write, and it requires a callback function to handle the output.",
      ],
      correctAnswer:
        "c) The fs module provides methods like fs.readFile() to read files and fs.writeFile() to write files, supporting both asynchronous and synchronous operations.",
    },
    {
      question: "5) What is an EventEmitter in Node.js, and how does it work?",
      options: [
        "a) An EventEmitter is a class that manages the event loop in Node.js, allowing for multi-threaded execution.",
        "b) An EventEmitter is a built-in function used for error handling in Node.js applications.",
        "c) An EventEmitter is an object that allows communication between different parts of an application by emitting and listening to events.",
        "d) An EventEmitter is a module that helps in debugging Node.js applications by providing hooks for events.",
      ],
      correctAnswer:
        "c) An EventEmitter is an object that allows communication between different parts of an application by emitting and listening to events.",
    },
    {
      question:
        "6) What are Node.js worker threads, and when would you use them?",
      options: [
        "a) Node.js worker threads are used to execute JavaScript code in the main event loop for improved performance.",
        "b) Node.js worker threads allow for running JavaScript in parallel on multiple threads, making it suitable for CPU-intensive tasks.",
        "c) Node.js worker threads are primarily used for managing asynchronous I/O operations in a single-threaded environment.",
        "d) Node.js worker threads are only for handling file system operations, ensuring non-blocking execution.",
      ],
      correctAnswer:
        "b) Node.js worker threads allow for running JavaScript in parallel on multiple threads, making it suitable for CPU-intensive tasks.",
    },
    {
      question:
        "7) What is the difference between spawn, exec, and fork in the child_process module?",
      options: [
        "a) spawn is used to create a new process with a stream interface, exec is used for running a shell command and buffers the output, and fork is used specifically for creating new Node.js processes that can communicate with the parent.",
        "b) spawn creates multiple child processes, exec runs commands in the background, and fork creates threads for multithreading.",
        "c) spawn and exec are used for executing Node.js scripts, while fork is used for creating web servers.",
        "d) spawn is asynchronous, exec is synchronous, and fork is used only for performance optimization.",
      ],
      correctAnswer:
        "a) spawn is used to create a new process with a stream interface, exec is used for running a shell command and buffers the output, and fork is used specifically for creating new Node.js processes that can communicate with the parent.",
    },
    {
      question:
        "8) What is process management in Node.js, and what tools are used (e.g., PM2)?",
      options: [
        "a) Process management in Node.js involves monitoring and controlling application processes using various built-in functions.",
        "b) Process management includes managing resource allocation for applications, ensuring they run efficiently and effectively.",
        "c) Process management refers to handling the lifecycle of Node.js applications, utilizing tools like PM2 for monitoring and scaling.",
        "d) Process management involves optimizing application performance and using tools like Docker for deployment and scaling.",
      ],
      correctAnswer:
        "c) Process management refers to handling the lifecycle of Node.js applications, utilizing tools like PM2 for monitoring and scaling.",
    },
    {
      question: "9) How would you implement WebSockets in Node.js?",
      options: [
        "a) You can implement WebSockets by using the built-in net module to create TCP servers and clients for communication.",
        "b) WebSockets can be implemented by leveraging the Express framework along with additional middleware for socket handling.",
        "c) Implementing WebSockets in Node.js requires using the HTTP module to upgrade connections and manage them manually.",
        "d) To implement WebSockets, you typically use the ws library, which simplifies the process of establishing and managing WebSocket connections.",
      ],
      correctAnswer:
        "d) To implement WebSockets, you typically use the ws library, which simplifies the process of establishing and managing WebSocket connections.",
    },
    {
      question: "10) How do you secure a Node.js application?",
      options: [
        "a) Securing a Node.js application involves implementing proper authentication, data validation, and using HTTPS to encrypt data.",
        "b) To secure a Node.js app, you need to limit the number of dependencies and avoid using any third-party libraries.",
        "c) You can enhance security by using firewalls and ensuring all environment variables are stored in plaintext for easy access.",
        "d) Securing your Node.js application means only using the latest version of Node.js and ignoring any vulnerability warnings.",
      ],
      correctAnswer:
        "a) Securing a Node.js application involves implementing proper authentication, data validation, and using HTTPS to encrypt data.",
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
    const isHardJsTestCompleted = localStorage.getItem(
      `${userPrefix}hardnodetestCompleted`
    );
    if (isHardJsTestCompleted) {
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
        where("difficulty", "==", "hardnode")
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
          difficulty: "hardnode",
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
      localStorage.setItem(`${userPrefix}hardnodetestCompleted`, true);

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
    navigate("/nodejs/hardnodejssols");
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

export default Nodehard;
