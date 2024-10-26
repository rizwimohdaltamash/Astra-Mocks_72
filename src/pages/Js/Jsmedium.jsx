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

const Jsmedium = () => {
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
      "1) What is 'rest' and 'spread' operator in JavaScript?",
    options: [
      "a) Rest Operator : Collects multiple elements into an array. Used primarily in function parameters and destructuring assignments.",
      "b) Spread Operator : Expands an array, object, or string into individual elements. Used primarily in function arguments, array literals, and object literals.",
      "c) Both a and b are correct.",
      "d) Both a and b are incorrect.",
    ],
    correctAnswer:
      "c) Both a and b are correct.",
    },
    {
      question:
        "2) What are higher-order functions?",
      options: [
        "a) Either takes One or more functions as argument || Returns a function as its result., eg:.map(),.filter(),.reduce()",
        "b) Takes only One functions as argument || Returns a function as its result., eg:.map(),.filter(),.reduce()",
        "c) Either takes One or more functions as argument || Doesn't return a function as its result., eg:.map(),.filter(),.reduce()",
        "d) None of the above",
      ],
      correctAnswer:
        "a) Either takes One or more functions as argument || Returns a function as its result., eg:.map(),.filter(),.reduce()",
      
    },
    {
      question:
        "3) What is Closure in JavaScript? What are the use cases of closures ?",
      options: [
        "a) A Closure is a block of code that runs only once and cannot be invoked again.",
        "b) A Closure is a function that only exists within the scope of an event listener.",
        "c) A Closure is a method that is automatically called when an object is created.",
        "d) A Closure is a function that can access the variables and parametres of its outer function, even after the outer function has finished executing.||eg:Data privacy,Callbacks,Currying,Memoization,Module patterns.",
      ],
      correctAnswer:
        "d) A Closure is a function that can access the variables and parametres of its outer function, even after the outer function has finished executing.||eg:Data privacy,Callbacks,Currying,Memoization,Module patterns.",
     
    },
    {
      question:
        "4) What is hoisting in JavaScript ?",
      options: [
        "a) Hoisting in JavaScript is a concept where functions are automatically converted to objects.",
        "b) Hoisting in Java Script is a concept where you use the variable before declaring it.",
        "c) Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope.",
        "d) Hoisting in JavaScript allows you to use variables without ever declaring them.",
      ],
      correctAnswer: "b) Hoisting in Java Script is a concept where you use the variable before declaring it.",
      
    },
    {
      question: "5) What is Temporal Dead Zone in Java Script?",
      options: [
        "a) Temporal Dead Zone(TDZ) is a behaviour that occures with variables declared using 'var' and 'let', variables are used after being declared.",
        "b) Temporal Dead Zone(TDZ) is a behaviour that occures with variables declared using 'var' and 'const',variables are used before being declared.",
        "c) Temporal Dead Zone(TDZ) is a behaviour that occures with variables declared using 'let' and 'const',variables are used before being declared.",
        "d) None of the Above",
      ],
      correctAnswer:
        "c) Temporal Dead Zone(TDZ) is a behaviour that occures with variables declared using 'let' and 'const',variables are used before being declared.",
      
    },
    {
      question:
        "6) What is a prototype chain ?",
      options: [
        "a) Prototype chain is a type of linked list in JavaScript.",
        "b) Prototype chain is a mechanism that allows objects to inherit properties and methods from other objects.The chain of objects connected via prototypes is called prototype chain.",
        "c) Prototype chain is a special method that copies properties from one object to another.",
        "d) Prototype chain is a method in JavaScript to directly access global variables.",
      ],
      correctAnswer:
        "b) Prototype chain is a mechanism that allows objects to inherit properties and methods from other objects.The chain of objects connected via prototypes is called prototype chain.",
      
    },
    {
      question:
        "7) What is difference between 'call','apply' & 'bind' methods ?",
      options: [
        "a) 'call' : Invokes a function and explicitly sets 'this' for the function execution and passes arguments individually. || 'apply' : Invokes a function immediately with a specified 'this' value, but arguments are provided as an array. || 'bind' : Returns a new function with a specified 'this' value and optionally preset arguments, but does not invoke the function immediately.",
        "b) 'call' : Invokes a function with the default 'this' context and passes arguments as an array. || 'apply' : Binds a function to a context but does not invoke it immediately. || 'bind' : Invokes a function with a specified 'this' value and passes arguments individually.",
        "c) 'call' : Returns a new function that can be invoked later with specified 'this' and arguments. || 'apply' : Invokes a function immediately and passes a single argument. || 'bind' : Invokes a function immediately with a specified 'this' and passes arguments individually.",
        "d) 'call' : Invokes a function immediately with arguments as an array. || 'apply' : Binds a function to a specified 'this' and returns a new function. || 'bind' : Invokes a function with default 'this' and arguments individually.",
      ],
      correctAnswer:
        "a) 'call' : Invokes a function and explicitly sets 'this' for the function execution and passes arguments individually. || 'apply' : Invokes a function immediately with a specified 'this' value, but arguments are provided as an array. || 'bind' : Returns a new function with a specified 'this' value and optionally preset arguments, but does not invoke the function immediately.",      
    },
    {
      question:
      "8) What is Lambda or Arrow functions, say which option gives the correct syntax?",
    options: [
      "a) const add = (a,b) -> a + b",
      "b) const add = (a,b) => { return a + b }",
      "c) const add = (a,b) -> { return a + b }",
      "d) const add = (a,b) => a + b",
    ],
    correctAnswer:
      "d) const add = (a,b) => a + b",
      },
      {
        question:
        "9) What is currying function in JavaScript?",
      options: [
        "a) Currying is a concept in functional programming which takes Multiple arguments at a time, where as a Simple Function takes One argument at a time.",
        "b) Currying is a concept in functional programming which takes Multiple arguments at a time, where as a Simple Function takes Multiple arguments at a time.",
        "c) Currying is a concept in functional programming which doesn't take any argument, where as a Simple Function takes Multiple arguments at a time.",
        "d) Currying is a concept in functional programming which takes One argument at a time, where as a Simple Function takes Multiple arguments at a time.",
      ],
      correctAnswer:
        "d) Currying is a concept in functional programming which takes One argument at a time, where as a Simple Function takes Multiple arguments at a time.",       
      },
      {
        question:
      "10) What are the features of ES6 in Java Script ?",
    options: [
      "a) Global Variables, Inline CSS, Deprecated HTML Tags, XML Parsing, Direct DOM Manipulation.",
      "b) Block-Scoped Variables('var' & 'const'), Callback Functions, Inline Event Handling, CSS Selectors, Inline HTML.",
      "c) Block-Scoped Variables('let' & 'const') ,Arrow Functions (= () =>) ,Template Literals(`${}`) ,Rest and Spread Operators('...rest' & '...spread') ,Classes ,Modules('inport' & 'export') ,Promises ,Collections('Map' & 'Set').",
      "d) Static Typing, Inheritance, Dynamic Imports, Java Beans, Direct SQL Queries.",
    ],
    correctAnswer:
      "c) Block-Scoped Variables('let' & 'const') ,Arrow Functions (= () =>) ,Template Literals(`${}`) ,Rest and Spread Operators('...rest' & '...spread') ,Classes ,Modules('inport' & 'export') ,Promises ,Collections('Map' & 'Set').",     
      
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
    const isMediumJsTestCompleted = localStorage.getItem(`${userPrefix}mediumjstestCompleted`);
    if (isMediumJsTestCompleted) {
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
        where("difficulty", "==", "mediumjs")
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
          difficulty: "mediumjs",
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
       localStorage.setItem(`${userPrefix}mediumjstestCompleted`, true);

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
    navigate("/javascript/mediumjssols");
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

export default Jsmedium;
