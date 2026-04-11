import React from "react";
import QuestionAnswer from "@/components/QuestionAnswer";

const ExamScreenPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <section className="min-h-screen px-4">
        <div className="container mx-auto my-14">
          <QuestionAnswer examId={params.id} />
        </div>
      </section>
    </>
  );
};

export default ExamScreenPage;
