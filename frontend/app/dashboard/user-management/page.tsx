"use client";
import React from "react";
import UserTable from "../../components/UserTable";

export default function UserManagement() {
  return (
    <div className="user-management-page">
      <h1>User Management</h1>
      <UserTable />  {/* The component where you show the user table */}
    </div>
  );
}
