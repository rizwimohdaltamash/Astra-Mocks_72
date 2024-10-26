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

const Mongomedium = () => {
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
      question: "1) How does sharding work in MongoDB ?",
      options: [
        "a) Sharding is the process of creating backups of data for recovery in MongoDB.",
        "b) Sharding refers to the replication of data across different geographic locations.",
        "c) Sharding allows MongoDB to distribute data across multiple servers, improving scalability.",
        "d) Sharding is a method to partition data based on user-defined criteria in MongoDB.",
      ],
      correctAnswer:
        "c) Sharding allows MongoDB to distribute data across multiple servers, improving scalability.",
    },
    {
      question: "2) What is replication in MongoDB ?",
      options: [
        "a) Replication in MongoDB provides redundancy by copying data across multiple servers to ensure high availability.",
        "b) Replication allows for automatic sharding of data to improve performance.",
        "c) Replication ensures data consistency by synchronizing databases in real-time.",
        "d) Replication is used for creating backups of the database at scheduled intervals.",
      ],
      correctAnswer:
        "a) Replication in MongoDB provides redundancy by copying data across multiple servers to ensure high availability.",
    },
    {
      question: "3) How do you perform aggregation in MongoDB ?",
      options: [
        "a) By using the find() method with specific conditions to filter documents.",
        "b) Through the use of map-reduce functions for data processing.",
        "c) By executing SQL-like queries to manipulate collections.",
        "d) Use the aggregate() function to process data and perform complex operations like filtering, grouping, and sorting.",
      ],
      correctAnswer:
        "d) Use the aggregate() function to process data and perform complex operations like filtering, grouping, and sorting.",
    },
    {
      question: "4) What is a replica set in MongoDB ?",
      options: [
        "a) A configuration that allows for data sharding across multiple servers.",
        "b) A replica set is a group of MongoDB servers that maintain the same dataset to ensure redundancy and failover.",
        "c) A method for indexing data to improve query performance.",
        "d) A technique for encrypting data stored in the database."
      ],
      correctAnswer: "b) A replica set is a group of MongoDB servers that maintain the same dataset to ensure redundancy and failover."
    }
    ,
    {
      question: "5) What is the use of MongoDB Compass ?",
      options: [
        "a) MongoDB Compass is a graphical interface for querying, analyzing, and visualizing MongoDB data.",
        "b) MongoDB Compass is a command-line tool for managing MongoDB databases.",
        "c) MongoDB Compass is an API for integrating MongoDB with other applications.",
        "d) MongoDB Compass is a library for performing data migrations in MongoDB."
      ],
      correctAnswer: "a) MongoDB Compass is a graphical interface for querying, analyzing, and visualizing MongoDB data."
    }
    
    ,
    {
      question: "6) How does MongoDB handle relationships ?",
      options: [
        "a) MongoDB uses SQL joins to manage relationships between collections.",
        "b) MongoDB can handle relationships using embedded documents or through references (manual linking between collections).",
        "c) MongoDB only allows one-to-one relationships between documents.",
        "d) MongoDB requires all data to be stored in a single collection to maintain relationships."
      ],
      correctAnswer: "b) MongoDB can handle relationships using embedded documents or through references (manual linking between collections)."
    }
    ,
    {
      question: "7) What is a capped collection in MongoDB ?",
      options: [
        "a) A capped collection is a fixed-size collection that automatically overwrites older data when it reaches its size limit.",
        "b) A capped collection allows for unlimited growth and is optimized for high-write operations.",
        "c) A capped collection can only store documents of a specific type.",
        "d) A capped collection is used exclusively for indexing purposes."
      ],
      correctAnswer: "a) A capped collection is a fixed-size collection that automatically overwrites older data when it reaches its size limit."
    }
    ,
    {
      question: "8) How do transactions work in MongoDB ?",
      options: [
        "a) MongoDB transactions can only be performed on a single document at a time.",
        "b) Transactions in MongoDB are automatically committed without any manual intervention.",
        "c) MongoDB does not support transactions; operations are always atomic at the document level.",
        "d) MongoDB supports ACID transactions across multiple documents and operations using the startTransaction() method."
      ],
      correctAnswer: "d) MongoDB supports ACID transactions across multiple documents and operations using the startTransaction() method."
    }
    ,
    {
      question: "9) What is GridFS in MongoDB ?",
      options: [
        "a) GridFS is a method for performing aggregation on large datasets.",
        "b) GridFS is a data modeling technique used to optimize queries in MongoDB.",
        "c) GridFS is a mechanism for sharding data across multiple servers.",
        "d) GridFS is a specification for storing and retrieving large files, like images or videos, in MongoDB."
      ],
      correctAnswer: "d) GridFS is a specification for storing and retrieving large files, like images or videos, in MongoDB."
    }
    ,
    {
      question: "10) How do I perform pagination in MongoDB ?",
      options: [
        "a) Pagination is achieved by using the find() method with a query for each page.",
        "b) Pagination requires creating multiple collections for each page of data.",
        "c) Pagination is done using skip() and limit() methods to retrieve specific subsets of data.",
        "d) Pagination can only be performed through the MongoDB Atlas interface."
      ],
      correctAnswer: "c) Pagination is done using skip() and limit() methods to retrieve specific subsets of data."
    }
    ,
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
    const isMediumMongoTestCompleted = localStorage.getItem(
      `${userPrefix}mediummongotestCompleted`
    );
    if (isMediumMongoTestCompleted) {
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
        where("difficulty", "==", "mediummongo")
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
          difficulty: "mediummongo",
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
      localStorage.setItem(`${userPrefix}mediummongotestCompleted`, true);

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
    navigate("/mongodb/mediummongosols");
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

export default Mongomedium;
