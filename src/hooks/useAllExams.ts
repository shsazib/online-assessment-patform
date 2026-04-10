"use client";

import { useEffect, useState } from 'react';
import { useExamStore, type Exam } from '@/store/useExamStore';
import dummyData from '@/data/dummyData';

export function useAllExams() {
  const { loadExamsFromStorage } = useExamStore();
  const [allExams, setAllExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExams = async () => {
      try {
        // Load custom exams from localStorage
        const customExams = loadExamsFromStorage();
        
        // Combine dummy data with custom exams
        // Custom exams take precedence if IDs match
        const examsMap = new Map<string, Exam>();
        
        // Add dummy exams first
        if (dummyData && dummyData.exams && Array.isArray(dummyData.exams)) {
          dummyData.exams.forEach(exam => {
            examsMap.set(exam.id, { ...exam, isCustom: false } as Exam);
          });
        }
        
        // Add/override with custom exams
        if (customExams && Array.isArray(customExams)) {
          customExams.forEach(exam => {
            examsMap.set(exam.id, exam);
          });
        }
        
        const combined = Array.from(examsMap.values());
        setAllExams(combined);
      } catch (error) {
        console.error('Failed to load exams:', error);
        // Fallback to dummy data
        if (dummyData && dummyData.exams && Array.isArray(dummyData.exams)) {
          setAllExams(dummyData.exams.map(exam => ({ ...exam, isCustom: false } as Exam)));
        } else {
          setAllExams([]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadExams();
  }, [loadExamsFromStorage]);

  return { allExams, loading };
}
