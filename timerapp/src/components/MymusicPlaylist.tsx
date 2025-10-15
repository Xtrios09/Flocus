import React, { useState, useEffect } from "react";

const DEFAULT_PLAYLIST = "https://open.spotify.com/embed/playlist/37i9dQZF1DX8NTLI2TtZa6?utm_source=generator&theme=0";

export default function MymusicPlaylist() {
    const [playlistUrl, setPlaylistUrl] = useState<string>(DEFAULT_PLAYLIST);
    const [inputUrl, setInputUrl] = useState<string>("");

    useEffect(() => {
        const stored = localStorage.getItem("spotify-playlist-url");
        if (stored) setPlaylistUrl(stored);
    }, []);

    const handleSetPlaylist = () => {
        let url = inputUrl.trim();
        if (!url) return;
        // Convert open.spotify.com/playlist/... to embed URL if needed
        if (!url.includes("/embed/")) {
            url = url.replace("open.spotify.com/playlist/", "open.spotify.com/embed/playlist/");
        }
        setPlaylistUrl(url);
        localStorage.setItem("spotify-playlist-url", url);
        setInputUrl("");
    };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[70vh] bg-[#1e1e1e] rounded-[12px] p-4 border border-[#3c3c3c]">
            <div className="w-full flex flex-col sm:flex-row items-center gap-2 mb-4">
                <input
                    type="text"
                    className="flex-1 rounded px-3 py-2 bg-[#232323] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Paste your Spotify playlist URL here..."
                    value={inputUrl}
                    onChange={e => setInputUrl(e.target.value)}
                />
                <button
                    className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded transition"
                    onClick={handleSetPlaylist}
                >
                    Set Playlist
                </button>
            </div>
            <iframe
                data-testid="embed-iframe"
                className="w-full h-[85vh] rounded-[8px]"
                style={{ borderRadius: "8px" }}
                src={playlistUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            ></iframe>
        </div>
    );
}