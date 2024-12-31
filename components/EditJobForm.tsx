"use client";

import { useForm } from "react-hook-form";
import CustomFormSelect, { CustomFormField } from "./FormComponents";
import { createAndEditJobSchema, CreateAndEditJobType, JobMode, JobStatus } from "@/utils/types";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleJobAction, updateJobAction } from "@/utils/actions";
import { useRouter } from "next/navigation";
import { Form } from "./ui/form";
import { toast } from "@/hooks/use-toast";

export default function EditJobForm({ jobId }: { jobId: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getSingleJobAction(jobId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => updateJobAction(jobId, values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: "There was an error",
        });
        return;
      }
      toast({ description: "Job updated" });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      router.push("/jobs");
      // form.reset();
    },
  });

  const form = useForm({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position || "",
      company: data?.company || "",
      location: data?.location || "",
      status: data?.status || JobStatus.Pending,
      mode: data?.mode || JobMode.FullTime,
    },
  });

  function onSubmit(values: CreateAndEditJobType) {
    mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='bg-muted p-8 rounded'>
        <h2 className='capitalize font-semibold text-4xl mb-6'>edit job</h2>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start'>
          <CustomFormField name='position' control={form.control} />
          <CustomFormField name='company' control={form.control} />
          <CustomFormField name='location' control={form.control} />
          <CustomFormSelect
            name='status'
            control={form.control}
            labelText='job status'
            items={Object.values(JobStatus)}
          />
          <CustomFormSelect name='mode' control={form.control} labelText='job mode' items={Object.values(JobMode)} />

          <Button type='submit' className='self-end capitalize' disabled={isPending}>
            {isPending ? "updating..." : "edit job"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
