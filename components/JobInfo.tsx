import { ReactNode } from "react";

export default function JobInfo({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className='flex gap-x-2 items-center text-sm py-1'>
      {icon}
      {text}
    </div>
  );
}
