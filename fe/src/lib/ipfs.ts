export async function uploadToIPFS(file: File): Promise<string> {
  const token = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN;
  // Prefer Web3.Storage if token is available
  if (token) {
    try {
      const res = await fetch('https://api.web3.storage/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/octet-stream',
        },
        body: file,
      });
      if (!res.ok) {
        const text = await res.text();
        // Fall through to Pinata on 5xx or maintenance responses
        throw new Error(`web3.storage_error:${res.status}:${text}`);
      }
      const data = await res.json();
      const cid: string = data.cid;
      return `https://ipfs.io/ipfs/${cid}`;
    } catch (err: any) {
      // Attempt Pinata fallback on any failure
      console.warn('Web3.Storage upload failed, attempting Pinata fallback', err?.message || err);
      const pinataUrl = await uploadViaPinata(file);
      return pinataUrl;
    }
  }

  // Fallback: use local API route backed by Pinata (secure server-side JWT)
  return await uploadViaPinata(file);
}

async function uploadViaPinata(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file, file.name);
  const res = await fetch('/api/ipfs', {
    method: 'POST',
    body: form,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`IPFS upload (Pinata) failed: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data.url as string;
}
