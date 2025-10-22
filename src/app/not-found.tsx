export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold mb-4 text-gray-800">404</h1>
      <p className="text-lg text-gray-600 mb-8">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <a
        href="/"
        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Go Back Home
      </a>
    </section>
  );
}
