import React from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Shield, Truck, Star } from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { id } = useParams();

  // Temporary product data - in a real app, this would come from an API
  const product = {
    id: parseInt(id || '1'),
    name: 'Premium Wireless Earbuds',
    price: 79.99,
    description: 'High-quality wireless earbuds with noise cancellation and premium sound quality.',
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.5,
    reviews: 128,
    features: [
      'Active Noise Cancellation',
      'Bluetooth 5.0',
      'Up to 24h Battery Life',
      'Touch Controls',
      'Water Resistant'
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full rounded-lg"
              />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      size={20}
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <span className="ml-2 text-slate-600">({product.reviews} reviews)</span>
              </div>
              
              <p className="text-3xl font-bold text-amber-600 mb-6">${product.price}</p>
              
              <p className="text-slate-600 mb-6">{product.description}</p>
              
              <div className="space-y-4 mb-8">
                <h3 className="font-semibold text-slate-800">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-slate-600">
                      <Star size={16} className="text-amber-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-amber-600 transition-colors">
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </button>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center text-slate-600">
                  <Truck size={20} className="mr-2 text-amber-500" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Shield size={20} className="mr-2 text-amber-500" />
                  <span>Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;