"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useExamData } from "@/hooks/useExamData";
import { useExamStore } from "@/store/useExamStore";
import { Exam } from "@/store/useExamStore";

const BasicInfoView = () => {
  const params = useParams();
  const router = useRouter();
  const examId = params?.id as string;
  const { exam, loading } = useExamData(examId || "");
  const { saveExamToStorage } = useExamStore();
  const [displayExam, setDisplayExam] = useState<Exam | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    totalCandidates: 0,
    totalSlots: 0,
    totalQuestionSet: 0,
    durationPerSlotMinutes: 0,
    questionType: "",
  });

  useEffect(() => {
    if (exam) {
      setDisplayExam(exam);
      setFormData({
        title: exam.title,
        totalCandidates: exam.totalCandidates,
        totalSlots: exam.totalSlots,
        totalQuestionSet: exam.totalQuestionSet,
        durationPerSlotMinutes: exam.durationPerSlotMinutes,
        questionType: exam.questionType,
      });
    }
  }, [exam]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "title" || name === "questionType" ? value : parseInt(value) || 0,
    }));
  };

  const handleSaveEdit = () => {
    if (displayExam) {
      const updatedExam = {
        ...displayExam,
        ...formData,
      };
      setDisplayExam(updatedExam);
      saveExamToStorage(updatedExam);
      setIsEditing(false);
    }
  };

  const handleContinue = () => {
    if (displayExam) {
      saveExamToStorage(displayExam);
      router.push(`/employer/create-test/${examId}?step=questions`);
    }
  };

  if (loading || !displayExam) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-6">
          <p className="text-gray-500">Loading exam details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-gray-900">
              Basic Information
            </h2>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4 1 1-4 12.362-12.726z"
                  />
                </svg>
                Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Online Test Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border border-border-primary rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Candidates <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="totalCandidates"
                    value={formData.totalCandidates}
                    onChange={handleInputChange}
                    className="w-full border border-border-primary rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Slots <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="totalSlots"
                    value={formData.totalSlots}
                    onChange={handleInputChange}
                    className="w-full border border-border-primary rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition appearance-none bg-white"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Question Set <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="totalQuestionSet"
                    value={formData.totalQuestionSet}
                    onChange={handleInputChange}
                    className="w-full border border-border-primary rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition appearance-none bg-white"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="questionType"
                    value={formData.questionType}
                    onChange={handleInputChange}
                    className="w-full border border-border-primary rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition appearance-none bg-white"
                  >
                    <option value="MCQ">MCQ</option>
                    <option value="Checkbox">Checkbox</option>
                    <option value="Text">Text</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration Per Slot (Minutes)
                </label>
                <input
                  type="number"
                  name="durationPerSlotMinutes"
                  value={formData.durationPerSlotMinutes}
                  onChange={handleInputChange}
                  className="w-full border border-border-primary rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn-tertiary text-sm py-2.5"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="btn-primary text-sm py-2.5"
                >
                  Save Changes
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-5">
                <p className="text-xs text-gray-500 mb-0.5">Online Test Title</p>
                <p className="text-sm font-semibold text-gray-900">
                  {displayExam.title}
                </p>
              </div>

              <div className="grid sm:grid-cols-4 gap-4 mb-5">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Total Candidates</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {displayExam.totalCandidates.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Total Slots</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {displayExam.totalSlots}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Total Question Set</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {displayExam.totalQuestionSet}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">
                    Duration Per Slots (Minutes)
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {displayExam.durationPerSlotMinutes}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Question Type</p>
                <p className="text-sm font-semibold text-gray-900">
                  {displayExam.questionType}
                </p>
              </div>
            </>
          )}
        </div>
        <div className="bg-white flex flex-wrap gap-2 items-center justify-between mt-6 p-6 rounded-2xl">
          <button 
            onClick={() => router.back()}
            className="btn-tertiary text-sm py-2.5"
          >
            Cancel
          </button>
          <button 
            onClick={handleContinue}
            className="btn-primary text-sm py-2.5"
          >
            Continue to Questions
          </button>
        </div>
      </div>
    </>
  );
};

export default BasicInfoView;
