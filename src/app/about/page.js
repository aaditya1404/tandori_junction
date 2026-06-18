export default function AboutPage() {

  return (

    <div className="min-h-screen bg-zinc-900 text-white">

      <section className="py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-5xl font-bold text-center mb-6">
            About Tandoori Junction
          </h1>

          <p className="text-center text-zinc-400 max-w-3xl mx-auto">
            Welcome to Tandoori Junction, where authentic
            Indian flavours meet warm hospitality. We bring
            together traditional recipes, fresh ingredients,
            and a passion for great food to create an
            unforgettable dining experience.
          </p>

        </div>

      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>

            <img
              src="/images/about/restaurant.jpg"
              alt="Restaurant"
              className="rounded-xl"
            />

          </div>

          <div>

            <h2 className="text-3xl font-bold mb-4">
              Our Story
            </h2>

            <p className="text-zinc-300 leading-8">
              Tandoori Junction was founded with a simple
              vision: to serve delicious, hygienic, and
              authentic Indian food at affordable prices.
              From smoky tandoori dishes to flavourful
              curries, biryanis, rolls, momos, and snacks,
              every dish is prepared with care and passion.
            </p>

          </div>

        </div>

      </section>

      <section className="py-16 bg-zinc-800">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-zinc-900 p-6 rounded-xl text-center">
              🍽️
              <h3 className="text-xl font-semibold mt-3">
                Fresh Ingredients
              </h3>
            </div>

            <div className="bg-zinc-900 p-6 rounded-xl text-center">
              👨‍🍳
              <h3 className="text-xl font-semibold mt-3">
                Authentic Recipes
              </h3>
            </div>

            <div className="bg-zinc-900 p-6 rounded-xl text-center">
              ⭐
              <h3 className="text-xl font-semibold mt-3">
                Best Quality
              </h3>
            </div>

            <div className="bg-zinc-900 p-6 rounded-xl text-center">
              ❤️
              <h3 className="text-xl font-semibold mt-3">
                Hygienic & Fresh
              </h3>
            </div>

          </div>

        </div>

      </section>

    </div>

  );

}