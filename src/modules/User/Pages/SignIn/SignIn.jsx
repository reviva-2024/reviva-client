import React from 'react';

const SignIn = () => {
    return (
        <section className='flex flex-col justify-center items-center my-[40px] mx-52'>
            <div className='flex w-full h-full'>
                <div className='flex-1'>
                    <img src="https://i.ibb.co/8MMgCSv/REVIVA-LOGO.png" className='' alt="" />
                </div>
                <div className='flex-2 border-2 h-full'>
                    <h1 className='text-3xl text-primary font-semibold'>Sign In</h1>
                    <div className='flex flex-col'>
                        <label htmlFor="username">UserName</label>
                        <input id='username' className='border-2 bg-foreground border-gray-300 focus:border-primary' type="text" />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password" >Password</label>
                        <input id='password' className='focus:border-primary border-2 border-gray-300' type="password" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;
