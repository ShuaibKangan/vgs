"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

// Interface for joined database response
interface StoreInventoryItem {
  platform: string;
  game_copies: number;
  stores: {
    store_id: number;
    store_location: string;
    store_state: string;
  };
  games: {
    game_id: number;
    game_name: string;
    game_price: number;
  };
}

export default function StorePage() {
  // Grabs the store ID parameter from URL (/store/[id])
  const params = useParams();
  const storeId = params.id;

  const [inventory, setInventory] = useState<StoreInventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStoreInventory() {
      setLoading(true);

      // Query stores_games table filtering by store_id and joining stores & games
      const { data, error } = await supabase
        .from("stores_games")
        .select(`
          platform,
          game_copies,
          stores (
            store_id,
            store_location,
            store_state
          ),
          games (
            game_id,
            game_name,
            game_price
          )
        `)
        .eq("store_id", storeId);

      if (error) {
        console.error("Error fetching store inventory:", error);
      } else if (data) {
        setInventory(data as unknown as StoreInventoryItem[]);
      }

      setLoading(false);
    }

    if (storeId) {
      fetchStoreInventory();
    }
  }, [storeId]);

  if (loading) {
    return (
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <p>Loading inventory for store #{storeId}...</p>
      </main>
    );
  }

  // Get store details from first item if available
  const storeDetails = inventory[0]?.stores;

  return (
    <main style={{ padding: "2rem" }}>
      {storeDetails ? (
        <h1>
          Store #{storeDetails.store_id}: {storeDetails.store_location} ({storeDetails.store_state})
        </h1>
      ) : (
        <h1>Store #{storeId} Inventory</h1>
      )}

      {inventory.length === 0 ? (
        <p>No inventory records found for this store.</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
          {inventory.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
              }}
            >
              <h3>{item.games.game_name}</h3>
              <p>Platform: {item.platform}</p>
              <p>Price: ${item.games.game_price}</p>
              <p>Copies in Stock: {item.game_copies}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}