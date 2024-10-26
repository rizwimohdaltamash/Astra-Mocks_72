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

const Exmedium = () => {
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
      question: "1) How can you use middleware to log requests in Express.js ?",
      options: [
        "a) Create a middleware function that logs the request method and URL, and use app.use() to apply it to all routes",
        "b) Express automatically logs all requests without needing any middleware setup",
        "c) Define a custom logging middleware that uses console.log() to display request details and attach it to specific routes",
        "d) Implement logging by adding a logRequest() function directly in each route handler to log details",
      ],
      correctAnswer:
        "a) Create a middleware function that logs the request method and URL, and use app.use() to apply it to all routes",
    },
    {
      question:
        "2) How do you work with query parameters and URL parameters in Express.js ?",
      options: [
        "a) Use req.query to access query parameters and req.params to access URL parameters defined in the route",
        "b) URL parameters are automatically extracted from the request body without needing special handling",
        "c) Query parameters can only be accessed using middleware, while URL parameters are not supported in Express",
        "d) You can only use query parameters for GET requests and URL parameters for POST requests in Express.js",
      ],
      correctAnswer:
        "a) Use req.query to access query parameters and req.params to access URL parameters defined in the route",
    },
    {
      question:
        "3) What is CORS, and how do you enable it in an Express.js application ?",
      options: [
        "a) CORS stands for Cross-Origin Resource Sharing, and it can be enabled by adding custom headers in each response",
        "b) CORS is a security feature that prevents any cross-origin requests, and it is enabled by default in Express.js",
        "c) CORS is used to allow secure access to resources from different domains, and you enable it using a specific environment variable",
        "d) CORS stands for Cross-Origin Resource Sharing, and you can enable it in Express.js by using the cors middleware package",
      ],
      correctAnswer:
        "d) CORS stands for Cross-Origin Resource Sharing, and you can enable it in Express.js by using the cors middleware package",
    },
    {
      question: "4) How do you handle file uploads in Express.js ?",
      options: [
        "a) Use the built-in body-parser middleware to process files sent as form data",
        "b) Utilize the multer middleware to handle multipart/form-data, which is used for uploading files",
        "c) Express.js automatically handles file uploads without any additional middleware",
        "d) File uploads can only be managed by saving them directly to the file system without middleware support",
      ],
      correctAnswer:
        "b) Utilize the multer middleware to handle multipart/form-data, which is used for uploading files",
    },
    {
      question:
        "5) How can you connect an Express.js application to a MongoDB database ?",
      options: [
        "a) Use the built-in MongoDB driver to establish a connection using MongoClient.connect() directly in your app",
        "b) Create a connection pool using native JavaScript promises to manage database connections",
        "c) Utilize the Mongoose library to connect and interact with MongoDB using schemas and models",
        "d) Express.js has a built-in method for connecting to MongoDB without any external libraries",
      ],
      correctAnswer:
        "c) Utilize the Mongoose library to connect and interact with MongoDB using schemas and models",
    },
    {
      question: "6) How do you handle session management in Express.js ?",
      options: [
        "a) Store user session data directly in the client-side cookies without any server-side management",
        "b) Use the express-session middleware to manage sessions and store session data on the server",
        "c) Sessions are managed automatically by Express.js, so no additional setup is required",
        "d) Handle sessions by passing session information through the URL for each request",
      ],
      correctAnswer:
        "b) Use the express-session middleware to manage sessions and store session data on the server",
    },
    {
      question:
        "7) What is the difference between app.listen() and app.use() in Express ?",
      options: [
        "a) app.listen() is used to start the server, while app.use() is used to register middleware functions",
        "b) app.use() is used to start the server, while app.listen() is used to define routes",
        "c) app.listen() is for defining routes, while app.use() handles HTTP methods only",
        "d) app.use() is only for serving static files, while app.listen() is used for dynamic content",
      ],
      correctAnswer:
        "a) app.listen() is used to start the server, while app.use() is used to register middleware functions",
    },
    {
      question:
        "8) How do you secure an Express.js app from common web vulnerabilities (e.g., CSRF, XSS) ?",
      options: [
        "a) Use a single security measure, like input validation, to protect against all vulnerabilities",
        "b) Rely on the default security settings of Express.js, as they are sufficient for most applications",
        "c) Only implement security measures for user authentication and ignore other parts of the app",
        "d) Implement multiple security measures such as using Helmet for HTTP headers, CSRF tokens, and input sanitization",
      ],
      correctAnswer:
        "d) Implement multiple security measures such as using Helmet for HTTP headers, CSRF tokens, and input sanitization",
    },
    {
      question: "9) What is req and res in Express.js, and how do they work ?",
      options: [
        "a) req is the request object that contains data sent by the client, while res is the response object that sends data back to the client",
        "b) req and res are functions that handle HTTP requests and responses without storing any data",
        "c) req represents the response object, while res represents the request object in an Express app",
        "d) req is the request object that contains data sent by the client, while res is the response object that sends data back to the client, allowing for request handling and response management",
      ],
      correctAnswer:
        "d) req is the request object that contains data sent by the client, while res is the response object that sends data back to the client, allowing for request handling and response management",
    },
    {
      question: "10) How can you implement JWT authentication in Express.js ?",
      options: [
        "a) Store user credentials in a database and retrieve them on every request to verify authentication",
        "b) Use sessions and cookies instead of JWT for managing user authentication in Express.js",
        "c) Generate a JWT upon user login, send it to the client, and use it to authenticate subsequent requests by verifying the token on the server",
        "d) Rely on basic authentication methods by sending username and password with every request",
      ],
      correctAnswer:
        "c) Generate a JWT upon user login, send it to the client, and use it to authenticate subsequent requests by verifying the token on the server",
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
    const isMediumExTestCompleted = localStorage.getItem(
      `${userPrefix}mediumextestCompleted`
    );
    if (isMediumExTestCompleted) {
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
        where("difficulty", "==", "mediumexpress")
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
          difficulty: "mediumexpress",
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
      localStorage.setItem(`${userPrefix}mediumextestCompleted`, true);

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
    navigate("/express/mediumexsols");
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

export default Exmedium;
