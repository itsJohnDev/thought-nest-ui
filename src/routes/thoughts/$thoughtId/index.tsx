import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  queryOptions,
  useSuspenseQuery,
  useMutation,
} from "@tanstack/react-query";
import { fetchThought, deleteThought } from "@/api/thoughts";
import { useAuth } from "@/context/AuthContext";

const thoughtQueryOptions = (thoughtId: string) =>
  queryOptions({
    queryKey: ["thought", thoughtId],
    queryFn: () => fetchThought(thoughtId),
  });

export const Route = createFileRoute("/thoughts/$thoughtId/")({
  component: ThoughtDetailsPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(thoughtQueryOptions(params.thoughtId));
  },
});

function ThoughtDetailsPage() {
  const { thoughtId } = Route.useParams();
  const { data: thought } = useSuspenseQuery(thoughtQueryOptions(thoughtId));

  const navigate = useNavigate();

  const { user } = useAuth();

  const { mutateAsync: deleteMutate, isPending } = useMutation({
    mutationFn: () => deleteThought(thoughtId),
    onSuccess: () => {
      navigate({ to: "/thoughts" });
    },
  });

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this thought?"
    );

    if (confirmDelete) {
      await deleteMutate();
    }
  };

  return (
    <div className="p-4">
      <Link to="/thoughts" className="text-blue-500 underline block mb-4">
        Back To Thoughts
      </Link>
      <h2 className="text-2xl font-bold">{thought.title}</h2>
      <p className="mt-2">{thought.description}</p>

      {user && user.id === thought.user && (
        <>
          {/* Edit Link */}
          <Link
            to="/thoughts/$thoughtId/edit"
            params={{ thoughtId }}
            className="inline-block text-sm bg-yellow-500 hover:bg-yellow-600 hover:cursor-pointer text-white mt-4 mr-2 px-4 py-2 rounded transition"
          >
            Edit
          </Link>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="text-sm bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white mt-4 px-4 py-2 rounded transition disabled:opacity:50"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </>
      )}
    </div>
  );
}
