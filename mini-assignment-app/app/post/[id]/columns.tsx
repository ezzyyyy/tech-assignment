'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Card } from '@/components/ui/card';

export type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

export type Post = {
  id: number;
  postId: number;
  comments: Comment[];
  email: string;
  name: string;
  mainPost: string;
};

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: 'postId',
    header: 'ID',
  },
  {
    accessorKey: 'email',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 mt-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs font-semibold text-gray-600">{row.original.name}</p>
            <p className="text-xs text-gray-600">{row.original.email}</p>
          </div>
        </div>
      );
    },
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'mainPost',
    header: 'Post',
    cell: ({ row }) => {
      return (
        <Collapsible key={row.original.postId}>
          <CollapsibleTrigger style={{ textAlign: 'left' }}>
            <div>
              <p>{row.original.mainPost}</p>
              <div className="mt-2 w-[130px] text-center text-xs p-2 border rounded-md cursor-pointer border-gray-200 hover:border-gray-400">
                View comments ({row.original.comments.length})
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <>
              <p className="mt-4 mb-2 text-gray-600">Comments</p>
              {row.original.comments.map((c: Comment) => (
                <Card key={row.original.postId + '-' + c.id} className="p-2 mb-2">
                  <p>{c.body}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-semibold text-gray-600">{c.name}</p>
                      <p className="text-xs text-gray-600">{c.email}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </>
          </CollapsibleContent>
        </Collapsible>
      );
    },
  },
];
