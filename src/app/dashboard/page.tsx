"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, FileText, Loader2 } from "lucide-react";
import Link from "next/link";
// import { useMutation, useQuery } from "convex/react";
// import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function DashboardPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  
  // Real Convex hooks (Uncomment when connected)
  // const documents = useQuery(api.documents.get);
  // const createDocument = useMutation(api.documents.create);

  // Mock Data
  const documents: any[] = [
    { _id: "1", title: "Project Proposal", updatedAt: Date.now() - 1000 * 60 * 60 * 2, content: "..." },
    { _id: "2", title: "Meeting Notes", updatedAt: Date.now() - 1000 * 60 * 60 * 24, content: "..." },
  ]; 

  const handleCreate = async () => {
    // const id = await createDocument({ title: "Untitled Document" });
    const id = "new-doc-id"; // Mock ID
    router.push(`/document/${id}`);
  };

  const filteredDocs = documents?.filter((doc: any) => 
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#1F1F1F]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-[#1F1F1F]">
             <div className="bg-[#1F1F1F] text-white p-1 rounded-md">
              <FileText className="w-5 h-5" />
            </div>
            TempoDocs
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-sm">
              U
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#1F1F1F]">Documents</h1>
          <Button onClick={handleCreate} className="bg-[#4F46E5] hover:bg-[#4338ca]">
            <Plus className="w-4 h-4 mr-2" /> New Document
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search documents..." 
            className="pl-10 bg-white border-gray-200 focus-visible:ring-[#4F46E5]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Grid */}
        {documents === undefined ? (
           <div className="flex justify-center py-20">
             <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
           </div>
        ) : filteredDocs?.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No documents found</h3>
            <p className="text-gray-500 mb-6">Create your first document to get started.</p>
            <Button onClick={handleCreate} variant="outline">
              Create Document
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredDocs?.map((doc: any) => (
              <Link href={`/document/${doc._id}`} key={doc._id}>
                <Card className="hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer h-full border-gray-200 bg-white">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg font-semibold truncate text-[#1F1F1F]">{doc.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2 pb-8">
                     <p className="text-sm text-gray-500 line-clamp-3">
                       {/* Preview content if available */}
                       {doc.content ? "Content preview..." : "Empty document"}
                     </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 text-xs text-gray-400 flex justify-between items-center border-t border-gray-50 mt-auto">
                    <span>{formatDistanceToNow(doc.updatedAt)} ago</span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
