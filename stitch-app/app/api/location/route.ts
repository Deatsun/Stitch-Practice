export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") ?? "1";

    const res = await fetch(
      `https://rickandmortyapi.com/api/location?page=${page}`
    );
    const data = await res.json();

    return Response.json(data);
  } catch {
    return Response.json(
      { error: "Failed to fetch location" },
      { status: 500 }
    );
  }
}