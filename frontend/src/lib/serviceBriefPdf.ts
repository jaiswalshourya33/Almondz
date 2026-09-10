import { Service } from '../data/services';

// Brand palette (mirrors the site's Tailwind tokens used across the Services page)
const NAVY = '#2A4C72';
const GOLD = '#A49050';
const GOLD_LIGHT = '#D6C489';
const INK = '#1F2933';
const MUTED = '#6B7280';
const HAIRLINE = '#D8DBDF';
const PANEL = '#F1F3F5';
const WHITE = '#FFFFFF';

/**
 * Build a cleanly formatted, multi-page A4 "Service Brief" PDF for a single
 * practice division and trigger a direct browser download (no print dialog).
 *
 * The document is laid out programmatically in millimetres so the text stays
 * selectable and crisp: a navy brand band on page 1, the division title in a
 * serif face, then Overview / Key Deliverables / How We Deliver It sections,
 * with a running footer (page numbers + generation date) stamped on every page.
 *
 * jsPDF (~360 kB) is code-split via dynamic import so it is only fetched the
 * first time a visitor actually downloads a brief.
 */
export async function downloadServiceBriefPdf(service: Service): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });

  const pageW = doc.internal.pageSize.getWidth(); // 210
  const pageH = doc.internal.pageSize.getHeight(); // 297
  const margin = 18;
  const contentW = pageW - margin * 2;
  const footerY = pageH - 15;
  const maxY = footerY - 6; // lowest baseline body text may use before a page break

  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  let y = 0;

  const continuationHeader = () => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(GOLD);
    doc.text('AGICL  ·  SERVICE BRIEF', margin, margin - 5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(MUTED);
    doc.text(service.title.toUpperCase(), pageW - margin, margin - 5, {
      align: 'right',
      maxWidth: contentW * 0.62,
    });

    doc.setDrawColor(HAIRLINE);
    doc.setLineWidth(0.3);
    doc.line(margin, margin - 2, pageW - margin, margin - 2);
  };

  const ensureSpace = (needed: number) => {
    if (y + needed > maxY) {
      doc.addPage();
      y = margin + 4;
      continuationHeader();
    }
  };

  const sectionHeading = (label: string) => {
    ensureSpace(14);
    y += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(NAVY);
    doc.text(label.toUpperCase(), margin, y);
    y += 2.4;
    doc.setDrawColor(GOLD);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageW - margin, y);
    y += 6;
  };

  const paragraph = (
    text: string,
    opts: { size?: number; color?: string; lineH?: number; gap?: number; style?: 'normal' | 'italic' } = {},
  ) => {
    const { size = 10, color = INK, lineH = 5.4, gap = 4, style = 'normal' } = opts;
    doc.setFont('helvetica', style);
    doc.setFontSize(size);
    doc.setTextColor(color);
    const lines = doc.splitTextToSize(text, contentW) as string[];
    lines.forEach((line) => {
      ensureSpace(lineH);
      doc.text(line, margin, y);
      y += lineH;
    });
    y += gap;
  };

  const bulletList = (items: string[]) => {
    const lineH = 5.2;
    const dotX = margin + 1.4;
    const textX = margin + 6;
    const wrapW = contentW - 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(INK);

    items.forEach((item) => {
      const lines = doc.splitTextToSize(item, wrapW) as string[];
      ensureSpace(lines.length * lineH + 2);
      doc.setFillColor(GOLD);
      doc.circle(dotX, y - 1.4, 0.7, 'F');
      lines.forEach((line, i) => {
        doc.text(line, textX, y + i * lineH);
      });
      y += lines.length * lineH + 2.6;
    });
    y += 1.5;
  };

  const calloutBox = (text: string) => {
    const padX = 5;
    const padY = 5;
    const lineH = 5.2;
    const wrapW = contentW - padX * 2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(text, wrapW) as string[];
    const boxH = lines.length * lineH + padY * 2;

    if (boxH > maxY - (margin + 4)) {
      // Too tall to ever fit in one panel — fall back to a plain paragraph.
      paragraph(text);
      return;
    }
    ensureSpace(boxH + 2);
    doc.setFillColor(PANEL);
    doc.roundedRect(margin, y, contentW, boxH, 2, 2, 'F');
    doc.setFillColor(GOLD);
    doc.rect(margin, y, 1.4, boxH, 'F');
    doc.setTextColor(INK);
    lines.forEach((line, i) => {
      doc.text(line, margin + padX, y + padY + 3 + i * lineH);
    });
    y += boxH + 6;
  };

  // ---- Page 1 brand band + title block -------------------------------------
  doc.setFillColor(NAVY);
  doc.rect(0, 0, pageW, 30, 'F');
  doc.setFillColor(GOLD);
  doc.rect(0, 30, pageW, 1.4, 'F');

  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(WHITE);
  doc.text('ALMONDZ GLOBAL INFRA-CONSULTANT LIMITED', margin, 14);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(GOLD_LIGHT);
  doc.text('SERVICE BRIEF  ·  PRACTICE DIVISION PROFILE', margin, 22);

  y = 45;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(GOLD);
  doc.text('AGICL PRACTICE DIVISION', margin, y);
  y += 8;

  doc.setFont('times', 'bold');
  doc.setFontSize(21);
  doc.setTextColor(NAVY);
  (doc.splitTextToSize(service.title, contentW) as string[]).forEach((line) => {
    doc.text(line, margin, y);
    y += 9;
  });
  y += 1.5;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(MUTED);
  (doc.splitTextToSize(service.shortDesc, contentW) as string[]).forEach((line) => {
    doc.text(line, margin, y);
    y += 5.4;
  });
  y += 3;

  doc.setDrawColor(HAIRLINE);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageW - margin, y);
  y += 8;

  // ---- Body sections -----------------------------------------------------
  sectionHeading('Overview');
  paragraph(service.description);

  sectionHeading('Key Deliverables');
  bulletList(service.deliverables);

  sectionHeading('How We Deliver It');
  calloutBox(service.methodology);

  // ---- Running footer on every page ------------------------------------
  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p += 1) {
    doc.setPage(p);
    doc.setDrawColor(HAIRLINE);
    doc.setLineWidth(0.4);
    doc.line(margin, footerY, pageW - margin, footerY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(MUTED);
    doc.text('Almondz Global Infra-Consultant Limited  ·  ISO 9001:2015 Compliant', margin, footerY + 5);
    doc.text(`Page ${p} of ${pageCount}`, pageW - margin, footerY + 5, { align: 'right' });
    doc.text(`almondzglobalinfra.com  ·  Generated ${dateStr}`, pageW / 2, footerY + 9, {
      align: 'center',
    });
  }

  doc.save(`AGICL-Service-Brief-${service.slug}.pdf`);
}
