"use client";

import { useState, useRef } from "react";
import { Bin } from "../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface BinListProps {
  bins: Bin[];
  onUpdateBin: (id: number, content: string[]) => void;
  onRemoveBin: (id: number) => void;
}

export default function BinList({
  bins,
  onUpdateBin,
  onRemoveBin,
}: BinListProps) {
  const [newItems, setNewItems] = useState<{ [key: number]: string }>({});
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const addItem = (binId: number, currentContent: string[]) => {
    if (newItems[binId]?.trim()) {
      onUpdateBin(binId, [...currentContent, newItems[binId].trim()]);
      setNewItems((prev) => ({ ...prev, [binId]: "" }));
      setTimeout(() => inputRefs.current[binId]?.focus(), 0);
    }
  };

  const removeItem = (
    binId: number,
    currentContent: string[],
    index: number
  ) => {
    onUpdateBin(
      binId,
      currentContent.filter((_, i) => i !== index)
    );
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    binId: number,
    currentContent: string[]
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem(binId, currentContent);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      {bins.map((bin) => (
        <Card key={bin.id}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{bin.name}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveBin(bin.id)}
                aria-label={`Remove ${bin.name} bin`}
              >
                Remove Bin
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 mb-2 max-h-60 overflow-y-auto">
              {bin.content.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-1"
                >
                  <span className="break-words max-w-[80%]">{item}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(bin.id, bin.content, index)}
                    aria-label={`Remove ${item}`}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <Input
                value={newItems[bin.id] || ""}
                onChange={(e) =>
                  setNewItems((prev) => ({ ...prev, [bin.id]: e.target.value }))
                }
                onKeyDown={(e) => handleKeyPress(e, bin.id, bin.content)}
                placeholder="Add new item"
                className="flex-grow"
                ref={(el) => {
                  inputRefs.current[bin.id] = el;
                }}
              />
              <Button onClick={() => addItem(bin.id, bin.content)}>Add</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
