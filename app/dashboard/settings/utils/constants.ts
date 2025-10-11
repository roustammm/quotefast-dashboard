// Constants voor Settings pagina

export const INACTIVITY_TIMEOUT_OPTIONS = [
  { value: 1, label: '1 minuut' },
  { value: 5, label: '5 minuten' },
  { value: 10, label: '10 minuten' },
  { value: 15, label: '15 minuten' },
  { value: 30, label: '30 minuten' },
  { value: 60, label: '1 uur' },
];

export const LANGUAGE_OPTIONS = [
  { value: 'nl', label: 'Nederlands' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
];

export const TIMEZONE_OPTIONS = [
  { value: 'Europe/Amsterdam', label: 'Europe/Amsterdam (CET)' },
  { value: 'Europe/Brussels', label: 'Europe/Brussels (CET)' },
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'America/New York (EST)' },
  { value: 'America/Los_Angeles', label: 'America/Los Angeles (PST)' },
  { value: 'Asia/Tokyo', label: 'Asia/Tokyo (JST)' },
];

export const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
] as const;

export const DEFAULT_NOTIFICATION_SETTINGS = {
  emailNotifications: true,
  pushNotifications: true,
  smsAlerts: false,
  projectUpdates: true,
  teamMentions: true,
  systemMaintenance: true,
};

export const NOTIFICATION_PREFERENCES = [
  {
    id: 'emailNotifications',
    label: 'Email notificaties',
    description: 'Ontvang updates via email',
  },
  {
    id: 'pushNotifications',
    label: 'Push notificaties',
    description: 'Krijg real-time alerts',
  },
  {
    id: 'smsAlerts',
    label: 'SMS alerts',
    description: 'Kritieke updates via SMS',
  },
  {
    id: 'projectUpdates',
    label: 'Project updates',
    description: 'Notificaties over project wijzigingen',
  },
  {
    id: 'teamMentions',
    label: 'Team vermeldingen',
    description: 'Wanneer iemand je vermeldt',
  },
  {
    id: 'systemMaintenance',
    label: 'Systeem onderhoud',
    description: 'Gepland onderhouds alerts',
  },
];

export const SETTINGS_TABS = [
  { id: 'profile', label: 'Profile' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'security', label: 'Security' },
  { id: 'apiKeys', label: 'API Keys' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'aiPersonalization', label: 'AI Personalisatie' },
  { id: 'system', label: 'System' },
] as const;

export type SettingsTab = typeof SETTINGS_TABS[number]['id'];

