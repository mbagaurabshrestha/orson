
export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Profile</h1>
      <p>User ID: {params.id}</p>
    </div>
  );
}