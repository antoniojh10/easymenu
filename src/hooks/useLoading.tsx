import React, { useState, useContext } from "react";
import LoadingContainer from "@/containers/LoadingContainer";

export type Loading = {
  loading: Boolean;
  setLoading: React.Dispatch<React.SetStateAction<Boolean>>;
  loadingOn: () => void;
  loadingOff: () => void;
};

const loadingContext = React.createContext({} as Loading);

export const ProvideLoading: React.FC = ({ children }) => {
  const loading: Loading = useProvideLoading();
  return (
    <loadingContext.Provider value={loading}>
      <LoadingContainer />
      {children}
    </loadingContext.Provider>
  );
};

export function useLoading(): Loading {
  return useContext(loadingContext);
}

function useProvideLoading() {
  const [loading, setLoading] = useState<Boolean>(true);

  const loadingOn = () => {
    setLoading(true);
  };
  const loadingOff = () => {
    setLoading(false);
  };

  return { loading, setLoading, loadingOn, loadingOff };
}
