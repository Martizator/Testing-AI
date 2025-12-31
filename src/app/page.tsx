
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Sparkles, Database } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#1F1F1F] font-sans selection:bg-[#4F46E5] selection:text-white">
      {/* Navigation */}
      <nav className="container mx-auto flex items-center justify-between py-6 px-4">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="bg-[#1F1F1F] text-white p-1 rounded-md">
            <FileText className="w-5 h-5" />
          </div>
          TempoDocs
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth" className="text-sm font-medium hover:text-[#4F46E5] transition-colors">
            Log in
          </Link>
          <Link href="/auth">
            <Button className="bg-[#1F1F1F] hover:bg-[#333] text-white rounded-lg">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight mb-6 text-[#1F1F1F]">
          Write smarter with <span className="text-[#4F46E5]">integrated knowledge</span>.
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The collaborative document editor that empowers writers by allowing them to attach contextual knowledge sources to their documents.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth">
            <Button size="lg" className="bg-[#4F46E5] hover:bg-[#4338ca] text-white h-12 px-8 rounded-lg text-lg">
              Start Writing Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="h-12 px-8 rounded-lg text-lg border-gray-300 text-gray-700 hover:bg-gray-100">
            View Demo
          </Button>
        </div>
      </section>

      {/* Visual Demo Placeholder */}
      <section className="container mx-auto px-4 py-12">
        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-white max-w-5xl mx-auto aspect-video flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white/50" />
          <div className="text-gray-400 font-medium z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-10 h-10 text-gray-300" />
            </div>
            Editor Preview
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-3">Knowledge Integration</h3>
            <p className="text-gray-600 leading-relaxed">
              Attach any text source to your document. Your AI assistant learns from it instantly.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-3">AI Writing Assistant</h3>
            <p className="text-gray-600 leading-relaxed">
              Generate content, summarize, and refine text using your custom knowledge base.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-3">Rich Text Editing</h3>
            <p className="text-gray-600 leading-relaxed">
              A distraction-free editor with all the formatting tools you need to stay focused.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div className="mb-4 md:mb-0">
            &copy; 2024 TempoDocs. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#1F1F1F]">Privacy</a>
            <a href="#" className="hover:text-[#1F1F1F]">Terms</a>
            <a href="#" className="hover:text-[#1F1F1F]">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
