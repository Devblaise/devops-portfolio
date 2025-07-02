export default function ResumePage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-green-600">📄 Résumé</h1>
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-blue-500 underline"
      >
        View my résumé (PDF)
      </a>
    </main>
  );
}
