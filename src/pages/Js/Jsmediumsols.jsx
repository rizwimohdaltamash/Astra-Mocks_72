import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import FirstMediumJs from "../../assets/firstmediumjs.jpg";
import SecondMediumJs from "../../assets/secondmediumjs.jpg";
import ThirdMediumJs from "../../assets/thirdmediumjs.jpg";
import FourthMediumJs from "../../assets/fourthmediumjs.jpg";
import FifthMediumJs from "../../assets/fifthmediumjs.jpg";
import SixthMediumJs from "../../assets/sixthmediumjs.jpg";
import SeventhMediumJs from "../../assets/seventhmediumjs.jpg";
import EigthMediumJs from "../../assets/eigthmediumjs.jpg";
import NinthMediumJs from "../../assets/ninthmediumjs.jpg";
import TenthMediumJs from "../../assets/tenthmediumjs.jpg";


const Jsmediumsols = () => {
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
        "1) What is 'rest' and 'spread' operator in JavaScript?",
      options: [
        "a) Rest Operator : Collects multiple elements into an array. Used primarily in function parameters and destructuring assignments.",
        "b) Spread Operator : Expands an array, object, or string into individual elements. Used primarily in function arguments, array literals, and object literals.",
        "c) Both a and b are correct.",
        "d) Both a and b are incorrect.",
      ],
      correctAnswer:
        "c) Both a and b are correct.",
      image: FirstMediumJs,
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
      image: SecondMediumJs,
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
     image: ThirdMediumJs,
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
       image: FourthMediumJs,
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
        image: FifthMediumJs,
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
      image: SixthMediumJs,
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
    image: SeventhMediumJs,
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
        image: EigthMediumJs,
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
      image: NinthMediumJs,
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
       image: TenthMediumJs,
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



export default Jsmediumsols;
