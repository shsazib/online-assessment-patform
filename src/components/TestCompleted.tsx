"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useExamStore } from "@/store/useExamStore";
import { useAuthStore } from "@/store/useAuthStore";

const TestCompleted = () => {
  const { currentExam, candidateSession } = useExamStore();
  const { user } = useAuthStore();
  const [results, setResults] = useState({ correct: 0, incorrect: 0, skipped: 0 });

  useEffect(() => {
    if (candidateSession && currentExam) {
      let correct = 0;
      let incorrect = 0;
      let skipped = 0;

      candidateSession.answers.forEach((answer) => {
        if (answer.isSkipped) {
          skipped++;
        } else {
          const question = currentExam.questions.find(
            (q) => q.id === answer.questionId
          );
          if (!question) return;

          if (question.type === "MCQ") {
            const selectedOption = question.options.find(
              (o) => o.id === answer.answer
            );
            if (selectedOption?.isCorrect) {
              correct++;
            } else {
              incorrect++;
            }
          } else if (question.type === "Checkbox") {
            const selectedOptions = answer.answer as string[];
            const correctOptions = question.options
              .filter((o) => o.isCorrect)
              .map((o) => o.id);

            if (
              selectedOptions.length === correctOptions.length &&
              selectedOptions.every((id) => correctOptions.includes(id))
            ) {
              correct++;
            } else {
              incorrect++;
            }
          } else if (question.type === "Text") {
            // Text answers are manually graded, mark as answered
            correct++;
          }
        }
      });

      setResults({ correct, incorrect, skipped });
    }
  }, [candidateSession, currentExam]);

  return (
    <>
      <div className="w-full max-w-4xl bg-white rounded-2xl border border-border-primary p-5 sm:px-10 sm:py-14 flex flex-col items-center text-center">
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

        <h1 className="text-xl font-semibold mb-3">Test Completed</h1>

        <p className="text-secondary leading-relaxed mb-8">
          Congratulations! {user?.name}, You have completed your exam for{" "}
          {currentExam?.title}. Thank you for participating.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-8 w-full">
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-green-600">{results.correct}</p>
            <p className="text-sm text-green-700">Correct</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-red-600">{results.incorrect}</p>
            <p className="text-sm text-red-700">Incorrect</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-yellow-600">{results.skipped}</p>
            <p className="text-sm text-yellow-700">Skipped</p>
          </div>
        </div>

        <Link href="/candidate/dashboard" className="btn-tertiary py-3">
          Back to Dashboard
        </Link>
      </div>
    </>
  );
};

export default TestCompleted;
