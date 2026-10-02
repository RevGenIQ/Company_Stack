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
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">User Roles & Access Control</h1>
          <p className="text-muted-foreground/80 text-xs mt-1">Manage team members, RBAC permissions, and Supabase auth roles.</p>
        </div>

        <Button variant="glow" size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Invite User
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-card/80 overflow-hidden shadow-2xl">
        <table className="w-full text-left text-xs text-muted-foreground">
          <thead className="bg-background text-muted-foreground/80 font-semibold border-b border-border uppercase tracking-wider">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-secondary/40 transition-colors">
                <td className="p-4 font-bold text-foreground">{u.name}</td>
                <td className="p-4 text-muted-foreground/80">{u.email}</td>
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
