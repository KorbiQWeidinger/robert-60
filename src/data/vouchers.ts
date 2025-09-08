import { createAudioPath, createImagePath } from "@/config/paths";

export interface Song {
  id: number;
  title: string;
  file: string;
  voucherId: number;
}

export interface Voucher {
  id: number;
  title: string;
  description: string;
  details?: string;
  images: string[];
  songs: Song[];
}

export const songs: Song[] = [
  {
    id: 1,
    title: "Roberts Alpen Abenteuer",
    file: createAudioPath("radl_1.mp3"),
    voucherId: 2,
  },
  {
    id: 2,
    title: "Roberts Radl Odyssee",
    file: createAudioPath("radl_2.mp3"),
    voucherId: 2,
  },
  {
    id: 3,
    title: "Robert, Zürich und die Schokolade",
    file: createAudioPath("zuerich_1.mp3"),
    voucherId: 1,
  },
  {
    id: 4,
    title: "Zürich mit Robert",
    file: createAudioPath("zuerich_2.mp3"),
    voucherId: 1,
  },
  {
    id: 5,
    title: "Espresso Soul",
    file: createAudioPath("espresso_1.mp3"),
    voucherId: 3,
  },
  {
    id: 5,
    title: "Der Barista aus der Au",
    file: createAudioPath("espresso_2.mp3"),
    voucherId: 3,
  },
];

export const vouchers: Voucher[] = [
  {
    id: 1,
    title: "Zürich Schokoladenfabrik",
    description: "Ein süßer Ausflug zur Schokoladenfabrik in Zürich",
    details:
      "Besuche die berühmte Schokoladenfabrik in Zürich und lerne alles über die Herstellung von Schweizer Schokolade. Inklusive Verkostung und einem kleinen Geschenkpaket!",
    images: [
      createImagePath("zuerich_1.png"),
      createImagePath("zuerich_2.png"),
    ],
    songs: songs.filter((song) => song.voucherId === 1),
  },
  {
    id: 2,
    title: "Radl-Abenteuer",
    description: "Eine gemeinsame Radltour für Vater und Sohn",
    details:
      "Eine entspannte Radltour durch die schöne Landschaft. Perfekt für Vater und Sohn, um gemeinsam Zeit zu verbringen und die Natur zu genießen. Fahrräder werden gestellt!",
    images: [
      createImagePath("radl_1.png"),
      createImagePath("radl_2.png"),
      createImagePath("radl_3.png"),
    ],
    songs: songs.filter((song) => song.voucherId === 2),
  },
  {
    id: 3,
    title: "Barista-Kurs",
    description: "Lerne die Kunst des perfekten Kaffees",
    details:
      "Entdecke die Geheimnisse der Kaffeezubereitung! In diesem Kurs lernst du, wie man den perfekten Espresso, Cappuccino und Latte Art zubereitet. Inklusive Verkostung verschiedener Kaffeesorten.",
    images: [
      createImagePath("espresso_1.png"),
      createImagePath("espresso_2.png"),
    ],
    songs: songs.filter((song) => song.voucherId === 3),
  },
];
