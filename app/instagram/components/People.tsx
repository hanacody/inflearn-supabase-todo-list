"use client";

import { Card, Typography, Button } from "@material-tailwind/react";

export default function People() {
  return (
    <div className="max-w-2xl mx-auto">
      <Typography variant="h5" className="mb-6">추천 친구</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((id) => (
          <Card key={id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-200"></div>
              <div>
                <Typography className="font-semibold">사용자{id}</Typography>
                <Typography variant="small" color="gray">회원님을 팔로우합니다</Typography>
              </div>
            </div>
            <Button size="sm" color="blue">팔로우</Button>
          </Card>
        ))}
      </div>
    </div>
  );
} 