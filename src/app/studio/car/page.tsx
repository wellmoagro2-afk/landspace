import ThematicPageTemplate from "../components/ThematicPageTemplate";
import { thematicData } from "../thematic-data";

export default function CARPage() {
  return <ThematicPageTemplate data={thematicData['car']} />;
}
