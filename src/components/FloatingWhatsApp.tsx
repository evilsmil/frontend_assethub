const whatsappLink = 'https://wa.me/237691587039?text=Bonjour%20AssetHub%2C%20je%20souhaite%20avoir%20des%20informations.'

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.2 19L6.5 15.9C5.7 14.7 5.2 13.3 5.2 11.9C5.2 8.1 8.2 5.1 12 5.1C15.8 5.1 18.8 8.1 18.8 11.9C18.8 15.7 15.8 18.7 12 18.7C10.7 18.7 9.5 18.4 8.5 17.8L5.2 19Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M9.4 9.1C9.6 8.7 9.8 8.7 10.1 8.7H10.5C10.7 8.7 10.8 8.8 10.9 9C11.1 9.5 11.5 10.4 11.6 10.6C11.6 10.8 11.6 10.9 11.4 11.1L11.1 11.5C10.9 11.7 10.9 11.8 11.1 12.1C11.5 12.8 12.2 13.5 13 13.8C13.3 14 13.5 14 13.7 13.8L14.2 13.2C14.4 13 14.6 13 14.8 13.1C15.1 13.2 16.1 13.7 16.4 13.9C16.6 14 16.7 14.1 16.6 14.4C16.5 14.8 16.3 15.3 15.8 15.7C15.3 16.1 14.4 16.1 13.5 15.8C11.8 15.2 10.5 14.1 9.5 12.6C8.9 11.7 8.6 10.9 8.8 10.1C8.9 9.7 9.2 9.3 9.4 9.1Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function FloatingWhatsApp() {
  return (
    <a
      aria-label="Contacter AssetHub sur WhatsApp"
      className="floating-whatsapp"
      href={whatsappLink}
      rel="noreferrer"
      target="_blank"
    >
      <span className="floating-whatsapp-bubble">
        <strong>WhatsApp</strong>
        <small>Besoin d'aide ?</small>
      </span>
      <span className="floating-whatsapp-button">
        <WhatsAppIcon />
      </span>
    </a>
  )
}