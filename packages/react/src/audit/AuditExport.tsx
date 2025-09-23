import React, { useState } from "react";
import { Button } from "../Button";
import { Card } from "../Card";
import { Stack } from "../layout/Stack";
import { Inline } from "../layout/Inline";
import type { AuditEntry } from "./AuditTrail";

export interface AuditExportProps {
  entries: AuditEntry[];
  onExport?: (format: ExportFormat, options: ExportOptions) => void;
  loading?: boolean;
  className?: string;
}

export type ExportFormat = "csv" | "json" | "pdf";

export interface ExportOptions {
  includeDetails: boolean;
  dateRange?: {
    from: string;
    to: string;
  };
  complianceMode: boolean;
}

function generateCSV(entries: AuditEntry[], includeDetails: boolean): string {
  const headers = [
    "Timestamp",
    "Type",
    "Operation", 
    "Description",
    "User",
    "Workspace",
    "Severity",
    "IP Address",
    ...(includeDetails ? ["Details"] : [])
  ];

  const rows = entries.map(entry => [
    entry.timestamp,
    entry.type,
    entry.operation,
    entry.description,
    entry.user,
    entry.workspace || "",
    entry.severity,
    entry.ipAddress || "",
    ...(includeDetails ? [JSON.stringify(entry.details || {})] : [])
  ]);

  return [headers, ...rows]
    .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(","))
    .join("\n");
}

function generateJSON(entries: AuditEntry[], includeDetails: boolean): string {
  const exportData = {
    exportedAt: new Date().toISOString(),
    totalEntries: entries.length,
    entries: entries.map(entry => ({
      ...entry,
      ...(includeDetails ? {} : { details: undefined, userAgent: undefined })
    }))
  };

  return JSON.stringify(exportData, null, 2);
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function AuditExport({
  entries,
  onExport,
  loading = false,
  className = ""
}: AuditExportProps) {
  const [exportFormat, setExportFormat] = useState<ExportFormat>("csv");
  const [includeDetails, setIncludeDetails] = useState(true);
  const [complianceMode, setComplianceMode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (entries.length === 0) return;

    setIsExporting(true);

    try {
      const options: ExportOptions = {
        includeDetails,
        complianceMode
      };

      if (onExport) {
        await onExport(exportFormat, options);
      } else {
        // Default export behavior
        const timestamp = new Date().toISOString().split('T')[0];
        const baseFilename = `audit-trail-${timestamp}`;
        
        switch (exportFormat) {
          case "csv": {
            const csvContent = generateCSV(entries, includeDetails);
            downloadFile(csvContent, `${baseFilename}.csv`, "text/csv");
            break;
          }
          
          case "json": {
            const jsonContent = generateJSON(entries, includeDetails);
            downloadFile(jsonContent, `${baseFilename}.json`, "application/json");
            break;
          }
          
          case "pdf":
            // PDF generation would typically require a library like jsPDF
            // For now, we'll show a message
            alert("PDF export requires additional setup. Please use CSV or JSON format.");
            break;
        }
      }
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const formatOptions = [
    { value: "csv" as const, label: "CSV (Spreadsheet)", description: "Compatible with Excel and other spreadsheet applications" },
    { value: "json" as const, label: "JSON (Structured)", description: "Machine-readable format for further processing" },
    { value: "pdf" as const, label: "PDF (Document)", description: "Formatted document for archival and sharing" }
  ];

  return (
    <Card padding="lg" className={className}>
      <Stack gap="md">
        <div>
          <h3 style={{ 
            margin: "0 0 var(--freeui-spacing-1) 0", 
            fontSize: "var(--freeui-font-size-lg)", 
            fontWeight: "var(--freeui-font-weight-semibold)" 
          }}>
            Export Audit Trail
          </h3>
          <p style={{ 
            margin: 0, 
            fontSize: "var(--freeui-font-size-sm)", 
            color: "var(--freeui-color-neutral-600)" 
          }}>
            Export {entries.length} audit {entries.length === 1 ? 'entry' : 'entries'} for compliance and reporting
          </p>
        </div>

        <Stack gap="sm">
          <div style={{ 
            fontSize: "var(--freeui-font-size-sm)", 
            fontWeight: "var(--freeui-font-weight-medium)",
            color: "var(--freeui-color-neutral-700)"
          }}>
            Export Format
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--freeui-spacing-2)" }}>
            {formatOptions.map(option => (
              <label 
                key={option.value}
                style={{ 
                  display: "flex", 
                  alignItems: "flex-start", 
                  gap: "var(--freeui-spacing-2)",
                  cursor: loading || isExporting ? "not-allowed" : "pointer",
                  opacity: loading || isExporting ? 0.6 : 1
                }}
              >
                <input
                  type="radio"
                  name="exportFormat"
                  value={option.value}
                  checked={exportFormat === option.value}
                  onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
                  disabled={loading || isExporting}
                  style={{ marginTop: "2px" }}
                  aria-labelledby={`format-${option.value}-label`}
                />
                <div>
                  <div 
                    id={`format-${option.value}-label`}
                    style={{ 
                      fontSize: "var(--freeui-font-size-sm)", 
                      fontWeight: "var(--freeui-font-weight-medium)",
                      color: "var(--freeui-color-neutral-900)"
                    }}
                  >
                    {option.label}
                  </div>
                  <div style={{ 
                    fontSize: "var(--freeui-font-size-xs)", 
                    color: "var(--freeui-color-neutral-600)" 
                  }}>
                    {option.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </Stack>

        <Stack gap="sm">
          <div style={{ 
            fontSize: "var(--freeui-font-size-sm)", 
            fontWeight: "var(--freeui-font-weight-medium)",
            color: "var(--freeui-color-neutral-700)"
          }}>
            Export Options
          </div>
          <Stack gap="xs">
            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "var(--freeui-spacing-2)",
              cursor: loading || isExporting ? "not-allowed" : "pointer",
              opacity: loading || isExporting ? 0.6 : 1
            }}>
              <input
                type="checkbox"
                checked={includeDetails}
                onChange={(e) => setIncludeDetails(e.target.checked)}
                disabled={loading || isExporting}
                id="include-details-checkbox"
              />
              <span style={{ fontSize: "var(--freeui-font-size-sm)" }}>
                Include detailed event information
              </span>
            </label>
            
            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "var(--freeui-spacing-2)",
              cursor: loading || isExporting ? "not-allowed" : "pointer",
              opacity: loading || isExporting ? 0.6 : 1
            }}>
              <input
                type="checkbox"
                checked={complianceMode}
                onChange={(e) => setComplianceMode(e.target.checked)}
                disabled={loading || isExporting}
                id="compliance-mode-checkbox"
              />
              <span style={{ fontSize: "var(--freeui-font-size-sm)" }}>
                Compliance mode (include data integrity verification)
              </span>
            </label>
          </Stack>
        </Stack>

        <Inline justify="space-between" align="center">
          <div style={{ 
            fontSize: "var(--freeui-font-size-xs)", 
            color: "var(--freeui-color-neutral-600)" 
          }}>
            {complianceMode && "⚠ Compliance mode includes data verification checksums"}
          </div>
          <Button
            variant="primary"
            onClick={handleExport}
            disabled={loading || isExporting || entries.length === 0}
          >
            {isExporting ? "Exporting..." : `Export ${exportFormat.toUpperCase()}`}
          </Button>
        </Inline>
      </Stack>
    </Card>
  );
}