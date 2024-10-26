import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import FirstMediumMongo from "../../assets/firstmediummongo.jpg";
import SecondMediumMongo from "../../assets/secondmediummongo.jpg";
import ThirdMediumMongo from "../../assets/thirdmediummongo.jpg";
import FourthMediumMongo from "../../assets/fourthmediummongo.jpg";
import FifthMediumMongo from "../../assets/fifthmediummongo.jpg";
import SixthMediumMongo from "../../assets/sixthmediummongo.jpg";
import SeventhMediumMongo from "../../assets/seventhmediummongo.jpg";
import EigthMediumMongo from "../../assets/eigthmediummongo.jpg";
import NinthMediumMongo from "../../assets/ninthmediummongo.jpg";
import TenthMediumMongo from "../../assets/tenthmediummongo.jpg";

const Mongomediumsols = () => {
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const navigate = useNavigate();
  // Use user-specific keys
  const userPrefix = user ? `${user.uid}_` : "";

  const savedQuestionIndex =
    parseInt(localStorage.getItem(`${userPrefix}currentQuestionIndex`)) || 0;
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(savedQuestionIndex);
  const [submitted] = useState(false);
  const [showImage, setShowImage] = useState(false); // New state for image visibility
  // const [showPopup, setShowPopup] = useState(false);

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
      image: FirstMediumMongo,
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
      image: SecondMediumMongo,
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
      image: ThirdMediumMongo,
    },
    {
      question: "4) What is a replica set in MongoDB ?",
      options: [
        "a) A configuration that allows for data sharding across multiple servers.",
        "b) A replica set is a group of MongoDB servers that maintain the same dataset to ensure redundancy and failover.",
        "c) A method for indexing data to improve query performance.",
        "d) A technique for encrypting data stored in the database.",
      ],
      correctAnswer:
        "b) A replica set is a group of MongoDB servers that maintain the same dataset to ensure redundancy and failover.",
      image: FourthMediumMongo,
    },
    {
      question: "5) What is the use of MongoDB Compass ?",
      options: [
        "a) MongoDB Compass is a graphical interface for querying, analyzing, and visualizing MongoDB data.",
        "b) MongoDB Compass is a command-line tool for managing MongoDB databases.",
        "c) MongoDB Compass is an API for integrating MongoDB with other applications.",
        "d) MongoDB Compass is a library for performing data migrations in MongoDB.",
      ],
      correctAnswer:
        "a) MongoDB Compass is a graphical interface for querying, analyzing, and visualizing MongoDB data.",
      image: FifthMediumMongo,
    },
    {
      question: "6) How does MongoDB handle relationships ?",
      options: [
        "a) MongoDB uses SQL joins to manage relationships between collections.",
        "b) MongoDB can handle relationships using embedded documents or through references (manual linking between collections).",
        "c) MongoDB only allows one-to-one relationships between documents.",
        "d) MongoDB requires all data to be stored in a single collection to maintain relationships.",
      ],
      correctAnswer:
        "b) MongoDB can handle relationships using embedded documents or through references (manual linking between collections).",
      image: SixthMediumMongo,
    },
    {
      question: "7) What is a capped collection in MongoDB ?",
      options: [
        "a) A capped collection is a fixed-size collection that automatically overwrites older data when it reaches its size limit.",
        "b) A capped collection allows for unlimited growth and is optimized for high-write operations.",
        "c) A capped collection can only store documents of a specific type.",
        "d) A capped collection is used exclusively for indexing purposes.",
      ],
      correctAnswer:
        "a) A capped collection is a fixed-size collection that automatically overwrites older data when it reaches its size limit.",
      image: SeventhMediumMongo,
    },
    {
      question: "8) How do transactions work in MongoDB ?",
      options: [
        "a) MongoDB transactions can only be performed on a single document at a time.",
        "b) Transactions in MongoDB are automatically committed without any manual intervention.",
        "c) MongoDB does not support transactions; operations are always atomic at the document level.",
        "d) MongoDB supports ACID transactions across multiple documents and operations using the startTransaction() method.",
      ],
      correctAnswer:
        "d) MongoDB supports ACID transactions across multiple documents and operations using the startTransaction() method.",
      image: EigthMediumMongo,
    },
    {
      question: "9) What is GridFS in MongoDB ?",
      options: [
        "a) GridFS is a method for performing aggregation on large datasets.",
        "b) GridFS is a data modeling technique used to optimize queries in MongoDB.",
        "c) GridFS is a mechanism for sharding data across multiple servers.",
        "d) GridFS is a specification for storing and retrieving large files, like images or videos, in MongoDB.",
      ],
      correctAnswer:
        "d) GridFS is a specification for storing and retrieving large files, like images or videos, in MongoDB.",
      image: NinthMediumMongo,
    },
    {
      question: "10) How do I perform pagination in MongoDB ?",
      options: [
        "a) Pagination is achieved by using the find() method with a query for each page.",
        "b) Pagination requires creating multiple collections for each page of data.",
        "c) Pagination is done using skip() and limit() methods to retrieve specific subsets of data.",
        "d) Pagination can only be performed through the MongoDB Atlas interface.",
      ],
      correctAnswer:
        "c) Pagination is done using skip() and limit() methods to retrieve specific subsets of data.",
      image: TenthMediumMongo,
    },
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
              onClick={() => navigate("/mongodb")}
            >
              <IoArrowBackCircle size={40} />
            </button>
          </div>

          {/* Pagination */}
          <div className=" lg:w-full w-[100%] flex items-center justify-center mb-8 space-x-2">
            {questions.map((question, index) => {
              const userAnswer = storedAnswers[index];
              const isAnswered = userAnswer !== undefined;
              const isCorrect =
                isAnswered && userAnswer === question.correctAnswer;

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
                    currentQuestionIndex === index
                      ? "bg-blue-500 text-white"
                      : ""
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
                      <span className=" text-xs text-green-200">
                        Correct answer
                      </span>
                    )}
                    {!isCorrect && isUserAnswer && (
                      <span className="ml-2 text-xs text-red-200">
                        Your Answer
                      </span>
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

export default Mongomediumsols;
