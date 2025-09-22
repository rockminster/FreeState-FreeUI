import React, { useState, useMemo } from "react";
import { clsx } from "clsx";
import { Card } from "../Card";
import { Button } from "../Button";
import { Input } from "../Input";
import type { AuthenticationAuditProps, AuthEvent } from "./types";

/**
 * AuthenticationAudit component for displaying authentication event history
 *
 * Features:
 * - Timeline view of authentication events with filtering
 * - Event type filtering (API key operations, JWT operations, login events)
 * - User filtering and date range selection
 * - Expandable event details with metadata
 * - Color-coded event types and success/failure indicators
 * - Loading and error states
 * - Grouping by date for better organization
 * - Accessible with proper ARIA labels and keyboard navigation
 */
export const AuthenticationAudit = React.forwardRef<
  HTMLDivElement,
  AuthenticationAuditProps
>(
  (
    {
      events,
      eventTypeFilter = [],
      userFilter = "",
      dateRange,
      loading = false,
      error,
      maxEvents = 50,
      groupByDate = true,
      onFilterChange,
      className,
      ...props
    },
    ref
  ) => {
    const [visibleEvents, setVisibleEvents] = useState(maxEvents);
    const [expandedEvents, setExpandedEvents] = useState<Set<string>>(
      new Set()
    );
    const [localEventTypeFilter, setLocalEventTypeFilter] =
      useState<AuthEvent["type"][]>(eventTypeFilter);
    const [localUserFilter, setLocalUserFilter] = useState(userFilter);
    // Remove unused setLocalDateRange to fix linting error
    const [localDateRange] = useState(dateRange);

    const formatDate = (isoString: string) => {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
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

    const getEventTypeColor = (eventType: AuthEvent["type"]) => {
      const colorMap: Record<AuthEvent["type"], string> = {
        api_key_created: "success",
        api_key_revoked: "danger",
        api_key_rotated: "warning",
        api_key_used: "info",
        jwt_issued: "success",
        jwt_refreshed: "info",
        jwt_revoked: "danger",
        login_success: "success",
        login_failure: "danger",
        logout: "info",
        permission_granted: "success",
        permission_denied: "danger",
      };
      return colorMap[eventType] || "neutral";
    };

    const getEventIcon = (eventType: AuthEvent["type"]) => {
      const iconMap: Record<AuthEvent["type"], string> = {
        api_key_created: "🔑",
        api_key_revoked: "🚫",
        api_key_rotated: "🔄",
        api_key_used: "📊",
        jwt_issued: "🎫",
        jwt_refreshed: "♻️",
        jwt_revoked: "❌",
        login_success: "✅",
        login_failure: "❌",
        logout: "🚪",
        permission_granted: "✅",
        permission_denied: "⛔",
      };
      return iconMap[eventType] || "📝";
    };

    const filteredEvents = useMemo(() => {
      return events.filter((event) => {
        // Event type filter
        if (
          localEventTypeFilter.length > 0 &&
          !localEventTypeFilter.includes(event.type)
        ) {
          return false;
        }

        // User filter
        if (
          localUserFilter &&
          !event.user.name.toLowerCase().includes(localUserFilter.toLowerCase())
        ) {
          return false;
        }

        // Date range filter
        if (localDateRange) {
          const eventDate = new Date(event.timestamp);
          const startDate = new Date(localDateRange.startDate);
          const endDate = new Date(localDateRange.endDate);

          if (eventDate < startDate || eventDate > endDate) {
            return false;
          }
        }

        return true;
      });
    }, [events, localEventTypeFilter, localUserFilter, localDateRange]);

    const groupedEvents = useMemo(() => {
      if (!groupByDate) {
        return [{ date: "", events: filteredEvents.slice(0, visibleEvents) }];
      }

      const groups: Record<string, AuthEvent[]> = {};

      filteredEvents.slice(0, visibleEvents).forEach((event) => {
        const date = formatDate(event.timestamp);
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(event);
      });

      return Object.entries(groups)
        .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
        .map(([date, events]) => ({ date, events }));
    }, [filteredEvents, visibleEvents, groupByDate]);

    const toggleEventExpansion = (eventId: string) => {
      setExpandedEvents((prev) => {
        const next = new Set(prev);
        if (next.has(eventId)) {
          next.delete(eventId);
        } else {
          next.add(eventId);
        }
        return next;
      });
    };

    const handleEventTypeFilterChange = (
      eventType: AuthEvent["type"],
      checked: boolean
    ) => {
      const newFilter = checked
        ? [...localEventTypeFilter, eventType]
        : localEventTypeFilter.filter((type) => type !== eventType);

      setLocalEventTypeFilter(newFilter);
      if (onFilterChange) {
        onFilterChange({
          eventTypes: newFilter,
          user: localUserFilter,
          dateRange: localDateRange,
        });
      }
    };

    const handleUserFilterChange = (user: string) => {
      setLocalUserFilter(user);
      if (onFilterChange) {
        onFilterChange({
          eventTypes: localEventTypeFilter,
          user,
          dateRange: localDateRange,
        });
      }
    };

    const handleLoadMore = () => {
      setVisibleEvents((prev) =>
        Math.min(prev + maxEvents, filteredEvents.length)
      );
    };

    const containerClass = clsx(
      "freeui-authentication-audit",
      {
        "freeui-authentication-audit--loading": loading,
        "freeui-authentication-audit--grouped": groupByDate,
      },
      className
    );

    const eventTypes: AuthEvent["type"][] = [
      "api_key_created",
      "api_key_revoked",
      "api_key_rotated",
      "api_key_used",
      "jwt_issued",
      "jwt_refreshed",
      "jwt_revoked",
      "login_success",
      "login_failure",
      "logout",
      "permission_granted",
      "permission_denied",
    ];

    if (loading) {
      return (
        <Card ref={ref} className={containerClass} {...props}>
          <div className="freeui-authentication-audit__loading">
            <div
              className="freeui-authentication-audit__loading-spinner"
              aria-hidden="true"
            />
            <div className="freeui-authentication-audit__loading-text">
              Loading authentication audit log...
            </div>
          </div>
        </Card>
      );
    }

    if (error) {
      return (
        <Card ref={ref} className={containerClass} {...props}>
          <div className="freeui-authentication-audit__error">
            <div className="freeui-authentication-audit__error-message">
              {error}
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card ref={ref} className={containerClass} {...props}>
        <div className="freeui-authentication-audit__header">
          <h3 className="freeui-authentication-audit__title">
            Authentication Audit Log
          </h3>
          <div className="freeui-authentication-audit__count">
            {filteredEvents.length} event
            {filteredEvents.length !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="freeui-authentication-audit__filters">
          <div className="freeui-authentication-audit__filter">
            <label
              htmlFor="user-filter"
              className="freeui-authentication-audit__filter-label"
            >
              Filter by user:
            </label>
            <Input
              id="user-filter"
              type="text"
              value={localUserFilter}
              onChange={(e) => handleUserFilterChange(e.target.value)}
              placeholder="Search users..."
              size="sm"
            />
          </div>

          <div className="freeui-authentication-audit__filter">
            <fieldset className="freeui-authentication-audit__filter-fieldset">
              <legend className="freeui-authentication-audit__filter-legend">
                Filter by event type:
              </legend>
              <div className="freeui-authentication-audit__event-types">
                {eventTypes.map((eventType) => (
                  <label
                    key={eventType}
                    className="freeui-authentication-audit__event-type-label"
                  >
                    <input
                      type="checkbox"
                      className="freeui-authentication-audit__event-type-checkbox"
                      checked={localEventTypeFilter.includes(eventType)}
                      onChange={(e) =>
                        handleEventTypeFilterChange(eventType, e.target.checked)
                      }
                    />
                    <span className="freeui-authentication-audit__event-type-text">
                      {getEventIcon(eventType)} {eventType.replace(/_/g, " ")}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="freeui-authentication-audit__empty">
            <div className="freeui-authentication-audit__empty-message">
              No authentication events found matching the current filters.
            </div>
          </div>
        ) : (
          <div className="freeui-authentication-audit__timeline">
            {groupedEvents.map(({ date, events }) => (
              <div
                key={date || "ungrouped"}
                className="freeui-authentication-audit__group"
              >
                {groupByDate && date && (
                  <div className="freeui-authentication-audit__group-header">
                    <h4 className="freeui-authentication-audit__group-date">
                      {date}
                    </h4>
                  </div>
                )}

                <div className="freeui-authentication-audit__events">
                  {events.map((event) => {
                    const isExpanded = expandedEvents.has(event.id);
                    const hasMetadata =
                      event.details.metadata &&
                      Object.keys(event.details.metadata).length > 0;

                    return (
                      <div
                        key={event.id}
                        className="freeui-authentication-audit__event"
                      >
                        <div className="freeui-authentication-audit__event-main">
                          <div className="freeui-authentication-audit__event-indicator">
                            <div
                              className={`freeui-authentication-audit__event-icon freeui-authentication-audit__event-icon--${getEventTypeColor(event.type)}`}
                            >
                              {getEventIcon(event.type)}
                            </div>
                            <div
                              className={`freeui-authentication-audit__event-status freeui-authentication-audit__event-status--${event.details.success ? "success" : "failure"}`}
                            >
                              {event.details.success ? "✓" : "✗"}
                            </div>
                          </div>

                          <div className="freeui-authentication-audit__event-content">
                            <div className="freeui-authentication-audit__event-header">
                              <div className="freeui-authentication-audit__event-type">
                                {event.type
                                  .replace(/_/g, " ")
                                  .replace(/\b\w/g, (l) => l.toUpperCase())}
                              </div>
                              <div className="freeui-authentication-audit__event-time">
                                {formatTime(event.timestamp)}
                              </div>
                            </div>

                            <div className="freeui-authentication-audit__event-description">
                              {event.details.description}
                            </div>

                            <div className="freeui-authentication-audit__event-meta">
                              <div className="freeui-authentication-audit__event-user">
                                {event.user.name}
                              </div>
                              {event.details.ipAddress && (
                                <div className="freeui-authentication-audit__event-ip">
                                  from {event.details.ipAddress}
                                </div>
                              )}
                              {event.resourceId && (
                                <div className="freeui-authentication-audit__event-resource">
                                  {event.resourceType}: {event.resourceId}
                                </div>
                              )}
                            </div>

                            {!event.details.success && event.details.error && (
                              <div className="freeui-authentication-audit__event-error">
                                Error: {event.details.error}
                              </div>
                            )}
                          </div>

                          {(hasMetadata || event.details.userAgent) && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleEventExpansion(event.id)}
                              aria-expanded={isExpanded}
                              aria-controls={`event-details-${event.id}`}
                              className="freeui-authentication-audit__event-toggle"
                            >
                              {isExpanded ? "Less" : "More"}
                            </Button>
                          )}
                        </div>

                        {isExpanded &&
                          (hasMetadata || event.details.userAgent) && (
                            <div
                              id={`event-details-${event.id}`}
                              className="freeui-authentication-audit__event-details"
                            >
                              {event.details.userAgent && (
                                <div className="freeui-authentication-audit__event-detail">
                                  <span className="freeui-authentication-audit__event-detail-label">
                                    User Agent:
                                  </span>
                                  <span className="freeui-authentication-audit__event-detail-value">
                                    {event.details.userAgent}
                                  </span>
                                </div>
                              )}

                              {hasMetadata && (
                                <div className="freeui-authentication-audit__event-detail">
                                  <span className="freeui-authentication-audit__event-detail-label">
                                    Metadata:
                                  </span>
                                  <pre className="freeui-authentication-audit__event-detail-metadata">
                                    {JSON.stringify(
                                      event.details.metadata,
                                      null,
                                      2
                                    )}
                                  </pre>
                                </div>
                              )}
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {visibleEvents < filteredEvents.length && (
              <div className="freeui-authentication-audit__load-more">
                <Button variant="outline" onClick={handleLoadMore}>
                  Load More Events
                </Button>
                <div className="freeui-authentication-audit__load-more-info">
                  Showing {visibleEvents} of {filteredEvents.length} events
                </div>
              </div>
            )}
          </div>
        )}
      </Card>
    );
  }
);

AuthenticationAudit.displayName = "AuthenticationAudit";
