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

const Mongoeasy = () => {
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
      question: "1) What is MongoDB ?",
      options: [
        "a) MongoDB is a relational database management system commonly used for transaction processing.",
        "b) MongoDB is a programming language used for developing web applications.",
        "c) MongoDB is a NoSQL, document-oriented database that stores data in JSON-like formats.",
        "d) MongoDB is a cloud storage service for hosting large files and backups.",
      ],
      correctAnswer:
        "c) MongoDB is a NoSQL, document-oriented database that stores data in JSON-like formats.",
    },
    {
      question: "2) How is MongoDB different from SQL databases ?",
      options: [
        "a) MongoDB uses a fixed schema and organizes data in tables and rows similar to SQL databases.",
        "b) MongoDB is schema-less, uses documents instead of tables, and stores data in JSON-like structures called BSON.",
        "c) MongoDB uses tables for storing data, but it doesn’t support joins like SQL databases.",
        "d) MongoDB is designed for large-scale transactions, with support for ACID properties like SQL databases.",
      ],
      correctAnswer:
        "b) MongoDB is schema-less, uses documents instead of tables, and stores data in JSON-like structures called BSON.",
    },
    {
      question: "3) What is a collection in MongoDB ?",
      options: [
        "a) A collection is a single MongoDB document, equivalent to a record in relational databases.",
        "b) A collection is a set of MongoDB indexes used to optimize queries.",
        "c) A collection is a database in MongoDB that stores multiple collections.",
        "d) A collection is a group of MongoDB documents, equivalent to a table in relational databases.",
      ],
      correctAnswer:
        "d) A collection is a group of MongoDB documents, equivalent to a table in relational databases.",
    },
    {
      question: "4) What is a document in MongoDB ?",
      options: [
        "a) A document is a collection of multiple databases stored together in MongoDB.",
        "b) A document is a configuration file in MongoDB used to manage user access.",
        "c) A document is a schema definition file that outlines the structure of the database.",
        "d) A document is a record in MongoDB, stored in a BSON format, which is a binary representation of JSON.",
      ],
      correctAnswer:
        "d) A document is a record in MongoDB, stored in a BSON format, which is a binary representation of JSON.",
    },
    {
      question: "5) What are some key features of MongoDB ?",
      options: [
        "a) Features include high scalability, flexibility, indexing, sharding, replication, and built-in support for aggregation.",
        "b) Features include fixed schema, no replication, and limited scalability, with no support for indexing.",
        "c) Features include strong ACID compliance, schema-based structure, and full support for SQL queries.",
        "d) Features include low flexibility, no sharding, and limited support for distributed databases.",
      ],
      correctAnswer:
        "a) Features include high scalability, flexibility, indexing, sharding, replication, and built-in support for aggregation.",
    },
    {
      question: "6) What is BSON ?",
      options: [
        "a) BSON is a scripting language used to interact with MongoDB databases.",
        "b) BSON is a schema definition file used to structure data in MongoDB collections.",
        "c) BSON is a data compression format used by MongoDB for efficient storage.",
        "d) BSON is the binary encoding of JSON-like documents used by MongoDB to store data.",
      ],
      correctAnswer:
        "d) BSON is the binary encoding of JSON-like documents used by MongoDB to store data.",
    },
    {
      question: "7) How do I insert data into a MongoDB collection ?",
      options: [
        "a) Use the insertOne() or insertMany() method to insert single or multiple documents into a collection.",
        "b) Use the save() method to directly update or insert a document into the database collection.",
        "c) Use the addDocument() method to insert data into multiple collections simultaneously.",
        "d) Use the insertRow() method to insert a row of data into a MongoDB collection, similar to SQL databases.",
      ],
      correctAnswer:
        "a) Use the insertOne() or insertMany() method to insert single or multiple documents into a collection.",
    },
    {
      question: "8) How do I query data in MongoDB ?",
      options: [
        "a) Use the query() method to retrieve documents based on a SQL-like query language.",
        "b) Use the find() method to retrieve documents from a collection.",
        "c) Use the search() method to query specific fields from multiple collections.",
        "d) Use the getDocuments() method to retrieve all records from the database.",
      ],
      correctAnswer:
        "b) Use the find() method to retrieve documents from a collection.",
    },
    {
      question: "9) How do you update a document in MongoDB ?",
      options: [
        "a) Use the modify() method to directly change the contents of a document.",
        "b) Use the changeDocument() method to update fields in a single document.",
        "c) Use the edit() method to alter the values of a document in the collection.",
        "d) Use the updateOne(), updateMany(), or replaceOne() methods to update documents.",
      ],
      correctAnswer:
        "d) Use the updateOne(), updateMany(), or replaceOne() methods to update documents.",
    },
    {
      question: "10) What is an index in MongoDB ?",
      options: [
        "a) An index is a unique identifier assigned to each document in a MongoDB collection.",
        "b) An index improves the performance of search operations by creating pointers to the documents in a collection.",
        "c) An index is a backup mechanism that stores a copy of the database for recovery purposes.",
        "d) An index is a reference table that stores relationships between collections in MongoDB.",
      ],
      correctAnswer:
        "b) An index improves the performance of search operations by creating pointers to the documents in a collection.",
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
    const isEasyMongoTestCompleted = localStorage.getItem(
      `${userPrefix}easymongotestCompleted`
    );
    if (isEasyMongoTestCompleted) {
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
        where("difficulty", "==", "easymongo")
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
          difficulty: "easymongo",
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
      localStorage.setItem(`${userPrefix}easymongotestCompleted`, true);
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
    navigate("/mongodb/easymongosols");
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

export default Mongoeasy;
