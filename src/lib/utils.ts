import { format } from 'date-fns';


export function stripHtml(html: string | undefined): string {
  if (!html) return "";
  // This is a basic stripper. For more complex HTML, a robust library might be needed.
  // It first removes all tags, then decodes common HTML entities.
  let text = html.replace(/<[^>]+>/g, '');
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#039;/g, "'");
  return text.trim();
}

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'N/A';
  try {
    return format(new Date(dateString), 'MMMM d, yyyy');
  } catch {
    return dateString; // Fallback to original string if parsing fails
  }
}
