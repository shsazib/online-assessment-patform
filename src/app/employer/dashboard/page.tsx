"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useAllExams } from "@/hooks/useAllExams";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmployerDashboard() {
  const { user, isAuthenticated, hasHydrated } = useAuthStore();
  const { allExams, loading: examsLoading } = useAllExams();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (hasHydrated && (!isAuthenticated || user?.role !== "employer")) {
      router.push("/login");
    }
  }, [hasHydrated, isAuthenticated, user, router]);

  const filteredExams = allExams.filter(exam =>
    exam.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!hasHydrated || examsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "employer") return null;

  return (
    <>
      <section className="min-h-screen px-4">
        <div className="container mx-auto my-14">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-semibold">
              Online Tests
            </h1>

            <div className="flex-1 max-w-md relative shadow">
              <input
                type="text"
                placeholder="Search by exam title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

            <Link href="./create-test" className="btn-primary">Create Online Test</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredExams.length > 0 ? (
            filteredExams.map((exam) => (
              <Link key={exam.id} href={`./create-test/${exam.id}`}>
                <div className="bg-white p-8 border border-border-primary rounded-2xl hover:shadow-lg transition cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 flex-1">
                      {exam.title}
                    </h2>
                    {exam.isCustom && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        New
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-6">
                    <span className="flex items-center gap-1 text-text-secondary">
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.5 11C15.5 9.067 13.933 7.5 12 7.5C10.067 7.5 8.5 9.067 8.5 11C8.5 12.933 10.067 14.5 12 14.5C13.933 14.5 15.5 12.933 15.5 11Z"
                          stroke="#9CA3AF"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.4825 11.3499C15.8045 11.4475 16.146 11.5 16.4998 11.5C18.4328 11.5 19.9998 9.933 19.9998 8C19.9998 6.067 18.4328 4.5 16.4998 4.5C14.6849 4.5 13.1926 5.8814 13.0171 7.65013"
                          stroke="#9CA3AF"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.9827 7.65013C10.8072 5.8814 9.31492 4.5 7.5 4.5C5.567 4.5 4 6.067 4 8C4 9.933 5.567 11.5 7.5 11.5C7.85381 11.5 8.19535 11.4475 8.51727 11.3499"
                          stroke="#9CA3AF"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 16.5C22 13.7386 19.5376 11.5 16.5 11.5"
                          stroke="#9CA3AF"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17.5 19.5C17.5 16.7386 15.0376 14.5 12 14.5C8.96243 14.5 6.5 16.7386 6.5 19.5"
                          stroke="#9CA3AF"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.5 11.5C4.46243 11.5 2 13.7386 2 16.5"
                          stroke="#9CA3AF"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Candidates:
                      <span className="font-medium text-text-primary">{exam.totalCandidates.toLocaleString()}</span>
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
                      Question Set:
                      <span className="font-medium text-text-primary">{exam.totalQuestionSet}</span>
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
                          d="M12 22C13.1046 22 14 21.1046 14 20C14 18.8954 13.1046 18 12 18C10.8954 18 10 18.8954 10 20C10 21.1046 10.8954 22 12 22Z"
                          stroke="#9CA3AF"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 2C8.96243 2 6.5 4.46243 6.5 7.5C6.5 10.0176 8.1915 12.14 10.5 12.793L12 15L13.5 12.793C15.8085 12.14 17.5 10.0176 17.5 7.5C17.5 4.46243 15.0376 2 12 2Z"
                          stroke="#9CA3AF"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 5V7.5L13.5 8.5"
                          stroke="#9CA3AF"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 20H21M10 20H3"
                          stroke="#9CA3AF"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Exam Slots:
                      <span className="font-medium text-text-primary">{exam.totalSlots}</span>
                    </span>
                  </div>
                  <button className="btn-secondary">View Candidates</button>
                </div>
              </Link>
            ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No exams found matching your search</p>
              </div>
            )}
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
