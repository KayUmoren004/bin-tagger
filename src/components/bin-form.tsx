"use client";

import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BinFormProps {
  onAddBin: (name: string) => void;
}

export default function BinForm({ onAddBin }: BinFormProps) {
  const [binName, setBinName] = useState("");
  const controls = useAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (binName.trim()) {
      // Animate the form on submission
      await controls.start({
        scale: [1, 0.98, 1],
        transition: { duration: 0.2 },
      });
      onAddBin(binName.trim());
      setBinName("");
    } else {
      // Shake animation for invalid input
      controls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 },
      });
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mb-4 flex gap-2 w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="flex-grow" animate={controls}>
        <Input
          type="text"
          value={binName}
          onChange={(e) => setBinName(e.target.value)}
          placeholder="Enter bin name"
          className="w-full"
        />
      </motion.div>
      <Button type="submit">Add Bin</Button>
    </motion.form>
  );
}
