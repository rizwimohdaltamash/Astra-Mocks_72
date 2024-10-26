import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import FirstHardMongo from "../../assets/firsthardmongo.jpg";
import SecondHardMongo from "../../assets/secondhardmongo.jpg";
import ThirdHardMongo from "../../assets/thirdhardmongo.jpg";
import FourthHardMongo from "../../assets/fourthhardmongo.jpg";
import FifthHardMongo from "../../assets/fifthhardmongo.jpg";
import SixthHardMongo from "../../assets/sixthhardmongo.jpg";
import SeventhHardMongo from "../../assets/seventhhardmongo.jpg";
import EigthHardMongo from "../../assets/eigthhardmongo.jpg";
import NinthHardMongo from "../../assets/ninthhardmongo.jpg";
import TenthHardMongo from "../../assets/tenthhardmongo.jpg";

const Mongohardsols = () => {
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
      image: FirstHardMongo,
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
      image: SecondHardMongo,
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
      image: ThirdHardMongo,
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
      image: FourthHardMongo,
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
      image: FifthHardMongo,
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
      image: SixthHardMongo,
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
      image: SeventhHardMongo,
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
      image: EigthHardMongo,
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
      image: NinthHardMongo,
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
      image: TenthHardMongo,
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

export default Mongohardsols;
