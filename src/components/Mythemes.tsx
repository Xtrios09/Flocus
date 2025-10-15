import React, { useState } from "react";

type Theme = {
    name: string;
    palette: string[];
};

const themes: Theme[] = [
    {
        name: "Ocean",
        palette: ["#0077be", "#00aaff", "#00e5ee", "#005f73", "#0a9396"],
    },
    {
        name: "Sunset",
        palette: ["#ff5e62", "#ff9966", "#ffcc70", "#f76d6d", "#f9d423"],
    },
    {
        name: "Forest",
        palette: ["#2e8b57", "#3cb371", "#228b22", "#6b8e23", "#a9dfbf"],
    },
    {
        name: "Lavender",
        palette: ["#b57edc", "#c3aed6", "#d5c6e0", "#e0bbe4", "#957dad"],
    },
    {
        name: "Monochrome",
        palette: ["#22223b", "#4a4e69", "#9a8c98", "#c9ada7", "#f2e9e4"],
    },
];

const MyThemes: React.FC = () => {
    const [currentTheme, setCurrentTheme] = useState(0);

    const handleThemeChange = (index: number) => {
        setCurrentTheme(index);
        // Optionally, you can apply the theme globally here
    };

    return (
        <div>
            <h2>Choose a Theme</h2>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                {themes.map((theme, idx) => (
                    <button
                        key={theme.name}
                        onClick={() => handleThemeChange(idx)}
                        style={{
                            padding: "0.5rem 1rem",
                            border: currentTheme === idx ? "2px solid #333" : "1px solid #ccc",
                            background: currentTheme === idx ? "#eee" : "#fff",
                            cursor: "pointer",
                        }}
                    >
                        {theme.name}
                    </button>
                ))}
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
                {themes[currentTheme].palette.map((color, idx) => (
                    <div
                        key={idx}
                        style={{
                            width: 40,
                            height: 40,
                            background: color,
                            borderRadius: "50%",
                            border: "1px solid #ccc",
                        }}
                        title={color}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyThemes;