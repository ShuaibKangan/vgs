"use client"

import { useParams } from "next/navigation"

export default function Platformpage() {
    const params = useParams();

    return (
        <main>
            <h1>Game Platform</h1>
            <p>{params.id} page.</p>
            
            
        </main>
    );
}
