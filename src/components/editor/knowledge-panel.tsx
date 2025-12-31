import { Button } from "@/components/ui/button";
import { Plus, Trash2, FileText, ChevronDown, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function KnowledgePanel({ documentId }: { documentId: string }) {
  // Mock Data
  const [knowledgeItems, setKnowledgeItems] = useState([
    { id: "1", title: "Meeting Notes 2023", content: "..." },
    { id: "2", title: "Product Specs", content: "..." },
  ]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
        <h2 className="font-semibold text-sm uppercase tracking-wider text-gray-500">Knowledge</h2>
        <Dialog>
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
                <Input placeholder="e.g. Q3 Roadmap" />
              </div>
              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea placeholder="Paste text here..." className="min-h-[200px]" />
              </div>
              <Button className="w-full bg-[#4F46E5] hover:bg-[#4338ca]">Add to Knowledge Base</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {knowledgeItems.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 font-medium text-sm text-gray-800">
                  <FileText className="w-3.5 h-3.5 text-indigo-500" />
                  {item.title}
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">
                {item.content || "No content preview available."}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
