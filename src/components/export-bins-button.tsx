"use client";

import { Button } from "@/components/ui/button";
import { Bin } from "../types";

interface ExportBinsButtonProps {
  bins: Bin[];
}

export default function ExportBinsButton({ bins }: ExportBinsButtonProps) {
  const exportBins = () => {
    const binsJson = JSON.stringify(bins, null, 2);
    const blob = new Blob([binsJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bins.bin-tagger";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={exportBins} disabled={bins.length === 0}>
      Export Bins
    </Button>
  );
}
