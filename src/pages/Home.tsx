import React from 'react';
import { ShoppingBag, TrendingUp, Truck, Shield } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Premium Products at 
              <span className="text-amber-500"> Amazing Prices</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Shop the latest trends with confidence. Quality products, fast shipping, and exceptional service.
            </p>
            <a 
              href="/products" 
              className="inline-flex items-center bg-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-600 transition-colors"
            >
              <ShoppingBag className="mr-2" size={20} />
              Shop Now
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<TrendingUp size={24} />}
              title="Latest Trends"
              description="Stay ahead with our curated collection of trending products"
            />
            <FeatureCard 
              icon={<Truck size={24} />}
              title="Fast Shipping"
              description="Quick delivery to your doorstep with reliable tracking"
            />
            <FeatureCard 
              icon={<Shield size={24} />}
              title="Secure Shopping"
              description="Shop with confidence with our secure payment system"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-slate-50 p-6 rounded-lg text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

export default Home;