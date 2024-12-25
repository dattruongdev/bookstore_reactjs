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
  const [questions, setQuestions] = useState<any>([1, 2, 3]);
  return (
    <div className="py-44 px-64 xl:px-72">
      <h2 className="font-semibold text-2xl mb-8">Frequently Ask Questions</h2>
      <div className="flex flex-col">
        {questions.length > 0
          ? questions.map(() => (
              <Fragment>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">Question</h3>
                    <ExpandButton />
                  </div>
                  <div className="text-left">Answer</div>
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
