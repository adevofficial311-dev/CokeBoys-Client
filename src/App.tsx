import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { FontProvider } from './context/FontContext';
import { AuthProfileProvider } from './context/AuthProfileContext';
import { Home } from './pages/Home';
import { PublishMacro } from './pages/PublishMacro';
import { Macros } from './pages/Macros';
import { ViewMacro } from './pages/ViewMacro';
import { Profile } from './pages/Profile';
import { MacroLayout } from './components/layout/MacroLayout';

export default function App() {
  return (
    <FontProvider>
      <AuthProfileProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MacroLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/macros" element={<Macros />} />
              <Route path="/macro/:id" element={<ViewMacro />} />
              <Route path="/publish" element={<PublishMacro />} />
              <Route path="/creator/:name" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProfileProvider>
    </FontProvider>
  );
}
