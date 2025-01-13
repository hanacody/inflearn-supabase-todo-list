"use client";

import { Card, Typography } from "@material-tailwind/react";

export default function Discover() {
  return (
    <div className="max-w-full mx-auto">
      <Typography variant="h5" className="mb-6">탐색</Typography>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 9].map((id) => (
          <Card key={id} className="aspect-square bg-gray-100 hover:opacity-90 cursor-pointer">
            <div className="w-full h-full bg-gray-200"></div>
          </Card>
        ))}
      </div>
    </div>
  );
} 