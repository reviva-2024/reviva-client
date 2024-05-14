import React, { useState } from 'react';
import SignIn from '../SignIn/SignIn';
import Signup from '../Signup/Signup';

const Auth = () => {
  const [register, setRegister] = useState(false);

  return (
    <div className="flex relative overflow-hidden">
      <div
        className={`  transition-transform duration-500 ${
          register ? 'transform -translate-x-full' : 'transform translate-x-0'
        }`}
      >
        <SignIn register={register} setRegister={setRegister} />
      </div>
      <div
        className={` transition-transform duration-500 ${
          register ? 'transform -translate-x-full' : 'transform translate-x-0'
        }`}
      >
        <Signup register={register} setRegister={setRegister} />
      </div>
    </div>
  );
};

export default Auth;

