"use client"; // This ensures the component is a client-side component

import React, { useState } from "react";
import axios from "axios";
import { Card, CardBody, Button, Input, Typography } from "@material-tailwind/react"; // Import Material Tailwind components

function InviteCarer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleInvite = async (e) => {
    e.preventDefault();

    try {
      // Update the URL to match the correct route
      const response = await axios.post("http://localhost:4000/api/invite-carer", { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error sending invitation.");
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto mt-8">
      <CardBody>
        <Typography variant="h5" className="mb-4">
          Invite Carer
        </Typography>
        <form onSubmit={handleInvite} className="flex flex-col gap-4">
          <Input 
            type="email" 
            label="Carer's Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <Button type="submit" className="bg-blue-500 text-white">
            Send Invitation
          </Button>
        </form>
        {message && (
          <Typography color="red" className="mt-4">
            {message}
          </Typography>
        )}
      </CardBody>
    </Card>
  );
}

export default InviteCarer;
