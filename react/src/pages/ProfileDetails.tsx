import { useParams } from "react-router";

export default function ProfileDetails() {
  const params = useParams<{ profileId: string }>();
  const profileId = params.profileId;
  return <h1>Hello! {profileId}</h1>;
}
