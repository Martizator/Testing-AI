import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TopBar({ document }: { document: any }) {
  return (
    <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white shrink-0">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <Input 
          value={document?.title || ""} 
          className="border-none shadow-none text-lg font-semibold h-8 px-2 focus-visible:ring-0 w-[300px]"
          readOnly 
        />
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
         <span className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium">
           <Save className="w-3 h-3" /> Saved
         </span>
         <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold">
           U
         </div>
      </div>
    </div>
  );
}
