"use client";

import { useExamStore } from "@/store/useExamStore";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TimeoutModalProps {
  onSubmit: () => void;
}

const TimeoutModal = ({ onSubmit }: TimeoutModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
        <div className="mb-4 text-4xl">⏱️</div>
        <h2 className="text-2xl font-bold mb-2">Time Out!</h2>
        <p className="text-gray-600 mb-6">
          Your time has expired. Your test has been automatically submitted.
        </p>
        <button
          onClick={onSubmit}
          className="btn-primary w-full"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

const RichTextEditor = ({
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
          "min-h-[200px] p-3 text-sm text-gray-700 focus:outline-none prose prose-sm max-w-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
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

      <EditorContent editor={editor} />
    </div>
  );
};

const QuestionAnswer = ({ examId }: { examId: string }) => {
  const router = useRouter();
  const { currentExam, candidateSession, saveCandidateAnswer, moveToNextQuestion, submitExam } = useExamStore();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>("");
  const [errorMessage, setErrorMessage] = useState("");
  const timeoutHandledRef = useRef(false);

  useEffect(() => {
    if (!candidateSession || !currentExam) return;

    const durationMs = currentExam.durationPerSlotMinutes * 60 * 1000;
    const elapsedMs = Date.now() - candidateSession.startTime;
    const remainingMs = durationMs - elapsedMs;

    if (remainingMs <= 0) {
      setTimeLeft(0);
      return;
    }

    setTimeLeft(Math.floor(remainingMs / 1000));

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return null;
        return Math.max(0, prev - 1);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [candidateSession?.startTime, currentExam?.id]);

  // Separate effect to handle timeout
  useEffect(() => {
    if (timeLeft === 0 && !timeoutHandledRef.current) {
      timeoutHandledRef.current = true;
      submitExam();
      setShowTimeoutModal(true);
    }
  }, [timeLeft, submitExam]);

  useEffect(() => {
    if (!currentExam || !candidateSession) return;

    const currentQuestion = currentExam.questions[candidateSession.currentQuestionIndex];
    const currentAnswerData = candidateSession.answers.find(
      (a) => a.questionId === currentQuestion.id
    );

    if (currentAnswerData) {
      setCurrentAnswer(currentAnswerData.answer);
    } else {
      setCurrentAnswer(currentQuestion.type === "Checkbox" ? [] : "");
    }
    setErrorMessage("");
  }, [candidateSession?.currentQuestionIndex, currentExam, candidateSession]);

  if (!currentExam || !candidateSession || showTimeoutModal) {
    if (showTimeoutModal) {
      return (
        <TimeoutModal
          onSubmit={() => router.push("/candidate/dashboard")}
        />
      );
    }
    return null;
  }

  const currentQuestion = currentExam.questions[candidateSession.currentQuestionIndex];
  const totalQuestions = currentExam.questions.length;
  const questionNumber = candidateSession.currentQuestionIndex + 1;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const isAnswered = () => {
    if (currentQuestion.type === "MCQ") {
      return currentAnswer !== "";
    } else if (currentQuestion.type === "Checkbox") {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    } else if (currentQuestion.type === "Text") {
      return typeof currentAnswer === "string" && currentAnswer.trim() !== "" && currentAnswer !== "<p></p>";
    }
    return false;
  };

  const handleRadioChange = (optionId: string) => {
    setCurrentAnswer(optionId);
    saveCandidateAnswer(currentQuestion.id, optionId, false);
    setErrorMessage("");
  };

  const handleCheckboxChange = (optionId: string) => {
    const updatedAnswer = Array.isArray(currentAnswer)
      ? currentAnswer.includes(optionId)
        ? currentAnswer.filter((id) => id !== optionId)
        : [...currentAnswer, optionId]
      : [optionId];
    
    setCurrentAnswer(updatedAnswer);
    saveCandidateAnswer(currentQuestion.id, updatedAnswer, false);
    setErrorMessage("");
  };

  const handleTextChange = (text: string) => {
    setCurrentAnswer(text);
    saveCandidateAnswer(currentQuestion.id, text, false);
    setErrorMessage("");
  };

  const handleSkip = () => {
    saveCandidateAnswer(currentQuestion.id, "", true);
    if (questionNumber === totalQuestions) {
      submitExam();
      router.push("/candidate/test-completed");
    } else {
      moveToNextQuestion();
    }
  };

  const handleSaveAndContinue = () => {
    if (!isAnswered()) {
      setErrorMessage("Please select an answer before continuing");
      return;
    }

    if (questionNumber === totalQuestions) {
      submitExam();
      router.push("/candidate/test-completed");
    } else {
      moveToNextQuestion();
    }
  };

  const isLastQuestion = questionNumber === totalQuestions;

  return (
    <>
      <div className="w-full max-w-4xl mx-auto overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 px-5 sm:px-7 py-4 border border-border-primary bg-white rounded-2xl mb-6">
          <span className="sm:text-xl font-medium">
            Question ({questionNumber}/{totalQuestions})
          </span>
          <span
            className={`sm:text-xl font-semibold px-5 sm:px-16 py-3 sm:py-4 rounded-lg transition-colors duration-300 text-center ${
              timeLeft && timeLeft < 300 ? "bg-red-100 text-red-600" : "bg-gray-100"
            }`}
          >
            {timeLeft !== null ? formatTime(timeLeft) : "Loading..."} left
          </span>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <div>
            <div className="sm:text-xl font-medium mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: `Q${questionNumber}. ${currentQuestion.text}` }} />

            {currentQuestion.type === "MCQ" && (
              <div className="flex flex-col gap-3">
                {currentQuestion.options.map((option) => (
                  <label
                    key={option.id}
                    className={`option flex items-center gap-3 px-4 py-3.5 border rounded-xl cursor-pointer transition-all duration-150 text-sm sm:text-base ${
                      currentAnswer === option.id
                        ? "border-violet-700 bg-violet-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={option.id}
                      checked={currentAnswer === option.id}
                      onChange={() => handleRadioChange(option.id)}
                      className="hidden"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center relative transition-colors duration-150 ${
                        currentAnswer === option.id
                          ? "border-violet-700 bg-violet-700"
                          : "border-gray-300"
                      }`}
                    >
                      {currentAnswer === option.id && (
                        <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                      )}
                    </div>
                    <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: option.text }} />
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === "Checkbox" && (
              <div className="flex flex-col gap-3">
                {currentQuestion.options.map((option) => (
                  <label
                    key={option.id}
                    className={`option flex items-center gap-3 px-4 py-3.5 border rounded-xl cursor-pointer transition-all duration-150 ${
                      Array.isArray(currentAnswer) && currentAnswer.includes(option.id)
                        ? "border-violet-700 bg-violet-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name={currentQuestion.id}
                      value={option.id}
                      checked={Array.isArray(currentAnswer) && currentAnswer.includes(option.id)}
                      onChange={() => handleCheckboxChange(option.id)}
                      className="hidden"
                    />
                    <div
                      className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center relative transition-colors duration-150 ${
                        Array.isArray(currentAnswer) && currentAnswer.includes(option.id)
                          ? "border-violet-700 bg-violet-700"
                          : "border-gray-300"
                      }`}
                    >
                      {Array.isArray(currentAnswer) && currentAnswer.includes(option.id) && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: option.text }} />
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === "Text" && (
              <RichTextEditor
                content={typeof currentAnswer === "string" ? currentAnswer : ""}
                onChange={handleTextChange}
                placeholder={currentQuestion.answerPlaceholder || "Write your answer here..."}
              />
            )}
          </div>

          {errorMessage && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errorMessage}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 items-center justify-between mt-8">
            <button onClick={handleSkip} className="btn-tertiary py-3!">
              {isLastQuestion ? "Skip & Submit" : "Skip this Question"}
            </button>
            <button onClick={handleSaveAndContinue} className="btn-primary">
              {isLastQuestion ? "Save & Submit" : "Save & Continue"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionAnswer;
