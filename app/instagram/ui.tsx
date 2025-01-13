"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainFeed from "./components/MainFeed";
import People from "./components/People";
import Discover from "./components/Discover";
import Chat from "./components/Chat";

export default function UI() {
  const [currentView, setCurrentView] = useState<'feed' | 'people' | 'discover' | 'chat'>('feed');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onViewChange={setCurrentView} currentView={currentView} />

      <main className="ml-64 flex-1 p-8">
        {currentView === 'feed' && <MainFeed />}
        {currentView === 'people' && <People />}
        {currentView === 'discover' && <Discover />}
        {currentView === 'chat' && <Chat />}
      </main>
    </div>
  );
}
