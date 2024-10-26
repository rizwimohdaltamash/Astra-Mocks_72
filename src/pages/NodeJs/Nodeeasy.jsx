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

const Nodeeasy = () => {
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
        "1) What is Node.js, and how is it different from traditional server-side technologies ?",
      options: [
        "a) Node.js is a programming language used exclusively for frontend development.",
        "b) Node.js is a database system that helps in managing data efficiently.",
        "c) Node.js is a JavaScript runtime environment that allows JavaScript to run on the server-side, using an event-driven, non-blocking I/O model.",
        "d) Node.js is a framework designed for building mobile applications.",
      ],
      correctAnswer:
        "c) Node.js is a JavaScript runtime environment that allows JavaScript to run on the server-side, using an event-driven, non-blocking I/O model.",
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
    },
    {
      question:
        "6) What are the differences between setTimeout, setImmediate, and process.nextTick() ?",
      options: [
        "a) setTimeout executes after the event loop, setImmediate is placed in the timer phase, and process.nextTick is used for I/O callbacks.",
        "b) setTimeout executes before the event loop starts, setImmediate handles promise rejections, and process.nextTick is for logging errors.",
        "c) setTimeout is used for asynchronous operations, setImmediate is for synchronous tasks, and process.nextTick is for debugging.",
        "d) setTimeout schedules a callback after a delay, setImmediate queues a callback after I/O events, and process.nextTick prioritizes callbacks to run immediately after the current operation.",
      ],
      correctAnswer:
        "d) setTimeout schedules a callback after a delay, setImmediate queues a callback after I/O events, and process.nextTick prioritizes callbacks to run immediately after the current operation.",
    },
    {
      question:
        "7) Explain the concept of streams in Node.js. What are their types ?",
      options: [
        "a) Streams are objects that let you read data or write data continuously. The main types are readable, writable, duplex, and transform.",
        "b) Streams in Node.js are only used for handling HTTP requests and come in two types: synchronous and asynchronous.",
        "c) Streams in Node.js are used for database operations and file management, and their types are static and dynamic.",
        "d) Streams are used exclusively for error handling in Node.js, with types such as error streams and log streams.",
      ],
      correctAnswer:
        "a) Streams are objects that let you read data or write data continuously. The main types are readable, writable, duplex, and transform. ",
    },
    {
      question: "8) How does Node.js handle asynchronous operations ?",
      options: [
        "a) Node.js handles asynchronous operations by creating new threads for each request, ensuring tasks run in parallel.",
        "b) Node.js uses an event-driven, non-blocking I/O model, where the event loop manages asynchronous operations and executes callbacks when tasks are completed.",
        "c) Node.js processes asynchronous operations using promises exclusively, without using callbacks or the event loop.",
        "d) Node.js handles asynchronous operations by executing them synchronously in the order they were received.",
      ],
      correctAnswer:
        "b) Node.js uses an event-driven, non-blocking I/O model, where the event loop manages asynchronous operations and executes callbacks when tasks are completed.",
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
    const isEasyNodeTestCompleted = localStorage.getItem(
      `${userPrefix}easynodetestCompleted`
    );
    if (isEasyNodeTestCompleted) {
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
        where("difficulty", "==", "easynode")
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
          difficulty: "easynode",
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
      localStorage.setItem(`${userPrefix}easynodetestCompleted`, true);
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
    navigate("/nodejs/easynodejssols");
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
            // onClick={() => {
            //   navigate("/javascript/easyjssols");
            // }}
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

export default Nodeeasy;
