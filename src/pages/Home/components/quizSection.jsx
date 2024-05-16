import React from 'react';
import { Button } from '../../../components';
import { ArrowRightFromLine } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuizSection = () => {
  return (
    <div className="flex flex-col justify-between p-6 bg-neutral-200 rounded-xl h-96">
      <h1 className="text-xl font-semibold">Quiz Section</h1>
      <div className="text-right">
        <Link to="/quiz">
          <Button>
            Take Quiz <ArrowRightFromLine className="ml-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuizSection;
