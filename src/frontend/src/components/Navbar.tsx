import { Button } from "@/components/ui/button";
import { Menu, Shield, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onSubmitClick: () => void;
  isAdmin: boolean;
  onAdminClick: () => void;
}

export function Navbar({
  activeSection,
  onSectionChange,
  onSubmitClick,
  isAdmin,
  onAdminClick,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: "rankings", label: "Rankings" },
    { id: "leaderboards", label: "Leaderboards" },
  ];

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        background: "oklch(0.08 0.018 260 / 0.96)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid oklch(0.18 0.04 245 / 0.7)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-2.5 group"
          onClick={() => onSectionChange("rankings")}
          data-ocid="nav.link"
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-black tracking-tighter"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.52 0.22 278), oklch(0.50 0.20 295))",
              boxShadow: "0 0 12px oklch(0.55 0.21 280 / 0.5)",
              color: "white",
            }}
          >
            AT
          </div>
          <span className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
            Asian Tiers
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              className="relative px-4 py-2 text-sm font-medium transition-colors"
              style={{
                color:
                  activeSection === link.id
                    ? "oklch(0.72 0.18 285)"
                    : "oklch(0.62 0.015 255)",
              }}
              onClick={() => onSectionChange(link.id)}
              data-ocid={`nav.${link.id}.link`}
            >
              {link.label}
              {activeSection === link.id && (
                <span
                  className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                  style={{ background: "oklch(0.72 0.18 285)" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Button
              variant="outline"
              size="sm"
              onClick={onAdminClick}
              className="hidden md:flex items-center gap-1.5 border-muted text-muted-foreground hover:text-foreground hover:border-primary"
              data-ocid="nav.admin.button"
            >
              <Shield className="h-3.5 w-3.5" />
              Admin
            </Button>
          )}
          <Button
            size="sm"
            onClick={onSubmitClick}
            className="hidden md:flex h-9 px-4 font-semibold text-white"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.52 0.22 278), oklch(0.50 0.20 295))",
              boxShadow: "0 0 16px oklch(0.55 0.21 280 / 0.35)",
            }}
            data-ocid="nav.submit_player.button"
          >
            Submit Player
          </Button>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="nav.mobile_menu.button"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-4 pt-2 flex flex-col gap-2"
          style={{ borderTop: "1px solid oklch(0.18 0.04 245 / 0.4)" }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              className="py-2.5 text-left text-sm font-medium"
              style={{
                color:
                  activeSection === link.id
                    ? "oklch(0.72 0.18 285)"
                    : "oklch(0.62 0.015 255)",
              }}
              onClick={() => {
                setMobileOpen(false);
                onSectionChange(link.id);
              }}
              data-ocid={`nav.mobile.${link.id}.link`}
            >
              {link.label}
            </button>
          ))}
          <Button
            size="sm"
            onClick={() => {
              setMobileOpen(false);
              onSubmitClick();
            }}
            className="mt-2 w-full font-semibold text-white"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.52 0.22 278), oklch(0.50 0.20 295))",
            }}
            data-ocid="nav.mobile.submit_player.button"
          >
            Submit Player
          </Button>
          {isAdmin && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setMobileOpen(false);
                onAdminClick();
              }}
              className="w-full border-muted text-muted-foreground"
              data-ocid="nav.mobile.admin.button"
            >
              <Shield className="h-3.5 w-3.5 mr-1.5" />
              Admin Panel
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}
