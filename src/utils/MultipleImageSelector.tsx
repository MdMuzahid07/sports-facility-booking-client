import { X } from "lucide-react";
import React, { useState, useEffect } from "react";

interface ImageUploaderProps {
    onImagesSelected: (files: File[]) => void; // Pass selected images to parent
    accept?: string; // Accepted file types
    multiple?: boolean; // Allow multiple files
    maxFiles?: number; // Limit number of files
    style?: string;
}

const MultipleImageSelector: React.FC<ImageUploaderProps> = ({
    onImagesSelected,
    accept = "image/png, image/jpeg",
    multiple = true,
    maxFiles = 5,
    style
}) => {
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // To keep track of selected files

    // Cleanup URLs to prevent memory leaks
    useEffect(() => {
        return () => {
            previewUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [previewUrls]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) {
            const fileArray = Array.from(files).slice(0, maxFiles); // Limit files
            setSelectedFiles((prev) => [...prev, ...fileArray]); // Update the selected files state
            onImagesSelected(fileArray); // Send files to parent

            // Generate and store preview URLs
            const urls = fileArray.map((file) => URL.createObjectURL(file));
            setPreviewUrls((prev) => [...prev, ...urls]);
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedPreviewUrls = previewUrls.filter((_, i) => i !== index);
        const updatedSelectedFiles = selectedFiles.filter((_, i) => i !== index);

        setPreviewUrls(updatedPreviewUrls);
        setSelectedFiles(updatedSelectedFiles); // Remove the file from the selected files array
        onImagesSelected(updatedSelectedFiles); // Send the updated list of files to parent

        // Revoke the object URL to prevent memory leaks
        URL.revokeObjectURL(previewUrls[index]);
    };

    return (
        <div className="w-full">
            {/* File Input */}
            <label
                htmlFor="file-input"
                className={`cursor-pointer flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-300 ${style}`}
            >
                <span className="text-gray-500 text-sm">Click to browse or select files</span>
                <input
                    id="file-input"
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleImageChange}
                    className="hidden"
                />
            </label>

            {/* Image Previews */}
            {previewUrls?.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {previewUrls?.map((url, index) => (
                        <div key={index} className="relative">
                            <img
                                src={url}
                                alt={`Preview ${index}`}
                                className="w-full h-32 object-cover rounded-lg border"
                            />
                            <button
                                title="Click to remove image"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-2 right-2 w-8 h-8 bg-white hover:bg-red-500 hover:text-white flex items-center justify-center rounded-full "
                            >
                                <X />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultipleImageSelector;
