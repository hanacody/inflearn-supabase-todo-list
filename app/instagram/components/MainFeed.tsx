"use client";

import { Card, Typography, IconButton } from "@material-tailwind/react";
import { useMainPage } from "../actions/main.action";

export default function MainFeed() {
  const { posts, isLoading } = useMainPage();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {posts?.map((post) => (
        <Card key={post.id} className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <Typography className="font-semibold">{post.username}</Typography>
          </div>
          
          <div className="aspect-square bg-gray-100 rounded-lg mb-4"></div>
          
          <div className="flex gap-4 mb-2">
            <IconButton variant="text">
              <i className="far fa-heart"></i>
            </IconButton>
            <IconButton variant="text">
              <i className="far fa-comment"></i>
            </IconButton>
            <IconButton variant="text">
              <i className="far fa-paper-plane"></i>
            </IconButton>
          </div>
          
          <Typography className="text-sm">
            <span className="font-semibold">{post.username}</span> {post.caption}
          </Typography>
        </Card>
      ))}
    </div>
  );
} 