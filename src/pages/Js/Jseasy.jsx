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

const Jseasy = () => {
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
        "1) Which of the following statements accurately describes the nature of JavaScript?",
      options: [
        "a) Everything in JavaScript happens inside an Execution Context, and it is a Asynchronous Single-Threaded Language.",
        "b) Everything in JavaScript does not happen inside an Execution Context, and it is a Synchronous Multi-Threaded Language.",
        "c) Everything in JavaScript happens inside an Execution Context, and it is a Synchronous Single-Threaded Language.",
        "d) Everything in JavaScript happens inside an Execution Context, and it is a Synchronous Multi-Threaded Language.",
      ],
      correctAnswer:
        "c) Everything in JavaScript happens inside an Execution Context, and it is a Synchronous Single-Threaded Language.",
      
    },
    {
      question:
        "2) What is the main component of the JavaScript engine, and how does it work?",
      options: [
        "a) Call Queue and Execution Thread: The Call Queue stores the list of functions waiting to be executed, while the Execution Thread is responsible for executing these functions in a parallel manner.",
        "b) Call Stack and a Heap: The Call Stack is where our code gets executed with the help of the Execution Context. And the Heap is an Unstructured Memory Pool that stores all the objects in the memory that our application needs.",
        "c) Global Execution Context and Task Queue: The Global Execution Context handles the execution of global code, while the Task Queue manages the tasks waiting for execution after asynchronous operations.",
        "d) Event Loop and Callback Stack: The Event Loop processes asynchronous callbacks, while the Callback Stack stores the functions that need to be executed after the main execution is complete.",
      ],
      correctAnswer:
        "b) Call Stack and a Heap: The Call Stack is where our code gets executed with the help of the Execution Context. And the Heap is an Unstructured Memory Pool that stores all the objects in the memory that our application needs.",
      
    },
    {
      question:
        "3) What is Event Loop in Javascript and how it helps in asynchronous programming?",
      options: [
        "a) Event loop is a part of the JavaScript engine that executes synchronous code first, then asynchronous code in a parallel thread.",
        "b) Event loop is a built-in method in JavaScript that allows you to loop through events in an array asynchronously.",
        "c) Event loop is a mechanism in JavaScript that directly controls the execution of promises and makes them run faster.",
        "d) Event loop manages the Asynchronous operations and ensures that they are executed in a Non-Blocking manner, without creating new threads. This allows JavaScript to remain single-threaded while still handling asynchronous tasks efficiently.",
      ],
      correctAnswer:
        "d) Event loop manages the Asynchronous operations and ensures that they are executed in a Non-Blocking manner, without creating new threads. This allows JavaScript to remain single-threaded while still handling asynchronous tasks efficiently.",
     
    },
    {
      question:
        "4) Which of the following statements accurately describes the nature of const, let, var?",
      options: [
        "a) var is the oldest way to declare a variable in JavaScript. Variables declared with var have a function-level scope, meaning they are only accessible within the function in which they were declared. They also have hoisting behavior, which means they are accessible throughout the entire scope of the function, regardless of where they were declared. However, because of its function-level scope, variables declared with var can lead to unexpected behavior and are generally not recommended.",
        "b) let was introduced in ECMAScript 6 (also known as ES6) as an alternative to var. Variables declared with let have the block-level scope, meaning they are only accessible within the block in which they were declared. They also have the concept of the temporal dead zone, which means they are not accessible before they are declared.",
        "c) const was also introduced in ECMAScript 6 and is used to declare variables that cannot be reassigned. This makes const variables useful for declaring constants, such as pi or the gravitational constant, which have a fixed value. Like let, const variables have the block-level scope, and, they are not accessible before they are declared.",
        "d) All of the above options.",
      ],
      correctAnswer: "d) All of the above options.",
      
    },
    {
      question: "5) Which of the following statements are Correct?",
      options: [
        "a) Data Types in Js : |Primitive = Number, String, Boolean, Undefined, Null, Symbol, BigInt | Non-Primitive = Object, Array, Functions.",
        "b) Data Types in Js : |Primitive = Number, String, Boolean, Object, Array, Symbol, BigInt | Non-Primitive = Undefined, Null, Functions.",
        "c) Data Types in Js : |Primitive = Number, String, Boolean, Null, Functions | Non-Primitive = Undefined, Symbol, BigInt, Object, Array.",
        "d) Data Types in Js : |Primitive = Number, String, Boolean, Undefined, Symbol | Non-Primitive = Null, Object, Functions, Array, BigInt.",
      ],
      correctAnswer:
        "a) Data Types in Js : |Primitive = Number, String, Boolean, Undefined, Null, Symbol, BigInt | Non-Primitive = Object, Array, Functions.",
      
    },
    {
      question:
        "6) Which of the following statements accurately describes the CallBack Function and CallBack Hell?",
      options: [
        "a) Callback functions are functions passed as arguments to other functions and executed after the completion of a task.",
        "b) Callback Hell refers to the situation where callbacks are nested within other callbacks multiple levels deep. This makes the code hard to read, maintain, and debug.",
        "c) Both a and b are wrong",
        "d) Both a and b are correct",
      ],
      correctAnswer:
        "d) Both a and b are correct",
      
    },
    {
      question:
        "7) What is Promise and Promise Chaining ?",
      options: [
        "a) Promise: It is an object that represents eventual completion/failure of an Asynchronous Operation. || Promise Chaining: It is a way to execute Multiple Asynchronous operations in Sequence,where o/p of one operation serves as the input for the next.",
        "b) Promise: It is a synchronous operation used to handle asynchronous tasks. || Promise Chaining: It is a method to execute promises in parallel rather than in sequence.",
        "c) Promise: It is a function that ensures the completion of all asynchronous operations. || Promise Chaining: It is a technique to run multiple synchronous operations concurrently.",
        "d) Promise: It is an object that represents only the successful completion of an operation. || Promise Chaining: It is a method to handle errors in asynchronous operations by running them in reverse order.",
      ],
      correctAnswer:
        "a) Promise: It is an object that represents eventual completion/failure of an Asynchronous Operation. || Promise Chaining: It is a way to execute Multiple Asynchronous operations in Sequence,where o/p of one operation serves as the input for the next.",      
    },
    {
      question:
      "8) What is 'async' and 'await' ?",
    options: [
      "a) async: A function declared with the 'async' keyword can only be used inside a loop. || await: The 'await' keyword skips the execution of the promise entirely.",
      "b) async: A function declared with the 'async' keyword automatically returns a promise. Within an 'async' function,you can use the 'await' keyboard. || await: The 'await' keyword pauses the execution of the 'async' function until the promise it is waiting for is resolved or rejected.",
      "c) async: A function declared with the 'async' keyword must always be followed by a 'then' statement. || await: The 'await' keyword allows a promise to be ignored and skipped.",
      "d) async: The 'async' keyword converts any function into a synchronous one. || await: The 'await' keyword stops the entire program until the promise is resolved.",
    ],
    correctAnswer:
      "b) async: A function declared with the 'async' keyword automatically returns a promise. Within an 'async' function,you can use the 'await' keyboard. || await: The 'await' keyword pauses the execution of the 'async' function until the promise it is waiting for is resolved or rejected.",
      },
      {
        question:
        "9) What is difference between '=','==' and '===' ?",
      options: [
        "a) '=' : Compares two values for equality after converting both to a common type. || '==' : Assigns a value to a variable. || '===' : Compares two values for equality without converting their types.",
        "b) '=' : Compares two values for equality without converting their types. || '==' : Assigns a value to a variable. || '===' : Compares two values after converting both to a common type.",
        "c) '=' : Assigns a value to a variable. || '==' : Compares two values for equality without converting their types. || '===' : Compares two values after converting both to a common type.",
        "d) '=' : Assigns a value to a variable. || '==' : Compares two values for equality after converting both values to a common type (type coercion). || '===' : Compares two values for equality without converting their types. Both the value and the type must be the same for the comparison.",
      ],
      correctAnswer:
        "d) '=' : Assigns a value to a variable. || '==' : Compares two values for equality after converting both values to a common type (type coercion). || '===' : Compares two values for equality without converting their types. Both the value and the type must be the same for the comparison.",       
      },
      {
        question:
      "10) Different ways to create an object in JavaScript ?",
    options: [
      "a) Using `eval()` function",
      "b) Object Constructor,Object's Create Method,Object Literal Syntax,Function Constructor,Function Constructor with Prototype,ES6 Class Syntax,Singleton Pattern",
      "c) Using `console.log()` method",
      "d) Using HTML tags",
    ],
    correctAnswer:
      "b) Object Constructor,Object's Create Method,Object Literal Syntax,Function Constructor,Function Constructor with Prototype,ES6 Class Syntax,Singleton Pattern",     
      
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
    const isEasyJsTestCompleted = localStorage.getItem(`${userPrefix}easyjstestCompleted`);
    if (isEasyJsTestCompleted) {
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
        where("difficulty", "==", "easyjs")
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
          difficulty: "easyjs",
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
      localStorage.setItem(`${userPrefix}easyjstestCompleted`, true);
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
    navigate("/javascript/easyjssols");
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

export default Jseasy;
