export default function AdminPage() {
  const submissions = [
    {
      title: "Friday Islamic Lecture",
      district: "Malappuram",
      speaker: "Usthad Abdul Rahman",
    },
    {
      title: "Youth Quran Camp",
      district: "Kozhikode",
      speaker: "Shafi Usthad",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid gap-6">
        {submissions.map((submission, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <h2 className="text-2xl font-bold">
              {submission.title}
            </h2>
            <p>{submission.district}</p>
            <p>{submission.speaker}</p>

            <div className="flex gap-4 mt-4">
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl">
                Approve
              </button>

              <button className="bg-red-600 text-white px-4 py-2 rounded-xl">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
