"use client";

import React from "react";
import BasicInfoForm from "@/components/BasicInfoForm";
import Link from "next/link";

const CreateTest = () => {
  return (
    <>
      <section className="min-h-screen px-4">
        <div className="container mx-auto my-14">
          <div className="bg-white rounded-xl border border-border-primary p-6 mb-8">
            <h1 className="text-2xl font-semibold mb-6">Create New Online Test</h1>
            <div className="flex flex-col sm:flex-row justify-between gap-5">
              <div className="flex-1 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-semibold">
                    1
                  </span>
                  <span className="text-sm font-medium text-primary">
                    Basic Info
                  </span>
                </div>
                <div className="flex-1 h-px bg-gray-200 max-w-20"></div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gray-200 text-xs flex items-center justify-center font-semibold">
                    2
                  </span>
                  <span className="text-sm">Questions</span>
                </div>
              </div>
              <div className="contents">
              <Link href="./dashboard" className="btn-tertiary">
                Back to Dashboard
              </Link>
              </div>
            </div>
          </div>

          <BasicInfoForm />
        </div>
      </section>
    </>
  );
};

export default CreateTest;
