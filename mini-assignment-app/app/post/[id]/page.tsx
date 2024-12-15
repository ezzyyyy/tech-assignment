'use client';
import { useEffect, useState } from 'react';
import { Post, columns } from './columns';
import { DataTable } from './data-table';

import { useParams } from 'next/navigation';
import { toast, Toaster } from 'sonner';

export default function DemoPage() {
  const { id } = useParams() as { id: string };
  const [posts, setPost] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (id) {
      fetchPosts(id, 0);
    }
  }, [id]);

  const fetchPosts = (id: string, page: number) => {
    try {
      fetch(`http://localhost:8000/post?id=${id}&page=${page}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPost(data.posts);
          setPage(data.currentPage);
          setTotal(data.totalPages);
        });
    } catch (err) {
      toast.error(JSON.stringify(err));
    }
  };

  const getNext = () => {
    if (id) {
      fetchPosts(id, page + 1);
    }
  };

  const getPrev = () => {
    if (id) {
      fetchPosts(id, page - 1);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Toaster richColors />
      {id && (
        <>
          <p>Post ID: {id}</p>
          <p>
            Page: {page} of {total}
          </p>
          <DataTable columns={columns} data={posts} getNext={getNext} getPrev={getPrev} page={page} total={total} />
        </>
      )}
    </div>
  );
}
