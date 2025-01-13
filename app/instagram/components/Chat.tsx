"use client";

import { Card, Typography, Input } from "@material-tailwind/react";

export default function Chat() {
  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-2rem)]">
      <Card className="h-full p-4">
        <div className="flex flex-col h-full">
          <Typography variant="h5" className="mb-4">메시지</Typography>
          
          <div className="flex-1 overflow-y-auto space-y-4">
            {[1, 2, 3].map((id) => (
              <div key={id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                <div>
                  <Typography className="font-semibold">사용자{id}</Typography>
                  <Typography variant="small" color="gray">최근 메시지...</Typography>
                </div>
              </div>
            ))}
          </div>

          <Input
            type="text"
            label="메시지 검색"
            className="mt-4"
          />
        </div>
      </Card>
    </div>
  );
} 