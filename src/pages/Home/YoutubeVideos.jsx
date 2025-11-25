import { useState, useEffect } from "react";
import { db } from "/src/config/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Slider from "react-slick";

// Slider CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const YoutubeVideos = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch videos
    useEffect(() => {
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
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        return (
            <div className="py-12 bg-gray-50 text-center">
                <p className="text-gray-600">Loading videos...</p>
            </div>
        );
    }

    if (videos.length === 0) return null;

    // Slider Settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } }
        ]
    };

    return (
        <div className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Watch Our Latest Videos
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Learn more about sleep health and our products.
                    </p>
                </div>

                {/* Slider */}
                <Slider {...settings}>
                    {videos.map((video) => (
                        <div key={video.id} className="px-3">
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                                <div className="relative pb-[56.25%] h-0">
                                    <iframe
                                        className="absolute top-0 left-0 w-full h-full"
                                        src={`https://www.youtube.com/embed/${video.videoId}`}
                                        title={video.videoId}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default YoutubeVideos;
