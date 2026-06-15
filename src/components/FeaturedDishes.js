export default function FeaturedDishes() {
  const dishes = [
    "Chicken Biryani",
    "Paneer Butter Masala",
    "Chicken Tikka",
    "Veg Chowmein",
  ];

  return (
    <section className="py-20 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Best Sellers
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {dishes.map((dish) => (
            <div
              key={dish}
              className="
              bg-white
              p-6
              rounded-xl
              shadow
              "
            >
              <h3 className="font-semibold">
                {dish}
              </h3>

              <p className="text-orange-600 mt-2">
                ₹199
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}