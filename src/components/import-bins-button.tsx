"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Bin } from "../types";

interface ImportBinsButtonProps {
  onImport: (bins: Bin[]) => void;
}

export default function ImportBinsButton({ onImport }: ImportBinsButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importedBins = JSON.parse(content) as Bin[];
          onImport(importedBins);
        } catch (error) {
          console.error("Error parsing imported file:", error);
          alert(
            "Error importing file. Please make sure it's a valid .bin-tagger file."
          );
        }
      };
      reader.readAsText(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Button onClick={triggerFileInput}>Import Bins</Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImport}
        accept=".bin-tagger"
        style={{ display: "none" }}
      />
    </>
  );
}
