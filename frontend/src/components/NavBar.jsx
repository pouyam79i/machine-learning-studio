import React, { useContext } from "react";
import { Context } from "../App";

const NavBar = () => {
  const {
    useAppStatus: { appStatus, changeAppStatus },
  } = useContext(Context);

  return (
    <div className="nav-bar">
      <div className="header">
        {/* App Title */}
        <div className="title">ML Studio</div>
      </div>
      <div className="options">
        {/* Play and Pause Btn */}
        <button
          onClick={() => {
            changeAppStatus("run");
          }}
        >
          <div>Run</div>
          <svg
            fill="var(--text-color)"
            width="20px"
            height="20px"
            viewBox="0 0 56 56"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M 13.0937 47.8398 C 14.0313 47.8398 14.8281 47.4648 15.7656 46.9258 L 43.0937 31.1289 C 45.0391 29.9805 45.7187 29.2305 45.7187 27.9883 C 45.7187 26.7461 45.0391 25.9961 43.0937 24.8711 L 15.7656 9.0508 C 14.8281 8.5118 14.0313 8.1602 13.0937 8.1602 C 11.3594 8.1602 10.2813 9.4727 10.2813 11.5118 L 10.2813 44.4649 C 10.2813 46.5039 11.3594 47.8398 13.0937 47.8398 Z M 14.2891 43.3633 C 14.1484 43.3633 14.0547 43.2695 14.0547 43.0820 L 14.0547 12.8945 C 14.0547 12.7070 14.1484 12.6133 14.2891 12.6133 C 14.3828 12.6133 14.4766 12.6602 14.5703 12.7305 L 40.5156 27.7305 C 40.6328 27.8008 40.7266 27.8711 40.7266 27.9883 C 40.7266 28.1055 40.6328 28.1992 40.5156 28.2461 L 14.5703 43.2695 C 14.4766 43.3164 14.3828 43.3633 14.2891 43.3633 Z"></path>
            </g>
          </svg>
        </button>
        {/* Save Btn */}
        <button
          onClick={() => {
            changeAppStatus("save");
          }}
        >
          <div>Save</div>
          <svg
            width="17px"
            height="17px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z"
                fill="var(--text-color)"
              ></path>{" "}
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
