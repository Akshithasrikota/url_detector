
"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col justify-between items-center min-h-screen bg-cover bg-center p-10"
      style={{ backgroundImage: "url('/img.jpeg')" }}
    >
      {/* Blurred Container */}
      <div className="backdrop-blur-md bg-white/30 p-8 rounded-lg shadow-lg w-full max-w-3xl">
        {/* Department and Institute Details */}
        <h1 className="text-4xl font-bold text-center text-white mb-4">Department of Information Technology</h1>
        <h2 className="text-2xl text-center text-white mb-2">National Institute of Technology, Surathkal - 575025</h2>
        <h3 className="text-xl text-center text-white mb-6">Information Assurance and Security (IT352) Course Project</h3>
        
        {/* Project Title and Student Details */}
        <p className="text-xl text-center text-white mb-2"><strong>Title:</strong> Phishing URL Detector</p>
        <p className="text-xl text-center text-white mb-2">Carried out by</p>
        <p className="text-lg text-center text-white mb-1">Kota Akshitha Sri (221IT039)</p>
        <p className="text-lg text-center text-white mb-4">Kankatala Mahitha (221IT036)</p>
        <p className="text-lg text-center text-white mb-8">During Academic Session: January-April 2025</p>
        
        {/* Input Button */}
        <button
          className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out w-full"
          onClick={() => router.push("/input")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}



