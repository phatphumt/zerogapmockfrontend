import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useStore } from '@/lib/store';
import AppShell from '@/components/layout/AppShell';
import Landing from '@/pages/Landing';
import OnboardingLayout from '@/pages/onboarding/OnboardingLayout';
import Step1Level from '@/pages/onboarding/Step1Level';
import Step2Career from '@/pages/onboarding/Step2Career';
import Step3University from '@/pages/onboarding/Step3University';
import Step4Assets from '@/pages/onboarding/Step4Assets';
import Results from '@/pages/onboarding/Results';
import Dashboard from '@/pages/Dashboard';
import Roadmap from '@/pages/Roadmap';
import Simulation from '@/pages/Simulation';
import SimulationRun from '@/pages/SimulationRun';
import Portfolio from '@/pages/Portfolio';

function RequireProfile() {
  const profile = useStore((s) => s.profile);
  if (!profile) return <Navigate to="/onboarding/level" replace />;
  return <Outlet />;
}

export const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  {
    path: '/onboarding',
    element: <OnboardingLayout />,
    children: [
      { index: true, element: <Navigate to="level" replace /> },
      { path: 'level', element: <Step1Level /> },
      { path: 'career', element: <Step2Career /> },
      { path: 'university', element: <Step3University /> },
      { path: 'assets', element: <Step4Assets /> },
      { path: 'results', element: <Results /> },
    ],
  },
  {
    element: <RequireProfile />,
    children: [
      {
        element: <AppShell />,
        children: [
          { path: '/dashboard', element: <Dashboard /> },
          { path: '/roadmap', element: <Roadmap /> },
          { path: '/simulation', element: <Simulation /> },
          { path: '/simulation/:moduleId', element: <SimulationRun /> },
          { path: '/portfolio', element: <Portfolio /> },
        ],
      },
    ],
  },
]);
