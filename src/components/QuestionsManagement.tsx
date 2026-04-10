"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QuestionModal from "./QuestionModal";
import { useExamData } from "@/hooks/useExamData";
import { useExamStore } from "@/store/useExamStore";

interface Question {
  id: string;
  number: number;
  type: "MCQ" | "Checkbox" | "Text";
  points: number;
  negativeMarking?: number;
  text: string;
  options: Array<{
    id: string;
    label: string;
    text: string;
    isCorrect: boolean;
  }>;
  answerPlaceholder?: string;
}

interface QuestionsManagementProps {
  examId: string;
}

const QuestionsManagement: React.FC<QuestionsManagementProps> = ({
  examId,
}) => {
  const router = useRouter();
  const { exam, loading } = useExamData(examId);
  const { saveExamToStorage } = useExamStore();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  useEffect(() => {
    if (exam?.questions) {
      setQuestions(exam.questions);
    }
  }, [exam]);

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setIsModalOpen(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setIsModalOpen(true);
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSaveQuestion = (question: Question) => {
    let updatedQuestions;
    if (editingQuestion) {
      updatedQuestions = questions.map((q) => (q.id === question.id ? question : q));
    } else {
      updatedQuestions = [...questions, question];
    }
    setQuestions(updatedQuestions);
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  const handleCompleteExam = () => {
    if (!exam) return;

    // Update exam with questions and save to storage
    const updatedExam = {
      ...exam,
      questions,
    };

    saveExamToStorage(updatedExam);

    // Redirect to dashboard
    router.push("/employer/dashboard");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-gray-900">Question Sets</h2>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-700">
                      Question {question.number}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {question.type}
                    </span>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                      {question.points} pts
                    </span>
                    {question.negativeMarking && question.negativeMarking > 0 && (
                      <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded">
                        -{question.negativeMarking} pts (wrong)
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700">{question.text}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEditQuestion(question)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600"
                  >
                    <svg
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4 1 1-4 12.362-12.726z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition text-red-600"
                  >
                    <svg
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6m4-6v6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {question.type !== "Text" && (
                <div className="mt-3 space-y-2">
                  {question.options.map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-center gap-2 p-2 rounded ${
                        option.isCorrect ? "bg-green-50" : "bg-gray-50"
                      }`}
                    >
                      <input
                        type={question.type === "MCQ" ? "radio" : "checkbox"}
                        checked={option.isCorrect}
                        disabled
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">
                        {option.label}. {option.text}
                      </span>
                      {option.isCorrect && (
                        <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Correct
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleAddQuestion}
          className="w-full mt-6 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition font-medium text-sm"
        >
          + Add Question
        </button>
      </div>

      {isModalOpen && (
        <QuestionModal
          question={editingQuestion}
          onSave={handleSaveQuestion}
          onClose={() => {
            setIsModalOpen(false);
            setEditingQuestion(null);
          }}
        />
      )}

      <div className="bg-white flex items-center justify-between p-6 rounded-2xl">
        <button 
          onClick={() => router.back()}
          className="btn-tertiary text-sm py-2.5"
        >
          Back
        </button>
        <button 
          onClick={handleCompleteExam}
          className="btn-primary text-sm py-2.5"
        >
          Complete & Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default QuestionsManagement;
