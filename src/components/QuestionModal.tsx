"use client";

import React, { useState, useEffect } from "react";

interface Option {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  number: number;
  type: "MCQ" | "Checkbox" | "Text";
  points: number;
  text: string;
  options: Option[];
  answerPlaceholder?: string;
}

interface QuestionModalProps {
  question: Question | null;
  onSave: (question: Question) => void;
  onClose: () => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({
  question,
  onSave,
  onClose,
}) => {
  const [questionType, setQuestionType] = useState<"MCQ" | "Checkbox" | "Text">(
    question?.type || "MCQ"
  );
  const [questionText, setQuestionText] = useState(question?.text || "");
  const [points, setPoints] = useState(question?.points || 1);
  const [negativeMarking, setNegativeMarking] = useState(question?.negativeMarking || 0);
  const [options, setOptions] = useState<Option[]>(
    question?.options || [
      { id: "opt_a", label: "A", text: "", isCorrect: false },
      { id: "opt_b", label: "B", text: "", isCorrect: false },
      { id: "opt_c", label: "C", text: "", isCorrect: false },
      { id: "opt_d", label: "D", text: "", isCorrect: false },
    ]
  );

  const handleOptionChange = (id: string, field: string, value: any) => {
    if (field === "isCorrect" && value && questionType === "MCQ") {
      // For MCQ, unselect all other options when selecting one
      setOptions(
        options.map((opt) =>
          opt.id === id ? { ...opt, [field]: true } : { ...opt, isCorrect: false }
        )
      );
    } else {
      setOptions(
        options.map((opt) =>
          opt.id === id ? { ...opt, [field]: value } : opt
        )
      );
    }
  };

  const handleAddOption = () => {
    const newLabel = String.fromCharCode(65 + options.length);
    setOptions([
      ...options,
      { id: `opt_${newLabel.toLowerCase()}`, label: newLabel, text: "", isCorrect: false },
    ]);
  };

  const handleRemoveOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter((opt) => opt.id !== id));
    }
  };

  const handleSave = () => {
    const newQuestion: Question = {
      id: question?.id || `q_${Date.now()}`,
      number: question?.number || 1,
      type: questionType,
      points,
      negativeMarking: negativeMarking > 0 ? negativeMarking : undefined,
      text: questionText,
      options: questionType === "Text" ? [] : options,
      answerPlaceholder:
        questionType === "Text" ? "Write your answer here..." : undefined,
    };
    onSave(newQuestion);
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {question ? "Edit Question" : "Add Question"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Question Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["MCQ", "Checkbox", "Text"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setQuestionType(type as "MCQ" | "Checkbox" | "Text");
                    if (type === "Text") {
                      setOptions([]);
                    } else if (options.length === 0) {
                      setOptions([
                        {
                          id: "opt_a",
                          label: "A",
                          text: "",
                          isCorrect: false,
                        },
                        {
                          id: "opt_b",
                          label: "B",
                          text: "",
                          isCorrect: false,
                        },
                        {
                          id: "opt_c",
                          label: "C",
                          text: "",
                          isCorrect: false,
                        },
                        {
                          id: "opt_d",
                          label: "D",
                          text: "",
                          isCorrect: false,
                        },
                      ]);
                    }
                  }}
                  className={`py-2 px-4 rounded-lg font-medium text-sm transition ${
                    questionType === type
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Question Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Text <span className="text-red-500">*</span>
            </label>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Enter your question here..."
              className="w-full border border-border-primary rounded-lg p-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition resize-none min-h-24"
            />
          </div>

          {/* Points and Negative Marking */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Points <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                min="1"
                className="w-full border border-border-primary rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Negative Marking <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <input
                type="number"
                value={negativeMarking}
                onChange={(e) => setNegativeMarking(Number(e.target.value))}
                min="0"
                step="0.5"
                placeholder="0"
                className="w-full border border-border-primary rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correct Answer
              </label>
              <div className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-500 bg-gray-50">
                {questionType === "MCQ"
                  ? "1 Option"
                  : "Multiple"}
              </div>
            </div>
          </div>

          {/* Options */}
          {questionType !== "Text" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Options <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {options.map((option, idx) => (
                  <div key={option.id} className="flex items-start gap-3">
                    <div className="flex items-center gap-2 pt-3">
                      <input
                        type={
                          questionType === "MCQ" ? "radio" : "checkbox"
                        }
                        name="correct"
                        checked={option.isCorrect}
                        onChange={(e) =>
                          handleOptionChange(
                            option.id,
                            "isCorrect",
                            e.target.checked
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium text-gray-600 w-6">
                        {option.label}.
                      </span>
                    </div>
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) =>
                        handleOptionChange(option.id, "text", e.target.value)
                      }
                      placeholder="Enter option text"
                      className="flex-1 border border-border-primary rounded-lg p-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition"
                    />
                    {options.length > 2 && (
                      <button
                        onClick={() => handleRemoveOption(option.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition text-red-600 mt-0.5"
                      >
                        <svg
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 12h12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddOption}
                className="mt-3 text-sm text-primary hover:text-primary-dark font-medium"
              >
                + Another option
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-between">
          <button
            onClick={onClose}
            className="btn-tertiary text-sm py-2.5"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary text-sm py-2.5"
          >
            Save & Add Another
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
