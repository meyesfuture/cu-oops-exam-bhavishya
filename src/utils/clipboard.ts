/**
 * Resilient Clipboard Utility with Fallbacks for Safe Exam Browser (SEB) & Embedded Browsers
 */

export async function copyToClipboard(text: string): Promise<boolean> {
  // Method 1: Modern Async Clipboard API
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('[Clipboard] navigator.clipboard.writeText failed, attempting execCommand fallback:', err);
    }
  }

  // Method 2: Synchronous document.execCommand('copy') fallback
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    // Prevent scrolling and visual displacement
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.style.opacity = '0';
    textArea.setAttribute('readonly', '');

    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, text.length);

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (fallbackErr) {
    console.error('[Clipboard] Both modern and legacy clipboard copy methods failed:', fallbackErr);
    return false;
  }
}

export async function readFromClipboard(): Promise<string | null> {
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.readText === 'function') {
    try {
      return await navigator.clipboard.readText();
    } catch (err) {
      console.warn('[Clipboard] navigator.clipboard.readText failed or permission denied:', err);
      return null;
    }
  }
  return null;
}
