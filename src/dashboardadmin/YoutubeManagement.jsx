import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    serverTimestamp,
    query,
    orderBy,
} from "firebase/firestore";
import { Video, Plus, Trash2 } from "lucide-react";

// Utility: Extract YouTube video ID from URL
const extractVideoId = (url) => {
    const patterns = [
       
        /youtube\.com\/watch\?v=([^&\s]+)/,             // normal video
        /youtu\.be\/([^&\s]+)/,                         // youtu.be
        /youtube\.com\/embed\/([^&\s]+)/,               // embed
        /youtube\.com\/shorts\/([^&\s]+)/,              // shorts
        /youtube\.com\/live\/([^&\s]+)/,  
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    return null;
};

// Utility: Format date/time for Asia/Kolkata timezone
const formatDateTime = (timestamp) => {
    if (!timestamp) return "Just now";

    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(date);
};

const YoutubeManagement = () => {
    const [videos, setVideos] = useState([]);
    const [newVideoUrl, setNewVideoUrl] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch all videos from Firestore
    const fetchVideos = async () => {
        try {
            const q = query(collection(db, "youtubeVideos"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const videoList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setVideos(videoList);
        } catch (error) {
            console.error("Error fetching videos:", error);
            alert("Failed to fetch videos");
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    // Add new video
    const handleAddVideo = async () => {
        if (!newVideoUrl.trim()) {
            alert("Please enter a YouTube URL");
            return;
        }

        const videoId = extractVideoId(newVideoUrl);
        if (!videoId) {
            alert("Invalid YouTube URL. Please use a valid YouTube link.");
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(db, "youtubeVideos"), {
                url: newVideoUrl,
                videoId: videoId,
                createdAt: serverTimestamp(),
            });

            alert("✅ Video added successfully!");
            setNewVideoUrl("");
            fetchVideos();
        } catch (error) {
            console.error("Error adding video:", error);
            alert("❌ Failed to add video: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete video
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this video?")) return;

        try {
            await deleteDoc(doc(db, "youtubeVideos", id));
            alert("✅ Video deleted successfully!");
            fetchVideos();
        } catch (error) {
            console.error("Error deleting video:", error);
            alert("❌ Failed to delete video");
        }
    };

    return (
        <div className="p-8  min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <Video className="w-8 h-8 text-red-600" />
                        YouTube Video Management
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Add YouTube video URLs to display on the homepage
                    </p>
                </div>

                {/* Add New Video */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4
                     flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Add New Video
                    </h2>

                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Paste YouTube URL (e.g., https://www.youtube.com/watch?v=...)"
                            value={newVideoUrl}
                            onChange={(e) => setNewVideoUrl(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddVideo()}
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2
                             focus:ring-red-500 focus:border-transparent"
                        />
                        <button
                            onClick={handleAddVideo}
                            disabled={loading}
                            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2 disabled:opacity-50"
                        >
                            <Plus className="w-5 h-5" />
                            {loading ? "Adding..." : "Add Video"}
                        </button>
                    </div>
                </div>

                {/* Video List */}
                <div className="bg-white  p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Uploaded Videos ({videos.length})
                    </h2>

                    {videos.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">
                            No videos added yet. Paste a YouTube URL above to get started!
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {videos.map((video) => (
                                <div
                                    key={video.id}
                                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition group"
                                >
                                    {/* Video Thumbnail */}
                                    <div className="relative">
                                        <img
                                            src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                                            alt="Video thumbnail"
                                            className="w-full h-48 object-cover"
                                            onError={(e) => {
                                                e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                                            }}
                                        />
                                        {/* Date/Time Overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs px-3 py-2">
                                            {formatDateTime(video.createdAt)}
                                        </div>
                                    </div>

                                    {/* Video Info */}
                                    <div className="p-4">
                                        <a
                                            href={video.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:underline block truncate mb-3"
                                        >
                                            {video.url}
                                        </a>

                                        <button
                                            onClick={() => handleDelete(video.id)}
                                            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default YoutubeManagement;
