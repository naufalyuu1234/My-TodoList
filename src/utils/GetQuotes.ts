const quotes = [
  {
    q: "Hidup adalah eksperimen. Makin banyak eksperimen yang kamu lakukan, makin baik.",
    a: "Ralph Waldo Emerson",
  },
  {
    q: "Sukses bukanlah kunci kebahagiaan. Kebahagiaan adalah kunci kesuksesan. Jika kamu mencintai apa yang kamu kerjakan, kamu akan sukses.",
    a: "Albert Schweitzer",
  },
  {
    q: "Jangan biarkan apa yang tidak bisa kamu lakukan mengganggu apa yang bisa kamu lakukan.",
    a: "John Wooden",
  },
  {
    q: "Kegagalan adalah kesempatan untuk memulai lagi dengan lebih cerdas.",
    a: "Henry Ford",
  },
  {
    q: "Produktivitas bukan tentang melakukan lebih banyak hal, tapi tentang melakukan hal yang benar.",
    a: "Tim Ferriss",
  },
  {
    q: "Belajarlah seolah-olah kamu akan hidup selamanya. Hiduplah seakan-akan kamu akan mati besok.",
    a: "Mahatma Gandhi",
  },
  {
    q: "Pendidikan adalah seni membantu orang muda untuk belajar menemukan kesenangan dalam hal yang benar",
    a: "Plato",
  },
  {
    q: "Yang penting bukan seberapa pintar kamu, tetapi seberapa keras kamu berusaha.",
    a: "albert Einstein",
  },
];

export default function getDailyQuote() {
  const randomQuote = Math.floor(Math.random() * quotes.length);
  return quotes[randomQuote];
}
