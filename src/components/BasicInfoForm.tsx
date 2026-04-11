"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useExamStore } from "@/store/useExamStore";

const BasicInfo = () => {
  const router = useRouter();
  const params = useParams();
  const examId = params?.id as string;
  const { saveExamToStorage, setCurrentExam, getExamById } = useExamStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    title: "",
    candidates: "",
    slots: "",
    questionSet: "",
    questionType: "",
    startTime: "",
    endTime: "",
    duration: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Test title is required";
    if (!formData.candidates.trim()) newErrors.candidates = "Total candidates is required";
    if (!formData.slots) newErrors.slots = "Total slots is required";
    if (!formData.questionSet) newErrors.questionSet = "Question set is required";
    if (!formData.questionType) newErrors.questionType = "Question type is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (!formData.duration) newErrors.duration = "Duration is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newExam = {
      id: examId || `exam_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: formData.title,
      totalCandidates: parseInt(formData.candidates) || 0,
      totalSlots: parseInt(formData.slots) || 0,
      totalQuestionSet: parseInt(formData.questionSet.match(/\d+/)?.[0] || "1") || 1,
      durationPerSlotMinutes: parseInt(formData.duration) || 30,
      questionType: formData.questionType,
      questions: [],
      createdAt: new Date().toISOString(),
      isCustom: true,
    };

    saveExamToStorage(newExam);
    setCurrentExam(newExam);

    router.push(`/employer/create-test/${newExam.id}`);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSave}>
          <div>
            <div className="bg-white rounded-2xl p-6 space-y-5">
              <h2 className="text-base font-semibold text-gray-800">
                Basic Information
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Online Test Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter online test title"
                  className={`w-full border rounded-lg p-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:border-transparent transition ${
                    errors.title ? "border-red-500 focus:ring-red-500" : "border-border-primary focus:ring-primary"
                  }`}
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Candidates <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="candidates"
                    value={formData.candidates}
                    onChange={handleChange}
                    placeholder="Enter total candidates"
                    className={`w-full border rounded-lg p-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:border-transparent transition ${
                      errors.candidates ? "border-red-500 focus:ring-red-500" : "border-border-primary focus:ring-primary"
                    }`}
                  />
                  {errors.candidates && <p className="text-red-500 text-xs mt-1">{errors.candidates}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Slots <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="slots"
                    value={formData.slots}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:border-transparent transition appearance-none bg-white ${
                      errors.slots ? "border-red-500 focus:ring-red-500" : "border-border-primary focus:ring-primary"
                    }`}
                  >
                    <option value="">Select total slots</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  {errors.slots && <p className="text-red-500 text-xs mt-1">{errors.slots}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Question Set <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="questionSet"
                    value={formData.questionSet}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:border-transparent transition appearance-none bg-white ${
                      errors.questionSet ? "border-red-500 focus:ring-red-500" : "border-border-primary focus:ring-primary"
                    }`}
                  >
                    <option value="">Select total question set</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  {errors.questionSet && <p className="text-red-500 text-xs mt-1">{errors.questionSet}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="questionType"
                    value={formData.questionType}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:border-transparent transition appearance-none bg-white ${
                      errors.questionType ? "border-red-500 focus:ring-red-500" : "border-border-primary focus:ring-primary"
                    }`}
                  >
                    <option value="">Select question type</option>
                    <option value="MCQ">MCQ</option>
                  </select>
                  {errors.questionType && <p className="text-red-500 text-xs mt-1">{errors.questionType}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:border-transparent transition ${
                      errors.startTime ? "border-red-500 focus:ring-red-500" : "border-border-primary focus:ring-primary"
                    }`}
                  />
                  {errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:border-transparent transition ${
                      errors.endTime ? "border-red-500 focus:ring-red-500" : "border-border-primary focus:ring-primary"
                    }`}
                  />
                  {errors.endTime && <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 30"
                    className="w-full border border-border-primary rounded-lg p-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition"
                  />
                   {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white flex items-center justify-between mt-6 p-6 rounded-2xl">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-tertiary text-sm py-2.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary text-sm py-2.5"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BasicInfo;