import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { QRCodeSVG } from "qrcode.react";
import {
  Check,
  Copy,
  Download,
  Link2,
  QrCode,
  RefreshCw,
  Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Props {
  establishmentName: string;
  publicUrl: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export function QrCodePanel({
  establishmentName,
  publicUrl,
  primaryColor,
  secondaryColor,
}: Props) {
  const { t } = useTranslation();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent fail
    }
  }, [publicUrl]);

  const handleDownload = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `kyveron-qr-${establishmentName
      .toLowerCase()
      .replace(/\s+/g, "-")}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [establishmentName]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: establishmentName,
          text: t("qrCode.shareSubject", { name: establishmentName }),
          url: publicUrl,
        });
      } catch {
        // user cancelled or share failed
      }
    } else {
      handleCopy();
    }
  }, [publicUrl, establishmentName, t, handleCopy]);

  return (
    <Card className="overflow-hidden rounded-2xl border-border/70 bg-card shadow-elegant">
      {/* Brand header */}
      <div
        className="relative h-20 w-full"
        style={{
          background:
            primaryColor && secondaryColor
              ? `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
              : "var(--gradient-brand)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center gap-2 text-primary-foreground">
          <QrCode className="h-5 w-5 opacity-90" />
          <span className="text-sm font-semibold tracking-wide">
            {t("qrCode.title")}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 p-6 sm:p-10">
        {/* QR display */}
        <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
          <QRCodeSVG
            ref={(node) => {
              if (node) svgRef.current = node;
            }}
            value={publicUrl}
            size={220}
            level="H"
            includeMargin={false}
            bgColor="#ffffff"
            fgColor="#0f172a"
            imageSettings={undefined}
          />
        </div>

        {/* Establishment name */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground">
            {establishmentName}
          </h3>
          <p className="mt-1.5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <RefreshCw className="h-3 w-3" />
            {t("qrCode.autoUpdate")}
          </p>
        </div>

        {/* Public link */}
        <div className="flex w-full max-w-md items-center gap-2">
          <div className="relative flex-1">
            <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={publicUrl}
              readOnly
              className="h-11 pl-9 pr-4 text-sm text-foreground"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 shrink-0"
            onClick={handleCopy}
            aria-label={t("qrCode.copyLink")}
          >
            {copied ? (
              <Check className="h-4 w-4 text-success" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Actions */}
        <div className="grid w-full max-w-md grid-cols-2 gap-3">
          <Button
            onClick={handleDownload}
            className="h-11 bg-gradient-brand shadow-glow"
          >
            <Download className="mr-2 h-4 w-4" />
            {t("qrCode.download")}
          </Button>
          <Button onClick={handleShare} variant="outline" className="h-11">
            <Share2 className="mr-2 h-4 w-4" />
            {t("qrCode.share")}
          </Button>
        </div>
      </div>
    </Card>
  );
}
