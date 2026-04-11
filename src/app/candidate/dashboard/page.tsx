"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useExamStore } from "@/store/useExamStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { exams } from "@/data/dummyData";

export default function CandidateDashboard() {
  const { user, isAuthenticated, hasHydrated } = useAuthStore();
  const { startCandidateSession, setCurrentExam, loadExamsFromStorage } = useExamStore();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [allExams, setAllExams] = useState<any[]>(exams);

  useEffect(() => {
    if (hasHydrated && (!isAuthenticated || user?.role !== "candidate")) {
      router.push("/login");
    }
  }, [hasHydrated, isAuthenticated, user, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedExams = loadExamsFromStorage();
        const combined: any[] = [...exams];

        storedExams.forEach((storedExam) => {
          if (!combined.find((e) => e.id === storedExam.id)) {
            combined.push(storedExam);
          } else {
            const index = combined.findIndex((e) => e.id === storedExam.id);
            combined[index] = storedExam;
          }
        });

        setAllExams(combined);
      } catch (error) {
        console.error("Failed to load exams from localStorage:", error);
        setAllExams(exams);
      }
    }
  }, [loadExamsFromStorage]);

  if (!hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "candidate") {
    return null;
  }

  const filteredExams = allExams.filter((exam) =>
    exam.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartExam = (examId: string) => {
    const exam = allExams.find((e) => e.id === examId);
    if (exam) {
      setCurrentExam(exam);
      startCandidateSession(examId, exam);
      router.push(`/candidate/exam-screen/${examId}`);
    }
  };

  return (
    <>
      <section className="min-h-screen px-4">
        <div className="container mx-auto my-14">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-semibold">Online Tests</h1>

            <div className="flex-1 max-w-md relative shadow rounded-lg">
              <input
                type="text"
                placeholder="Search by exam title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-violet-400 rounded-lg py-4 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-primary/10 p-2 cursor-pointer">
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                >
                  <path
                    d="M13.333 13.75L16.6663 17.0833"
                    stroke="url(#paint0_linear_1_7477)"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.9997 9.58331C14.9997 12.805 12.388 15.4166 9.16634 15.4166C5.94468 15.4166 3.33301 12.805 3.33301 9.58331C3.33301 6.36168 5.94468 3.75 9.16634 3.75"
                    stroke="url(#paint1_linear_1_7477)"
                    strokeWidth={1.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.9167 2.91699L13.1316 3.49785C13.4134 4.25951 13.5543 4.64034 13.8322 4.91815C14.11 5.19597 14.4908 5.33688 15.2525 5.61873L15.8333 5.83366L15.2525 6.04859C14.4908 6.33043 14.11 6.47136 13.8322 6.74917C13.5543 7.02698 13.4134 7.40781 13.1316 8.16947L12.9167 8.7503L12.7017 8.16947C12.4199 7.40781 12.279 7.02698 12.0012 6.74917C11.7233 6.47136 11.3425 6.33043 10.5808 6.04859L10 5.83366L10.5808 5.61873C11.3425 5.33688 11.7233 5.19597 12.0012 4.91815C12.279 4.64034 12.4199 4.25951 12.7017 3.49785L12.9167 2.91699Z"
                    stroke="url(#paint2_linear_1_7477)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1_7477"
                      x1={14.9996}
                      y1={13.75}
                      x2={14.9996}
                      y2={17.0833}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#27ACFF" />
                      <stop offset={0.504808} stopColor="#A000E9" />
                      <stop offset={1} stopColor="#673FED" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_1_7477"
                      x1={9.16634}
                      y1={3.75}
                      x2={9.16634}
                      y2={15.4166}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#27ACFF" />
                      <stop offset={0.504808} stopColor="#A000E9" />
                      <stop offset={1} stopColor="#673FED" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_1_7477"
                      x1={12.9167}
                      y1={2.91699}
                      x2={12.9167}
                      y2={8.7503}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#27ACFF" />
                      <stop offset={0.504808} stopColor="#A000E9" />
                      <stop offset={1} stopColor="#673FED" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white p-8 border border-border-primary rounded-2xl hover:shadow-lg transition cursor-pointer h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex-1">
                    {exam.title}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-6">
                  <span className="flex items-center gap-1 text-text-secondary">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0001 18.3334C14.6025 18.3334 18.3334 14.6025 18.3334 10.0001C18.3334 5.39771 14.6025 1.66675 10.0001 1.66675C5.39771 1.66675 1.66675 5.39771 1.66675 10.0001C1.66675 14.6025 5.39771 18.3334 10.0001 18.3334Z"
                        stroke="#9CA3AF"
                        strokeWidth={1.5}
                      />
                      <path
                        d="M10 6.66675V10.0001L11.6667 11.6667"
                        stroke="#9CA3AF"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Duration:
                    <span className="font-medium text-text-primary">
                      {exam.durationPerSlotMinutes} min
                    </span>
                  </span>
                  <span className="flex items-center gap-1 text-text-secondary">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 17H16"
                        stroke="#9CA3AF"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 13H12"
                        stroke="#9CA3AF"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z"
                        stroke="#9CA3AF"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Questions:
                    <span className="font-medium text-text-primary">
                      {exam.questions.length}
                    </span>
                  </span>
                </div>
                <button
                  onClick={() => handleStartExam(exam.id)}
                  className="btn-secondary px-14!"
                >
                  Start
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <button className="w-7 h-7 border border-gray-200 rounded-md bg-white text-gray-500 hover:bg-gray-50 text-sm flex items-center justify-center">
                &#8249;
              </button>
              <span className="text-sm font-medium text-gray-700">1</span>
              <button className="w-7 h-7 border border-gray-200 rounded-md bg-white text-gray-500 hover:bg-gray-50 text-sm flex items-center justify-center">
                &#8250;
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              Online Test Per Page
              <select className="border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-700 bg-white">
                <option>8</option>
                <option>12</option>
                <option>16</option>
              </select>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}