"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPostById, type WordPressPost } from "../../../lib/wordpress";

export default function WatchPage() {
  const params = useParams();
  const id = (params?.id as string) || "";

  const [post, setPost] = useState<WordPressPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      try {
        const data = await getPostById(id);
        if (isMounted) {
          setPost(data);
        }
      } catch (error) {
        console.error("Error loading episode:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "80px 20px", textAlign: "center", minHeight: "60vh" }}>
        <h2 style={{ fontSize: "22px", color: "#0f172a" }}>Loading Episode...</h2>
        <p style={{ color: "#64748b", marginTop: "8px" }}>Loading video player...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ padding: "80px 20px", textAlign: "center", minHeight: "60vh" }}>
        <h2 style={{ fontSize: "24px", color: "#0f172a" }}>Episode Not Found</h2>
        <p style={{ color: "#64748b", marginTop: "10px" }}>
          The requested episode could not be found.
        </p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1
          style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", marginBottom: "20px" }}
          dangerouslySetInnerHTML={{ __html: post.title?.rendered ?? "" }}
        />

        {/* Video Player Container */}
        <div
          style={{
            background: "#000000",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
          dangerouslySetInnerHTML={{ __html: post.content?.rendered ?? "" }}
        />

        <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ color: "#0f172a", marginBottom: "8px" }}>Episode Info</h3>
          <p style={{ color: "#64748b", fontSize: "14px" }}>
            Released: {new Date(post.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}