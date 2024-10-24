"use client";
import React from "react";
import UserTable from "../../components/UserTable";
import InviteCarer from "../../components/InviteCarer";

export default function UserManagement() {
  return (
    <div className="user-management-page p-8">
      <h1 className="text-3xl font-bold mb-8">User Management</h1>
      
      {/* The component where you show the user table */}
      <UserTable /> 

      {/* Invite Carer Form */}
      <div className="mb-12">
        <InviteCarer />  {/* Form to invite a carer */}
      </div> 
    </div>
  );
}
