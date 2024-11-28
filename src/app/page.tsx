"use client";

import BinForm from "@/components/bin-form";
import BinList from "@/components/bin-list";
import ExportBinsButton from "@/components/export-bins-button";
import ExportButton from "@/components/export-button";
import ImportBinsButton from "@/components/import-bins-button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { Bin } from "@/types";
import { useState } from "react";

export default function BinTagger() {
  const [bins, setBins] = useState<Bin[]>([]);

  const addBin = (name: string) => {
    setBins([...bins, { id: Date.now(), name, content: [] }]);
  };

  const updateBin = (id: number, content: string[]) => {
    setBins(bins.map((bin) => (bin.id === id ? { ...bin, content } : bin)));
  };

  const removeBin = (id: number) => {
    setBins(bins.filter((bin) => bin.id !== id));
  };

  const importBins = (importedBins: Bin[]) => {
    setBins((prevBins) => [...prevBins, ...importedBins]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bin Tagger</h1>
        <ModeToggle />
      </div>
      <div className="flex gap-4 mb-6 w-full">
        <BinForm onAddBin={addBin} />
        <ImportBinsButton onImport={importBins} />
        <ExportBinsButton bins={bins} />
      </div>
      <BinList bins={bins} onUpdateBin={updateBin} onRemoveBin={removeBin} />
      <ExportButton bins={bins} />
    </div>
  );
}
