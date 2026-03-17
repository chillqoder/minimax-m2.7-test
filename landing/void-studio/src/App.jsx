import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import WorkGrid from './components/WorkGrid';
import Philosophy from './components/Philosophy';
import Process from './components/Process';
import Clients from './components/Clients';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <WorkGrid />
        <Philosophy />
        <Process />
        <Clients />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
