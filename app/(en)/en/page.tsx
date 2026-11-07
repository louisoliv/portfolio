import { CockpitPage } from "../../_components/CockpitPage";
import { cockpitMetadata } from "../../_data/metadata";

export const metadata = cockpitMetadata("en");

export default function Page() {
  return <CockpitPage lang="en" />;
}
