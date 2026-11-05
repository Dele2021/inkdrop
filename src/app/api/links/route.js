import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

// POST /api/links — create a new payment link
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, amount, isFixed, payoutAddress, payinAddress, allowSwap, description } = body;

    if (!title || !amount || !payoutAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const id = `ink-${Math.random().toString(36).substring(2, 8)}`;
    const link = {
      id,
      title,
      amount: parseFloat(amount),
      isFixed: isFixed ?? true,
      payoutAddress,
      payinAddress: payinAddress || null,
      allowSwap: allowSwap ?? false,
      description: description || '',
      createdAt: new Date().toISOString(),
    };

    await kv.set(`link:${id}`, link, { ex: 60 * 60 * 24 * 90 }); // 90 days TTL

    return NextResponse.json({ id, url: `${process.env.NEXT_PUBLIC_APP_URL}/pay/${id}` });
  } catch (err) {
    console.error('Create link error:', err);
    return NextResponse.json({ error: 'Failed to create link' }, { status: 500 });
  }
}

// GET /api/links?id=xxx — fetch a link
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const link = await kv.get(`link:${id}`);
  if (!link) return NextResponse.json({ error: 'Link not found' }, { status: 404 });

  return NextResponse.json(link);
}
