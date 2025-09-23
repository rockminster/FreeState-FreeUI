import React, { useState } from "react";
import { Button } from "../Button";

export type AuditEventType = "state_change" | "permission_change" | "api_key_event" | "login" | "logout" | "workspace_access" | "resource_access" | "system_error";

export interface AuditEntry {
  id: string;
  timestamp: string;
  type: AuditEventType;
  operation: string;
  description: string;
  user: string;
  workspace?: string;
  resource?: string;
  severity: "success" | "info" | "warning" | "error" | "neutral";
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuditTrailProps {
  entries: AuditEntry[];
  title?: string;
  loading?: boolean;
  error?: string;
  onLoadMore?: () => void;
  hasMoreEntries?: boolean;
  className?: string;
}

function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function groupEntriesByDate(entries: AuditEntry[]): Record<string, AuditEntry[]> {
  return entries.reduce((groups, entry) => {
    const date = formatDate(entry.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);
    return groups;
  }, {} as Record<string, AuditEntry[]>);
}

function getSeverityIcon(severity: AuditEntry['severity']): string {
  switch (severity) {
    case 'success': return '✓';
    case 'info': return 'ℹ';
    case 'warning': return '⚠';
    case 'error': return '✗';
    default: return '●';
  }
}

function AuditEntryDetails({ entry, isVisible }: { entry: AuditEntry; isVisible: boolean }) {
  if (!isVisible || !entry.details) return null;

  return (
    <div className="freeui-audit-trail__entry-details">
      <h4 className="freeui-audit-trail__entry-details-title">Event Details</h4>
      <div className="freeui-audit-trail__entry-details-content">
        {entry.ipAddress && (
          <div className="freeui-audit-trail__entry-detail">
            <span className="freeui-audit-trail__entry-detail-label">IP Address:</span>
            <span className="freeui-audit-trail__entry-detail-value">{entry.ipAddress}</span>
          </div>
        )}
        {entry.resource && (
          <div className="freeui-audit-trail__entry-detail">
            <span className="freeui-audit-trail__entry-detail-label">Resource:</span>
            <span className="freeui-audit-trail__entry-detail-value">{entry.resource}</span>
          </div>
        )}
        {entry.userAgent && (
          <div className="freeui-audit-trail__entry-detail">
            <span className="freeui-audit-trail__entry-detail-label">User Agent:</span>
            <span className="freeui-audit-trail__entry-detail-value">{entry.userAgent}</span>
          </div>
        )}
        {Object.entries(entry.details).map(([key, value]) => (
          <div key={key} className="freeui-audit-trail__entry-detail">
            <span className="freeui-audit-trail__entry-detail-label">{key}:</span>
            <span className="freeui-audit-trail__entry-detail-value">
              {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AuditEntryComponent({ entry }: { entry: AuditEntry }) {
  const [showDetails, setShowDetails] = useState(false);
  const hasDetails = entry.details || entry.ipAddress || entry.userAgent || entry.resource;

  return (
    <div className={`freeui-audit-trail__entry freeui-audit-trail__entry--${entry.severity}`}>
      <div className="freeui-audit-trail__entry-timeline">
        <div className="freeui-audit-trail__entry-icon">
          {getSeverityIcon(entry.severity)}
        </div>
        <div className="freeui-audit-trail__entry-line"></div>
      </div>
      <div className="freeui-audit-trail__entry-content">
        <div className="freeui-audit-trail__entry-header">
          <div className="freeui-audit-trail__entry-main">
            <div className="freeui-audit-trail__entry-operation">{entry.operation}</div>
            <div className="freeui-audit-trail__entry-description">{entry.description}</div>
          </div>
          <div className="freeui-audit-trail__entry-meta">
            <div className="freeui-audit-trail__entry-user">{entry.user}</div>
            <div className="freeui-audit-trail__entry-time">{formatTime(entry.timestamp)}</div>
          </div>
        </div>
        {hasDetails && (
          <div className="freeui-audit-trail__entry-toggle">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
          </div>
        )}
        <AuditEntryDetails entry={entry} isVisible={showDetails} />
      </div>
    </div>
  );
}

export function AuditTrail({
  entries,
  title = "Audit Trail",
  loading = false,
  error,
  onLoadMore,
  hasMoreEntries = false,
  className = ""
}: AuditTrailProps) {
  if (error) {
    return (
      <div className={`freeui-audit-trail ${className}`}>
        <div className="freeui-audit-trail__error">
          <div className="freeui-audit-trail__error-icon">⚠</div>
          <div className="freeui-audit-trail__error-message">{error}</div>
        </div>
      </div>
    );
  }

  if (loading && entries.length === 0) {
    return (
      <div className={`freeui-audit-trail ${className}`}>
        <div className="freeui-audit-trail__loading">
          <div className="freeui-audit-trail__loading-spinner"></div>
          <div>Loading audit trail...</div>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className={`freeui-audit-trail ${className}`}>
        <div className="freeui-audit-trail__empty">
          <div className="freeui-audit-trail__empty-icon">📋</div>
          <div className="freeui-audit-trail__empty-message">No audit entries found</div>
        </div>
      </div>
    );
  }

  const groupedEntries = groupEntriesByDate(entries);
  const dateGroups = Object.keys(groupedEntries).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className={`freeui-audit-trail ${className}`}>
      <div className="freeui-audit-trail__header">
        <h2 className="freeui-audit-trail__title">{title}</h2>
        <span className="freeui-audit-trail__count">
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>

      {dateGroups.map(date => (
        <div key={date} className="freeui-audit-trail__date-group">
          <div className="freeui-audit-trail__date-header">
            <h3 className="freeui-audit-trail__date-title">{date}</h3>
          </div>
          <div className="freeui-audit-trail__entries">
            {groupedEntries[date].map(entry => (
              <AuditEntryComponent key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      ))}

      {hasMoreEntries && (
        <div className="freeui-audit-trail__load-more">
          <Button
            variant="outline"
            onClick={onLoadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More Entries'}
          </Button>
        </div>
      )}
    </div>
  );
}