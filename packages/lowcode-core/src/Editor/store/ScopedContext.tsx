import React, { useContext, useState, useRef } from 'react';

interface IScopedContextProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const ScopedContext = React.createContext<{
  componentContext: any;
  setComponentContext: any;
}>({} as any);

const ScopedContextProvider: React.FC<IScopedContextProps> = ({ children }) => {
  // const [componentContext, setComponentContext] = useState({});
  const componentContext = useRef({});
  return (
    <ScopedContext.Provider
      value={{
        componentContext,
        // setComponentContext,
      }}
    >
      {children}
    </ScopedContext.Provider>
  );
};

export const useScoped = () => {
  return useContext(ScopedContext);
};

export default ScopedContextProvider;
