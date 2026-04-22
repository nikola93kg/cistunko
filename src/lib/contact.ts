type BuildMailtoHrefArgs = {
  name: string;
  phone: string;
  message: string;
  email: string;
};

export function buildMailtoHref({ name, phone, message, email }: BuildMailtoHrefArgs) {
  const subject = name.trim() ? `Upit sa sajta — ${name.trim()}` : "Upit sa sajta";
  const body = [
    `Ime: ${name.trim() || "-"}`,
    `Telefon: ${phone.trim() || "-"}`,
    "",
    "Poruka:",
    message.trim() || "-",
  ].join("\n");

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
