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

const Exeasy = () => {
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
      question: "1) What is Express.js, and why is it popular ?",
      options: [
        "a) A database system used for storing data",
        "b) A CSS framework for designing responsive web pages",
        "c) A web application framework for Node.js, known for its simplicity and flexibility",
        "d) A front-end library for creating user interfaces"
      ],
      correctAnswer: "c) A web application framework for Node.js, known for its simplicity and flexibility"
    },
    {
      question: "2) How do you create a simple Express.js application ?",
      options: [
        "a) Define routes directly in the HTML file",
        "b) Import Express, create an app instance, define routes, and start a server with app.listen",
        "c) Use Express commands in the command line to automatically generate code",
        "d) Set up a React component and import Express into it"
      ],
      correctAnswer: "b) Import Express, create an app instance, define routes, and start a server with app.listen"
    },
    {
      question: "3) What is middleware in Express.js, and how does it work ?",
      options: [
        "a) A built-in method that handles database connections in Express.js",
        "b) A module for handling front-end routing in Express.js",
        "c) A predefined set of functions in Express.js that runs before any route handler",
        "d) A function that has access to the request and response objects, and can modify or end the request-response cycle"
      ],
      correctAnswer: "d) A function that has access to the request and response objects, and can modify or end the request-response cycle"
    },
    {
      question: "4) What is the difference between app.use() and app.get() in Express.js ?",
      options: [
        "a) app.use() is for handling GET requests, while app.get() handles all types of requests",
        "b) app.use() is used to define routes, and app.get() is used to set up middleware",
        "c) app.use() is only used for error handling, while app.get() handles regular routes",
        "d) app.use() is for applying middleware to all routes, while app.get() is specifically for handling GET requests on a specific route"
      ],
      correctAnswer: "d) app.use() is for applying middleware to all routes, while app.get() is specifically for handling GET requests on a specific route"
    },
    {
      question: "5) Explain how routing works in Express.js ?",
      options: [
        "a) Routing in Express.js allows you to define various endpoints (URLs) in the application that perform specific actions based on the HTTP method and URL pattern",
        "b) Routing in Express.js automatically sets up RESTful API routes that handle CRUD operations without additional configuration",
        "c) Routing in Express.js is used to specify middleware functions that execute only for POST requests",
        "d) Routing in Express.js requires defining all routes within a single file to ensure proper handling of HTTP requests"
      ],
      correctAnswer: "a) Routing in Express.js allows you to define various endpoints (URLs) in the application that perform specific actions based on the HTTP method and URL pattern"
    },
    {
      question: "6) How do you handle different HTTP methods in Express (GET, POST, PUT, DELETE) ?",
      options: [
        "a) Express automatically identifies the HTTP method based on the route name without any specific method calls",
        "b) You can only handle GET and POST methods in Express; other methods require additional libraries",
        "c) All HTTP methods in Express are handled using the app.use() function",
        "d) You use specific functions like app.get(), app.post(), app.put(), and app.delete() to handle each HTTP method separately"
      ],
      correctAnswer: "d) You use specific functions like app.get(), app.post(), app.put(), and app.delete() to handle each HTTP method separately"
    },
    {
      question: "7) How can you serve static files in Express.js ?",
      options: [
        "a) Use the express.static middleware to specify a folder for serving static files like images, CSS, and JavaScript",
        "b) Configure a route for each static file and manually send files using res.sendFile()",
        "c) Load static files directly in the HTML templates without any configuration in Express",
        "d) Static files cannot be served in Express.js, only dynamic content is supported"
      ],
      correctAnswer: "a) Use the express.static middleware to specify a folder for serving static files like images, CSS, and JavaScript"
    },
    {
      question: "8) What is the role of the next() function in Express.js middleware ?",
      options: [
        "a) It stops the request-response cycle and sends the response back to the client immediately",
        "b) It passes control to the next middleware function in the stack or to the next route handler if no middleware remains",
        "c) It restarts the request from the beginning of the middleware stack",
        "d) It logs the details of the current request and then ends the response"
      ],
      correctAnswer: "b) It passes control to the next middleware function in the stack or to the next route handler if no middleware remains"
    },
    {
      question: "9) How can you implement error handling in Express.js ?",
      options: [
        "a) Use the default error handler by calling next() without any parameters",
        "b) Implement error handling in Express by wrapping all route handlers in a try-catch block",
        "c) Set a global error handler function that automatically catches all errors without being explicitly defined",
        "d) Define an error-handling middleware function with four parameters: err, req, res, and next"
      ],
      correctAnswer: "d) Define an error-handling middleware function with four parameters: err, req, res, and next"
    },
    {
      question: "10) Explain how to set up a basic authentication mechanism in Express.js ?",
      options: [
        "a) Use the express-basic-auth middleware to automatically handle all authentication tasks without additional configuration",
        "b) Implement middleware to check for a valid username and password in the request headers and respond accordingly",
        "c) Rely on session cookies to manage user authentication without requiring any password verification",
        "d) Configure authentication by simply defining routes that restrict access based on the HTTP method"
      ],
      correctAnswer: "b) Implement middleware to check for a valid username and password in the request headers and respond accordingly"
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
    const isEasyExTestCompleted = localStorage.getItem(`${userPrefix}easyextestCompleted`);
    if (isEasyExTestCompleted) {
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
        where("difficulty", "==", "easyexpress")
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
          difficulty: "easyexpress",
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
      localStorage.setItem(`${userPrefix}easyextestCompleted`, true);
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
    navigate("/express/easyexsols");
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

export default Exeasy;
