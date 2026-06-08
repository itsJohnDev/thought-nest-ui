import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  useMutation,
  useSuspenseQuery,
  queryOptions,
} from "@tanstack/react-query";
import { fetchThought, updateThought } from "@/api/thoughts";

const thoughtQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["thought", id],
    queryFn: () => fetchThought(id),
  });

export const Route = createFileRoute("/thoughts/$thoughtId/edit")({
  component: ThoughtEditPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(thoughtQueryOptions(params.thoughtId));
  },
});

function ThoughtEditPage() {
  const { thoughtId } = Route.useParams();
  const navigate = useNavigate();
  const { data: thought } = useSuspenseQuery(thoughtQueryOptions(thoughtId));

  const [title, setTitle] = useState(thought.title);
  const [summary, setSummary] = useState(thought.summary);
  const [description, setDescription] = useState(thought.description);
  const [tagsInput, setTagsInput] = useState(thought.tags.join(", "));

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      updateThought(thoughtId, {
        title,
        summary,
        description,
        tags: tagsInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      }),
    onSuccess: () => {
      navigate({ to: "/thoughts/$thoughtId", params: { thoughtId } });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateAsync();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Edit Thought</h1>
        <Link
          to="/thoughts/$thoughtId"
          params={{ thoughtId }}
          className="text-sm text-green-600 hover:underline"
        >
          ← Back To Thought
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-1"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter thought title"
          />
        </div>

        <div>
          <label
            htmlFor="summary"
            className="block text-gray-700 font-medium mb-1"
          >
            Summary
          </label>
          <input
            id="summary"
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter thought summary"
          />
        </div>

        <div>
          <label
            htmlFor="body"
            className="block text-gray-700 font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="body"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Write out the description of your thought"
          />
        </div>

        <div>
          <label
            htmlFor="tags"
            className="block text-gray-700 font-medium mb-1"
          >
            Tags
          </label>
          <input
            id="tags"
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="optional tags, comma separated"
          />
        </div>

        <div className="mt-5">
          <button
            type="submit"
            disabled={isPending}
            className="block w-full bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white font-semibold px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Updating..." : "Update Thought"}
          </button>
        </div>
      </form>
    </div>
  );
}
