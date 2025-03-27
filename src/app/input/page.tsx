
"use client";
import { useRouter } from "next/navigation";

export default function InputPage() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/img.jpeg')" }}
    >
      {/* Blurred Container with Larger Size */}
      <div className="backdrop-blur-md bg-white/30 p-16 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-8 text-white">Choose Input Type</h1>

        {/* URL Input Button */}
        <button
          className="bg-white text-blue-600 px-8 py-4 rounded-lg mb-6 border border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
          onClick={() => router.push("/url-input")}
        >
          Single URL
        </button>
        <br />

        {/* File Upload Button */}
        <button
          className="bg-white text-blue-600 px-8 py-4 rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
          onClick={() => router.push("/file-upload")}
        >
          Upload File
        </button>
      </div>
    </div>
  );
}
