import FundingCRM from "../../features/funding/FundingCRM";
import { getBusinesses } from "../../features/funding/remote";

/** Re-read the portfolio from Firestore at most once a minute, so edits made
 *  in the Firebase console show up without a redeploy. */
export const revalidate = 60;

export default async function WorkspacePage() {
  const businesses = await getBusinesses();
  return <FundingCRM initialBusinesses={businesses} />;
}
