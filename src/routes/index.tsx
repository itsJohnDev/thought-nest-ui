import { createFileRoute } from "@tanstack/react-router";
import { TreePine } from "lucide-react";
import { fetchThoughts } from "@/api/thoughts";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import IdeaCard from "@/components/IdeaCard";

const thoughtsQueryOptions = queryOptions({
  queryKey: ["thoughts", { limit: 3 }],
  queryFn: () => fetchThoughts(3),
});

export const Route = createFileRoute("/")({
  component: HomePage,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(thoughtsQueryOptions),
});

function HomePage() {
  const { data: thoughts } = useSuspenseQuery(thoughtsQueryOptions);

  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-10 p-6 text-green-600">
      <div className="flex flex-col items-start gap-4">
        <TreePine className="w-16 h-16 text-green-400" />
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Thought Nest
        </h1>
        <p className="text-gray-600 max-w-xs">
          Discover, share, and build the next big startup ideas and side
          hustles.
        </p>
      </div>

      <section className="flex-1">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Latest Thoughts
        </h2>
        <div className="space-y-6">
          {Array.isArray(thoughts) &&
            thoughts.map((thought: any) => (
              <IdeaCard key={thought._id} thought={thought} button={false} />
            ))}
        </div>

        <div className="mt-6">
          <a
            href="/thoughts"
            className="w-full text-center inline-block bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white font-semibold px-5 py-2 rounded-md transition"
          >
            View All Thoughts
          </a>
        </div>
      </section>
    </div>
  );
}
