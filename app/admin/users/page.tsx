"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserCheck, Shield, Plus } from "lucide-react";

export default function AdminUsersPage() {
  const users = [
    { id: "u1", name: "Alexander Vance", email: "alex@revgeniq.com", role: "admin" },
    { id: "u2", name: "Elena Rostova", email: "elena@revgeniq.com", role: "manager" },
    { id: "u3", name: "Marcus Sterling", email: "marcus@revgeniq.com", role: "editor" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">User Roles & Access Control</h1>
          <p className="text-slate-400 text-xs mt-1">Manage team members, RBAC permissions, and Supabase auth roles.</p>
        </div>

        <Button variant="glow" size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Invite User
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-2xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-bold text-white">{u.name}</td>
                <td className="p-4 text-slate-400">{u.email}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    {u.role}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Button variant="outline" size="sm" className="text-xs">Edit Role</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
