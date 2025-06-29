"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";

const ProjectSubmissionPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg dark:bg-zinc-900">
      <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
        Submit Your Project
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <Field label="Project Name" id="name">
          <Input id="name" placeholder="Enter project name" required />
        </Field>

        <Field label="Description" id="description">
          <Textarea
            id="description"
            placeholder="Brief project description"
            required
          />
        </Field>

        <Field label="Project Type" id="type">
          <Input id="type" placeholder="e.g., Research, Design" />
        </Field>

        <Field label="Timeline" id="timeline">
          <Input id="timeline" placeholder="e.g., 6 months, 1 year" />
        </Field>

        <Field label="References" id="references">
          <Textarea
            id="references"
            placeholder="Reference links (comma-separated)"
          />
        </Field>

        <Field label="Tags" id="tags">
          <Input id="tags" placeholder="Enter tags (comma-separated)" />
        </Field>

        <Field label="Status" id="status">
          <Input id="status" placeholder="e.g., Pending, Approved" />
        </Field>

        <Field label="Team Members" id="members">
          <Textarea
            id="members"
            placeholder="Registered members (comma-separated)"
          />
        </Field>

        <Field label="Guest Members" id="guestMembers">
          <Textarea
            id="guestMembers"
            placeholder="Guest members (comma-separated)"
          />
        </Field>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Submit Project
          </button>
        </div>
      </form>
    </div>
  );
};

const Field = ({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <Label
        htmlFor={id}
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
      </Label>
      {children}
    </div>
  );
};

export default ProjectSubmissionPage;
