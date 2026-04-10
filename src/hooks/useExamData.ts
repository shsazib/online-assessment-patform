import { useEffect, useState } from 'react';
import dummyData from '@/data/dummyData';
import { Exam, Question } from '@/store/useExamStore';

interface ExamData {
  exam: Exam | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch exam data by ID
 * Checks localStorage first for custom exams, then falls back to dummy data
 * 
 * Usage:
 * const { exam, loading, error } = useExamData(examId);
 */
export const useExamData = (examId: string): ExamData => {
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Simulate API call delay
      const timer = setTimeout(() => {
        let foundExam: Exam | null = null;

        // First check localStorage for custom exams
        if (typeof window !== 'undefined') {
          try {
            const stored = localStorage.getItem('exams_data');
            if (stored) {
              const customExams = JSON.parse(stored) as Exam[];
              foundExam = customExams.find((e) => e.id === examId) || null;
            }
          } catch (e) {
            console.error('Error reading from localStorage:', e);
          }
        }

        // If not found in localStorage, check dummy data
        if (!foundExam && dummyData && dummyData.exams && Array.isArray(dummyData.exams)) {
          const dummyExam = dummyData.exams.find((e) => e.id === examId);
          if (dummyExam) {
            foundExam = { ...dummyExam, isCustom: false } as Exam;
          }
        }

        if (foundExam) {
          setExam(foundExam);
        } else {
          setError('Exam not found');
        }
        setLoading(false);
      }, 100);

      return () => clearTimeout(timer);
    } catch (err) {
      setError('Failed to load exam data');
      setLoading(false);
    }
  }, [examId]);

  return { exam, loading, error };
};

/**
 * Helper function to get all exams from dummy data
 */
export const getAllExams = (): Exam[] => {
  if (dummyData && dummyData.exams && Array.isArray(dummyData.exams)) {
    return dummyData.exams as Exam[];
  }
  return [];
};

/**
 * Helper function to get a single exam by ID
 */
export const getExamById = (id: string): Exam | undefined => {
  if (dummyData && dummyData.exams && Array.isArray(dummyData.exams)) {
    return dummyData.exams.find((e) => e.id === id) as Exam | undefined;
  }
  return undefined;
};

/**
 * Helper function to get questions for an exam
 */
export const getExamQuestions = (examId: string): Question[] => {
  const exam = getExamById(examId);
  return exam?.questions || [];
};
