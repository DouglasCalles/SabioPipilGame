import Card from "../ui/Card";

export default function QuestionCard({ question, children }) {
  return (
    <Card className="question-card border-[#3A7D44]/15">
      <h2 className="font-display text-center text-3xl leading-tight text-[#5C3A21] sm:text-4xl">{question}</h2>
      {children}
    </Card>
  );
}
