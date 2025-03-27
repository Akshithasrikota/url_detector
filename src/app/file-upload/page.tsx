


"use client";
import { useState } from "react";

export default function FileUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Drag & Drop Handlers
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  // Handle file submission
  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://127.0.0.1:8000/api/upload/", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data.prediction);
    setShowResult(true);
  };

  // Handle file download
  const handleDownload = () => {
    if (!file || !result) return;

    const fileContent = `File: ${file.name}\nPrediction: ${result}`;
    const blob = new Blob([fileContent], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "file_prediction.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Handle store (download from backend)
  const handleStore = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/download/?file_name=test_dataset_results.csv");
      if (!response.ok) {
        throw new Error("Failed to download file");
      }
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "test_dataset_results.csv";
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/img.jpeg')" }}
    >
      {/* Blurred Container */}
      <div className="backdrop-blur-md bg-white/30 p-16 rounded-lg shadow-lg w-full max-w-lg">
        {/* Title */}
        <h1 className="text-2xl font-bold text-white text-center mb-6">Upload File</h1>

        {/* Choose File Button */}
        <div className="flex justify-center mb-4">
          <label
            htmlFor="fileInput"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer transition-all duration-300"
          >
            Choose File
          </label>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
          {file && (
            <span className="ml-3 text-white font-semibold">{file.name}</span>
          )}
        </div>

        

        {/* Buttons */}
        <div className="flex flex-col space-y-4 mt-6">
          

          <button
            className="bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
            onClick={handleSubmit}
          >
            Submit File
          </button>
          <button
            className="bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
            onClick={handleStore}
          >
            Store the File
          </button>
        </div>

        {/* Display Result */}
        {showResult && result && (
          <p className="mt-6 text-center font-bold text-white">
            Prediction: {result}
          </p>
        )}
      </div>
    </div>
  );
}
