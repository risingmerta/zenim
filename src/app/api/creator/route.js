import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongoClient";

const CREATOR_COLLECTION = "creators";

/**
 * GET – Fetch creator monetization setup
 * Works for Web + Mobile (no localStorage needed)
 */
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const db = await connectDB();

    const creatorSetup = await db.collection(CREATOR_COLLECTION).findOne(
      { userId },
      {
        projection: {
          _id: 0,
          adsterraSmartlink: 1,
          creatorApiKey: 1,
          instagramId: 1,
          username: 1,
          native: 1, // 🟢 NEW: native bar support
        },
      }
    );

    return NextResponse.json({ setup: creatorSetup }, { status: 200 });
  } catch (err) {
    console.error("GET Creator Setup DB Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * POST – Save or Update monetization setup
 * Safe for React Native (localStorage is not needed)
 */
export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session?.user?.username) {
    return NextResponse.json(
      { message: "Unauthorized or missing session" },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  const username = session.user.username;

  try {
    const body = await request.json();

    const {
      adsterraSmartlink,
      creatorApiKey,
      instagramId,
      native = false, // 🟢 NEW: Support native bar toggle
    } = body;

    // Basic validation
    if (!adsterraSmartlink || !creatorApiKey) {
      return NextResponse.json(
        { message: "Smartlink and API Key are required." },
        { status: 400 }
      );
    }

    const db = await connectDB();

    const updateData = {
      $set: {
        userId,
        username,
        adsterraSmartlink,
        creatorApiKey,
        instagramId: instagramId || null,
        native, // 🟢 Save native bar preference
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    };

    const result = await db
      .collection(CREATOR_COLLECTION)
      .updateOne({ userId }, updateData, { upsert: true });

    return NextResponse.json(
      {
        message: "Monetization setup saved successfully.",
        setupStatus: result.upsertedId ? "created" : "updated",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("POST Creator Setup DB Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
