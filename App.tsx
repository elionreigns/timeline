import React, { useState, useCallback, useEffect, useRef } from 'react';
import { timelineData } from './data/timeline-data.ts';
import { TimelineEvent } from './types.ts';
import Timeline, { TimelineHandle } from './components/Timeline.tsx';
import EventCard from './components/EventCard.tsx';
import BackgroundDisplay from './components/BackgroundDisplay.tsx';

const App: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState<TimelineEvent | null>(null);
  const [scrollState, setScrollState] = useState({ position: 0, totalWidth: 1 });
  const [mainBackground, setMainBackground] = useState<string | null>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const timelineRef = useRef<TimelineHandle>(null);

  useEffect(() => {
    // Splash screen logic
    const splash = document.getElementById('splash-screen');
    if (splash) {
      setTimeout(() => {
        splash.classList.add('fade-out');
        setTimeout(() => splash.remove(), 700); // Remove after fade out
      }, 500); // Keep splash for a moment
    }

    const bg = document.body.dataset.mainBackground;
    if (bg) {
      setMainBackground(bg);
    }
  }, []);

  const handleEventSelect = useCallback((event: TimelineEvent) => {
    setActiveEvent(event);
  }, []);

  const handleCloseCard = useCallback(() => {
    setActiveEvent(null);
  }, []);
  
  const handleTimelineScroll = useCallback((scrollLeft: number, scrollWidth: number, clientWidth: number) => {
    const totalScrollableWidth = scrollWidth - clientWidth;
    setScrollState({ position: scrollLeft, totalWidth: totalScrollableWidth });

    // Parallax calculation
    if (totalScrollableWidth > 0) {
      const scrollPercentage = scrollLeft / totalScrollableWidth;
      const PARALLAX_AMOUNT = 60; // Max pixels of background movement
      setParallaxOffset(-(scrollPercentage * PARALLAX_AMOUNT));
    }
  }, []);

  const handleScrollToToday = () => {
    timelineRef.current?.scrollToToday();
  };


  return (
    <main className="h-screen w-screen flex flex-col overflow-hidden text-white font-sans bg-black">
      <header className="absolute top-0 left-0 p-4 md:p-6 z-30 w-full flex justify-between items-center bg-black/20 backdrop-blur-md border-b border-white/10">
        <div>
          <h1 className="text-2xl md:text-4xl font-heading tracking-wider filter drop-shadow(0 2px 2px rgba(0,0,0,0.5))">ETP: The Prophetic Timeline</h1>
          <p className="text-sm md:text-base text-white/80 filter drop-shadow(0 1px 2px rgba(0,0,0,0.5))">From 1900 to the Future</p>
        </div>
        <div className="text-sm md:text-base text-right hidden sm:block">
          <a href="https://www.erictheprophet.com" target="_blank" rel="noopener noreferrer" className="opacity-75 hover:opacity-100 transition-opacity filter drop-shadow(0 1px 2px rgba(0,0,0,0.5))">
            ErictheProphet.com
          </a>
          <button
            onClick={handleScrollToToday}
            className="block mt-1 text-xs text-yellow-400 hover:text-yellow-300 transition-colors filter drop-shadow(0 1px 2px rgba(0,0,0,0.5)) focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
          >
            Scroll to Today
          </button>
        </div>
      </header>
      
      <div className="relative flex-grow">
        {mainBackground ? (
          <>
            <div
                className="absolute inset-0 w-full h-full bg-no-repeat bg-center transition-transform duration-100 linear"
                style={{ 
                    backgroundImage: `url(${mainBackground})`,
                    backgroundSize: 'contain',
                    transform: `translateX(${parallaxOffset}px)`
                }}
            />
             <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(https://www.transparenttextures.com/patterns/carbon-fibre.png)`,
                backgroundRepeat: 'repeat',
                opacity: 0.05
              }}
            />
            <div className="absolute inset-0 w-full h-full bg-black/80" />
          </>
        ) : (
          <BackgroundDisplay 
            sections={timelineData}
            scrollPosition={scrollState.position}
            totalWidth={scrollState.totalWidth}
          />
        )}
      </div>

      <Timeline ref={timelineRef} data={timelineData} onEventSelect={handleEventSelect} onScroll={handleTimelineScroll} />

      {activeEvent && <EventCard event={activeEvent} onClose={handleCloseCard} />}
    </main>
  );
};

export default React.memo(App);