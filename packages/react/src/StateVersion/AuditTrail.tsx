import React, { useState } from "react";
import { clsx } from "clsx";
import { Card } from "../Card";
import { Button } from "../Button";
import type { AuditTrailProps, AuditLogEntry } from "./types";

/**
 * AuditTrail component for displaying operation history
 *
 * Features:
 * - Timeline view of operations with user and timestamp info
 * - Operation type icons and descriptions
 * - Grouping by date for better organization
 * - Expandable entries with metadata
 * - Loading and error states
 * - Accessible with proper ARIA labels
 */
export const AuditTrail = React.forwardRef<HTMLDivElement, AuditTrailProps>(
  (
    {
      entries,
      loading = false,
      error,
      maxEntries = 50,
      groupByDate = true,
      className,
      ...props
    },
    ref
  ) => {
    const [visibleEntries, setVisibleEntries] = useState(maxEntries);
    const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set());

    const formatDate = (isoString: string) => {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    };

    const formatTime = (isoString: string) => {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(date);
    };

    const getOperationIcon = (operation: AuditLogEntry["operation"]) => {
      const icons = {
        create: "✨",
        update: "✏️",
        rollback: "↩️",
        delete: "🗑️",
        view: "👁️",
        diff: "🔍",
      };
      return icons[operation] || "📋";
    };

    const getOperationColor = (operation: AuditLogEntry["operation"]) => {
      const colors = {
        create: "success",
        update: "info",
        rollback: "warning",
        delete: "error",
        view: "neutral",
        diff: "neutral",
      };
      return colors[operation] || "neutral";
    };

    const toggleEntryExpansion = (entryId: string) => {
      const newExpanded = new Set(expandedEntries);
      if (newExpanded.has(entryId)) {
        newExpanded.delete(entryId);
      } else {
        newExpanded.add(entryId);
      }
      setExpandedEntries(newExpanded);
    };

    const groupEntriesByDate = (entries: AuditLogEntry[]) => {
      if (!groupByDate) {
        return { ungrouped: entries };
      }

      return entries.reduce((groups, entry) => {
        const dateKey = formatDate(entry.timestamp);
        if (!groups[dateKey]) {
          groups[dateKey] = [];
        }
        groups[dateKey].push(entry);
        return groups;
      }, {} as Record<string, AuditLogEntry[]>);
    };

    const renderEntry = (entry: AuditLogEntry) => {
      const isExpanded = expandedEntries.has(entry.id);
      const operationColor = getOperationColor(entry.operation);
      
      const entryClass = clsx(
        "freeui-audit-trail__entry",
        `freeui-audit-trail__entry--${operationColor}`,
        {
          "freeui-audit-trail__entry--expanded": isExpanded,
        }
      );

      return (
        <div key={entry.id} className={entryClass}>
          <div className="freeui-audit-trail__entry-timeline">
            <div 
              className="freeui-audit-trail__entry-icon"
              aria-label={`${entry.operation} operation`}
            >
              {getOperationIcon(entry.operation)}
            </div>
            <div className="freeui-audit-trail__entry-line" aria-hidden="true" />
          </div>
          
          <div className="freeui-audit-trail__entry-content">
            <div className="freeui-audit-trail__entry-header">
              <div className="freeui-audit-trail__entry-main">
                <div className="freeui-audit-trail__entry-operation">
                  {entry.operation.charAt(0).toUpperCase() + entry.operation.slice(1)}
                </div>
                <div className="freeui-audit-trail__entry-description">
                  {entry.description}
                </div>
              </div>
              
              <div className="freeui-audit-trail__entry-meta">
                <div className="freeui-audit-trail__entry-user">
                  {entry.user.name}
                </div>
                <div className="freeui-audit-trail__entry-time">
                  {formatTime(entry.timestamp)}
                </div>
              </div>
              
              {entry.metadata && Object.keys(entry.metadata).length > 0 && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleEntryExpansion(entry.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`entry-details-${entry.id}`}
                  className="freeui-audit-trail__entry-toggle"
                >
                  {isExpanded ? "Less" : "More"}
                </Button>
              )}
            </div>
            
            {isExpanded && entry.metadata && (
              <div 
                id={`entry-details-${entry.id}`}
                className="freeui-audit-trail__entry-details"
              >
                <h5 className="freeui-audit-trail__entry-details-title">
                  Additional Details
                </h5>
                
                <div className="freeui-audit-trail__entry-details-content">
                  {entry.metadata.rollbackTo && (
                    <div className="freeui-audit-trail__entry-detail">
                      <span className="freeui-audit-trail__entry-detail-label">
                        Rolled back to:
                      </span>
                      <span className="freeui-audit-trail__entry-detail-value">
                        {entry.metadata.rollbackTo}
                      </span>
                    </div>
                  )}
                  
                  {entry.metadata.compareVersions && (
                    <div className="freeui-audit-trail__entry-detail">
                      <span className="freeui-audit-trail__entry-detail-label">
                        Compared versions:
                      </span>
                      <span className="freeui-audit-trail__entry-detail-value">
                        {entry.metadata.compareVersions[0]} ↔ {entry.metadata.compareVersions[1]}
                      </span>
                    </div>
                  )}
                  
                  {entry.metadata.userAgent && (
                    <div className="freeui-audit-trail__entry-detail">
                      <span className="freeui-audit-trail__entry-detail-label">
                        User agent:
                      </span>
                      <span className="freeui-audit-trail__entry-detail-value">
                        {entry.metadata.userAgent}
                      </span>
                    </div>
                  )}
                  
                  {entry.metadata.ipAddress && (
                    <div className="freeui-audit-trail__entry-detail">
                      <span className="freeui-audit-trail__entry-detail-label">
                        IP address:
                      </span>
                      <span className="freeui-audit-trail__entry-detail-value">
                        {entry.metadata.ipAddress}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    };

    const containerClass = clsx(
      "freeui-audit-trail",
      {
        "freeui-audit-trail--loading": loading,
        "freeui-audit-trail--grouped": groupByDate,
      },
      className
    );

    if (error) {
      return (
        <Card ref={ref} className={containerClass} {...props}>
          <div className="freeui-audit-trail__error">
            <div className="freeui-audit-trail__error-icon" aria-hidden="true">
              ⚠️
            </div>
            <div className="freeui-audit-trail__error-message">{error}</div>
          </div>
        </Card>
      );
    }

    if (loading) {
      return (
        <Card ref={ref} className={containerClass} {...props}>
          <div className="freeui-audit-trail__loading">
            <div className="freeui-audit-trail__loading-spinner" aria-hidden="true" />
            <div className="freeui-audit-trail__loading-text">Loading audit trail...</div>
          </div>
        </Card>
      );
    }

    if (entries.length === 0) {
      return (
        <Card ref={ref} className={containerClass} {...props}>
          <div className="freeui-audit-trail__empty">
            <div className="freeui-audit-trail__empty-icon" aria-hidden="true">
              📜
            </div>
            <div className="freeui-audit-trail__empty-message">
              No audit entries available
            </div>
          </div>
        </Card>
      );
    }

    const displayedEntries = entries.slice(0, visibleEntries);
    const groupedEntries = groupEntriesByDate(displayedEntries);

    return (
      <Card ref={ref} className={containerClass} {...props}>
        <div className="freeui-audit-trail__header">
          <h3 className="freeui-audit-trail__title">Audit Trail</h3>
          <div className="freeui-audit-trail__count">
            {entries.length} operation{entries.length !== 1 ? "s" : ""}
          </div>
        </div>
        
        <div className="freeui-audit-trail__timeline" role="log" aria-label="Audit trail timeline">
          {Object.entries(groupedEntries).map(([dateKey, dateEntries]) => (
            <div key={dateKey} className="freeui-audit-trail__date-group">
              {groupByDate && dateKey !== "ungrouped" && (
                <div className="freeui-audit-trail__date-header">
                  <h4 className="freeui-audit-trail__date-title">{dateKey}</h4>
                </div>
              )}
              
              <div className="freeui-audit-trail__entries">
                {dateEntries.map(renderEntry)}
              </div>
            </div>
          ))}
        </div>
        
        {entries.length > visibleEntries && (
          <div className="freeui-audit-trail__load-more">
            <Button
              variant="outline"
              onClick={() => setVisibleEntries(prev => prev + maxEntries)}
            >
              Load more ({entries.length - visibleEntries} remaining)
            </Button>
          </div>
        )}
      </Card>
    );
  }
);

AuditTrail.displayName = "AuditTrail";