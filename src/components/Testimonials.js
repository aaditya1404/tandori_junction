export default function Testimonials() {
  const reviews = [
    {
      name: "Rahul",
      review:
        "Amazing food and quick service.",
    },
    {
      name: "Priya",
      review:
        "Best biryani in town.",
    },
    {
      name: "Amit",
      review:
        "Loved the tandoori dishes.",
    },
  ];

  return (
    <section className="py-24 bg-zinc-950 text-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-16">
          Customer Reviews
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {reviews.map((review, index) => (
            <div
              key={index}
              className="
              bg-zinc-900
              p-6
              rounded-xl
              "
            >
              <div className="text-orange-500 mb-4">
                ★★★★★
              </div>

              <p>{review.review}</p>

              <h3 className="mt-4 font-bold">
                {review.name}
              </h3>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}