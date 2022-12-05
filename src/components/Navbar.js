import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assests/logo.png";

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="block h-14 w-auto lg:hidden"
                src={logo}
                alt="Your Company"
              />
              <img
                className="hidden h-14 w-auto lg:block"
                src={logo}
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 pt-2">
                <Link
                  className={
                    location.pathname.includes("team")
                      ? "text-gray-300 bg-gray-900 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  }
                  to="/team"
                >
                  Team
                </Link>
                <Link
                  className={
                    location.pathname.includes("projects")
                      ? "text-gray-300 bg-gray-900 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  }
                  to="/projects"
                >
                  Projects
                </Link>
                <Link
                  className={
                    location.pathname.includes("tree")
                      ? "text-gray-300 bg-gray-900 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  }
                  to="/tree"
                >
                  Tree
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <Link
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            to="/team"
          >
            Team
          </Link>
          <Link
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            to="/projects"
          >
            Projects
          </Link>
          <Link
            className={
              location.pathname.includes("tree")
                ? "text-gray-300 bg-gray-900 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            }
            to="/tree"
          >
            Tree
          </Link>
        </div>
      </div>
    </nav>
  );
  //   return (
  //     <BrowserRouter className="hidden sm:ml-6 sm:block">
  //       <Routes className="flex space-x-4">
  //         <Route
  //           className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
  //           path="/"
  //           element={<Team />}
  //         ></Route>
  //       </Routes>
  //     </BrowserRouter>
  //   );
};

export default Navbar;
