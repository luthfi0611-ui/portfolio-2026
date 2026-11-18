export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="p-12">
      <h1 className="text-4xl font-bold">Proyek: {slug}</h1>
    </main>
  );
}