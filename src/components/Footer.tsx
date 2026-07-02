import { site } from "@/data/site";

// Site footer with a computed copyright year.
function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-5/6 max-w-5xl flex-col gap-1 py-6 text-[11px] text-muted md:flex-row md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>Tagum, Davao Region, PH — Built with React &amp; Tailwind</p>
      </div>
    </footer>
  );
}

export default Footer;
