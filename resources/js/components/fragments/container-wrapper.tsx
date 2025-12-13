import React from "react";

const ContainerWrapper = ({children} : {children: React.ReactNode}) => {
    return (
        <div className="container mx-auto w-full h-full lg:px-0 px-4">
            {children}
        </div>
    );
};

export default ContainerWrapper;
