import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Nav from './components/Nav';
import Services from './components/Services';
import Stats from './components/Stats';
import Work from './components/Work';
import useTheme from './useTheme';

export default function App() {
  const { themeLabel, toggleTheme } = useTheme();

  return (
    <div className="page">
      <Nav themeLabel={themeLabel} onToggleTheme={toggleTheme} />
      <Hero />
      <Marquee />
      <Work />
      <Services />
      <Stats />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
