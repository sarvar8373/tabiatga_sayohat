import React from "react";
import { FaCircleCheck } from "react-icons/fa6";

const StatusPanel = ({ status }) => {
  // Define steps
  const steps = [
    { value: 0, label: "Jarayonda" },
    { value: 30, label: "Ko'rildi" },
    ...(status === 2 ? [{ value: 2, label: "Qayta yuborildi" }] : []),
    ...(status === 3 ? [{ value: 3, label: "Bekor qilindi" }] : []),
    ...(status !== 3 ? [{ value: 1, label: "Tasdiqlandi" }] : []),
  ];

  // Determine the current step index
  const currentStepIndex = steps.findIndex((step) => step.value === status);

  return (
    <div className="card border-info mb-3">
      <div className="card-body">
        <h5 className="card-title mb-4">Holati</h5>

        <div className="d-flex align-items-center">
          <ul className="list-unstyled d-flex flex-row justify-content-between  mb-0 w-100">
            {steps.map((step, index) => (
              <li
                key={step.value}
                className="d-flex align-items-center position-relative"
              >
                <div
                  className={`d-flex align-items-center justify-content-center rounded-circle border ${
                    index <= currentStepIndex
                      ? "bg-info border-info text-white"
                      : "border-secondary text-secondary"
                  }`}
                  style={{ width: "2rem", height: "2rem" }}
                >
                  {index <= currentStepIndex ? (
                    <FaCircleCheck className="text-white" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`position-absolute bg-info ${
                      index < currentStepIndex ? "w-100" : "w-50"
                    }`}
                    // style={{
                    //   height: "2px",
                    //   left: "1.2rem",
                    //   top: "50%",
                    //   transform: "translateY(-50%)",
                    // }}
                  />
                )}
                <p
                  className={`mb-0 ms-2 ${
                    index <= currentStepIndex ? "text-info" : "text-secondary"
                  }`}
                >
                  {step.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatusPanel;
