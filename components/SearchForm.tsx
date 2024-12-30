"use client";

import { FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { JobStatus } from "@/utils/types";
import { capitalizeEveryWord } from "@/utils/utils";

export default function SearchForm() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let params = new URLSearchParams();

    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    const jobStatus = formData.get("jobStatus") as string;
    params.set("search", search.toLowerCase());
    params.set("jobStatus", jobStatus.toLowerCase());

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form className='bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg' onSubmit={handleSubmit}>
      <Input type='text' placeholder='Search Jobs' name='search' defaultValue={search} />
      <Select defaultValue={capitalizeEveryWord(jobStatus)} name='jobStatus'>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {["all", ...Object.values(JobStatus)].map((jobStatus) => {
            jobStatus = capitalizeEveryWord(jobStatus);
            return (
              <SelectItem key={jobStatus} value={jobStatus}>
                {jobStatus}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Button type='submit'>Search</Button>
    </form>
  );
}
