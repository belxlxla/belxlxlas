// App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as ChannelService from '@channel.io/channel-web-sdk-loader';
import './styles/globalStyle.css';

// bella : Components
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';

// bella : Pages
import Main from './pages/main.jsx';
import About from './pages/about.jsx';
import Skills from './pages/skills.jsx';
import Design from './pages/design.jsx';
import Designwiki from './pages/designwiki.jsx';
import ReactArea from './pages/react.jsx';
import ArchiveArea from './pages/archive.jsx';
import Proposal from './pages/proposal.jsx';

// Plugin Key
const CHANNEL_PLUGIN_KEY = 'b14f14c2-d96f-4696-b128-0f8d84e8609f';

const MainContent = () => (
  <div>
    <Main />
    <section id="about" style={{ paddingTop: '100px' }}><About /></section>
    <section id="skills" style={{ paddingTop: '100px' }}><Skills /></section>
    <section id="design" style={{ paddingTop: '200px' }}><Design /></section>
    <Designwiki />
    <section id="react" style={{ paddingTop: '40px' }}><ReactArea /></section>
    <ArchiveArea />
    <section id="proposals"><Proposal /></section>
  </div>
);

const App = () => {
  // 채널톡
  useEffect(() => {
    ChannelService.loadScript();
    ChannelService.boot({
      pluginKey: CHANNEL_PLUGIN_KEY
    });

    return () => {
      ChannelService.shutdown();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/designwiki" element={<Designwiki />} />
          <Route path="/archive" element={<ArchiveArea />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;