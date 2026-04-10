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

const QuestionsManagement: React.FC<QuestionsManagementProps> = ({ examId }) => {
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
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleSaveQuestion = (question: Question) => {
    let updatedQuestions;
    if (editingQuestion) {
      updatedQuestions = questions.map((q) =>
        q.id === question.id ? question : q
      );
    } else {
      updatedQuestions = [
        ...questions,
        { ...question, number: questions.length + 1 },
      ];
    }
    setQuestions(updatedQuestions);

    if (exam) {
      saveExamToStorage({ ...exam, questions: updatedQuestions });
    }

    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="space-y-4">
          {questions.map((question) => (
            <div key={question.id} className="bg-white rounded-2xl p-6">
              {/* Question header */}
              <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-border-primary">
                <span className="font-semibold">Question {question.number}</span>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-text-secondary px-2 py-1 rounded-xl border border-border-primary">
                    {question.type}
                  </span>
                  <span className="text-sm text-text-secondary px-2 py-1 rounded-xl border border-border-primary">
                    {question.points} pt
                  </span>
                  {question.negativeMarking && question.negativeMarking > 0 && (
                    <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded">
                      -{question.negativeMarking} pts (wrong)
                    </span>
                  )}
                </div>
              </div>

              {/* Question text */}
              <div
                className="font-semibold py-6 text-black prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: question.text }}
              />

              {/* Options */}
              {question.type !== "Text" && (
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-center justify-between gap-2 p-3 rounded-lg ${
                        option.isCorrect ? "bg-gray-100" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600 shrink-0">
                          {option.label}.
                        </span>
                        <div
                          className="text-sm prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: option.text }}
                        />
                      </div>
                      {option.isCorrect && (
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="shrink-0"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.25 12C1.25 17.937 6.063 22.75 12 22.75C17.937 22.75 22.75 17.937 22.75 12C22.75 6.063 17.937 1.25 12 1.25C6.063 1.25 1.25 6.063 1.25 12ZM16.676 8.263C16.7728 8.35177 16.8512 8.45873 16.9066 8.57779C16.9621 8.69684 16.9935 8.82565 16.9992 8.95687C17.0048 9.08808 16.9846 9.21912 16.9396 9.34251C16.8946 9.4659 16.8258 9.57922 16.737 9.676L11.237 15.676C11.1458 15.7754 11.0354 15.8554 10.9124 15.911C10.7895 15.9666 10.6565 15.9968 10.5216 15.9997C10.3867 16.0026 10.2526 15.9782 10.1274 15.9279C10.0022 15.8776 9.88842 15.8024 9.793 15.707L7.293 13.207C7.19749 13.1148 7.12131 13.0044 7.0689 12.8824C7.01649 12.7604 6.9889 12.6292 6.98775 12.4964C6.9866 12.3636 7.0119 12.2319 7.06218 12.109C7.11246 11.9861 7.18671 11.8745 7.2806 11.7806C7.3745 11.6867 7.48615 11.6125 7.60905 11.5622C7.73194 11.5119 7.86362 11.4866 7.9964 11.4877C8.12918 11.4889 8.2604 11.5165 8.3824 11.5689C8.50441 11.6213 8.61475 11.6975 8.707 11.793L10.469 13.554L15.263 8.324C15.3518 8.22721 15.4587 8.14885 15.5778 8.0934C15.6968 8.03795 15.8257 8.00649 15.9569 8.00083C16.0881 7.99516 16.2191 8.0154 16.3425 8.06038C16.4659 8.10537 16.5792 8.17422 16.676 8.263Z"
                            fill="#22C55E"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Text type answer placeholder */}
              {question.type === "Text" && question.answerPlaceholder && (
                <div
                  className="text-sm text-gray-400 italic border border-dashed border-gray-200 rounded-lg p-3 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: question.answerPlaceholder }}
                />
              )}

              {/* Actions */}
              <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-border-primary">
                <button
                  onClick={() => handleEditQuestion(question)}
                  className="text-primary hover:text-primary/80 transition cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteQuestion(question.id)}
                  className="text-red-600 hover:text-red-500 cursor-pointer transition"
                >
                  Remove From Exam
                </button>
              </div>
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

      <div className="bg-white flex items-center p-6 rounded-2xl">
        <button
          onClick={() => router.back()}
          className="btn-tertiary text-sm py-2.5"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default QuestionsManagement;