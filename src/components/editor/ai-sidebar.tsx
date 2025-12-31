import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery, useAction } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";

export function AISidebar({ documentId }: { documentId: string }) {
  const [messages, setMessages] = useState<{role: "user" | "ai", content: string}[]>([
    { role: "ai", content: "Hi! I'm your AI writing assistant. I can help you draft, edit, and refine your document using your knowledge base." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch knowledge items
  const knowledgeItems = useQuery("knowledge:getByDocument" as any, { documentId: documentId as Id<"documents"> });
  
  // Initialize action
  const generateAIResponse = useAction("ai:generate" as any);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Prepare context from knowledge items
      const knowledgeContext = knowledgeItems?.map(item => 
        `Title: ${item.title}\nContent: ${item.content}`
      ).join("\n\n") || "No knowledge attached.";

      const response = await generateAIResponse({
        prompt: userMessage,
        context: knowledgeContext
      });

      setMessages(prev => [...prev, { role: "ai", content: response }]);
    } catch (error) {
      console.error("Failed to generate AI response:", error);
      setMessages(prev => [...prev, { role: "ai", content: "Sorry, I encountered an error while processing your request." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-indigo-600" />
        <h2 className="font-semibold text-sm">AI Assistant</h2>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-lg p-3 text-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
               <div className="bg-gray-100 text-gray-800 rounded-lg p-3 text-sm flex items-center gap-2">
                 <Loader2 className="w-3 h-3 animate-spin" />
                 Processing...
               </div>
             </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI to write..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
          />
          <Button size="icon" onClick={handleSend} className="bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
