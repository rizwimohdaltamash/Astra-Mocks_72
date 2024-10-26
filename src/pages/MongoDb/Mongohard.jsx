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

const Mongohard = () => {
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
      question: "1) What is MongoDB Atlas ?",
      options: [
        "a) MongoDB Atlas is a local installation of MongoDB for personal use.",
        "b) MongoDB Atlas is a tool for data visualization and reporting.",
        "c) MongoDB Atlas is a fully managed, cloud-hosted MongoDB service provided by MongoDB.",
        "d) MongoDB Atlas is a framework for building web applications using MongoDB.",
      ],
      correctAnswer:
        "c) MongoDB Atlas is a fully managed, cloud-hosted MongoDB service provided by MongoDB.",
    },
    {
      question: "2) How does the aggregation pipeline work ?",
      options: [
        "a) The aggregation pipeline processes data in real-time as it is inserted into the database.",
        "b) The aggregation pipeline can only perform operations on a single document at a time.",
        "c) The aggregation pipeline is a method for creating indexes in MongoDB.",
        "d) The aggregation pipeline allows for data processing through stages like $match, $group, $sort, and $project.",
      ],
      correctAnswer:
        "d) The aggregation pipeline allows for data processing through stages like $match, $group, $sort, and $project.",
    },
    {
      question: "3) What is the difference between find() and findOne() ?",
      options: [
        "a) find() returns all documents that match the query, whereas findOne() returns only the first matching document.",
        "b) find() is used for querying, while findOne() is used for updating documents.",
        "c) find() can only be used with a specific collection, whereas findOne() can be used with multiple collections.",
        "d) find() returns documents in ascending order, while findOne() returns documents in descending order.",
      ],
      correctAnswer:
        "a) find() returns all documents that match the query, whereas findOne() returns only the first matching document.",
    },
    {
      question: "4) How do you delete a document in MongoDB ?",
      options: [
        "a) You can delete documents by simply setting their status to inactive.",
        "b) Deleting a document requires dropping the entire collection.",
        "c) Use deleteOne() or deleteMany() to remove documents from a collection.",
        "d) Documents can only be deleted through the MongoDB Atlas interface.",
      ],
      correctAnswer:
        "c) Use deleteOne() or deleteMany() to remove documents from a collection.",
    },
    {
      question: "5) What are some common use cases for MongoDB ?",
      options: [
        "a) MongoDB is primarily used for relational database management systems (RDBMS).",
        "b) MongoDB is best suited for applications that require strict ACID transactions only.",
        "c) MongoDB is used mainly for storing static HTML files.",
        "d) MongoDB is used in content management, real-time analytics, e-commerce, mobile applications, and IoT.",
      ],
      correctAnswer:
        "d) MongoDB is used in content management, real-time analytics, e-commerce, mobile applications, and IoT.",
    },
    {
      question: "6) What are the different data types supported by MongoDB ?",
      options: [
        "a) MongoDB only supports text and numerical data types.",
        "b) MongoDB supports a variety of data types, including strings, integers, arrays, objects, binary data, and dates.",
        "c) MongoDB supports only JSON data types.",
        "d) MongoDB does not support any data types.",
      ],
      correctAnswer:
        "b) MongoDB supports a variety of data types, including strings, integers, arrays, objects, binary data, and dates.",
    },
    {
      question: "7) How do I optimize MongoDB performance ?",
      options: [
        "a) Performance can be optimized through proper indexing, sharding, query optimization, and replication strategies.",
        "b) Performance is solely dependent on the hardware used.",
        "c) The only way to optimize performance is by upgrading to the latest MongoDB version.",
        "d) MongoDB does not require performance optimization as it is always efficient.",
      ],
      correctAnswer:
        "a) Performance can be optimized through proper indexing, sharding, query optimization, and replication strategies.",
    },
    {
      question: "8) What is a projection in MongoDB ?",
      options: [
        "a) A projection is a method to sort the documents retrieved from a collection.",
        "b) A projection refers to a type of indexing used in MongoDB.",
        "c) A projection is used to specify which fields should be returned in the documents retrieved by a query.",
        "d) A projection is an operation that removes documents from a collection.",
      ],
      correctAnswer:
        "c) A projection is used to specify which fields should be returned in the documents retrieved by a query.",
    },
    {
      question: "9) How do you backup and restore data in MongoDB ?",
      options: [
        "a) Backing up and restoring data can only be done through the MongoDB Atlas interface.",
        "b) Use the copy and paste method to save data to a different location.",
        "c) You can only back up data by exporting it to JSON files.",
        "d) Use mongodump to back up data and mongorestore to restore it.",
      ],
      correctAnswer:
        "d) Use mongodump to back up data and mongorestore to restore it.",
    },
    {
      question: "10) How does MongoDB ensure data durability and consistency ?",
      options: [
        "a) MongoDB ensures data durability through journaling, replication, and the Write Concern settings.",
        "b) Data is only durable if stored in RAM.",
        "c) MongoDB does not guarantee data durability; it relies solely on the client application.",
        "d) Data is automatically replicated every hour to ensure consistency.",
      ],
      correctAnswer:
        "a) MongoDB ensures data durability through journaling, replication, and the Write Concern settings.",
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
    const isHardMongoTestCompleted = localStorage.getItem(
      `${userPrefix}hardmongotestCompleted`
    );
    if (isHardMongoTestCompleted) {
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
        where("difficulty", "==", "hardmongo")
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
          difficulty: "hardmongo",
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
      localStorage.setItem(`${userPrefix}hardmongotestCompleted`, true);

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
    navigate("/mongodb/hardmongosols");
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

export default Mongohard;
