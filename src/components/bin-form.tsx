"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BinFormProps {
  onAddBin: (name: string) => void;
}

export default function BinForm({ onAddBin }: BinFormProps) {
  const [binName, setBinName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (binName.trim()) {
      onAddBin(binName.trim());
      setBinName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2 w-full">
      <Input
        type="text"
        value={binName}
        onChange={(e) => setBinName(e.target.value)}
        placeholder="Enter bin name"
        className="flex-grow"
      />
      <Button type="submit">Add Bin</Button>
    </form>
  );
}
