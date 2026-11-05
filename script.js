const menuDialog = document.getElementById("menu-dialog");
const openMenuButton = document.getElementById("open-menu");
const closeMenuButton = document.getElementById("close-menu");
const saveContactButton = document.getElementById("save-contact");
const phoneDisplay = document.getElementById("phone-display");
const whatsappLink = document.getElementById("whatsapp-link");
const callLink = document.getElementById("call-link");
const instagramLink = document.getElementById("instagram-link");
const contactStatus = document.getElementById("contact-status");
const saveContactIcon = document.getElementById("save-contact-icon");
const originalSaveIcon = saveContactIcon.innerHTML;

phoneDisplay.textContent = cardData.contact.phoneDisplay;
whatsappLink.href = `https://wa.me/${cardData.contact.phone}?text=${encodeURIComponent(cardData.contact.whatsappMessage)}`;
callLink.href = `tel:+${cardData.contact.phone}`;
instagramLink.href = cardData.contact.instagram;

openMenuButton.addEventListener("click", () => menuDialog.showModal());
closeMenuButton.addEventListener("click", () => menuDialog.close());

menuDialog.addEventListener("click", (event) => {
  if (event.target === menuDialog) menuDialog.close();
});

saveContactButton.addEventListener("click", () => {
  const vCard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${cardData.contact.name}`,
    `ORG:${cardData.contact.organization}`,
    `TEL;TYPE=CELL:+${cardData.contact.phone}`,
    `NOTE:${cardData.contact.note}`,
    "END:VCARD"
  ].join("\r\n");

  const file = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
  const fileUrl = URL.createObjectURL(file);
  const download = document.createElement("a");
  download.href = fileUrl;
  download.download = "Dulce-Tradicion.vcf";
  document.body.append(download);
  download.click();
  download.remove();
  window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);

  saveContactIcon.innerHTML = '<path d="m5 12 4 4L19 6"/>';
  saveContactButton.classList.add("is-saved");
  contactStatus.textContent = "Se descargó el contacto de Dulce Tradición.";
  window.setTimeout(() => {
    saveContactIcon.innerHTML = originalSaveIcon;
    saveContactButton.classList.remove("is-saved");
    contactStatus.textContent = "";
  }, 1900);
});
