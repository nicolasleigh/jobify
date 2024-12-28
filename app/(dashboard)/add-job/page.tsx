import CreateJobForm from "@/components/CreateJobForm";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function AddJobPage() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateJobForm />
    </HydrationBoundary>
  );
}
