// Contact / Vendor / Career form → Google Sheets (Apps Script web app).
//
// Uses mode:'no-cors' — the browser can't read the response, so a resolved
// fetch just means the request left the machine. Good enough for a contact
// form; a rejected fetch (offline) surfaces as an error.
//
// If VITE_SHEETS_WEBHOOK_URL is not set the submit is a no-op and the form
// still shows its success screen (dev / not-configured-yet behaviour).

export type ContactFormType = 'inquiry' | 'vendor' | 'career';

const WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL as string | undefined;
const TOKEN = (import.meta.env.VITE_SHEETS_TOKEN as string | undefined) ?? '';

export const sheetsBridgeConfigured = Boolean(WEBHOOK_URL);

const MAX_RESUME_BYTES = 5 * 1024 * 1024;

export async function fileToBase64(
  file: File,
): Promise<{ resumeBase64: string; resumeName: string; resumeMimeType: string }> {
  if (file.size > MAX_RESUME_BYTES) {
    throw new Error('Resume is larger than 5 MB — please upload a smaller file.');
  }
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Could not read the selected resume file.'));
    reader.readAsDataURL(file);
  });
  return {
    resumeBase64: dataUrl.split(',')[1] ?? '',
    resumeName: file.name,
    resumeMimeType: file.type || 'application/octet-stream',
  };
}

export async function submitContactForm(
  formType: ContactFormType,
  payload: Record<string, unknown>,
): Promise<void> {
  if (!WEBHOOK_URL) return;
  await fetch(WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ formType, token: TOKEN, ...payload }),
  });
}
