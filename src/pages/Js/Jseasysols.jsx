import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import FirstEasyJs from "../../assets/firsteasyjs.jpg";
import SecondEasyJs from "../../assets/secondeasyjs.jpg";
import ThirdEasyJs from "../../assets/thirdeasyjs.jpg";
import FourthEasyJs from "../../assets/fourtheasyjs.jpg";
import FifthEasyJs from "../../assets/fiftheasyjs.jpg";
import SixthEasyJs from "../../assets/sixtheasyjs.jpg";
import SeventhEasyJs from "../../assets/seventheasyjs.jpg";
import EigthEasyJs from "../../assets/eigtheasyjs.jpg";
import NinthEasyJs from "../../assets/nintheasyjs.jpg";
import TenthEasyJs from "../../assets/tentheasyjs.jpg";


const Jseasysols = () => {
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
      image: FirstEasyJs,
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
      image: SecondEasyJs,
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
      image: ThirdEasyJs,
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
      image: FourthEasyJs,
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
      image: FifthEasyJs,
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
      image: SixthEasyJs,
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
      image: SeventhEasyJs,
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
      image: EigthEasyJs,
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
      image: NinthEasyJs,
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
      image: TenthEasyJs,
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
              onClick={() => navigate('/javascript')}
            >
              <IoArrowBackCircle size={40} />
            </button>
          </div>

          
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

      {/* {showPopup && (
       <Popup
       onCancel={() => setShowPopup(false)}
       onConfirm={() => navigate("/javascript")}
     />
     
      )} */}

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

// const Popup = ({ onCancel, onConfirm }) => (
//   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//     <div className="bg-white p-8 rounded-lg shadow-lg text-center lg:w-[50%] w-[80%] ">
//       <h2 className="text-red-600 font-bold mb-4">Warning!</h2>
//       <p className="mb-8">
//         This page won't be accessible if you click the back Button. Click the
//         back button  only if  you <br /> have Completed Seeing the Solutions OR Want to go
//         out of the Solution page.
//       </p>
//       <div className="flex justify-around w-full gap-x-2">
//         <button
//           className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 w-1/2"
//           onClick={onCancel}
//         >
//           Cancel
//         </button>
//         <button
//           className="bg-red-800 text-white py-2 px-4 rounded hover:bg-red-600 w-1/2"
//           onClick={onConfirm}
//         >
//           Go Out
//         </button>
//       </div>
//     </div>
//   </div>
// );

export default Jseasysols;
