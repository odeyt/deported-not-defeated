import type { CountryData } from "./schema";

import mexico from "./mexico";
import elSalvador from "./el-salvador";
import guatemala from "./guatemala";
import honduras from "./honduras";
import belize from "./belize";
import nicaragua from "./nicaragua";
import costaRica from "./costa-rica";
import panama from "./panama";
import jamaica from "./jamaica";
import dominicanRepublic from "./dominican-republic";
import haiti from "./haiti";
import cuba from "./cuba";
import bahamas from "./bahamas";
import trinidadAndTobago from "./trinidad-and-tobago";
import colombia from "./colombia";
import venezuela from "./venezuela";
import brazil from "./brazil";
import peru from "./peru";
import ecuador from "./ecuador";
import guyana from "./guyana";
import laos from "./laos";
import cambodia from "./cambodia";
import vietnam from "./vietnam";
import philippines from "./philippines";
import thailand from "./thailand";
import myanmar from "./myanmar";
import indonesia from "./indonesia";
import nepal from "./nepal";
import india from "./india";
import pakistan from "./pakistan";
import bangladesh from "./bangladesh";
import china from "./china";
import nigeria from "./nigeria";
import ghana from "./ghana";
import liberia from "./liberia";
import cameroon from "./cameroon";
import ethiopia from "./ethiopia";
import somalia from "./somalia";
import sierraLeone from "./sierra-leone";
import unitedKingdom from "./united-kingdom";
import romania from "./romania";
import albania from "./albania";
import poland from "./poland";
import ukraine from "./ukraine";
import russia from "./russia";

export const allCountries: CountryData[] = [
  mexico,
  elSalvador,
  guatemala,
  honduras,
  belize,
  nicaragua,
  costaRica,
  panama,
  jamaica,
  dominicanRepublic,
  haiti,
  cuba,
  bahamas,
  trinidadAndTobago,
  colombia,
  venezuela,
  brazil,
  peru,
  ecuador,
  guyana,
  laos,
  cambodia,
  vietnam,
  philippines,
  thailand,
  myanmar,
  indonesia,
  nepal,
  india,
  pakistan,
  bangladesh,
  china,
  nigeria,
  ghana,
  liberia,
  cameroon,
  ethiopia,
  somalia,
  sierraLeone,
  unitedKingdom,
  romania,
  albania,
  poland,
  ukraine,
  russia,
];

export const countriesBySlug: Record<string, CountryData> = Object.fromEntries(
  allCountries.map((c) => [c.slug, c])
);
