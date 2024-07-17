import React from "react";
import Header from "../layout/Header";
import Banner from "../layout/Banner";
import PodcastList from "../podcast/PodcastList";
import Footer from "../layout/Footer";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Banner />
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-green-700 mb-8">
              Our Podcasts
            </h2>
          </div>
        </section>
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-green-700 mb-8">
              Why Listen to Our Podcasts?
            </h2>
            <div className="flex justify-center align-middle gap-8 text-center">
              <div className="p-6 bg-green-50 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-green-600 mb-4">
                  Engaging Content
                </h3>
                <p>
                  Our podcasts are designed to keep you engaged while learning
                  English.
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-green-600 mb-4">
                  Learn Anytime, Anywhere
                </h3>
                <p>
                  Access our podcasts on your web browser, smartphone, or
                  desktop, anytime.
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-green-600 mb-4">
                  Free of Charge
                </h3>
                <p>
                  All our content is available for free, helping you learn
                  without any cost.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-green-700 mb-8">
              Testimonials
            </h2>
            <div className="flex justify-center align-middle gap-8">
              <div className="p-6 bg-white rounded-lg shadow-md flex-grow">
                <p>"These podcasts have improved my English significantly!"</p>
                <p className="mt-4 text-right">- John Doe</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <p>
                  "I love listening to these podcasts while commuting. Very
                  informative and engaging!"
                </p>
                <p className="mt-4 text-right">- Jane Smith</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
