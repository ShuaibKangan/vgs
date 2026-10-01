"use client";
// converts this page to a Client Component so we can use useState and useEffect hooks to fetch data.

import { useEffect, useState } from "react";
// imports React hooks for managing local component state and triggering data fetches on page load.

import Link from "next/link";
// imports next.js specific Link component for client-side navigation between pages. 
// This allows for faster page transitions without full page reloads.

import Image from "next/image";
// imports next.js built-in tool for image handling.

import { supabase } from "@/lib/supabaseClient";
// imports our pre-configured Supabase client instance to query database tables.

// Interface defining the shape of each store record from Supabase
interface Store {
    store_id: number;
    store_location: string;
    store_state: string;
}

export default function HomePage() {
    // defines the react component for homepage and allows next.js to render the page.

    const platforms = [
        { name: "Xbox", image: "/xbox.jpg" },
        { name: "Playstation", image: "/playstation.jpg" },
        { name: "Nintendo", image: "/nintendo.png" },
        { name: "PC", image: "/pc.png" }
    ]; // Creates an array of objects that holds the details for all the consoles.

    // State variable to store store locations returned from Supabase
    const [stores, setStores] = useState<Store[]>([]);

    // useEffect fetches the store list from Supabase when the component loads
    useEffect(() => {
        async function fetchStores() {
            const { data, error } = await supabase
                .from("stores")
                .select("store_id, store_location, store_state");

            if (error) {
                console.error("Error fetching stores:", error);
            } else if (data) {
                setStores(data);
            }
        }

        fetchStores();
    }, []);

    return (
        <main style={{ padding: "2rem", textAlign: "center", color: "#f8fafc" }}>
            {/* main and div applies layout rules into react using javascript objects. */}

            <h1 style={{ color: "#ffffff", fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                VideoGameSailers
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>
                We'll travel the seven seas to get you these hearty good deals.
            </p>

            <h2 style={{ color: "#38bdf8", marginTop: "2.5rem" }}>
                Which Platform are you interested in?
            </h2>

            <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginTop: "2rem", flexWrap: "wrap" }}>
                {/* display flex places the platforms in a row, rem stands for root em, which is a relative 
                unit of measurement in CSS that is based on the font size of the root element. */}

                {platforms.map((platform) => (
                    // loops through the platforms array and creates a card for each platform using the Link component 
                    // to navigate to the corresponding platform page.

                    <Link key={platform.name} href={`/platform/${platform.name}`}>
                        {/* key gives react a unique identifier for each platform card, which helps with 
                        efficient rendering and updating of the UI. */}

                        <div 
                            style={{ 
                                cursor: "pointer", 
                                border: "1px solid #334155", 
                                borderRadius: "12px", 
                                padding: "1rem", 
                                backgroundColor: "#1e293b", 
                                transition: "transform 0.2s ease, border-color 0.2s ease" 
                            }}
                        >
                            <img 
                                src={platform.image} 
                                alt={`${platform.name} logo`} 
                                width={150} 
                                height={150} 
                                style={{ borderRadius: "8px", objectFit: "cover" }}
                            />
                            <h3 style={{ color: "#f8fafc", marginTop: "0.75rem", marginBottom: "0" }}> 
                                {platform.name} 
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>

            <hr style={{ margin: "3rem 0", borderColor: "#334155", opacity: 0.5 }} />

            <h2 style={{ color: "#38bdf8" }}>Browse Inventory by Store Location</h2>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1.5rem", flexWrap: "wrap" }}>
                {/* Loops over stores fetched from Supabase and renders a link card for each store ID */}

                {stores.map((store) => (
                    <Link key={store.store_id} href={`/store/${store.store_id}`}>
                        <div
                            style={{
                                cursor: "pointer",
                                border: "1px solid #334155",
                                borderRadius: "8px",
                                padding: "1rem 1.5rem",
                                backgroundColor: "#1e293b",
                                minWidth: "160px"
                            }}
                        >
                            <strong style={{ color: "#f8fafc", fontSize: "1.05rem" }}>
                                {store.store_location}
                            </strong>
                            <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.9rem", color: "#94a3b8" }}>
                                {store.store_state}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

        </main>
    );
}