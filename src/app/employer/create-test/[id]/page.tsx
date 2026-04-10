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

            <div className="flex justify-between">
              <div className="flex-1 flex items-center gap-3">
                <button
                  onClick={() => setCurrentStep('basic')}
                  className="flex items-center gap-2 group"
                >
                  <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-semibold transition ${
                    currentStep === 'basic'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700 group-hover:bg-gray-300'
                  }`}>
                    1
                  </span>
                  <span className={`text-sm font-medium transition ${
                    currentStep === 'basic'
                      ? 'text-primary'
                      : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    Basic Info
                  </span>
                </button>
                <div className="flex-1 h-px bg-gray-200 max-w-20"></div>
                <button
                  onClick={() => setCurrentStep('questions')}
                  className="flex items-center gap-2 group"
                >
                  <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-semibold transition ${
                    currentStep === 'questions'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700 group-hover:bg-gray-300'
                  }`}>
                    2
                  </span>
                  <span className={`text-sm transition ${
                    currentStep === 'questions'
                      ? 'text-primary'
                      : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    Questions
                  </span>
                </button>
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
