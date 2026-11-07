import { CockpitPage } from "../_components/CockpitPage";
import { cockpitMetadata } from "../_data/metadata";

export const metadata = cockpitMetadata("fr");

export default function Page() {
  return <CockpitPage lang="fr" />;
}
