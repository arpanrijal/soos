import React from 'react';

const format = (file) => {
    const { mimetype, fileURL, filename } = file;
    if (mimetype.startsWith("audio/")) {
        return (
            <div className="flex flex-col justify-between h-48 p-4 bg-gray-50 rounded-xl">

                <div className="flex flex-col items-center">
                    <svg
                        className="w-12 h-12 text-purple-500 mb-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 19V6l12-2v13"
                        />
                    </svg>

                    <span className="text-sm text-gray-700 font-medium">
                        {filename.endsWith(".mp3")
                            ? "MP3 Audio"
                            : filename.endsWith(".wav")
                                ? "WAV Audio"
                                : filename.endsWith(".aac")
                                    ? "AAC Audio"
                                    : "Audio File"}
                    </span>
                </div>

                <audio controls className="w-full h-10">
                    <source src={fileURL} type={mimetype} />
                </audio>
            </div>
        );
    } else

        if (mimetype.startsWith("video/")) {
            return (
                <video controls className="w-full max-w-7xl h-48 rounded-xl bg-black">
                    <source src={fileURL} type={mimetype} />
                </video>
            );
        } else

            if (mimetype === "application/pdf") {
                return (
                    <div className="relative max-w-7xl">
                        <img
                            src={fileURL}
                            alt={filename}
                            className="w-full h-48 object-cover rounded-xl"
                        />
                        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            PDF
                        </span>
                    </div>
                );
            } else

                if (
                    mimetype.includes("word") ||
                    mimetype.includes("presentation") ||
                    mimetype.includes("sheet") ||
                    filename.endsWith(".doc") ||
                    filename.endsWith(".docx") ||
                    filename.endsWith(".ppt") ||
                    filename.endsWith(".pptx") ||
                    filename.endsWith(".xls") ||
                    filename.endsWith(".xlsx") ||
                    filename.endsWith(".csv")
                ) {
                    return (
                        <div className="flex max-w-7xl flex-col items-center justify-center h-48 bg-gray-50 rounded-xl">
                            <svg className="w-14 h-14 text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-sm text-gray-600 font-medium">
                                {filename.endsWith(".ppt") || filename.endsWith(".pptx")
                                    ? "Presentation"
                                    : filename.endsWith(".xls") || filename.endsWith(".xlsx")
                                        ? "Excel Spreadsheet"
                                        : filename.endsWith(".csv")
                                            ? "CSV File"
                                            : filename.endsWith(".doc") || filename.endsWith(".docx")
                                                ? "Word Document"
                                                : mimetype.includes("presentation")
                                                    ? "Presentation"
                                                    : mimetype.includes("sheet")
                                                        ? "Spreadsheet"
                                                        : "Document"}
                            </span>
                        </div>
                    );
                } else

                    if (filename.endsWith(".apk")) {
                        return (
                            <div className="flex max-w-7xl flex-col items-center justify-center h-48 bg-gray-50 rounded-xl">
                                <svg className="w-14 h-14 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                        d="M12 2v4m-4 4h8m-6 6h4" />
                                </svg>
                                <span className="text-sm text-gray-600 font-medium">Android App</span>
                            </div>
                        );
                    } else

                        if (mimetype.startsWith("image/")) {
                            return (
                                <img
                                    src={fileURL}
                                    alt={filename}
                                    className="w-full max-w-7xl h-48 object-cover rounded-xl"
                                />
                            );
                        }

    return (
        <div className="flex max-w-7xl flex-col items-center justify-center h-48 bg-gray-50 rounded-xl">
            <svg className="w-16 h-16 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm text-gray-600 font-medium">File</span>
        </div>
    );
};

const FormatSelector = (file) => {
    return format(file);
};

export default FormatSelector;
