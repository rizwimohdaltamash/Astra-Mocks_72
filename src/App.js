import { Routes, Route } from "react-router-dom";
//components
import Home from "./components/Home";
import Intro from "./components/Intro";
import About from "./components/About";
import Reactjs from "./components/Reactjs";
import Javascript from "./components/Javascript";
import Nodejs from "./components/Nodejs";
import Express from "./components/Express";
import Mongodb from "./components/Mongodb";

//register
import Login from "./register/Login";
import Signup from "./register/Signup";

//admin
import DashboardAdmin from "./admin/DashboardAdmin";

//pages

// Java Script
import Jseasy from "./pages/Js/Jseasy";
import Jseasysols from "./pages/Js/Jseasysols";

import Jsmedium from "./pages/Js/Jsmedium";
import Jsmediumsols from "./pages/Js/Jsmediumsols";

import Jshard from "./pages/Js/Jshard";
import Jshardsols from "./pages/Js/Jshardsols";

// ReactJS
import Reacteasy from "./pages/Reactjs/Reacteasy";
import Reacteasysols from "./pages/Reactjs/Reacteasysols";

import Reactmedium from "./pages/Reactjs/Reactmedium";
import Reactmediumsols from "./pages/Reactjs/Reactmediumsols";

import Reacthard from "./pages/Reactjs/Reacthard";
import Reacthardsols from "./pages/Reactjs/Reacthardsols";

//NodeJS
import Nodeeasy from "./pages/NodeJs/Nodeeasy";
import Nodeeasysols from "./pages/NodeJs/Nodeeasysols";

import Nodemedium from "./pages/NodeJs/Nodemedium";
import Nodemediumsols from "./pages/NodeJs/Nodemediumsols";

import Nodehard from "./pages/NodeJs/Nodehard";
import Nodehardsols from "./pages/NodeJs/Nodehardsols";

//ExpressJS
import Exeasy from "./pages/Express/Exeasy";
import Exeasysols from "./pages/Express/Exeasysols";

import Exmedium from "./pages/Express/Exmedium";
import Exmediumsols from "./pages/Express/Exmediumsols";

import Exhard from "./pages/Express/Exhard";
import Exhardsols from "./pages/Express/Exhardsols";


//Mongo DB
import Mongoeasy from "./pages/MongoDb/Mongoeasy";
import Mongoeasysols from "./pages/MongoDb/Mongoeasysols";

import Mongomedium from "./pages/MongoDb/Mongomedium";
import Mongomediumsols from "./pages/MongoDb/Mongomediumsols";

import Mongohard from "./pages/MongoDb/Mongohard";
import Mongohardsols from "./pages/MongoDb/Mongohardsols";




//protected Route
// import { ProtectedRouteForUser } from "../src/protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "../src/protectedRoute/ProtectedRouteForAdmin";
import AdminDash from "./admin/AdminDash";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/admindashboard"
          element={
            <ProtectedRouteForAdmin>
              <DashboardAdmin />
            </ProtectedRouteForAdmin>
          }
        />
         <Route
          path="/admindash"
          element={
            <ProtectedRouteForAdmin>
              <AdminDash />
            </ProtectedRouteForAdmin>
          }
        />

             

        <Route path="/reactjs" element={<Reactjs />} />
        <Route path="/javascript" element={<Javascript />} />
        <Route path="/nodejs" element={<Nodejs />} />
        <Route path="/express" element={<Express />} />
        <Route path="/mongodb" element={<Mongodb />} />

           {/* Javascript Routing */}

        <Route path="/javascript/easyjs" element={<Jseasy />} />
        <Route path="/javascript/easyjssols" element={<Jseasysols />} />

        <Route path="/javascript/mediumjs" element={<Jsmedium />} />
        <Route path="/javascript/mediumjssols" element={<Jsmediumsols />} />

        <Route path="/javascript/hardjs" element={<Jshard />} />
        <Route path="/javascript/hardjssols" element={<Jshardsols />} />

            {/* ReactJS Routing */}

        <Route path="/reactjs/easyreactjs" element={<Reacteasy />} />
        <Route path="/reactjs/easyreactjssols" element={<Reacteasysols />} />

        <Route path="/reactjs/mediumreactjs" element={<Reactmedium />} />
        <Route path="/reactjs/mediumreactjssols" element={<Reactmediumsols />} />

        <Route path="/reactjs/hardreactjs" element={<Reacthard />} />
        <Route path="/reactjs/hardreactjssols" element={<Reacthardsols />} />
          
          {/* NodeJS Routing */}

        <Route path="/nodejs/easynodejs" element={<Nodeeasy />} />
        <Route path="/nodejs/easynodejssols" element={<Nodeeasysols />} />

        <Route path="/nodejs/mediumnodejs" element={<Nodemedium />} />
        <Route path="/nodejs/mediumnodejssols" element={<Nodemediumsols />} />

        <Route path="/nodejs/hardnodejs" element={<Nodehard />} />
        <Route path="/nodejs/hardnodejssols" element={<Nodehardsols />} />

        {/* Express Routing */}

        <Route path="/express/easyex" element={<Exeasy />} />
        <Route path="/express/easyexsols" element={<Exeasysols />} />

        <Route path="/express/mediumex" element={<Exmedium />} />
        <Route path="/express/mediumexsols" element={<Exmediumsols />} />

        <Route path="/express/hardex" element={<Exhard />} />
        <Route path="/express/hardexsols" element={<Exhardsols />} />

         {/* MongoDB Routing */}

         <Route path="/mongodb/easymongo" element={<Mongoeasy />} />
        <Route path="/mongodb/easymongosols" element={<Mongoeasysols />} />

        <Route path="/mongodb/mediummongo" element={<Mongomedium />} />
        <Route path="/mongodb/mediummongosols" element={<Mongomediumsols />} />

        <Route path="/mongodb/hardmongo" element={<Mongohard />} />
        <Route path="/mongodb/hardmongosols" element={<Mongohardsols />} />




      </Routes>
    </div>
  );
}

export default App;
