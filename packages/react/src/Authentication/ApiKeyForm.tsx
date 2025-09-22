import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import { Card } from "../Card";
import { Button } from "../Button";
import { Input } from "../Input";
import type { ApiKeyFormProps, ApiKeyFormData } from "./types";

/**
 * ApiKeyForm component for creating new API keys
 *
 * Features:
 * - Form for API key creation with validation
 * - Permission scope selection with checkboxes
 * - Optional expiration date setting
 * - IP address restrictions input
 * - Rate limiting configuration
 * - Form validation and error display
 * - Loading states during submission
 * - Accessible form with proper labels and ARIA attributes
 */
export const ApiKeyForm = React.forwardRef<HTMLFormElement, ApiKeyFormProps>(
  (
    {
      availableScopes,
      onFormSubmit,
      loading = false,
      errors = {},
      initialValues = {},
      className,
      ...props
    },
    ref
  ) => {
    const [formData, setFormData] = useState<ApiKeyFormData>({
      name: "",
      description: "",
      permissions: [],
      expiresAt: "",
      ipRestrictions: [],
      rateLimit: {
        requestsPerMinute: 60,
        burstSize: 10,
      },
      ...initialValues,
    });

    const [enableExpiration, setEnableExpiration] = useState(
      Boolean(initialValues.expiresAt)
    );
    const [enableRateLimit, setEnableRateLimit] = useState(
      Boolean(initialValues.rateLimit)
    );
    const [ipRestrictionsText, setIpRestrictionsText] = useState(
      initialValues.ipRestrictions?.join("\n") || ""
    );

    useEffect(() => {
      // Parse IP restrictions from textarea
      const ips = ipRestrictionsText
        .split("\n")
        .map((ip) => ip.trim())
        .filter((ip) => ip.length > 0);

      setFormData((prev) => ({
        ...prev,
        ipRestrictions: ips,
      }));
    }, [ipRestrictionsText]);

    const handleInputChange = (
      field: keyof ApiKeyFormData,
      value: string | number
    ) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

    const handlePermissionChange = (permission: string, checked: boolean) => {
      setFormData((prev) => ({
        ...prev,
        permissions: checked
          ? [...prev.permissions, permission]
          : prev.permissions.filter((p) => p !== permission),
      }));
    };

    const handleRateLimitChange = (
      field: "requestsPerMinute" | "burstSize",
      value: number
    ) => {
      setFormData((prev) => ({
        ...prev,
        rateLimit: {
          ...prev.rateLimit!,
          [field]: value,
        },
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      const submitData: ApiKeyFormData = {
        ...formData,
        expiresAt: enableExpiration ? formData.expiresAt : undefined,
        rateLimit: enableRateLimit ? formData.rateLimit : undefined,
      };

      onFormSubmit(submitData);
    };

    const isValid =
      formData.name.trim().length > 0 && formData.permissions.length > 0;

    const containerClass = clsx(
      "freeui-api-key-form",
      {
        "freeui-api-key-form--loading": loading,
      },
      className
    );

    return (
      <Card>
        <form
          ref={ref}
          className={containerClass}
          onSubmit={handleSubmit}
          {...props}
        >
          <div className="freeui-api-key-form__header">
            <h3 className="freeui-api-key-form__title">Create API Key</h3>
            <p className="freeui-api-key-form__description">
              Generate a new API key with specific permissions and security
              settings.
            </p>
          </div>

          <div className="freeui-api-key-form__fields">
            <div className="freeui-api-key-form__field">
              <label
                htmlFor="api-key-name"
                className="freeui-api-key-form__label"
              >
                Key Name *
              </label>
              <Input
                id="api-key-name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., Production API Key"
                error={Boolean(errors.name)}
                required
                aria-describedby={
                  errors.name ? "api-key-name-error" : undefined
                }
              />
              {errors.name && (
                <div
                  id="api-key-name-error"
                  className="freeui-api-key-form__error"
                >
                  {errors.name}
                </div>
              )}
            </div>

            <div className="freeui-api-key-form__field">
              <label
                htmlFor="api-key-description"
                className="freeui-api-key-form__label"
              >
                Description
              </label>
              <textarea
                id="api-key-description"
                className="freeui-api-key-form__textarea"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe the purpose of this API key..."
                rows={3}
                aria-describedby={
                  errors.description ? "api-key-description-error" : undefined
                }
              />
              {errors.description && (
                <div
                  id="api-key-description-error"
                  className="freeui-api-key-form__error"
                >
                  {errors.description}
                </div>
              )}
            </div>

            <div className="freeui-api-key-form__field">
              <fieldset className="freeui-api-key-form__fieldset">
                <legend className="freeui-api-key-form__legend">
                  Permissions *
                </legend>
                <div className="freeui-api-key-form__permissions">
                  {availableScopes.map((scope) => (
                    <label
                      key={scope}
                      className="freeui-api-key-form__checkbox-label"
                    >
                      <input
                        type="checkbox"
                        className="freeui-api-key-form__checkbox"
                        checked={formData.permissions.includes(scope)}
                        onChange={(e) =>
                          handlePermissionChange(scope, e.target.checked)
                        }
                      />
                      <span className="freeui-api-key-form__checkbox-text">
                        {scope}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.permissions && (
                  <div className="freeui-api-key-form__error">
                    {errors.permissions}
                  </div>
                )}
              </fieldset>
            </div>

            <div className="freeui-api-key-form__field">
              <label className="freeui-api-key-form__checkbox-label">
                <input
                  type="checkbox"
                  className="freeui-api-key-form__checkbox"
                  checked={enableExpiration}
                  onChange={(e) => setEnableExpiration(e.target.checked)}
                />
                <span className="freeui-api-key-form__checkbox-text">
                  Set expiration date
                </span>
              </label>

              {enableExpiration && (
                <div className="freeui-api-key-form__field-nested">
                  <Input
                    type="datetime-local"
                    value={formData.expiresAt}
                    onChange={(e) =>
                      handleInputChange("expiresAt", e.target.value)
                    }
                    error={Boolean(errors.expiresAt)}
                    aria-describedby={
                      errors.expiresAt ? "api-key-expires-error" : undefined
                    }
                  />
                  {errors.expiresAt && (
                    <div
                      id="api-key-expires-error"
                      className="freeui-api-key-form__error"
                    >
                      {errors.expiresAt}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="freeui-api-key-form__field">
              <label
                htmlFor="api-key-ip-restrictions"
                className="freeui-api-key-form__label"
              >
                IP Address Restrictions
              </label>
              <textarea
                id="api-key-ip-restrictions"
                className="freeui-api-key-form__textarea"
                value={ipRestrictionsText}
                onChange={(e) => setIpRestrictionsText(e.target.value)}
                placeholder="Enter IP addresses or CIDR blocks, one per line..."
                rows={4}
                aria-describedby="api-key-ip-restrictions-help"
              />
              <div
                id="api-key-ip-restrictions-help"
                className="freeui-api-key-form__help"
              >
                Optional. Leave empty to allow access from any IP address.
              </div>
            </div>

            <div className="freeui-api-key-form__field">
              <label className="freeui-api-key-form__checkbox-label">
                <input
                  type="checkbox"
                  className="freeui-api-key-form__checkbox"
                  checked={enableRateLimit}
                  onChange={(e) => setEnableRateLimit(e.target.checked)}
                />
                <span className="freeui-api-key-form__checkbox-text">
                  Configure rate limiting
                </span>
              </label>

              {enableRateLimit && (
                <div className="freeui-api-key-form__rate-limit">
                  <div className="freeui-api-key-form__rate-limit-field">
                    <label
                      htmlFor="rate-limit-requests"
                      className="freeui-api-key-form__label"
                    >
                      Requests per minute
                    </label>
                    <Input
                      id="rate-limit-requests"
                      type="number"
                      min="1"
                      max="10000"
                      value={formData.rateLimit?.requestsPerMinute || 60}
                      onChange={(e) =>
                        handleRateLimitChange(
                          "requestsPerMinute",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="freeui-api-key-form__rate-limit-field">
                    <label
                      htmlFor="rate-limit-burst"
                      className="freeui-api-key-form__label"
                    >
                      Burst size
                    </label>
                    <Input
                      id="rate-limit-burst"
                      type="number"
                      min="1"
                      max="1000"
                      value={formData.rateLimit?.burstSize || 10}
                      onChange={(e) =>
                        handleRateLimitChange(
                          "burstSize",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="freeui-api-key-form__actions">
            <Button type="button" variant="outline" disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!isValid || loading}
              loading={loading}
            >
              Create API Key
            </Button>
          </div>
        </form>
      </Card>
    );
  }
);

ApiKeyForm.displayName = "ApiKeyForm";
