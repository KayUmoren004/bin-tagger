"use client";

import { motion } from "framer-motion";
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
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex justify-between items-center mb-6"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold">Bin Tagger</h1>
        <ModeToggle />
      </motion.div>
      <motion.div
        className="flex gap-4 mb-6 w-full"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <BinForm onAddBin={addBin} />
        <ImportBinsButton onImport={importBins} />
        <ExportBinsButton bins={bins} />
      </motion.div>
      <BinList bins={bins} onUpdateBin={updateBin} onRemoveBin={removeBin} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <ExportButton bins={bins} />
      </motion.div>
    </motion.div>
  );
}
