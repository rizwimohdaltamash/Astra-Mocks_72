import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import FirstEasyMongo from "../../assets/firsteasymongo.jpg";
import SecondEasyMongo from "../../assets/secondeasymongo.jpg";
import ThirdEasyMongo from "../../assets/thirdeasymongo.jpg";
import FourthEasyMongo from "../../assets/fourtheasymongo.jpg";
import FifthEasyMongo from "../../assets/fiftheasymongo.jpg";
import SixthEasyMongo from "../../assets/sixtheasymongo.jpg";
import SeventhEasyMongo from "../../assets/seventheasymongo.jpg";
import EigthEasyMongo from "../../assets/eigtheasymongo.jpg";
import NinthEasyMongo from "../../assets/nintheasymongo.jpg";
import TenthEasyMongo from "../../assets/tentheasymongo.jpg";

const Mongoeasysols = () => {
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
      question: "1) What is MongoDB ?",
      options: [
        "a) MongoDB is a relational database management system commonly used for transaction processing.",
        "b) MongoDB is a programming language used for developing web applications.",
        "c) MongoDB is a NoSQL, document-oriented database that stores data in JSON-like formats.",
        "d) MongoDB is a cloud storage service for hosting large files and backups.",
      ],
      correctAnswer:
        "c) MongoDB is a NoSQL, document-oriented database that stores data in JSON-like formats.",
      image: FirstEasyMongo,
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
      image: SecondEasyMongo,
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
      image: ThirdEasyMongo,
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
      image: FourthEasyMongo,
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
      image: FifthEasyMongo,
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
      image: SixthEasyMongo,
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
      image: SeventhEasyMongo,
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
      image: EigthEasyMongo,
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
      image: NinthEasyMongo,
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
      image: TenthEasyMongo,
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
                    ? "ring-4 ring-green-600 bg-green-800 bg-opacity-40"
                    : ""
                }
                ${
                  !isCorrect && isUserAnswer
                    ? "ring-4 ring-red-600 bg-red-800 bg-opacity-40"
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

export default Mongoeasysols;
