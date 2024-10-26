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

const Exhard = () => {
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
        "1) How do you use template engines (e.g., EJS, Pug) in Express.js ?",
      options: [
        "a) By directly sending HTML files without any templating capabilities",
        "b) By using third-party libraries only without any integration in Express.js",
        "c) By setting the view engine in Express, creating views with template syntax, and rendering them in routes",
        "d) By replacing the Express.js routing system with the template engine's own routing capabilities",
      ],
      correctAnswer:
        "c) By setting the view engine in Express, creating views with template syntax, and rendering them in routes",
    },
    {
      question:
        "2) How do you configure Express.js for different environments (development, production) ?",
      options: [
        "a) By creating separate application instances for each environment and managing them independently",
        "b) By using hard-coded values in the application for both environments without any flexibility",
        "c) By relying solely on environment variables without any additional configuration options",
        "d) By using environment variables to set configurations, such as enabling/disabling middleware, setting logging levels, and connecting to the appropriate databases",
      ],
      correctAnswer:
        "d) By using environment variables to set configurations, such as enabling/disabling middleware, setting logging levels, and connecting to the appropriate databases",
    },
    {
      question:
        "3) What are Express.js route parameters, and how do you define them ?",
      options: [
        "a) Route parameters are named segments of the URL that are used to capture values and are defined using a colon (:) in the route path, e.g., /user/:id",
        "b) Route parameters are static segments of the URL that cannot change, defined without any special characters",
        "c) Route parameters are used only in GET requests to fetch data from the server, and they are defined using square brackets",
        "d) Route parameters are optional parts of the URL that can be included or excluded, defined with curly braces",
      ],
      correctAnswer:
        "a) Route parameters are named segments of the URL that are used to capture values and are defined using a colon (:) in the route path, e.g., /user/:id",
    },
    {
      question:
        "4) How do you structure a large-scale Express.js application ?",
      options: [
        "a) By keeping all the code in a single file for simplicity and ease of access",
        "b) By using a flat directory structure without any organization to keep it minimal",
        "c) By organizing code into separate modules for routes, controllers, models, and middleware, and using a clear directory structure to promote maintainability",
        "d) By relying solely on third-party frameworks to manage the application's structure and organization",
      ],
      correctAnswer:
        "c) By organizing code into separate modules for routes, controllers, models, and middleware, and using a clear directory structure to promote maintainability",
    },
    {
      question: "5) What is body-parser, and why is it used in Express.js ?",
      options: [
        "a) Body-parser is a built-in middleware function that formats the request body into a readable format, allowing the server to easily parse incoming data.",
        "b) Body-parser is a library that compresses incoming requests to reduce data size, optimizing performance for large payloads.",
        "c) Body-parser is an external module that secures the request body by encrypting sensitive data before it reaches the server.",
        "d) Body-parser is a middleware that parses the request body, making it accessible in the request object for handling form submissions and JSON data.",
      ],
      correctAnswer:
        "d) Body-parser is a middleware that parses the request body, making it accessible in the request object for handling form submissions and JSON data.",
    },
    {
      question: "6) How do you implement API versioning in Express.js ?",
      options: [
        "a) By creating separate files for each version of the API and routing to them based on the version number in the URL.",
        "b) By using a version prefix in the URL (e.g., /api/v1/) to distinguish between different versions of the API, allowing for easy upgrades.",
        "c) By modifying the existing API routes and adjusting the functionality dynamically to handle versioning internally without any URL changes.",
        "d) By utilizing query parameters to specify the API version in requests, enabling multiple versions to coexist with the same endpoint structure.",
      ],
      correctAnswer:
        "b) By using a version prefix in the URL (e.g., /api/v1/) to distinguish between different versions of the API, allowing for easy upgrades.",
    },
    {
      question: "7) What are best practices for error handling in Express.js ?",
      options: [
        "a) Implement centralized error handling middleware to manage errors consistently and log error details for easier debugging.",
        "b) Use console logs directly in route handlers to output error messages, allowing for quick troubleshooting during development.",
        "c) Handle errors in each individual route without any middleware, ensuring that specific errors are managed directly in the route logic.",
        "d) Return generic error messages to the client without exposing stack traces, maintaining application security while providing minimal feedback.",
      ],
      correctAnswer:
        "a) Implement centralized error handling middleware to manage errors consistently and log error details for easier debugging.",
    },
    {
      question: "8) How do you throttle or rate-limit requests in Express.js ?",
      options: [
        "a) By manually tracking request counts for each user and blocking them after a certain threshold is reached, ensuring limited access.",
        "b) By configuring server settings to limit connections from specific IP addresses, preventing abuse from those sources.",
        "c) By using middleware like express-rate-limit to set up rate limiting based on specific criteria, controlling the number of requests.",
        "d) By employing a load balancer that automatically distributes incoming requests to multiple servers, mitigating excessive load.",
      ],
      correctAnswer:
        "c) By using middleware like express-rate-limit to set up rate limiting based on specific criteria, controlling the number of requests.",
    },
    {
      question:
        "9) How do you deploy an Express.js application to production (e.g., Heroku, AWS) ?",
      options: [
        "a) By running the application directly from your local machine, allowing users to access it through your personal IP address.",
        "b) By containerizing the application with Docker and deploying it to a container orchestration service for scalability and management.",
        "c) By creating a virtual machine on a cloud provider and manually installing Node.js and all dependencies for the app.",
        "d) By using a Platform as a Service (PaaS) like Heroku, where you can easily deploy and manage your application without server management.",
      ],
      correctAnswer:
        "d) By using a Platform as a Service (PaaS) like Heroku, where you can easily deploy and manage your application without server management.",
    },
    {
      question: "10) What are the differences between Express.js and Koa.js ?",
      options: [
        "a) Express.js is built on callbacks, while Koa.js utilizes async/await syntax for cleaner, more manageable code.",
        "b) Express.js has a larger community and more middleware options, whereas Koa.js is designed to be minimal and lightweight.",
        "c) Koa.js includes built-in support for handling HTTP requests, while Express.js requires additional libraries for such functionalities.",
        "d) Express.js is focused on simplicity, whereas Koa.js emphasizes modularity and provides a more flexible architecture.",
      ],
      correctAnswer:
        "a) Express.js is built on callbacks, while Koa.js utilizes async/await syntax for cleaner, more manageable code.",
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
    const isHardExTestCompleted = localStorage.getItem(
      `${userPrefix}hardextestCompleted`
    );
    if (isHardExTestCompleted) {
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
        where("difficulty", "==", "hardexpress")
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
          difficulty: "hardexpress",
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
      localStorage.setItem(`${userPrefix}hardextestCompleted`, true);

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
    navigate("/express/hardexsols");
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

export default Exhard;
