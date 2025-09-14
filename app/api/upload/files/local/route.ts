import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

export const config = {
  runtime: 'nodejs',
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate unique filename with original extension
    const ext = path.extname(file.name);
    const uniqueName = `${randomUUID()}${ext}`;

    // Define file path
    const filePath = path.join(process.cwd(), 'public', 'assets', 'files', uniqueName);

    // Ensure folder exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write file to local folder
    fs.writeFileSync(filePath, buffer);

    // Build public URL
    const fileURL = `/assets/files/${uniqueName}`;

    return NextResponse.json({ url: fileURL }, { status: 200 });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
