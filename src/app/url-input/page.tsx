


"use client";
import { useState, useEffect } from "react";

export default function UrlInputPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);

  // Function to fetch the prediction result when the URL is entered
  useEffect(() => {
    const fetchResult = async () => {
      if (!url) return; // Prevent unnecessary API calls
      const response = await fetch("http://127.0.0.1:8000/api/predict/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setResult(data.prediction);
    };

    fetchResult();
  }, [url]);

  // Function to download the URL and result as a file
  const handleDownload = () => {
    const fileContent = `URL: ${url}\nPrediction: ${result}`;
    const blob = new Blob([fileContent], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "phishing_result.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/img.jpeg')" }}
    >
      {/* Blurred Container with Larger Size */}
      <div className="backdrop-blur-md bg-white/30 p-16 rounded-lg shadow-lg text-center max-w-3xl">
        <h1 className="text-2xl font-bold mb-8 text-white">Enter a URL</h1>

        {/* Input field for URL */}
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-3 mb-6 w-96 rounded-lg text-gray-900"
          placeholder="Enter URL here..."
        />

        {/* Buttons */}
        <div className="flex justify-center space-x-6">
          <button
            className="bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
            onClick={() => setShowResult(true)}
          >
            Display the Output
          </button>
          <button
            className="bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
            onClick={handleDownload}
          >
            Store the Output
          </button>
        </div>

        {/* Show result only when Display is clicked */}
        {showResult && result && (
          <p className="mt-6 font-bold text-white">Prediction: {result}</p>
        )}
      </div>
    </div>
  );
}

