"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient";

// interface defines the shape of the joined database query.
interface gamePlatformItem {
    platform: string;
    game_copies: number;
    games: {
        game_name: string;
        game_price: number;
        game_id: number;
    };
}

export default function Platformpage() {
    // grabs the id value from the url path, so xbox, playstation, etc.
    const params = useParams();
    const platformName = params.id;

    const [games, setGames] = useState<gamePlatformItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        async function fetchPlatformGames() {
            setLoading(true);

            //Query stores the games table and joins games table onto games id.
            const {data, error} = await supabase
            .from("stores_games")
            .select(` platform, game_copies, games(game_id, game_name,game_price) `)
            .ilike("platform", `${platformName}`); //ilike is a case-insensitive match for the platform name.

            if (error) {
                console.error("Error fetching platform games:", error);
            } else if (data) {
                setGames(data as unknown as gamePlatformItem[]);
            }

            setLoading(false);
        }

        if (platformName) {
            fetchPlatformGames();
        }

    }, [platformName]);

    //shows the amazing loading >:(.
    if (loading) {
        return (
        <main style={{ padding: "2rem", textAlign: "center" }}>
            <p>Loading games for {platformName}...</p>
        </main>
        );
    }

    return (
        <main style={{ padding: "2rem"}}>

            <h1>{platformName} Games:</h1>

            { games.length === 0 ? ( <p>No games found for this platform.</p>) : 
            ( <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
                {games.map((item, index) => (
                    <div key={index} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem" }}>
                        <h3>{item.games.game_name}</h3>
                        <p>Price: ${item.games.game_price}</p>
                        <p>Copies Available: {item.game_copies}</p>
                        </div>
                ))}
                </div>)
            }
            
            
        </main>
    );
}
