/**
 * Authentication and API key management types for FreeState integration
 */

export interface ApiKey {
  /** Unique identifier for the API key */
  id: string;
  /** Human-readable name for the key */
  name: string;
  /** Key value (may be masked for security) */
  key: string;
  /** Scope and permissions for this key */
  permissions: string[];
  /** ISO timestamp when key was created */
  createdAt: string;
  /** ISO timestamp when key was last used */
  lastUsedAt?: string;
  /** ISO timestamp when key expires (null for no expiration) */
  expiresAt?: string;
  /** Current status of the key */
  status: "active" | "expired" | "revoked" | "suspended";
  /** User who created this key */
  createdBy: {
    id: string;
    name: string;
    email?: string;
  };
  /** Optional metadata about the key */
  metadata?: {
    /** Description or purpose of the key */
    description?: string;
    /** Source application or service */
    source?: string;
    /** IP address restrictions */
    ipRestrictions?: string[];
    /** Rate limiting configuration */
    rateLimit?: {
      requestsPerMinute: number;
      burstSize: number;
    };
  };
}

export interface JwtToken {
  /** Unique identifier for the token */
  id: string;
  /** JWT token value (may be masked) */
  token: string;
  /** Token type (access, refresh, etc.) */
  type: "access" | "refresh" | "id";
  /** Subject (user ID) */
  subject: string;
  /** Issuer of the token */
  issuer: string;
  /** Audience for the token */
  audience: string[];
  /** ISO timestamp when token was issued */
  issuedAt: string;
  /** ISO timestamp when token expires */
  expiresAt: string;
  /** Token status */
  status: "active" | "expired" | "revoked";
  /** Scopes granted by this token */
  scopes: string[];
  /** Claims included in the token */
  claims?: Record<string, unknown>;
}

export interface AuthEvent {
  /** Unique identifier for the auth event */
  id: string;
  /** Type of authentication event */
  type: 
    | "api_key_created"
    | "api_key_revoked"
    | "api_key_rotated"
    | "api_key_used"
    | "jwt_issued"
    | "jwt_refreshed"
    | "jwt_revoked"
    | "login_success"
    | "login_failure"
    | "logout"
    | "permission_granted"
    | "permission_denied";
  /** ISO timestamp when event occurred */
  timestamp: string;
  /** User associated with the event */
  user: {
    id: string;
    name: string;
    email?: string;
  };
  /** Resource affected (API key ID, JWT ID, etc.) */
  resourceId?: string;
  /** Resource type */
  resourceType?: "api_key" | "jwt_token" | "user_session";
  /** Details about the event */
  details: {
    /** Human-readable description */
    description: string;
    /** Client information */
    userAgent?: string;
    /** IP address */
    ipAddress?: string;
    /** Success status */
    success: boolean;
    /** Error message if failed */
    error?: string;
    /** Additional metadata */
    metadata?: Record<string, unknown>;
  };
}

export interface AuthenticationConfig {
  /** JWT configuration */
  jwt: {
    /** Secret key for signing (not exposed in UI) */
    algorithm: string;
    /** Token expiration time */
    expiresIn: string;
    /** Refresh token expiration */
    refreshExpiresIn: string;
    /** Issuer identifier */
    issuer: string;
    /** Audience identifier */
    audience: string[];
  };
  /** API key configuration */
  apiKeys: {
    /** Default expiration time for new keys */
    defaultExpiresIn?: string;
    /** Maximum number of active keys per user */
    maxKeysPerUser: number;
    /** Allowed permission scopes */
    availableScopes: string[];
  };
  /** Security settings */
  security: {
    /** Require IP restrictions for API keys */
    requireIpRestrictions: boolean;
    /** Enable rate limiting */
    enableRateLimit: boolean;
    /** Default rate limit */
    defaultRateLimit: {
      requestsPerMinute: number;
      burstSize: number;
    };
  };
}

// Component Props Interfaces

export interface ApiKeyListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of API keys to display */
  apiKeys: ApiKey[];
  /** Currently selected API key ID */
  selectedKeyId?: string;
  /** Callback when an API key is selected */
  onKeySelect?: (apiKey: ApiKey) => void;
  /** Callback when an API key should be revoked */
  onKeyRevoke?: (apiKey: ApiKey) => void;
  /** Callback when an API key should be rotated */
  onKeyRotate?: (apiKey: ApiKey) => void;
  /** Whether the list is loading */
  loading?: boolean;
  /** Error message to display */
  error?: string;
  /** Whether to show actions (revoke, rotate) */
  showActions?: boolean;
  /** Compact display mode */
  compact?: boolean;
}

export interface ApiKeyFormProps extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Available permission scopes */
  availableScopes: string[];
  /** Callback when form is submitted */
  onSubmit: (formData: ApiKeyFormData) => void;
  /** Whether form is submitting */
  loading?: boolean;
  /** Form validation errors */
  errors?: Partial<ApiKeyFormData>;
  /** Initial form values */
  initialValues?: Partial<ApiKeyFormData>;
}

export interface ApiKeyFormData {
  /** Name for the API key */
  name: string;
  /** Description of the key's purpose */
  description?: string;
  /** Selected permission scopes */
  permissions: string[];
  /** Expiration date (optional) */
  expiresAt?: string;
  /** IP address restrictions */
  ipRestrictions?: string[];
  /** Rate limiting settings */
  rateLimit?: {
    requestsPerMinute: number;
    burstSize: number;
  };
}

export interface AuthTokenStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Token to display status for */
  token: ApiKey | JwtToken;
  /** Token type for proper display */
  tokenType: "api_key" | "jwt";
  /** Whether to show detailed information */
  detailed?: boolean;
  /** Callback for status actions */
  onAction?: (action: "revoke" | "refresh" | "details") => void;
}

export interface ApiKeyActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** API key for actions */
  apiKey: ApiKey;
  /** Available actions */
  actions?: ("revoke" | "rotate" | "edit" | "details")[];
  /** Callback when action is triggered */
  onAction: (action: string, apiKey: ApiKey) => void;
  /** Whether actions are disabled */
  disabled?: boolean;
  /** Loading state for specific actions */
  loadingActions?: string[];
}

export interface AuthenticationAuditProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of authentication events */
  events: AuthEvent[];
  /** Filter by event type */
  eventTypeFilter?: AuthEvent["type"][];
  /** Filter by user */
  userFilter?: string;
  /** Filter by date range */
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  /** Whether audit log is loading */
  loading?: boolean;
  /** Error message to display */
  error?: string;
  /** Maximum number of events to show initially */
  maxEvents?: number;
  /** Whether to group events by date */
  groupByDate?: boolean;
  /** Callback when filters change */
  onFilterChange?: (filters: {
    eventTypes?: AuthEvent["type"][];
    user?: string;
    dateRange?: { startDate: string; endDate: string };
  }) => void;
}

export interface JwtTokenViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** JWT token to display */
  token: JwtToken;
  /** Whether to show token value (masked by default) */
  showTokenValue?: boolean;
  /** Whether to show decoded payload */
  showPayload?: boolean;
  /** Whether token details are loading */
  loading?: boolean;
  /** Error message to display */
  error?: string;
  /** Callback for token actions */
  onAction?: (action: "revoke" | "refresh" | "copy") => void;
}