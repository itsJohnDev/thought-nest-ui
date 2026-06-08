import type { Thought } from "@/types";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";

const IdeaCard = ({
  thought,
  button = true,
}: {
  thought: Thought;
  button?: boolean;
}) => {
  const linkClasses = clsx({
    "text-green-600 hover:underline mt-3": !button,
    "text-center mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hove:bg-green-700 transition":
      button,
  });

  return (
    <div className="border border-gray-300 p-4 rounded shadow bg-white flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold">{thought.title}</h2>
        <p className="text-gray-700 mt-2">{thought.summary}</p>
      </div>

      <Link
        to="/thoughts/$thoughtId"
        params={{ thoughtId: thought._id.toString() }}
        className={linkClasses}
      >
        {button ? "View Thought" : "Read More →"}
      </Link>
    </div>
  );
};

export default IdeaCard;
