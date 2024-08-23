// src/components/Card.js
import React from "react";

const Card = ({ title, value, iconClass, cardClass, textClass, progress }) => {
  return (
    <div className={`col-xl-3 col-md-6 mb-4`}>
      <div className={`card ${cardClass} shadow h-100 py-2`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div
                className={`text-xs font-weight-bold ${textClass} text-uppercase mb-1`}
              >
                {title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {value}
              </div>
              {progress && (
                <div className="row no-gutters align-items-center">
                  <div className="col-auto">
                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                      {progress.value}%
                    </div>
                  </div>
                  <div className="col">
                    <div className="progress progress-sm mr-2">
                      <div
                        className={`progress-bar ${progress.color}`}
                        role="progressbar"
                        style={{ width: `${progress.value}%` }}
                        aria-valuenow={progress.value}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="col-auto">
              <i className={`fas ${iconClass} fa-2x text-gray-300`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
