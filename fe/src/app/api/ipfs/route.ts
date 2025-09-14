import { NextRequest, NextResponse } from 'next/server';

// POST /api/ipfs
// Accepts multipart/form-data with a single field "file" and uploads it to Pinata.
export async function POST(req: NextRequest) {
  try {
    const jwt = process.env.PINATA_JWT;
    if (!jwt) {
      return NextResponse.json({ error: 'Missing server env PINATA_JWT' }, { status: 500 });
    }

    const form = await req.formData();
    const file = form.get('file');

    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    }

    // Forward to Pinata pinFileToIPFS
    const forward = new FormData();
    forward.append('file', file, (file as any).name || 'upload');

    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: forward,
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `Pinata error: ${res.status} ${text}` }, { status: 502 });
    }

    const data = await res.json();
    const hash = data.IpfsHash as string; // Pinata returns IpfsHash
    const url = `https://gateway.pinata.cloud/ipfs/${hash}`;

    return NextResponse.json({ cid: hash, url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Upload failed' }, { status: 500 });
  }
}
