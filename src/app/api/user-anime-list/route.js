import { connectDB } from "@/lib/mongoClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { v4 as uuidv4 } from "uuid";

// Map status to type number and name
const mapStatusToType = {
  Watching: 1,
  "On-Hold": 2,
  "Plan to Watch": 3,
  Dropped: 4,
  Completed: 5,
};

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const { animeId, title, status, poster } = await req.json();
  const username = session.user.username;

  try {
    const db = await connectDB();
    const userListCol = db.collection("userAnimeLists");
    const linksCol = db.collection("links");

    // Update anime list
    await userListCol.updateOne(
      { username },
      {
        $set: {
          [`animeList.${animeId}`]: {
            id: animeId,
            title,
            poster,
            status,
            updatedAt: new Date(),
          },
        },
      },
      { upsert: true }
    );

    // Prepare link entry
    const type = mapStatusToType[status];
    if (type) {
      const linkName = status;
      const linkUrl = `http://localhost:3000/community/user/${username}/watch-list?type=${type}&refer=weebsSecret`;
      const linkId = uuidv4();
      const position = Date.now();

      // Check if link already exists for this user
      const existingUserLinks = await linksCol.findOne({ _id: username });
      const alreadyExists = existingUserLinks?.links?.some(
        (link) => link.url === linkUrl
      );

      if (!alreadyExists) {
        await linksCol.updateOne(
          { _id: username },
          {
            $push: {
              links: {
                id: linkId,
                name: linkName,
                url: linkUrl,
                visible: true,
                position,
              },
            },
            $setOnInsert: { design: "/done.jpeg" },
          },
          { upsert: true }
        );
      }
    }

    return new Response(JSON.stringify({ message: "Saved successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error saving anime/link:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}


export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const refer = searchParams.get("refer");
  const perPage = 24;
  const start = (page - 1) * perPage;
  const end = start + perPage;

  try {
    const db = await connectDB();
    const userCol = db.collection("userAnimeLists");
    const animeCol = db.collection("animeInfo");

    const userData = await userCol.findOne({
      username: refer ? refer : session.user.username,
    });

    if (!userData?.animeList) {
      return new Response(
        JSON.stringify({ anime: [], page, total: 0, totalPages: 0 }),
        { status: 200 }
      );
    }

    // Extract all anime IDs sorted by updatedAt
    const animeEntries = Object.entries(userData.animeList)
      .filter(([_, info]) => !type || info.status === type)
      .sort((a, b) => new Date(b[1].updatedAt) - new Date(a[1].updatedAt));

    const animeIds = animeEntries.map(([id]) => id);
    const total = animeIds.length;
    const totalPages = Math.ceil(total / perPage);

    // Slice only the required page
    const paginatedIds = animeIds.slice(start, end);

    if (!paginatedIds.length) {
      return new Response(
        JSON.stringify({ anime: [], page, total, totalPages }),
        { status: 200 }
      );
    }

    // Fetch anime docs
    const animeDocs = await animeCol
      .find({ _id: { $in: paginatedIds } })
      .project({
        _id: 1,
        "info.results.data.title": 1,
        "info.results.data.poster": 1,
        "info.results.data.adultContent": 1,
        "info.results.data.showType": 1,
        "info.results.data.japanese_title": 1,
        "info.results.data.animeInfo.tvInfo.sub": 1,
        "info.results.data.animeInfo.tvInfo.dub": 1,
        "info.results.data.animeInfo.tvInfo.rating": 1,
        "info.results.data.animeInfo.tvInfo.duration": 1,
      })
      .toArray();

    const animeMap = Object.fromEntries(animeDocs.map((doc) => [doc._id, doc]));

    const sortedAnime = paginatedIds
      .map((id) => {
        const doc = animeMap[id];
        if (!doc) return null;
        const data = doc.info?.results?.data || {};

        const tvInfo = {
          rating: data.animeInfo?.tvInfo?.rating || "",
          duration: data.animeInfo?.tvInfo?.duration || "N/A",
          showType: data.showType || "N/A",
        };

        // Add sub only if it exists and is not "0"
        if (data.animeInfo?.tvInfo?.sub && data.animeInfo.tvInfo.sub !== "0") {
          tvInfo.sub = data.animeInfo.tvInfo.sub;
        }

        // Add dub only if it exists and is not "0"
        if (data.animeInfo?.tvInfo?.dub && data.animeInfo.tvInfo.dub !== "0") {
          tvInfo.dub = data.animeInfo.tvInfo.dub;
        }

        return {
          id: doc._id,
          title: data.title || "",
          japanese_title: data.japanese_title || "",
          poster: data.poster || "",
          tvInfo,
          adultContent: data.adultContent || false,
        };
      })
      .filter(Boolean);

    return new Response(
      JSON.stringify({
        anime: sortedAnime,
        page,
        total,
        totalPages,
        hasNextPage: end < total,
      }),
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
