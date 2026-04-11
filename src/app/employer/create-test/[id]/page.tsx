'use client'

import React, { useState, useEffect } from 'react'
import BasicInfoView from '@/components/BasicInfoView'
import QuestionsManagement from '@/components/QuestionsManagement'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'

const ExamDetailPage = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  const examId = params.id as string
  const [currentStep, setCurrentStep] = useState<'basic' | 'questions'>('basic')

  useEffect(() => {
    if (searchParams) {
      const stepParam = searchParams.get('step')
      if (stepParam === 'questions') {
        setCurrentStep('questions')
      }
    }
  }, [searchParams])

  return (
    <>
      <section className="min-h-screen px-4">
        <div className="container mx-auto my-14">
          <div className="bg-white rounded-xl border border-border-primary p-6 mb-8">
            <h1 className="text-2xl font-semibold mb-6">Manage Online Test</h1>
            <div className="flex flex-col sm:flex-row gap-5 justify-between">
              <div className="flex-1 flex items-center gap-3">
                {/* Step 1 - Basic Info */}
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-semibold transition ${
                    currentStep === 'basic' || currentStep === 'questions'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    1
                  </span>
                  <span className={`text-sm font-medium transition ${
                    currentStep === 'basic' || currentStep === 'questions'
                      ? 'text-primary'
                      : 'text-gray-700'
                  }`}>
                    Basic Info
                  </span>
                </div>

                <div className="flex-1 h-px bg-gray-200 max-w-20"></div>

                {/* Step 2 - Questions */}
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-semibold transition ${
                    currentStep === 'questions'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    2
                  </span>
                  <span className={`text-sm transition ${
                    currentStep === 'questions'
                      ? 'text-primary'
                      : 'text-gray-700'
                  }`}>
                    Question Sets
                  </span>
                </div>
              </div>

              <Link href="../dashboard" className="btn-tertiary">
                Back to Dashboard
              </Link>
            </div>
          </div>

          {currentStep === 'basic' && <BasicInfoView />}
          {currentStep === 'questions' && <QuestionsManagement examId={examId} />}
        </div>
      </section>
    </>
  )
}

export default ExamDetailPage