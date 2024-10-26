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

const Jshard = () => {
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
      "1) What is Execution Context,Execution Stack, Variable object(VO) and Scope Chain?",
    options: [
      "a) Execution Context is a function that automatically manages scope chain and variable objects when called.",
      "b) Execution Stack is an array of variables used to manage memory allocation in JavaScript code execution.",
      "c) Execution Context is the environment in which JavaScript code is executed. || Execution Stack is a stack data structure that keeps track of all the execution contexts. When a function is called, it is added to the stack. When the function returns, it's removed from the stack. || In JavaScript, the Variable Object contains all the variables, function declarations, and arguments defined in a particular execution context. || Scope chain determines the order in which variables are looked up in nested functions. If a variable is not found in the current scope, JavaScript will check the outer (parent) scope.",
      "d) Scope Chain is a list of functions that are queued in the call stack and determines the order in which they will execute.",
    ],
    correctAnswer:
      "c) Execution Context is the environment in which JavaScript code is executed. || Execution Stack is a stack data structure that keeps track of all the execution contexts. When a function is called, it is added to the stack. When the function returns, it's removed from the stack. || In JavaScript, the Variable Object contains all the variables, function declarations, and arguments defined in a particular execution context. || Scope chain determines the order in which variables are looked up in nested functions. If a variable is not found in the current scope, JavaScript will check the outer (parent) scope.",
    },
    {
      question:
        "2) What is the priority in execution of callback,promise,setTimeout,process.nextTick()?",
      options: [
        "a) Promises -> Process.nextTick() -> setTimeout -> Callback",
        "b) setTimeout -> Promises -> Process.nextTick() -> Callback",
        "c) Callback -> setTimeout -> Promises -> Process.nextTick()",
        "d) Callback -> Process.nextTick() -> Promises -> setTimeout",
      ],
      correctAnswer:
        "d) Callback -> Process.nextTick() -> Promises -> setTimeout"
    },
    {
      question:
        "3) What is the factory function and generator function in JavaScript ?",
      options: [
        "a) A factory function is a regular function that creates and returns a new object. || A generator function is a special type of function that can pause its execution and resume later. It's useful for creating sequences of values on-the-fly, one at a time.",
        "b) A factory function is a constructor function that directly modifies the `this` keyword. || A generator function cannot be paused and always completes its execution in a single run.",
        "c) A factory function is a function that always returns a promise. || A generator function is a regular function that returns multiple values all at once.",
        "d) A factory function is used only for inheritance in JavaScript. || A generator function is a function that automatically returns objects and never uses `yield` statements.",
      ],
      correctAnswer:
        "a) A factory function is a regular function that creates and returns a new object. || A generator function is a special type of function that can pause its execution and resume later. It's useful for creating sequences of values on-the-fly, one at a time.",
     
    },
    {
      question:
        "4) Which of the following are correct in different ways to clone (Shallow & Deep Copy of object) an object ?",
      options: [
        "a) Shallow Copy: Creates a new object with the same top-level properties as the original. However, nested objects are still referenced, meaning changes to nested objects affect both the original and the clone. ",
        "b) Deep Copy: Creates a completely independent clone of the original object, including all nested objects. Changes to the clone do not affect the original object in any way.",
        "c) Both a and b options are correct",
        "d) Only b is correct",
      ],
      correctAnswer: "c) Both a and b options are correct",
      
    },
    {
      question: "5) Which of the following options are correct  object immutability ?(Seal and Freeze methods)",
      options: [
        "a) Object.freeze(): Completely immutabilizes an object by preventing addition, removal, or modification of properties. Use for objects that should remain unchanged throughout their lifecycle. ",
        "b) Object.seal(): Restricts an object's structure by preventing addition or removal of properties but allows modification of existing property values (if writable). Use when you want to protect the object's shape but still allow controlled changes to its data. ",
        "c) Both a and b are wrong",
        "d) both a and b are correct",
      ],
      correctAnswer:
        "d) both a and b are correct",      
    },
    {
      question:
        "6) What is Event Bubbling ?",
      options: [
        "a) When an event is triggered on an element, it only affects the element itself without involving its parent elements.",
        "b) When an event is triggered on an element, it propagates (or 'bubbles up') through its parent elements up to the root of the DOM. ",
        "c) When an event is triggered on an element, it propagates only to the sibling elements.",
        "d) When an event is triggered on an element, it moves downward to its child elements.",
      ],
      correctAnswer:
        "b) When an event is triggered on an element, it propagates (or 'bubbles up') through its parent elements up to the root of the DOM. "
      
    },
    {
      question:
        "7) What is Event delegation ?",
      options: [
        "a) Event delegation is a powerful technique in JavaScript that leverages the event bubbling (or event propagation) mechanism to manage events efficiently. Instead of attaching event listeners to multiple child elements, you attach a single event listener to a parent element.",
        "b) Event delegation is a method to prevent events from propagating to parent elements, ensuring only the child element handles the event.",
       "c) Event delegation is when multiple event listeners are attached to all child elements to handle their specific events individually.",
       "d) Event delegation is a technique to disable event listeners across all elements within a container.",
     ],
      correctAnswer:
       "a) Event delegation is a powerful technique in JavaScript that leverages the event bubbling (or event propagation) mechanism to manage events efficiently. Instead of attaching event listeners to multiple child elements, you attach a single event listener to a parent element.",      
    },
    {
      question:
      "8) What is server-sent events ?",
    options: [
      "a) Server-Sent Events (SSE) allow clients to send continuous updates to the server in real-time over HTTP.",
      "b) Server-Sent Events (SSE) establish a bi-directional connection between the client and server for real-time communication.",
      "c) Server-Sent Events (SSE) are a standard technology for enabling servers to push real-time updates to clients over HTTP.",
      "d) Server-Sent Events (SSE) use the WebSocket protocol to maintain a persistent connection between the server and client.",
    ],
    correctAnswer:
      "c) Server-Sent Events (SSE) are a standard technology for enabling servers to push real-time updates to clients over HTTP.",
      },
      {
        question:
      "9) What is web worker or service worker in Java Script?",
    options: [
      "a) A Web Worker allows you to run JavaScript in the background, separate from the main browser thread. This helps in performing heavy computations without freezing the UI. ",
      "b) A Web Worker doesn't allow you to run JavaScript in the background, separate from the main browser thread. This helps in performing heavy computations without freezing the UI.",
      "c) A Service Worker is a script that runs in the background and can intercept and cache network requests, making websites work offline and load faster.",
      "d) Both options a & c are correct.",
    ],
    correctAnswer:
      "d) Both options a & c are correct.",     
      
      },
      {
        question:
        "10) How to Compare 2 JSON Objects in Java Script ?",
      options: [
        "a) Both options c and d are correct.",
        "b) Option c is correct and d is wrong.",
        "c) Recursively compare object properties. ",
        "d) Convert them to strings using JSON.stringify() and compare the resulting strings.",
      ],
      correctAnswer:
        "a) Both options c and d are correct.",     
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
    const isHardJsTestCompleted = localStorage.getItem(`${userPrefix}hardjstestCompleted`);
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
        where("difficulty", "==", "hardjs")
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
          difficulty: "hardjs",
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
      localStorage.setItem(`${userPrefix}hardjstestCompleted`, true);

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
    navigate("/javascript/hardjssols");
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

export default Jshard;
