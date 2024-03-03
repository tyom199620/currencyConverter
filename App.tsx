import React, { useEffect, useState } from "react";
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';

import RootNavigator from './src/navigation/RootNavigator';
import { WithSplashScreen } from "./src/screens/WithSplashScreen";

const App: React.FC = () => {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    async function initialize() {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsReady(true);
    }

    initialize();
  }, []);

  return (
    <WithSplashScreen isAppReady={isReady}>
      <StatusBar hidden={true} />
      <RootNavigator />
    </WithSplashScreen>
  );
};

export default App;
