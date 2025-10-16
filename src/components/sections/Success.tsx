import React from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const Success: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { name?: string; projectType?: string } | null;

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-500" size={32} />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-800 mb-4">
          Thank You{state?.name ? `, ${state.name}` : ''}!
        </h1>
        
        <p className="text-slate-600 mb-6">
          {state?.projectType ? (
            <>Your {state.projectType} project inquiry has been received. I'll review the details and get back to you within 24 hours with a custom quote.</>
          ) : (
            <>Your project inquiry has been received. I'll review the details and get back to you within 24 hours with a custom quote.</>
          )}
        </p>
        
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <h2 className="font-semibold text-slate-800 mb-2">What's Next?</h2>
            <ul className="text-left text-slate-600 space-y-2">
              <li className="flex items-start">
                <CheckCircle className="text-amber-500 mr-2 flex-shrink-0 mt-1" size={16} />
                <span>Review of your project requirements</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-amber-500 mr-2 flex-shrink-0 mt-1" size={16} />
                <span>Custom quote preparation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-amber-500 mr-2 flex-shrink-0 mt-1" size={16} />
                <span>Sample recordings if requested</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-amber-500 mr-2 flex-shrink-0 mt-1" size={16} />
                <span>Project timeline discussion</span>
              </li>
            </ul>
          </div>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center w-full"
            onClick={goHome}
          >
            <ArrowLeft size={18} className="mr-2" />
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;