"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTeamMember,
  deleteTeamMember,
  getTeamMembers,
  updateTeamMember,
} from "@/lib/api";
import type { TeamMember, TeamMemberInput } from "@/types/team-member";
import { FiRefreshCw } from "react-icons/fi";

const PAGE_SIZE = 10;

const GRADIENT_OPTIONS = [
  "from-brand-600 to-brand-800",
  "from-violet-600 to-violet-800",
  "from-emerald-600 to-emerald-800",
  "from-accent-500 to-accent-700",
  "from-sky-600 to-sky-800",
  "from-rose-600 to-rose-800",
  "from-indigo-600 to-indigo-800",
  "from-blue-600 to-blue-800",
];

type TeamMemberEditorProps = {
  readonly initialMember?: TeamMember | null;
  readonly isSaving: boolean;
  readonly onCancel: () => void;
  readonly onSave: (payload: TeamMemberInput, id?: string) => void;
};

function TeamMemberEditorModal({
  initialMember,
  isSaving,
  onCancel,
  onSave,
}: TeamMemberEditorProps) {
  const isEdit = Boolean(initialMember);
  const [name, setName] = useState(initialMember?.name ?? "");
  const [role, setRole] = useState(initialMember?.role ?? "");
  const [bio, setBio] = useState(initialMember?.bio ?? "");
  const [initials, setInitials] = useState(initialMember?.initials ?? "");
  const [gradient, setGradient] = useState(
    initialMember?.gradient ?? "from-brand-600 to-brand-800"
  );
  const [linkedin, setLinkedin] = useState(initialMember?.linkedin ?? "");
  const [twitter, setTwitter] = useState(initialMember?.twitter ?? "");
  const [position, setPosition] = useState(String(initialMember?.position ?? 0));
  const [isActive, setIsActive] = useState(initialMember?.isActive ?? true);
  const [error, setError] = useState<string | null>(null);
  const submitLabel = isEdit ? "Save Changes" : "Create Member";

  function submit() {
    if (!name.trim() || !role.trim() || !bio.trim() || !initials.trim()) {
      setError("Name, role, bio, and initials are required.");
      return;
    }

    setError(null);

    onSave(
      {
        name: name.trim(),
        role: role.trim(),
        bio: bio.trim(),
        initials: initials.trim().slice(0, 4).toUpperCase(),
        gradient,
        linkedin: linkedin.trim() || null,
        twitter: twitter.trim() || null,
        position: Number.parseInt(position, 10) || 0,
        isActive,
      },
      initialMember?.id
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            {isEdit ? "Edit Team Member" : "Add Team Member"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:bg-slate-800"
          >
            Close
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="team-member-name" className="mb-1 block text-xs text-slate-400">Name</label>
            <input
              id="team-member-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
              placeholder="Alex Rivera"
            />
          </div>
          <div>
            <label htmlFor="team-member-role" className="mb-1 block text-xs text-slate-400">Role</label>
            <input
              id="team-member-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
              placeholder="Chief Executive Officer"
            />
          </div>
          <div>
            <label htmlFor="team-member-initials" className="mb-1 block text-xs text-slate-400">Initials (max 4)</label>
            <input
              id="team-member-initials"
              value={initials}
              onChange={(e) => setInitials(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
              placeholder="AR"
              maxLength={4}
            />
          </div>
          <div>
            <label htmlFor="team-member-position" className="mb-1 block text-xs text-slate-400">Position</label>
            <input
              id="team-member-position"
              type="number"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
              placeholder="0"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="team-member-bio" className="mb-1 block text-xs text-slate-400">Bio</label>
            <textarea
              id="team-member-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
              placeholder="Short team member bio"
            />
          </div>
          <div>
            <label htmlFor="team-member-gradient" className="mb-1 block text-xs text-slate-400">Gradient</label>
            <select
              id="team-member-gradient"
              value={gradient}
              onChange={(e) => setGradient(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
            >
              {GRADIENT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <label className="inline-flex items-center gap-2 text-sm text-slate-300">
              <input
                id="team-member-active"
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <span>Active (show on About page)</span>
            </label>
          </div>
          <div>
            <label htmlFor="team-member-linkedin" className="mb-1 block text-xs text-slate-400">LinkedIn URL</label>
            <input
              id="team-member-linkedin"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          <div>
            <label htmlFor="team-member-twitter" className="mb-1 block text-xs text-slate-400">Twitter URL</label>
            <input
              id="team-member-twitter"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
              placeholder="https://x.com/..."
            />
          </div>
        </div>

        {error ? (
          <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
            {error}
          </p>
        ) : null}

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex min-h-10 items-center rounded-lg border border-slate-700 px-4 text-sm font-medium text-slate-300 hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={submit}
            className="inline-flex min-h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-60"
          >
            {isSaving ? "Saving..." : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function TeamMembersView() {
  const queryClient = useQueryClient();
  const [editorMember, setEditorMember] = useState<TeamMember | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const teamQuery = useQuery({
    queryKey: ["team-members"],
    queryFn: getTeamMembers,
  });

  const allMembers = teamQuery.data ?? [];
  let memberSummary = "No team members found yet.";
  if (allMembers.length > 0) {
    const plural = allMembers.length === 1 ? "" : "s";
    memberSummary = `${allMembers.length} team member${plural} in database`;
  }
  const totalPages = Math.max(1, Math.ceil(allMembers.length / PAGE_SIZE));
  const pagedMembers = useMemo(
    () => allMembers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [allMembers, page]
  );

  const createMutation = useMutation({
    mutationFn: (payload: TeamMemberInput) => createTeamMember(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] }).catch(() => undefined);
      setEditorOpen(false);
      setEditorMember(null);
      setPage(1);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TeamMemberInput }) =>
      updateTeamMember(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] }).catch(() => undefined);
      setEditorOpen(false);
      setEditorMember(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTeamMember(id),
    onMutate: async (id) => {
      setDeletingId(id);
      await queryClient.cancelQueries({ queryKey: ["team-members"] });
      const prev = queryClient.getQueryData<TeamMember[]>(["team-members"]);
      if (prev) {
        queryClient.setQueryData<TeamMember[]>(
          ["team-members"],
          prev.filter((member) => member.id !== id)
        );
      }
      return { prev };
    },
    onError: (_e, _id, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["team-members"], ctx.prev);
    },
    onSettled: () => {
      setDeletingId(null);
      queryClient.invalidateQueries({ queryKey: ["team-members"] }).catch(() => undefined);
    },
  });

  const isSaving = createMutation.isPending || updateMutation.isPending;

  function saveMember(payload: TeamMemberInput, id?: string) {
    if (id) {
      updateMutation.mutate({ id, payload });
      return;
    }
    createMutation.mutate(payload);
  }

  function removeMember(member: TeamMember) {
    if (!globalThis.confirm(`Delete "${member.name}"?`)) return;
    deleteMutation.mutate(member.id);
  }

  let tableContent: React.ReactNode;
  if (teamQuery.isLoading) {
    tableContent = (
      <div className="flex items-center justify-center py-20 text-slate-500">Loading team members...</div>
    );
  } else if (pagedMembers.length === 0) {
    tableContent = (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-slate-500">No team members available.</p>
        <button
          type="button"
          onClick={() => {
            setEditorMember(null);
            setEditorOpen(true);
          }}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Add First Member
        </button>
      </div>
    );
  } else {
    tableContent = (
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          <tr>
            <th className="px-5 py-3.5">Name</th>
            <th className="px-5 py-3.5 hidden md:table-cell">Role</th>
            <th className="px-5 py-3.5 hidden lg:table-cell">Position</th>
            <th className="px-5 py-3.5 hidden lg:table-cell">Status</th>
            <th className="px-5 py-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {pagedMembers.map((member) => (
            <tr key={member.id} className="transition-colors hover:bg-slate-800/30">
              <td className="px-5 py-4">
                <p className="font-medium text-white">{member.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{member.initials}</p>
              </td>
              <td className="px-5 py-4 hidden md:table-cell text-slate-300">{member.role}</td>
              <td className="px-5 py-4 hidden lg:table-cell text-slate-400">{member.position}</td>
              <td className="px-5 py-4 hidden lg:table-cell">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    member.isActive
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-slate-700/50 text-slate-500"
                  }`}
                >
                  {member.isActive ? "Active" : "Hidden"}
                </span>
              </td>
              <td className="px-5 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditorMember(member);
                      setEditorOpen(true);
                    }}
                    className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    disabled={deletingId === member.id}
                    onClick={() => removeMember(member)}
                    className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-40"
                  >
                    {deletingId === member.id ? "..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <>
      {editorOpen ? (
        <TeamMemberEditorModal
          initialMember={editorMember}
          isSaving={isSaving}
          onCancel={() => {
            setEditorOpen(false);
            setEditorMember(null);
          }}
          onSave={saveMember}
        />
      ) : null}

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] p-5">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Team Members</h1>
            <p className="mt-1 text-sm text-slate-400">{memberSummary}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => teamQuery.refetch().catch(() => undefined)}
              disabled={teamQuery.isRefetching}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-700 px-4 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800 disabled:opacity-60"
            >
              <FiRefreshCw className={`h-3.5 w-3.5 ${teamQuery.isRefetching ? "animate-spin" : ""}`} />
              {teamQuery.isRefetching ? "Refreshing..." : "Refresh"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditorMember(null);
                setEditorOpen(true);
              }}
              className="inline-flex min-h-11 items-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              + New Member
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)]">
          {tableContent}
        </div>

        {!teamQuery.isLoading && allMembers.length > PAGE_SIZE ? (
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] px-5 py-3">
            <p className="text-xs text-slate-500">
              Showing <span className="font-medium text-slate-300">{(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, allMembers.length)}</span> of <span className="font-medium text-slate-300">{allMembers.length}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((value) => value - 1)}
                className="inline-flex min-h-9 items-center rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Prev
              </button>
              <span className="px-2 text-xs text-slate-500">{page} / {totalPages}</span>
              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((value) => value + 1)}
                className="inline-flex min-h-9 items-center rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
