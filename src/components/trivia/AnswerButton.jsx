import Button from "../ui/Button";

export default function AnswerButton({ answer, className = "", ...props }) {
  return (
    <Button className={`w-full  text-center leading-5 ${className}`.trim()} {...props}>
      {answer}
    </Button>
  );
}
