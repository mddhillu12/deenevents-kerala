export default function Page() {
  return (
    <>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>DeenEvents Kerala - Home</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@600;700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        '\n        .arabesque-bg {\n            background-image: url(\'data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 0 L100 50 L50 100 L0 50 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></svg>\');\n            background-size: 100px 100px;\n        }\n        .card-hover:hover {\n            box-shadow: 0 0 20px rgba(245, 158, 11, 0.4);\n            border-color: rgba(245, 158, 11, 0.4);\n        }\n      '
    }}
  />
  {/* Arabesque Pattern Background Layer */}
  <div className="fixed inset-0 pointer-events-none arabesque-bg z-0" />
  {/* TopAppBar */}
  <header className="bg-surface/70 dark:bg-surface/70 backdrop-blur-xl border-b border-glass-stroke shadow-sm docked full-width top-0 sticky flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 w-full z-50">
    <div className="flex items-center gap-4">
      {/* Mobile Menu Toggle (hidden on desktop) */}
      <button className="lg:hidden text-on-surface-variant hover:text-primary transition-colors duration-300">
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: '"FILL" 0' }}
        >
          menu
        </span>
      </button>
      <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary dark:text-primary-fixed tracking-tight">
        DeenEvents Kerala
      </h1>
    </div>
    <div className="flex items-center gap-6">
      <button className="text-on-surface-variant hover:text-primary transition-colors duration-300">
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: '"FILL" 0' }}
        >
          search
        </span>
      </button>
      <button className="text-on-surface-variant hover:text-primary transition-colors duration-300 relative">
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: '"FILL" 0' }}
        >
          notifications
        </span>
        <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full" />
      </button>
      <button className="text-on-surface-variant hover:text-primary transition-colors duration-300">
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: '"FILL" 0' }}
        >
          person
        </span>
      </button>
      <button className="hidden md:flex bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded-full hover:shadow-[0_0_15px_rgba(78,222,163,0.5)] transition-all">
        Sign In
      </button>
    </div>
  </header>
  {/* SideNavBar (Desktop) & Main Content Area */}
  <div className="flex max-w-container-max mx-auto relative z-10">
    {/* SideNavBar */}
    <nav className="bg-surface-container-low dark:bg-surface-container-low border-r border-glass-stroke shadow-lg h-screen w-64 fixed left-0 top-[88px] hidden lg:flex flex-col py-8 px-4 z-40">
      <div className="mb-8 px-4">
        <p className="font-headline-md text-headline-md text-on-surface">
          Welcome back
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Salam, Brother
        </p>
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <a
          className="bg-primary-container text-on-primary-container rounded-xl flex items-center gap-3 px-4 py-3 font-label-md text-label-md hover:bg-surface-container-highest transition-all scale-98 opacity-80"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            home
          </span>
          Home
        </a>
        <a
          className="text-on-surface-variant flex items-center gap-3 px-4 py-3 font-label-md text-label-md hover:bg-surface-container-highest transition-all hover:text-primary"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: '"FILL" 0' }}
          >
            add_circle
          </span>
          Submit Event
        </a>
        <a
          className="text-on-surface-variant flex items-center gap-3 px-4 py-3 font-label-md text-label-md hover:bg-surface-container-highest transition-all hover:text-primary"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: '"FILL" 0' }}
          >
            auto_awesome
          </span>
          AI Generator
        </a>
        <a
          className="text-on-surface-variant flex items-center gap-3 px-4 py-3 font-label-md text-label-md hover:bg-surface-container-highest transition-all hover:text-primary"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: '"FILL" 0' }}
          >
            bookmark
          </span>
          My Events
        </a>
        <a
          className="text-on-surface-variant flex items-center gap-3 px-4 py-3 font-label-md text-label-md hover:bg-surface-container-highest transition-all hover:text-primary"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: '"FILL" 0' }}
          >
            settings
          </span>
          Settings
        </a>
      </div>
      <button className="w-full bg-tertiary text-on-tertiary font-label-md text-label-md py-3 rounded-xl mb-8 hover:shadow-[0_0_15px_rgba(255,185,95,0.5)] transition-all">
        Submit Event
      </button>
      <div className="flex flex-col gap-2 mt-auto border-t border-glass-stroke pt-4">
        <a
          className="text-on-surface-variant flex items-center gap-3 px-4 py-3 font-label-md text-label-md hover:bg-surface-container-highest transition-all hover:text-primary"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: '"FILL" 0' }}
          >
            help
          </span>
          Help
        </a>
        <a
          className="text-on-surface-variant flex items-center gap-3 px-4 py-3 font-label-md text-label-md hover:bg-surface-container-highest transition-all hover:text-primary"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: '"FILL" 0' }}
          >
            logout
          </span>
          Logout
        </a>
      </div>
    </nav>
    {/* Main Canvas */}
    <main className="w-full lg:ml-64 px-margin-mobile md:px-gutter lg:px-margin-desktop py-8 pb-32 lg:pb-8 flex flex-col gap-section-gap">
      {/* Hero / Filtering Section */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Upcoming Gatherings
          </h2>
          {/* Filters */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            {/* District Dropdown */}
            <div className="relative group">
              <button className="bg-gray-900/70 backdrop-blur-md border border-glass-stroke text-on-surface font-label-md text-label-md px-4 py-2 rounded-lg flex items-center gap-2 hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  location_on
                </span>
                All Districts
                <span className="material-symbols-outlined text-[18px]">
                  arrow_drop_down
                </span>
              </button>
              {/* Dropdown Content (Hidden by default, shown on hover for simplicity in static HTML) */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-surface-container-highest border border-glass-stroke rounded-lg shadow-xl hidden group-hover:block z-20">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-surface-container-high cursor-pointer font-label-sm text-label-sm">
                    Malappuram
                  </li>
                  <li className="px-4 py-2 hover:bg-surface-container-high cursor-pointer font-label-sm text-label-sm">
                    Kozhikode
                  </li>
                  <li className="px-4 py-2 hover:bg-surface-container-high cursor-pointer font-label-sm text-label-sm">
                    Ernakulam
                  </li>
                </ul>
              </div>
            </div>
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <button className="bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded-full whitespace-nowrap">
                All
              </button>
              <button className="bg-gray-900/70 backdrop-blur-md border border-glass-stroke text-on-surface-variant hover:text-on-surface font-label-md text-label-md px-4 py-2 rounded-full whitespace-nowrap transition-colors">
                Dars
              </button>
              <button className="bg-gray-900/70 backdrop-blur-md border border-glass-stroke text-on-surface-variant hover:text-on-surface font-label-md text-label-md px-4 py-2 rounded-full whitespace-nowrap transition-colors">
                Khutbah
              </button>
              <button className="bg-gray-900/70 backdrop-blur-md border border-glass-stroke text-on-surface-variant hover:text-on-surface font-label-md text-label-md px-4 py-2 rounded-full whitespace-nowrap transition-colors">
                Lecture
              </button>
            </div>
            {/* Date Picker */}
            <button className="bg-gray-900/70 backdrop-blur-md border border-glass-stroke text-on-surface font-label-md text-label-md px-4 py-2 rounded-lg flex items-center gap-2 hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                calendar_today
              </span>
              Any Date
            </button>
          </div>
        </div>
      </section>
      {/* Event Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Event Card 1 */}
        <article className="bg-gray-900/70 backdrop-blur-[16px] border border-glass-stroke rounded-2xl overflow-hidden card-hover transition-all duration-300 flex flex-col group relative">
          <div className="h-48 bg-surface-container relative">
            <img
              alt="Majlis Image"
              className="w-full h-full object-cover mix-blend-overlay group-hover:mix-blend-normal transition-all duration-500"
              data-alt="A grand, beautifully illuminated traditional mosque interior in Kerala during an evening gathering. Warm amber light spills across the ornate wooden architecture and intricately patterned carpets, reflecting a deep spiritual ambiance within a modern glassmorphism aesthetic context. The atmosphere is serene, reverent, and sophisticated, anchored by deep emerald greens and glowing golden accents."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA73sR4djk0ARmFQupJ1O5qT-14B8nADXUUaS8GeZeynKWObMjSn5WQUmiV5kRKOE71JT7WkQmGmwJtHMc1IVTbZh2Tw7UdtKmQQWK5t3mEEX1DB4nMb0PcNNpEXAZkCmcRjCN2Vpa8DGBaaaoUHchnOsGzpndoNZRcGVMG8pVEhcbXUtXC54L3-2Lp9XlJRZPiTuDH-ejkpg7I_0ou66yc2sx2Tq5NMCUAocxceF8I3On3pitvyHP3tp8j2WqPIxlrI1h97xJnf2ii"
            />
            <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md rounded-full p-2 text-on-surface hover:text-primary cursor-pointer transition-colors border border-glass-stroke">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: '"FILL" 0' }}
              >
                bookmark
              </span>
            </div>
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="bg-tertiary text-on-tertiary font-label-sm text-label-sm px-2 py-1 rounded-md">
                Live
              </span>
              <span className="bg-surface/80 backdrop-blur-md text-on-surface border border-glass-stroke font-label-sm text-label-sm px-2 py-1 rounded-md">
                Dars
              </span>
            </div>
          </div>
          <div className="p-6 flex flex-col gap-4 flex-grow">
            <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
              Weekly Spiritual Majlis
            </h3>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">
                record_voice_over
              </span>
              <span>Usthad Sulaiman Al-Qasimi, Moulavi K.P</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">
                schedule
              </span>
              <span>Today, 8:00 PM - 10:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">
                location_on
              </span>
              <span>Markaz Masjid, Kozhikode</span>
            </div>
          </div>
        </article>
        {/* Event Card 2 */}
        <article className="bg-gray-900/70 backdrop-blur-[16px] border border-glass-stroke rounded-2xl overflow-hidden card-hover transition-all duration-300 flex flex-col group relative">
          <div className="h-48 bg-surface-container relative">
            <img
              alt="Khutbah Image"
              className="w-full h-full object-cover mix-blend-overlay group-hover:mix-blend-normal transition-all duration-500"
              data-alt="A focused close-up of an intricately carved wooden minbar inside a contemporary mosque. The scene is lit with soft, high-key ambient light that highlights the craftsmanship, set against a blurred background of deep jade and slate glass panels. The mood is authoritative yet inviting, embodying a modern arabesque aesthetic."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP4V419ZvC0Jt5wVLvJ2gGUEZm4yF6A3kHnFQ8wcS9mYiSXN4fCXG34h41bwO2tPaV2QrJnkJG4FfXjjD-oBKK4xDvTpd3pBSWhi6CvKhlvIQSxgA-N3BcIK8HWsGKJVoFZ4sGMRNQJ9U01NQZ3WpTbfGTzY4DLwKa5KUs6CHm5KbE6NxPuPB6JbivQ9dveP0l9QfVfI8Ga1zRqRfFtgftZmNYWbESrCOFEpG1fezrRYsbaIm2vZDnHpC-Y6eBJTFwj2KFyVL0yMSk"
            />
            <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md rounded-full p-2 text-on-surface hover:text-primary cursor-pointer transition-colors border border-glass-stroke">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: '"FILL" 0' }}
              >
                bookmark
              </span>
            </div>
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="bg-surface/80 backdrop-blur-md text-on-surface border border-glass-stroke font-label-sm text-label-sm px-2 py-1 rounded-md">
                Khutbah
              </span>
            </div>
          </div>
          <div className="p-6 flex flex-col gap-4 flex-grow">
            <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
              Jumu'ah Prayer &amp; Khutbah
            </h3>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">
                record_voice_over
              </span>
              <span>Imam Abdul Rahman</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">
                schedule
              </span>
              <span>Friday, 1:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">
                location_on
              </span>
              <span>Grand Mosque, Malappuram</span>
            </div>
          </div>
        </article>
        {/* Event Card 3 */}
        <article className="bg-gray-900/70 backdrop-blur-[16px] border border-glass-stroke rounded-2xl overflow-hidden card-hover transition-all duration-300 flex flex-col group relative">
          <div className="h-48 bg-surface-container relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-deep-jade/80 to-transparent z-10" />
            <img
              alt="Lecture Image"
              className="w-full h-full object-cover mix-blend-overlay group-hover:mix-blend-normal transition-all duration-500"
              data-alt="A modern auditorium setting for a religious lecture, featuring sleek, minimalist seating bathed in ethereal emerald and amber lighting. The stage holds a simple, elegant glass podium. The overall image conveys a sense of high-end digital craftsmanship blended with spiritual sophistication, capturing a luminous, premium community experience."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMqWsBVX3NHjsgB5nKLn9gtCIZ97p2r4MywnQ46s0uvCu1iCgURC-8UW_6JW0FmRC4n42OqDj8FHT3Ax0xN2Vhh9hfHxJi4YHAfD9ZSs1oFuSnE9VF8G5nqGVeOXVwRVZebHLVu6PT4Pmk8FZ_BfxbPMjUpPxANp0Z9UOEuJ1HQ-idvdcFHckScSUNMukKraax77hbPzV3iUaOe5bmyGYOkYXpwQKLFzFuyvXgESd-8SMBdsHztGLEhVVSZVJ3murM7NUeZtKa0Po7"
            />
            <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md rounded-full p-2 text-on-surface hover:text-primary cursor-pointer transition-colors border border-glass-stroke z-20">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: '"FILL" 0' }}
              >
                bookmark
              </span>
            </div>
            <div className="absolute bottom-4 left-4 flex gap-2 z-20">
              <span className="bg-surface/80 backdrop-blur-md text-on-surface border border-glass-stroke font-label-sm text-label-sm px-2 py-1 rounded-md">
                Lecture
              </span>
            </div>
          </div>
          <div className="p-6 flex flex-col gap-4 flex-grow">
            <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
              Understanding Islamic Finance
            </h3>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">
                record_voice_over
              </span>
              <span>Dr. Tariq Ali, Prof. Hameed</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">
                schedule
              </span>
              <span>Saturday, 10:00 AM</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">
                location_on
              </span>
              <span>Islamic Center, Ernakulam</span>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>
  {/* BottomNavBar (Mobile Only) */}
  <nav className="bg-surface-container-highest/80 dark:bg-surface-container-highest/80 backdrop-blur-2xl border-t border-glass-stroke shadow-2xl docked full-width bottom-0 rounded-t-xl fixed lg:hidden left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe">
    <a
      className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed font-bold scale-110 opacity-80 transition-all"
      href="#"
    >
      <span
        className="material-symbols-outlined mb-1"
        style={{ fontVariationSettings: '"FILL" 1' }}
      >
        home
      </span>
      <span className="font-label-sm text-label-sm">Home</span>
    </a>
    <a
      className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors"
      href="#"
    >
      <span
        className="material-symbols-outlined mb-1"
        style={{ fontVariationSettings: '"FILL" 0' }}
      >
        add_box
      </span>
      <span className="font-label-sm text-label-sm">Submit</span>
    </a>
    <a
      className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors"
      href="#"
    >
      <span
        className="material-symbols-outlined mb-1"
        style={{ fontVariationSettings: '"FILL" 0' }}
      >
        brush
      </span>
      <span className="font-label-sm text-label-sm">AI Studio</span>
    </a>
    <a
      className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors"
      href="#"
    >
      <span
        className="material-symbols-outlined mb-1"
        style={{ fontVariationSettings: '"FILL" 0' }}
      >
        account_circle
      </span>
      <span className="font-label-sm text-label-sm">Profile</span>
    </a>
  </nav>
</>

  );
}
<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>DeenEvents Kerala - Home</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@600;700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        '\n        .arabesque-bg {\n            background-image: url(\'data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 0 L100 50 L50 100 L0 50 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></svg>\');\n            background-size: 100px 100px;\n        }\n        .card-hover:hover {\n            box-shadow: 0 0 20px rgba(245, 158, 11, 0.4);\n            border-color: rgba(245, 158, 11, 0.4);\n        }\n      '
    }}
  />
  {/* Arabesque Pattern Background Layer */}
  <div className="fixed inset-0 pointer-events-none arabesque-bg z-0" />
  {/* TopAppBar */}
  <header className="bg-surface/70 dark:bg-surface/70 backdrop-blur-xl border-b border-glass-stroke shadow-sm docked full-width top-0 sticky flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 w-full z-50">
    <div className="flex items-center gap-4">
      {/* Mobile Menu Toggle (hidden on desktop) */}
      <button className="lg:hidden text-on-surface-variant hover:text-primary transition-colors duration-300">
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: '"FILL" 0' }}
        >
          menu
        </span>
      </button>
      <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary dark:text-primary-fixed tracking-tight">
        DeenEvents Kerala
      </h1>
    </div>
    <div className="flex items-center gap-6">
      <button className="text-on-surface-variant hover:text-primary transition-colors duration-300">
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: '"FILL" 0' }}
        >
          search
        </span>
      </button>
      <button className="text-on-surface-variant hover:text-primary transition-colors duration-300 relative">
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: '"FILL" 0' }}
        >
          notifications
        </span>
        <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full" />
      </button>
      <button className="text-on-surface-variant hover:text-primary transition-colors duration-300">
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: '"FILL" 0' }}
        >
          person
        </span>
      </button>
      <button className="hidden md:flex bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded-full hover:shadow-[0_0_15px_rgba(78,222,163,0.5)] transition-all">
        Sign In
      </button>
    </div>
  </header>
  {/* SideNavBar (Desktop) & Main Content Area */}
  <div className="flex max-w-container-max mx-auto relative z-10">
    {/* SideNavBar */}
    <nav className="bg-surface-container-low dark:bg-surface-container-low border-r border-glass-stroke shadow-lg h-screen w-64 fixed left-0 top-[88px] hidden lg:flex flex-col py-8 px-4 z-40">
      <div className="mb-8 px-4">
        <p className="font-headline-md text-headline-md text-on-surface">
          Welcome back
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Salam, Brother
        </p>
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <a
          className="bg-primary-container text-on-primary-container rounded-xl flex items-center gap-3 px-4 py-3 font-label-md text-label-md hover:bg-surface-container-highest transition-all scale-98 opacity-80"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            home
          </span>
          Home
        </a>
        <a
          className="text-on-surface-variant flex items-center gap-3 px-4 py-3 font-label-md text-label-md hover:bg-surface-container-highest transition-all hover:text-primary"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: '"FILL" 0' }}
          >
            add_circle
          </span>
          Submit Event
        </a>
        <a
          className="text-on-surface-variant flex items-center gap-3 px-4 py-3 font-label-md text-label-md hover:bg-surface-container-highest transition-all hover:text-primary"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: '"FILL" 0' }}
          >
            auto_awesome
          </span>
          AI Generator
        </a>
        <a
          className="text-on-surface-variant flex items-center gap-3 px-4 py-3 font-label-md text-label-md hover:bg-surface-container-highest transition-all hover:text-primary"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: '"FILL" 0' }}
          >
            bookmark
          </span>
          My Events
        </a>
        <a
          className="text-on-surface-variant flex items-center gap-3 px-4 py-3 font-label-md text-label-md hover:bg-surface-container-highest transition-all hover:text-primary"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: '"FILL" 0' }}
          >
            settings
          </span>
          Settings
        </a>
      </div>
      <button className="w-full bg-tertiary text-on-tertiary font-label-md text-label-md py-3 rounded-xl mb-8 hover:shadow-[0_0_15px_rgba(255,185,95,0.5)] transition-all">
        Submit Event
      </button>
      <div className="flex flex-col gap-2 mt-auto border-t border-glass-stroke pt-4">
        <a
          className="text-on-surface-variant flex items-center gap-3 px-4 py-3 font-label-md text-label-md hover:bg-surface-container-highest transition-all hover:text-primary"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: '"FILL" 0' }}
          >
            help
          </span>
          Help
        </a>
        <a
          className="text-on-surface-variant flex items-center gap-3 px-4 py-3 font-label-md text-label-md hover:bg-surface-container-highest transition-all hover:text-primary"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: '"FILL" 0' }}
          >
            logout
          </span>
          Logout
        </a>
      </div>
    </nav>
    {/* Main Canvas */}
    <main className="w-full lg:ml-64 px-margin-mobile md:px-gutter lg:px-margin-desktop py-8 pb-32 lg:pb-8 flex flex-col gap-section-gap">
      {/* Hero / Filtering Section */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Upcoming Gatherings
          </h2>
          {/* Filters */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            {/* District Dropdown */}
            <div className="relative group">
              <button className="bg-gray-900/70 backdrop-blur-md border border-glass-stroke text-on-surface font-label-md text-label-md px-4 py-2 rounded-lg flex items-center gap-2 hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  location_on
                </span>
                All Districts
                <span className="material-symbols-outlined text-[18px]">
                  arrow_drop_down
                </span>
              </button>
              {/* Dropdown Content (Hidden by default, shown on hover for simplicity in static HTML) */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-surface-container-highest border border-glass-stroke rounded-lg shadow-xl hidden group-hover:block z-20">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-surface-container-high cursor-pointer font-label-sm text-label-sm">
                    Malappuram
                  </li>
                  <li className="px-4 py-2 hover:bg-surface-container-high cursor-pointer font-label-sm text-label-sm">
                    Kozhikode
                  </li>
                  <li className="px-4 py-2 hover:bg-surface-container-high cursor-pointer font-label-sm text-label-sm">
                    Ernakulam
                  </li>
                </ul>
              </div>
            </div>
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <button className="bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded-full whitespace-nowrap">
                All
              </button>
              <button className="bg-gray-900/70 backdrop-blur-md border border-glass-stroke text-on-surface-variant hover:text-on-surface font-label-md text-label-md px-4 py-2 rounded-full whitespace-nowrap transition-colors">
                Dars
              </button>
              <button className="bg-gray-900/70 backdrop-blur-md border border-glass-stroke text-on-surface-variant hover:text-on-surface font-label-md text-label-md px-4 py-2 rounded-full whitespace-nowrap transition-colors">
                Khutbah
              </button>
              <button className="bg-gray-900/70 backdrop-blur-md border border-glass-stroke text-on-surface-variant hover:text-on-surface font-label-md text-label-md px-4 py-2 rounded-full whitespace-nowrap transition-colors">
                Lecture
              </button>
            </div>
            {/* Date Picker */}
            <button className="bg-gray-900/70 backdrop-blur-md border border-glass-stroke text-on-surface font-label-md text-label-md px-4 py-2 rounded-lg flex items-center gap-2 hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                calendar_today
              </span>
              Any Date
            </button>
          </div>
        </div>
      </section>
      {/* Event Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Event Card 1 */}
        <article className="bg-gray-900/70 backdrop-blur-[16px] border border-glass-stroke rounded-2xl overflow-hidden card-hover transition-all duration-300 flex flex-col group relative">
          <div className="h-48 bg-surface-container relative">
            <img
              alt="Majlis Image"
              className="w-full h-full object-cover mix-blend-overlay group-hover:mix-blend-normal transition-all duration-500"
              data-alt="A grand, beautifully illuminated traditional mosque interior in Kerala during an evening gathering. Warm amber light spills across the ornate wooden architecture and intricately patterned carpets, reflecting a deep spiritual ambiance within a modern glassmorphism aesthetic context. The atmosphere is serene, reverent, and sophisticated, anchored by deep emerald greens and glowing golden accents."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA73sR4djk0ARmFQupJ1O5qT-14B8nADXUUaS8GeZeynKWObMjSn5WQUmiV5kRKOE71JT7WkQmGmwJtHMc1IVTbZh2Tw7UdtKmQQWK5t3mEEX1DB4nMb0PcNNpEXAZkCmcRjCN2Vpa8DGBaaaoUHchnOsGzpndoNZRcGVMG8pVEhcbXUtXC54L3-2Lp9XlJRZPiTuDH-ejkpg7I_0ou66yc2sx2Tq5NMCUAocxceF8I3On3pitvyHP3tp8j2WqPIxlrI1h97xJnf2ii"
            />
            <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md rounded-full p-2 text-on-surface hover:text-primary cursor-pointer transition-colors border border-glass-stroke">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: '"FILL" 0' }}
              >
                bookmark
              </span>
            </div>
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="bg-tertiary text-on-tertiary font-label-sm text-label-sm px-2 py-1 rounded-md">
                Live
              </span>
              <span className="bg-surface/80 backdrop-blur-md text-on-surface border border-glass-stroke font-label-sm text-label-sm px-2 py-1 rounded-md">
                Dars
              </span>
            </div>
          </div>
          <div className="p-6 flex flex-col gap-4 flex-grow">
            <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
              Weekly Spiritual Majlis
            </h3>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">
                record_voice_over
              </span>
              <span>Usthad Sulaiman Al-Qasimi, Moulavi K.P</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">
                schedule
              </span>
              <span>Today, 8:00 PM - 10:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">
                location_on
              </span>
              <span>Markaz Masjid, Kozhikode</span>
            </div>
          </div>
        </article>
        {/* Event Card 2 */}
        <article className="bg-gray-900/70 backdrop-blur-[16px] border border-glass-stroke rounded-2xl overflow-hidden card-hover transition-all duration-300 flex flex-col group relative">
          <div className="h-48 bg-surface-container relative">
            <img
              alt="Khutbah Image"
              className="w-full h-full object-cover mix-blend-overlay group-hover:mix-blend-normal transition-all duration-500"
              data-alt="A focused close-up of an intricately carved wooden minbar inside a contemporary mosque. The scene is lit with soft, high-key ambient light that highlights the craftsmanship, set against a blurred background of deep jade and slate glass panels. The mood is authoritative yet inviting, embodying a modern arabesque aesthetic."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP4V419ZvC0Jt5wVLvJ2gGUEZm4yF6A3kHnFQ8wcS9mYiSXN4fCXG34h41bwO2tPaV2QrJnkJG4FfXjjD-oBKK4xDvTpd3pBSWhi6CvKhlvIQSxgA-N3BcIK8HWsGKJVoFZ4sGMRNQJ9U01NQZ3WpTbfGTzY4DLwKa5KUs6CHm5KbE6NxPuPB6JbivQ9dveP0l9QfVfI8Ga1zRqRfFtgftZmNYWbESrCOFEpG1fezrRYsbaIm2vZDnHpC-Y6eBJTFwj2KFyVL0yMSk"
            />
            <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md rounded-full p-2 text-on-surface hover:text-primary cursor-pointer transition-colors border border-glass-stroke">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: '"FILL" 0' }}
              >
                bookmark
              </span>
            </div>
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="bg-surface/80 backdrop-blur-md text-on-surface border border-glass-stroke font-label-sm text-label-sm px-2 py-1 rounded-md">
                Khutbah
              </span>
            </div>
          </div>
          <div className="p-6 flex flex-col gap-4 flex-grow">
            <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
              Jumu'ah Prayer &amp; Khutbah
            </h3>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">
                record_voice_over
              </span>
              <span>Imam Abdul Rahman</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">
                schedule
              </span>
              <span>Friday, 1:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">
                location_on
              </span>
              <span>Grand Mosque, Malappuram</span>
            </div>
          </div>
        </article>
        {/* Event Card 3 */}
        <article className="bg-gray-900/70 backdrop-blur-[16px] border border-glass-stroke rounded-2xl overflow-hidden card-hover transition-all duration-300 flex flex-col group relative">
          <div className="h-48 bg-surface-container relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-deep-jade/80 to-transparent z-10" />
            <img
              alt="Lecture Image"
              className="w-full h-full object-cover mix-blend-overlay group-hover:mix-blend-normal transition-all duration-500"
              data-alt="A modern auditorium setting for a religious lecture, featuring sleek, minimalist seating bathed in ethereal emerald and amber lighting. The stage holds a simple, elegant glass podium. The overall image conveys a sense of high-end digital craftsmanship blended with spiritual sophistication, capturing a luminous, premium community experience."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMqWsBVX3NHjsgB5nKLn9gtCIZ97p2r4MywnQ46s0uvCu1iCgURC-8UW_6JW0FmRC4n42OqDj8FHT3Ax0xN2Vhh9hfHxJi4YHAfD9ZSs1oFuSnE9VF8G5nqGVeOXVwRVZebHLVu6PT4Pmk8FZ_BfxbPMjUpPxANp0Z9UOEuJ1HQ-idvdcFHckScSUNMukKraax77hbPzV3iUaOe5bmyGYOkYXpwQKLFzFuyvXgESd-8SMBdsHztGLEhVVSZVJ3murM7NUeZtKa0Po7"
            />
            <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md rounded-full p-2 text-on-surface hover:text-primary cursor-pointer transition-colors border border-glass-stroke z-20">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: '"FILL" 0' }}
              >
                bookmark
              </span>
            </div>
            <div className="absolute bottom-4 left-4 flex gap-2 z-20">
              <span className="bg-surface/80 backdrop-blur-md text-on-surface border border-glass-stroke font-label-sm text-label-sm px-2 py-1 rounded-md">
                Lecture
              </span>
            </div>
          </div>
          <div className="p-6 flex flex-col gap-4 flex-grow">
            <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
              Understanding Islamic Finance
            </h3>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">
                record_voice_over
              </span>
              <span>Dr. Tariq Ali, Prof. Hameed</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">
                schedule
              </span>
              <span>Saturday, 10:00 AM</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">
                location_on
              </span>
              <span>Islamic Center, Ernakulam</span>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>
  {/* BottomNavBar (Mobile Only) */}
  <nav className="bg-surface-container-highest/80 dark:bg-surface-container-highest/80 backdrop-blur-2xl border-t border-glass-stroke shadow-2xl docked full-width bottom-0 rounded-t-xl fixed lg:hidden left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe">
    <a
      className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed font-bold scale-110 opacity-80 transition-all"
      href="#"
    >
      <span
        className="material-symbols-outlined mb-1"
        style={{ fontVariationSettings: '"FILL" 1' }}
      >
        home
      </span>
      <span className="font-label-sm text-label-sm">Home</span>
    </a>
    <a
      className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors"
      href="#"
    >
      <span
        className="material-symbols-outlined mb-1"
        style={{ fontVariationSettings: '"FILL" 0' }}
      >
        add_box
      </span>
      <span className="font-label-sm text-label-sm">Submit</span>
    </a>
    <a
      className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors"
      href="#"
    >
      <span
        className="material-symbols-outlined mb-1"
        style={{ fontVariationSettings: '"FILL" 0' }}
      >
        brush
      </span>
      <span className="font-label-sm text-label-sm">AI Studio</span>
    </a>
    <a
      className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors"
      href="#"
    >
      <span
        className="material-symbols-outlined mb-1"
        style={{ fontVariationSettings: '"FILL" 0' }}
      >
        account_circle
      </span>
      <span className="font-label-sm text-label-sm">Profile</span>
    </a>
  </nav>
</>
