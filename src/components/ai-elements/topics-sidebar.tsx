// components/topics-sidebar.tsx
'use client';
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"; // shadcn/ui

type Topic = { id: string; title: string; updatedAt: string };

export function TopicsSidebar({ topics }: { topics: Topic[] }) {
  return (
    <aside className="w-72 border-r h-screen flex flex-col">
      <div className="p-3 border-b flex gap-2">
        <Button asChild><Link href="/new">New chat</Link></Button>
      </div>
      <ScrollArea className="flex-1">
        <ul className="p-2">
          {topics.map(t => (
            <li key={t.id} className="px-2 py-1 rounded hover:bg-muted">
              <Link href={`/chat/${t.id}`} className="block">
                <div className="truncate font-medium">{t.title}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(t.updatedAt).toLocaleString()}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </aside>
  );
}