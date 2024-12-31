import { Fragment, useState } from "react";
import { Button } from "./ui/button";

function ExpandButton() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className="h-[20px] w-[20px] rounded-full bg-pink-400 text-white flex justify-center items-center"
    >
      {isExpanded ? "-" : "+"}
    </button>
  );
}

export default function FAQ() {
  const [questions, setQuestions] = useState<
    { title: string; answer: string }[]
  >([
    {
      title: "How can I purchase a Book?",
      answer:
        "You can purchase a book by clicking the 'Add to Cart' button. And after choosing the books, you can click checkout to proceed to payment.",
    },
    {
      title: "What payment methods does Booktopia have?",
      answer:
        "Currently we can only pay through Stripe. You have to provide you bank card pay.",
    },
  ]);
  return (
    <div className="py-44 px-64 xl:px-72">
      <h2 className="font-semibold text-2xl mb-8">Frequently Ask Questions</h2>
      <div className="flex flex-col">
        {questions.length > 0
          ? questions.map((question: any, index: number) => (
              <Fragment key={index}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{question.title}</h3>
                    <ExpandButton />
                  </div>
                  <div className="text-left">{question.answer}</div>
                </div>
                <div className="h-[1px] bg-zinc-300 my-8"></div>
              </Fragment>
            ))
          : null}
      </div>
      <Button
        variant="ghost"
        className="text-white px-5 rounded-full bg-pink-400"
      >
        Find more FAQs
      </Button>
    </div>
  );
}
