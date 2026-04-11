import Link from "next/link";
import React from "react";

const TestCompleted = () => {
  return (
    <>
      <div className="w-full max-w-4xl bg-white rounded-2xl border border-border-primary px-10 py-14 flex flex-col items-center text-center">
        <div className="mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="w-14 h-14"
          >
            <path
              d="M32 4 L38.5 10.5 L47 9 L50 17 L58 20 L56.5 28.5 L62 35 L56.5 41.5 L58 50 L50 53 L47 61 L38.5 59.5 L32 66 L25.5 59.5 L17 61 L14 53 L6 50 L7.5 41.5 L2 35 L7.5 28.5 L6 20 L14 17 L17 9 L25.5 10.5 Z"
              fill="#3b82f6"
            />
            <polyline
              points="22,33 29,40 43,26"
              fill="none"
              stroke="white"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="text-xl font-semibold mb-3">
          Test Completed
        </h1>

        <p className="text-secondary leading-relaxed mb-8">
          Congratulations! Md. Naimur Rahman, You have completed your MCQ Exam for Probationary Officer. Thank you for participating.
        </p>

        <Link href="/candidate/dashboard" className="btn-tertiary py-3">
          Back to Dashboard
        </Link>
      </div>
    </>
  );
};

export default TestCompleted;
