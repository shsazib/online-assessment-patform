'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CandidateDashboard() {
  const { user, isAuthenticated, hasHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hasHydrated && (!isAuthenticated || user?.role !== 'candidate')) {
      router.push('/login');
    }
  }, [hasHydrated, isAuthenticated, user, router]);

  if (!hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'candidate') {
    return null;
  }

  return (
    <>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-text-primary">
              Candidate Dashboard
            </h2>
            <p className="text-text-secondary mt-1">
              Welcome back, <span className="font-medium">{user.name}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-text-primary">Available Exams</h3>
            <p className="text-4xl font-bold text-primary mt-4">03</p>
            <p className="text-sm text-text-secondary mt-1">Exams you can start now</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-text-primary">Completed</h3>
            <p className="text-4xl font-bold text-emerald-600 mt-4">01</p>
            <p className="text-sm text-text-secondary mt-1">Exams you have finished</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-text-primary">Upcoming</h3>
            <p className="text-4xl font-bold text-amber-600 mt-4">02</p>
            <p className="text-sm text-text-secondary mt-1">Exams scheduled soon</p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            Available Tests
          </h3>
          <div className="text-text-secondary text-sm">
            (এখানে তোমার পরীক্ষার কার্ডগুলো দেখাবে — পরে আমি দিয়ে দিব)
          </div>
        </div>
      </div>
    </>
  );
}