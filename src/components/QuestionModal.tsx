"use client";

import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

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
  negativeMarking?: number;
}

interface QuestionModalProps {
  question: Question | null;
  onSave: (question: Question) => void;
  onClose: () => void;
}

// Reusable toolbar + editor
const RichEditor = ({
  content,
  onChange,
  placeholder,
}: {
  content: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) => {
const editor = useEditor({
  extensions: [StarterKit],
  content,
  immediatelyRender: false,
  onUpdate: ({ editor }) => {
    onChange(editor.getHTML());
  },
  editorProps: {
    attributes: {
      class:
        "min-h-[70px] p-3 text-sm text-gray-700 focus:outline-none prose prose-sm max-w-none",
    },
  },
});

  if (!editor) return null;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-200 bg-gray-50 flex-wrap">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-200 disabled:opacity-30 transition"
          title="Undo"
        >
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
            <path d="M9 14L4 9l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 9h10.5a4.5 4.5 0 0 1 0 9H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-200 disabled:opacity-30 transition"
          title="Redo"
        >
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
            <path d="M15 14l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 9H9.5a4.5 4.5 0 0 0 0 9H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        {/* Heading dropdown */}
        <select
          onChange={(e) => {
            const val = e.target.value;
            if (val === "normal") {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().setHeading({ level: Number(val) as 1 | 2 | 3 }).run();
            }
          }}
          value={
            editor.isActive("heading", { level: 1 })
              ? "1"
              : editor.isActive("heading", { level: 2 })
              ? "2"
              : editor.isActive("heading", { level: 3 })
              ? "3"
              : "normal"
          }
          className="text-xs text-gray-500 border border-gray-200 rounded px-2 py-0.5 focus:outline-none bg-white"
        >
          <option value="normal">Normal text</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>

        {/* List dropdown */}
        <select
          onChange={(e) => {
            const val = e.target.value;
            if (val === "bullet") editor.chain().focus().toggleBulletList().run();
            else if (val === "ordered") editor.chain().focus().toggleOrderedList().run();
            else editor.chain().focus().setParagraph().run();
          }}
          value={
            editor.isActive("bulletList")
              ? "bullet"
              : editor.isActive("orderedList")
              ? "ordered"
              : "none"
          }
          className="text-xs text-gray-500 border border-gray-200 rounded px-2 py-0.5 focus:outline-none bg-white"
        >
          <option value="none">≡ List</option>
          <option value="bullet">• Bullet</option>
          <option value="ordered">1. Ordered</option>
        </select>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-0.5 rounded text-sm font-bold transition ${
            editor.isActive("bold")
              ? "bg-gray-200 text-gray-900"
              : "text-gray-500 hover:bg-gray-200 hover:text-gray-700"
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-0.5 rounded text-sm italic transition ${
            editor.isActive("italic")
              ? "bg-gray-200 text-gray-900"
              : "text-gray-500 hover:bg-gray-200 hover:text-gray-700"
          }`}
        >
          I
        </button>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />
    </div>
  );
};

// Option editor with its own tiptap instance
const OptionEditor = ({
  option,
  questionType,
  onTextChange,
  onCorrectChange,
  onRemove,
  canRemove,
}: {
  option: Option;
  questionType: "MCQ" | "Checkbox";
  onTextChange: (val: string) => void;
  onCorrectChange: (val: boolean) => void;
  onRemove: () => void;
  canRemove: boolean;
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm shrink-0">
          {option.label}
        </span>
        <button
          type="button"
          onClick={() => onCorrectChange(!option.isCorrect)}
          className={`flex items-center gap-1.5 text-xs px-2 py-1 cursor-pointer ${
            option.isCorrect
              ? "border-green-400 text-green-600 bg-green-50"
              : "border-gray-200 text-gray-400 hover:border-gray-300"
          }`}
        >
          <div
            className={`w-3.5 h-3.5 border flex items-center justify-center ${
              questionType === "MCQ" ? "rounded-full" : "rounded"
            } ${option.isCorrect ? "border-green-500" : "border-gray-300"}`}
          >
            {option.isCorrect && (
              <div
                className={`w-1.5 h-1.5 bg-green-500 ${
                  questionType === "MCQ" ? "rounded-full" : "rounded-sm"
                }`}
              />
            )}
          </div>
          Set as correct answer
        </button>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-auto text-gray-300 hover:text-red-400 transition p-1 cursor-pointer"
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
      <RichEditor content={option.text} onChange={onTextChange} placeholder="Type option text here..." />
    </div>
  );
};

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
  const [answerPlaceholder, setAnswerPlaceholder] = useState(
    question?.answerPlaceholder || ""
  );
  const [options, setOptions] = useState<Option[]>(
    question?.options?.length
      ? question.options
      : [
          { id: "opt_a", label: "A", text: "", isCorrect: false },
          { id: "opt_b", label: "B", text: "", isCorrect: false },
        ]
  );

  const handleOptionTextChange = (id: string, val: string) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, text: val } : opt))
    );
  };

  const handleOptionCorrectChange = (id: string, val: boolean) => {
    if (questionType === "MCQ") {
      setOptions((prev) =>
        prev.map((opt) =>
          opt.id === id ? { ...opt, isCorrect: true } : { ...opt, isCorrect: false }
        )
      );
    } else {
      setOptions((prev) =>
        prev.map((opt) => (opt.id === id ? { ...opt, isCorrect: val } : opt))
      );
    }
  };

  const handleAddOption = () => {
    const newLabel = String.fromCharCode(65 + options.length);
    setOptions((prev) => [
      ...prev,
      { id: `opt_${Date.now()}`, label: newLabel, text: "", isCorrect: false },
    ]);
  };

  const handleRemoveOption = (id: string) => {
    setOptions((prev) => prev.filter((opt) => opt.id !== id));
  };

  const handleSave = () => {
    // Validation
    if (!questionText || questionText === "<p></p>") {
      alert("Please enter question text");
      return;
    }

    if (questionType === "Text") {
      if (!answerPlaceholder || answerPlaceholder === "<p></p>") {
        alert("Please enter a sample answer");
        return;
      }
    }

    if (questionType !== "Text") {
      const hasCorrectAnswer = options.some((opt) => opt.isCorrect);
      if (!hasCorrectAnswer) {
        alert("Please set at least one correct answer");
        return;
      }

      const hasEmptyOption = options.some(
        (opt) => !opt.text || opt.text === "<p></p>"
      );
      if (hasEmptyOption) {
        alert("Please fill in all option texts");
        return;
      }
    }

    const newQuestion: Question = {
      id: question?.id || `q_${Date.now()}`,
      number: question?.number || 1,
      type: questionType,
      points,
      negativeMarking: negativeMarking > 0 ? negativeMarking : undefined,
      text: questionText,
      options: questionType === "Text" ? [] : options,
      answerPlaceholder:
        questionType === "Text" ? answerPlaceholder : undefined,
    };
    onSave(newQuestion);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-base font-semibold text-gray-900">
            {question ? "Edit Question" : "Add Question"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition cursor-pointer">
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-5">

          {/* Top row — score, type, negative */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm">
                {question?.number || "1"}
              </span>
              <span className="font-semibold">
                Question {question?.number || "1"}
              </span>
            </div>

            <div className="ml-auto flex flex-wrap items-center gap-3">
              {/* Score */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Score:</span>
                <input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                  min="1"
                  className="w-10 py-1.5 text-sm font-semibold border border-border-primary focus:outline-none text-center appearance-none rounded-xl"
                />
              </div>

              {/* Type */}
              <div className="relative">
                <select
                  value={questionType}
                  onChange={(e) => {
                    const val = e.target.value as "MCQ" | "Checkbox" | "Text";
                    setQuestionType(val);
                    if (val === "Text") {
                      setOptions([]);
                    } else if (options.length === 0) {
                      setOptions([
                        { id: "opt_a", label: "A", text: "", isCorrect: false },
                        { id: "opt_b", label: "B", text: "", isCorrect: false },
                      ]);
                    }
                  }}
                  className="appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer bg-white"
                >
                  <option value="MCQ">Radio</option>
                  <option value="Checkbox">Checkbox</option>
                  <option value="Text">Text</option>
                </select>
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" width={12} height={12} viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Negative marking */}
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5">
                <span className="text-sm text-gray-500">-ve:</span>
                <input
                  type="number"
                  value={negativeMarking}
                  onChange={(e) => setNegativeMarking(Number(e.target.value))}
                  min="0"
                  step="0.5"
                  className="w-12 text-sm font-medium text-gray-800 focus:outline-none text-center"
                />
              </div>
            </div>
          </div>

          {/* Question rich editor */}
          <RichEditor
            content={questionText}
            onChange={setQuestionText}
            placeholder="Type your question here..."
          />

          {/* MCQ / Checkbox options */}
          {questionType !== "Text" && (
            <div className="space-y-4">
              {options.map((option) => (
                <OptionEditor
                  key={option.id}
                  option={option}
                  questionType={questionType}
                  onTextChange={(val) => handleOptionTextChange(option.id, val)}
                  onCorrectChange={(val) => handleOptionCorrectChange(option.id, val)}
                  onRemove={() => handleRemoveOption(option.id)}
                  canRemove={options.length > 2}
                />
              ))}
              <button
                type="button"
                onClick={handleAddOption}
                className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-primary hover:text-primary transition font-medium cursor-pointer"
              >
                + Add Option
              </button>
            </div>
          )}

          {/* Text type — sample answer (required) */}
          {questionType === "Text" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sample Answer{" "}
                <span className="text-red-500">*</span>
              </label>
              <RichEditor
                content={answerPlaceholder}
                onChange={setAnswerPlaceholder}
                placeholder="Write a sample answer here..."
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex flex-wrap gap-2 items-center justify-between">
          <button onClick={onClose} className="btn-tertiary text-sm py-2.5">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary text-sm py-2.5">
            Save & Add Another
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;