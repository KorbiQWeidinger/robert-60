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
  signatures: string[];
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
    title: "Der Barista aus der Au",
    file: createAudioPath("espresso_2.mp3"),
    voucherId: 3,
  },
  {
    id: 6,
    title: "Espresso Soul",
    file: createAudioPath("espresso_1.mp3"),
    voucherId: 3,
  },
];

export const vouchers: Voucher[] = [
  {
    id: 1,
    title: "Zürich Schokoladenfabrik",
    description: "Ein süßer Ausflug zur Schokoladenfabrik in Zürich",
    details:
      "Lieber Papa, Sohn, Schwiegervater, besuche mit der coolen Familie die berühmte Schokoladenfabrik in Zürich und lerne mehr über die Herstellung der Schweizer Schokolade. Wir freuen uns auf ein spannendes Wochenende mit dir!",
    signatures: ["Annemarie", "Albert", "Korbi", "Sabri"],
    images: [
      createImagePath("zuerich_1.mp4"),
      createImagePath("zuerich_2.png"),
      createImagePath("zuerich_3.png"),
    ],
    songs: songs.filter((song) => song.voucherId === 1),
  },
  {
    id: 2,
    title: "Barista-Kurs",
    description: "Lerne die Kunst des perfekten Kaffees",
    details:
      "Lieber Papa, wir gehen zusammen zum ZURINGA Home Barista Kurs! Damit du noch besser in die Kunst des perfekten Kaffees einsteigen kannst!",
    images: [
      createImagePath("espresso_3.png"),
      createImagePath("espresso_1.png"),
      createImagePath("espresso_2.png"),
    ],
    signatures: ["Korbi"],
    songs: songs.filter((song) => song.voucherId === 3),
  },
  {
    id: 3,
    title: "Radl-Abenteuer",
    description: "Eine gemeinsame Radltour",
    details: `Lieber Papa, unsere letzte Radtour ist zu lange her! Und du hast gleich zwei tolle neue Fahrräder! Also ist es Zeit für eine "gemütliche" Radtour! Vielleicht lässt sich diese ja gut mit Zürich verbinden.`,
    images: [
      createImagePath("radl_1.png"),
      createImagePath("radl_2.mp4"),
      createImagePath("radl_3.png"),
    ],
    signatures: ["Korbi"],
    songs: songs.filter((song) => song.voucherId === 2),
  },
];
