// Shared TypeScript types for ServiceNow API integration
// Used across mobile app and backend services

export interface ServiceNowRecord {
  sys_id: string;
  sys_created_on: string;
  sys_updated_on: string;
  sys_created_by: string;
  sys_updated_by: string;
}

export interface Incident extends ServiceNowRecord {
  number: string;
  state: IncidentState;
  priority: Priority;
  assigned_to?: User;
  caller_id?: User;
  short_description: string;
  description?: string;
  category?: string;
  subcategory?: string;
  opened_at: string;
  resolved_at?: string;
  closed_at?: string;
  work_notes?: string;
  comments?: string;
}

export interface Asset extends ServiceNowRecord {
  asset_tag: string;
  display_name: string;
  state: AssetState;
  model_category?: string;
  assigned_to?: User;
  location?: string;
  cost?: number;
  purchase_date?: string;
  warranty_expiration?: string;
  model?: string;
  manufacturer?: string;
}

export interface User extends ServiceNowRecord {
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  title?: string;
  department?: string;
  active: boolean;
}

// ServiceNow State Enums
export enum IncidentState {
  New = 1,
  InProgress = 2,
  OnHold = 3,
  Resolved = 6,
  Closed = 7,
  Canceled = 8
}

export enum Priority {
  Critical = 1,
  High = 2,
  Moderate = 3,
  Low = 4,
  Planning = 5
}

export enum AssetState {
  InStock = 1,
  InUse = 2,
  InMaintenance = 3,
  Retired = 7,
  Missing = 8
}

// API Response Types
export interface ServiceNowListResponse<T> {
  result: T[];
}

export interface ServiceNowResponse<T> {
  result: T;
}

// OAuth Types
export interface ServiceNowOAuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface ServiceNowTokenRefreshResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

// Webhook Types
export interface ServiceNowWebhookPayload {
  event_type: string;
  table: string;
  operation: 'insert' | 'update' | 'delete';
  record: Partial<ServiceNowRecord>;
  user: Partial<User>;
  timestamp: string;
}