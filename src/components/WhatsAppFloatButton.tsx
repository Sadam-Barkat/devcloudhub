import { useMemo } from "react";

type WhatsAppFloatButtonProps = {
  phoneNumber?: string;
  message?: string;
};

export default function WhatsAppFloatButton({
  phoneNumber = "923030158620",
  message = "Hello, I'm interested in your services",
}: WhatsAppFloatButtonProps) {
  const href = useMemo(() => {
    const digitsOnly = phoneNumber.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(message);
    return `https://wa.me/${digitsOnly}?text=${text}`;
  }, [phoneNumber, message]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact on WhatsApp"
      className={
        "fixed bottom-5 right-5 z-50 inline-flex items-center justify-center " +
        "h-14 w-14 sm:h-16 sm:w-16 rounded-full " +
        "bg-[#25D366] text-white shadow-lg shadow-black/30 " +
        "transition-all duration-300 ease-out " +
        "hover:-translate-y-1 hover:scale-[1.03] hover:shadow-xl hover:shadow-black/40 " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      }
    >
      <span className="sr-only">Open WhatsApp chat</span>
      <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
    </a>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="currentColor"
      role="img"
      aria-hidden="true"
    >
      <path d="M19.11 17.46c-.27-.13-1.59-.78-1.83-.87-.25-.09-.43-.13-.61.13-.18.27-.7.87-.86 1.05-.16.18-.31.2-.58.07-.27-.13-1.12-.41-2.13-1.31-.79-.7-1.32-1.56-1.47-1.82-.16-.27-.02-.41.11-.54.12-.12.27-.31.41-.46.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.13-.61-1.47-.83-2.02-.22-.52-.44-.45-.61-.46h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.26s.98 2.61 1.12 2.79c.13.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.65.2 1.25.17 1.72.1.52-.08 1.59-.65 1.82-1.28.22-.63.22-1.17.16-1.28-.07-.12-.25-.18-.52-.31z" />
      <path d="M16 3.2C9.07 3.2 3.44 8.83 3.44 15.76c0 2.44.7 4.82 2.03 6.88L4 29l6.52-1.41a12.52 12.52 0 0 0 5.48 1.27h.01c6.93 0 12.56-5.63 12.56-12.56S22.93 3.2 16 3.2zm0 23.04h-.01c-1.75 0-3.45-.47-4.95-1.36l-.35-.21-3.87.84.82-3.77-.23-.39a10.39 10.39 0 0 1-1.62-5.59c0-5.74 4.67-10.41 10.41-10.41 2.78 0 5.4 1.08 7.37 3.04a10.35 10.35 0 0 1 3.05 7.37c0 5.74-4.67 10.41-10.41 10.41z" />
    </svg>
  );
}
