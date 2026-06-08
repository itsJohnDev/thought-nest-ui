import api from "@/lib/axios";
import type { Thought } from "@/types";

export const fetchThoughts = async (limit?: number): Promise<Thought[]> => {
  const res = await api.get("/thoughts", {
    params: limit ? { _limit: limit } : {},
  });
  return res.data;
};

export const fetchThought = async (thoughtId: string): Promise<Thought> => {
  const res = await api.get(`/thoughts/${thoughtId}`);
  return res.data;
};

export const createThought = async (newThought: {
  title: string;
  summary: string;
  description: string;
  tags: string[];
}): Promise<Thought> => {
  const res = await api.post("/thoughts", {
    ...newThought,
    createdAt: new Date().toISOString(),
  });

  return res.data;
};

export const deleteThought = async (thoughtId: string): Promise<void> => {
  await api.delete(`/thoughts/${thoughtId}`);
};

export const updateThought = async (
  thoughtId: string,
  updatedData: {
    title: string;
    summary: string;
    description: string;
    tags: string[];
  }
): Promise<Thought> => {
  const res = await api.put(`/thoughts/${thoughtId}`, updatedData);
  return res.data;
};
