import Redis from 'ioredis';
const kv = new Redis(process.env.REDIS_URL);

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const raw = await kv.get(`link:${id}`);
    if (!raw) return Response.json({ error: 'Link not found' }, { status: 404 });
    return Response.json(JSON.parse(raw));
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
