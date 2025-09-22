/**
 * State versioning and audit trail types for FreeState integration
 */

export interface StateVersion {
  /** Unique identifier for the version */
  id: string;
  /** Version number (semantic versioning or incremental) */
  version: string;
  /** Human-readable description of changes */
  description: string;
  /** ISO timestamp of when version was created */
  createdAt: string;
  /** User who created this version */
  author: {
    id: string;
    name: string;
    email?: string;
  };
  /** State content (JSON or other format) */
  content: any;
  /** Hash/checksum for integrity verification */
  checksum: string;
  /** Size of the state in bytes */
  size: number;
  /** Tags associated with this version */
  tags?: string[];
}

export interface AuditLogEntry {
  /** Unique identifier for the audit entry */
  id: string;
  /** Type of operation performed */
  operation: "create" | "update" | "rollback" | "delete" | "view" | "diff";
  /** Version ID that was affected */
  versionId: string;
  /** User who performed the operation */
  user: {
    id: string;
    name: string;
    email?: string;
  };
  /** ISO timestamp of when operation occurred */
  timestamp: string;
  /** Additional metadata about the operation */
  metadata?: {
    /** For rollback operations, the version rolled back to */
    rollbackTo?: string;
    /** For diff operations, versions being compared */
    compareVersions?: [string, string];
    /** User agent or client information */
    userAgent?: string;
    /** IP address (if available and privacy-compliant) */
    ipAddress?: string;
  };
  /** Human-readable description of the operation */
  description: string;
}

export interface VersionDiffData {
  /** Source version for comparison */
  sourceVersion: StateVersion;
  /** Target version for comparison */
  targetVersion: StateVersion;
  /** Diff result with additions, deletions, and changes */
  diff: {
    /** Added lines/properties */
    additions: DiffChunk[];
    /** Removed lines/properties */
    deletions: DiffChunk[];
    /** Modified lines/properties */
    modifications: DiffChunk[];
  };
}

export interface DiffChunk {
  /** Path to the changed property (for nested objects) */
  path: string;
  /** Original value (for deletions and modifications) */
  oldValue?: any;
  /** New value (for additions and modifications) */
  newValue?: any;
  /** Line number in the content (for text-based diffs) */
  lineNumber?: number;
  /** Type of change */
  type: "addition" | "deletion" | "modification";
}

export interface VersionListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of state versions to display */
  versions: StateVersion[];
  /** Currently selected version ID */
  selectedVersionId?: string;
  /** Callback when a version is selected */
  onVersionSelect?: (version: StateVersion) => void;
  /** Whether to show the loading state */
  loading?: boolean;
  /** Error message to display */
  error?: string;
  /** Whether the list is in compact mode */
  compact?: boolean;
}

export interface VersionViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Version to display */
  version: StateVersion;
  /** Whether to show raw JSON or formatted view */
  viewMode?: "formatted" | "raw";
  /** Whether content is loading */
  loading?: boolean;
  /** Error message to display */
  error?: string;
}

export interface VersionDiffProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Diff data to display */
  diffData: VersionDiffData;
  /** Layout orientation */
  layout?: "side-by-side" | "unified";
  /** Whether to show line numbers */
  showLineNumbers?: boolean;
  /** Whether diff is loading */
  loading?: boolean;
  /** Error message to display */
  error?: string;
}

export interface AuditTrailProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of audit log entries */
  entries: AuditLogEntry[];
  /** Whether to show the loading state */
  loading?: boolean;
  /** Error message to display */
  error?: string;
  /** Maximum number of entries to show initially */
  maxEntries?: number;
  /** Whether to group entries by date */
  groupByDate?: boolean;
}

export interface RollbackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Version to rollback to */
  targetVersion: StateVersion;
  /** Current version being rolled back from */
  currentVersion: StateVersion;
  /** Callback when rollback is confirmed */
  onRollback: (targetVersionId: string) => void;
  /** Whether rollback operation is in progress */
  loading?: boolean;
  /** Whether rollback is disabled */
  disabled?: boolean;
  /** Button size */
  size?: "sm" | "md" | "lg";
  /** Button variant */
  variant?: "primary" | "secondary" | "outline" | "ghost";
}