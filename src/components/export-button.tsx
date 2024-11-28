"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bin } from "../types";

interface ExportButtonProps {
  bins: Bin[];
}

const A4_WIDTH = 2480; // A4 width at 300 DPI
const A4_HEIGHT = 3508; // A4 height at 300 DPI
const BINS_PER_PAGE = 6;
const BIN_PADDING = 20;
const FONT_SIZE = 36;
const LINE_HEIGHT = 1.5;
const BIN_NAME_FONT_SIZE = 52;
const BULLET_PADDING = 10; // Space between bullet point and text

export default function ExportButton({ bins }: ExportButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = A4_WIDTH;
      canvas.height = A4_HEIGHT;
    }
  }, []);

  const drawBin = (
    ctx: CanvasRenderingContext2D,
    bin: Bin,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);

    // Draw bin name
    ctx.font = `bold ${BIN_NAME_FONT_SIZE}px Arial`;
    ctx.fillStyle = "#000000";
    ctx.fillText(
      bin.name,
      x + BIN_PADDING,
      y + BIN_NAME_FONT_SIZE + BIN_PADDING
    );

    // Set font for content items
    ctx.font = `${FONT_SIZE}px Arial`;
    let currentX = x + BIN_PADDING;
    let currentY = y + BIN_NAME_FONT_SIZE + FONT_SIZE + BIN_PADDING * 2;

    // Draw content items with word wrap
    bin.content.forEach((item) => {
      const bulletWidth = ctx.measureText("• ").width;
      const itemWidth = ctx.measureText(item).width;
      const totalWidth = bulletWidth + itemWidth + BULLET_PADDING;

      // Check if we need to move to next line
      if (currentX + totalWidth > x + width - BIN_PADDING) {
        currentX = x + BIN_PADDING;
        currentY += FONT_SIZE * LINE_HEIGHT;
      }

      // Draw bullet point and item
      ctx.fillText("•", currentX, currentY);
      ctx.fillText(item, currentX + bulletWidth + BULLET_PADDING, currentY);

      // Move x position for next item
      currentX += totalWidth + BIN_PADDING;
    });
  };

  const generateImage = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pageCount = Math.ceil(bins.length / BINS_PER_PAGE);
    const binWidth = (A4_WIDTH - BIN_PADDING * 3) / 2;
    const binHeight = (A4_HEIGHT - BIN_PADDING * 4) / 3;

    for (let page = 0; page < pageCount; page++) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, A4_WIDTH, A4_HEIGHT);

      for (let i = 0; i < BINS_PER_PAGE; i++) {
        const binIndex = page * BINS_PER_PAGE + i;
        if (binIndex >= bins.length) break;

        const bin = bins[binIndex];
        const row = Math.floor(i / 2);
        const col = i % 2;
        const x = BIN_PADDING + col * (binWidth + BIN_PADDING);
        const y = BIN_PADDING + row * (binHeight + BIN_PADDING);

        drawBin(ctx, bin, x, y, binWidth, binHeight);
      }

      // If there are more pages, create a new image
      if (page < pageCount - 1) {
        const link = document.createElement("a");
        link.download = `bins_page_${page + 1}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();

        // Clear the canvas for the next page
        ctx.clearRect(0, 0, A4_WIDTH, A4_HEIGHT);
      }
    }

    // Download the last (or only) page
    const link = document.createElement("a");
    link.download = pageCount > 1 ? `bins_page_${pageCount}.png` : "bins.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <>
      <Button onClick={generateImage} disabled={bins.length === 0}>
        Export to PNG
      </Button>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </>
  );
}
