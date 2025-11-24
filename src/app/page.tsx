'use client';

import { useState } from 'react';
import SplashScreen from '@/components/shared/SplashScreen';
import RoleSelection from '@/components/shared/RoleSelection';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return <RoleSelection />;
}
