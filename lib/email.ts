import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const ADMIN_EMAIL = process.env.ADMIN_NOTIFY_EMAIL ?? "";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "noreply@nhaphosg.com";

export async function sendBuyerLeadNotification(lead: {
  fullName: string;
  phone: string;
  preferredDistrict: string;
  budgetLabel: string;
  houseType: string;
  dimensionsRequest: string;
  purpose: string;
  notes: string;
}) {
  if (!resend || !ADMIN_EMAIL) return;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `[NhàPhốSG] Lead mới: ${lead.fullName} — ${lead.phone}`,
    html: `
<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;color:#f5f5f0">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:32px 16px">
    <tr><td>
      <div style="background:#d84e1e;border-radius:12px;padding:6px 14px;display:inline-block;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fff;margin-bottom:20px">
        KHÁCH MUA MỚI
      </div>
      <h1 style="margin:0 0 8px;font-size:28px;font-weight:900;color:#fff">
        ${lead.fullName}
      </h1>
      <p style="margin:0 0 28px;font-size:20px;color:#d84e1e;font-weight:700">${lead.phone}</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
        ${row("Khu vực quan tâm", lead.preferredDistrict || "—")}
        ${row("Tầm tài chính", lead.budgetLabel || "—")}
        ${row("Loại nhà", lead.houseType || "—")}
        ${row("Diện tích mong muốn", lead.dimensionsRequest || "—")}
        ${row("Mục đích", lead.purpose || "—")}
        ${lead.notes ? row("Ghi chú", lead.notes) : ""}
      </table>

      <div style="margin-top:28px;padding:16px;background:#1e1e1e;border-radius:12px;font-size:13px;color:#a1a1aa">
        Vào <a href="https://nhaphosg.com/admin" style="color:#d84e1e;text-decoration:none;font-weight:700">Admin Dashboard</a> để phân công và cập nhật trạng thái lead này.
      </div>
    </td></tr>
  </table>
</body>
</html>`,
  });
}

export async function sendOwnerLeadNotification(lead: {
  ownerName: string;
  phone: string;
  addressLine: string;
  expectedPrice: string;
  dimensionsText: string;
  layoutText: string;
  legalStatus: string;
  occupancyStatus: string;
  mediaNotes: string;
}) {
  if (!resend || !ADMIN_EMAIL) return;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `[NhàPhốSG] Chủ nhà mới: ${lead.ownerName} — ${lead.phone}`,
    html: `
<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;color:#f5f5f0">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:32px 16px">
    <tr><td>
      <div style="background:#2563eb;border-radius:12px;padding:6px 14px;display:inline-block;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fff;margin-bottom:20px">
        CHỦ NHÀ CẦN BÁN
      </div>
      <h1 style="margin:0 0 8px;font-size:28px;font-weight:900;color:#fff">
        ${lead.ownerName}
      </h1>
      <p style="margin:0 0 28px;font-size:20px;color:#2563eb;font-weight:700">${lead.phone}</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
        ${row("Địa chỉ", lead.addressLine || "—")}
        ${row("Giá kỳ vọng", lead.expectedPrice || "—")}
        ${row("Diện tích", lead.dimensionsText || "—")}
        ${row("Kết cấu", lead.layoutText || "—")}
        ${row("Pháp lý", lead.legalStatus || "—")}
        ${row("Tình trạng thuê", lead.occupancyStatus || "—")}
        ${lead.mediaNotes ? row("Mô tả thêm", lead.mediaNotes) : ""}
      </table>

      <div style="margin-top:28px;padding:16px;background:#1e1e1e;border-radius:12px;font-size:13px;color:#a1a1aa">
        Vào <a href="https://nhaphosg.com/admin" style="color:#d84e1e;text-decoration:none;font-weight:700">Admin Dashboard</a> để xác minh và xử lý thông tin nhà này.
      </div>
    </td></tr>
  </table>
</body>
</html>`,
  });
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #27272a;font-size:12px;color:#71717a;width:140px;vertical-align:top">${label}</td>
      <td style="padding:10px 0 10px 16px;border-bottom:1px solid #27272a;font-size:14px;color:#f5f5f0;font-weight:600">${value}</td>
    </tr>`;
}
