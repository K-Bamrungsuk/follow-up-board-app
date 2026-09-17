type IconName =
  | "activity"
  | "bell"
  | "calendar"
  | "chart"
  | "check"
  | "chevron"
  | "clock"
  | "dashboard"
  | "download"
  | "edit"
  | "filter"
  | "history"
  | "mail"
  | "more"
  | "note"
  | "phone"
  | "pie"
  | "plus"
  | "search"
  | "settings"
  | "sparkles"
  | "sync"
  | "trash"
  | "upload"
  | "user"
  | "users"
  | "video"
  | "x";

const paths: Record<IconName, string> = {
  activity: "M3 12h4l2.4-7 4.2 14 2.4-7h5",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
  calendar: "M7 2v3m10-3v3M3 9h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2m7 8v4l3 2",
  chart: "M4 20V10m6 10V4m6 16v-7m4 7H2",
  check: "m5 12 4 4L19 6",
  chevron: "m9 18 6-6-6-6",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20m0-14v5l3 2",
  dashboard: "M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z",
  download: "M12 3v12m-5-5 5 5 5-5M5 21h14",
  edit: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z",
  filter: "M4 5h16l-6 7v5l-4 2v-7z",
  history: "M3 12a9 9 0 1 0 3-6.7L3 8m0-5v5h5m4-1v5l3 2",
  mail: "M3 5h18v14H3zm0 1 9 7 9-7",
  more: "M5 12h.01M12 12h.01M19 12h.01",
  note: "M5 3h14v18H5zm4 5h6M9 12h6m-6 4h4",
  phone: "M5 3h4l2 5-3 2a16 16 0 0 0 6 6l2-3 5 2v4c0 1-1 2-2 2A18 18 0 0 1 3 5c0-1 1-2 2-2",
  pie: "M12 2v10h10A10 10 0 0 0 12 2m-2 3a8 8 0 1 0 9 9h-9z",
  plus: "M12 5v14M5 12h14",
  search: "m21 21-4.3-4.3M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  settings: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M19.4 15a2 2 0 0 0 .4 2.2l-2.6 2.6a2 2 0 0 0-2.2-.4l-1-.4a2 2 0 0 0-4 0l-1 .4a2 2 0 0 0-2.2.4l-2.6-2.6A2 2 0 0 0 4.6 15l-.4-1a2 2 0 0 0 0-4l.4-1a2 2 0 0 0-.4-2.2l2.6-2.6A2 2 0 0 0 9 4.6l1-.4a2 2 0 0 0 4 0l1 .4a2 2 0 0 0 2.2-.4l2.6 2.6a2 2 0 0 0-.4 2.2l.4 1a2 2 0 0 0 0 4z",
  sparkles: "m12 3 1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3zM5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8zm14-2 .8 2.2L22 16l-2.2.8L19 19l-.8-2.2L16 16l2.2-.8z",
  sync: "M20 7h-5V2m4 5a8 8 0 0 0-13-2M4 17h5v5m-4-5a8 8 0 0 0 13 2",
  trash: "M4 7h16m-10 4v6m4-6v6M9 7V4h6v3m-9 0 1 14h10l1-14",
  upload: "M12 16V4m-5 5 5-5 5 5M5 20h14",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8m-7 9a7 7 0 0 1 14 0",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8m13 10v-2a4 4 0 0 0-3-3.9m0-12a4 4 0 0 1 0 7.8",
  video: "M3 6h13v12H3zm13 4 5-3v10l-5-3",
  x: "M6 6l12 12M18 6 6 18",
};

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d={paths[name]} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}
