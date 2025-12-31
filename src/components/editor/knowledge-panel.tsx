import { Button } from "@/components/ui/button";
import { Plus, Trash2, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";

export function KnowledgePanel({ documentId }: { documentId: string }) {
  // Real Data
  const shouldSkip = documentId === "new-doc-id";
  const knowledgeItems = useQuery(shouldSkip ? "skip" : "knowledge:getByDocument" as any, shouldSkip ? "skip" : { documentId: documentId as Id<"documents"> });
  const createKnowledge = useMutation("knowledge:create" as any);
  const removeKnowledge = useMutation("knowledge:remove" as any);

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = async () => {
    if (!title.trim() || !content.trim()) return;
    setIsSubmitting(true);
    try {
      await createKnowledge({ 
        documentId: documentId as Id<"documents">, 
        title, 
        content 
      });
      setIsOpen(false);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Failed to add knowledge:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await removeKnowledge({ knowledgeId: id as Id<"knowledge"> });
    } catch (error) {
      console.error("Failed to remove knowledge:", error);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
        <h2 className="font-semibold text-sm uppercase tracking-wider text-gray-500">Knowledge</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Knowledge</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input 
                  placeholder="e.g. Q3 Roadmap" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea 
                  placeholder="Paste text here..." 
                  className="min-h-[200px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <Button 
                className="w-full bg-[#4F46E5] hover:bg-[#4338ca]" 
                onClick={handleAdd}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add to Knowledge Base"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {!knowledgeItems ? (
             <p className="text-sm text-gray-400 text-center py-4">Loading knowledge...</p>
          ) : knowledgeItems.length === 0 ? (
             <p className="text-sm text-gray-400 text-center py-4">No knowledge attached.</p>
          ) : (
            knowledgeItems.map((item: any) => (
              <div key={item._id} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-medium text-sm text-gray-800">
                    <FileText className="w-3.5 h-3.5 text-indigo-500" />
                    {item.title}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                    onClick={() => handleDelete(item._id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {item.content}
                </p>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
