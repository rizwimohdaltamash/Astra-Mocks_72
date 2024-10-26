import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import FirstHardJs from "../../assets/firsthardjs.jpg";
import SecondHardJs from "../../assets/secondhardjs.jpg";
import ThirdHardJs from "../../assets/thirdhardjs.jpg";
import FourthHardJs from "../../assets/fourthhardjs.jpg";
import FifthHardJs from "../../assets/fifthhardjs.jpg";
import SixthHardJs from "../../assets/sixthhardjs.jpg";
import SeventhHardJs from "../../assets/sixthhardjs.jpg";
import EigthHardJs from "../../assets/eigthhardjs.jpg";
import NinthHardJs from "../../assets/ninthhardjs.jpg";
import TenthHardJs from "../../assets/tenthhardjs.jpg";


const Jshardsols = () => {
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
      "1) What is Execution Context,Execution Stack, Variable object(VO) and Scope Chain?",
    options: [
      "a) Execution Context is a function that automatically manages scope chain and variable objects when called.",
      "b) Execution Stack is an array of variables used to manage memory allocation in JavaScript code execution.",
      "c) Execution Context is the environment in which JavaScript code is executed. || Execution Stack is a stack data structure that keeps track of all the execution contexts. When a function is called, it is added to the stack. When the function returns, it's removed from the stack. || In JavaScript, the Variable Object contains all the variables, function declarations, and arguments defined in a particular execution context. || Scope chain determines the order in which variables are looked up in nested functions. If a variable is not found in the current scope, JavaScript will check the outer (parent) scope.",
      "d) Scope Chain is a list of functions that are queued in the call stack and determines the order in which they will execute.",
    ],
    correctAnswer:
      "c) Execution Context is the environment in which JavaScript code is executed. || Execution Stack is a stack data structure that keeps track of all the execution contexts. When a function is called, it is added to the stack. When the function returns, it's removed from the stack. || In JavaScript, the Variable Object contains all the variables, function declarations, and arguments defined in a particular execution context. || Scope chain determines the order in which variables are looked up in nested functions. If a variable is not found in the current scope, JavaScript will check the outer (parent) scope.",
    image: FirstHardJs,
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
      "d) Callback -> Process.nextTick() -> Promises -> setTimeout",
    image: SecondHardJs,
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
    image: ThirdHardJs,
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
    image: FourthHardJs,
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
       image: FifthHardJs,
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
      "b) When an event is triggered on an element, it propagates (or 'bubbles up') through its parent elements up to the root of the DOM. ",
    image: SixthHardJs,
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
    image: SeventhHardJs,
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
      image: EigthHardJs,
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
       image: NinthHardJs,
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
    image: TenthHardJs,
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
           {/* <div className="flex justify-center mb-8 space-x-2">
            {questions.map((_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full border ${
                  currentQuestionIndex === index
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => handlePaginationClick(index)}
              >
                {index + 1}
              </button>
            ))}
          </div> */}

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

export default Jshardsols;
