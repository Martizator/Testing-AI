"use client";

import { useParams } from "next/navigation";
import { TopBar } from "@/components/editor/top-bar";
import { KnowledgePanel } from "@/components/editor/knowledge-panel";
import { AISidebar } from "@/components/editor/ai-sidebar";
import { Editor } from "@/components/editor/editor";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function DocumentPage() {
  const params = useParams();
  const documentId = params.id as string; 

  // Mock Data
  const document = { title: "Project Proposal", content: "<p>Hello World</p>" };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <TopBar document={document} />
      
      <div className="flex-1 flex overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="border-r bg-[#FAFAF9]">
            <KnowledgePanel documentId={documentId} />
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={60}>
            <div className="h-full overflow-y-auto bg-white flex justify-center">
              <div className="w-full max-w-3xl py-12 px-8 min-h-screen">
                 <Editor initialContent={document.content} />
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={20} minSize={15} maxSize={35} className="border-l bg-[#FAFAF9]">
            <AISidebar documentId={documentId} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
