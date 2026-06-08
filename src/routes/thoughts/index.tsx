import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { fetchThoughts } from "@/api/thoughts";
import IdeaCard from "@/components/IdeaCard";

const thoughtsQueryOptions = () =>
  queryOptions({
    queryKey: ["thoughts"],
    queryFn: () => fetchThoughts(),
  });

export const Route = createFileRoute("/thoughts/")({
  head: () => ({
    meta: [
      {
        title: "Thought Nest - Browse",
      },
    ],
  }),
  component: ThoughtsPage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(thoughtsQueryOptions());
  },
});

function ThoughtsPage() {
  const { data: thoughts } = useSuspenseQuery(thoughtsQueryOptions());

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Thoughts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.isArray(thoughts) &&
          thoughts.map((thought) => (
            <IdeaCard key={thought._id} thought={thought} />
          ))}
      </div>
    </div>
  );
}
