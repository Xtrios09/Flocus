// Demo achievement code (for development only)
/*
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('pomodoro-achievements');
  let achievements: Achievement[] = [];
  if (stored) achievements = JSON.parse(stored);
  const hasExample = achievements.some(a => a.milestone === 9999);
  if (!hasExample) {
    const example = {
      milestone: 9999,
      msg: '🌟 Example Achievement: You found the secret demo!',
      date: new Date().toLocaleString()
    };
    achievements.push(example);
    localStorage.setItem('pomodoro-achievements', JSON.stringify(achievements));
  }
}
*/
  import React, { useState, useEffect } from "react";
  import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  } from "@headlessui/react";
  import Pomodoro from "@/components/Pomodoro";
  import TodoPage from "./Todolist";
  import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
  import MymusicPlaylist from "./MymusicPlaylist";
  // import Dashboard from "./Dashboard";

  const navigation = [
    { name: "Focus" },
    { name: "Todo-List" },
    { name: "Music" },
    // { name: "Dashboard" },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }


  type Achievement = { milestone: number; msg: string; date: string };

  function MyNavbar() {
    // State to track which section is currently active
    const [activeSection, setActiveSection] = useState("Focus");
    const [showPopup, setShowPopup] = useState(false);
    const [popupMsg, setPopupMsg] = useState("");
    const [lastMilestone, setLastMilestone] = useState(0);
    const [notifOpen, setNotifOpen] = useState(false);
    const [achievements, setAchievements] = useState<Achievement[]>(() => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('pomodoro-achievements');
        if (stored) return JSON.parse(stored);
      }
      return [];
    });

    // Listen for Pomodoro session count changes in localStorage
    useEffect(() => {
      function checkMilestone() {
        const sessions = Number(localStorage.getItem('pomodoro-session-count') || '0');
        const milestones = [10, 50, 100, 200, 500, 1000, 5000, 10000];
        const next = milestones.find(m => sessions === m);
        if (next && lastMilestone !== next) {
          const msg = `🎉 Achievement: ${next} Pomodoro sessions completed!`;
          setPopupMsg(msg);
          setShowPopup(true);
          setLastMilestone(next);
          const newAchievements = [...achievements, { milestone: next, msg, date: new Date().toLocaleString() }];
          setAchievements(newAchievements);
          localStorage.setItem('pomodoro-achievements', JSON.stringify(newAchievements));
          setTimeout(() => setShowPopup(false), 5000);
        }
        if (sessions > 10000 && lastMilestone !== 10001) {
          const msg = `🏆 Legendary! 10000+ Pomodoro sessions!`;
          setPopupMsg(msg);
          setShowPopup(true);
          setLastMilestone(10001);
          const newAchievements = [...achievements, { milestone: 10001, msg, date: new Date().toLocaleString() }];
          setAchievements(newAchievements);
          localStorage.setItem('pomodoro-achievements', JSON.stringify(newAchievements));
          setTimeout(() => setShowPopup(false), 5000);
        }
      }
      window.addEventListener('storage', checkMilestone);
      const interval = setInterval(checkMilestone, 2000);
      return () => {
        window.removeEventListener('storage', checkMilestone);
        clearInterval(interval);
      };
      // eslint-disable-next-line
    }, [lastMilestone, achievements]);
  
    return (
      <>
        <Disclosure
          as="nav"
          className="relative bg-[#1e1e1e]/90 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#3c3c3c]"
        >
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-[#ededed] hover:bg-[#111111] hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-[#4d4d4d]">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
  
              {/* Logo + Links */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://png.pngtree.com/png-clipart/20250123/original/pngtree-white-cube-with-four-squares-png-image_19324964.png"
                    className="h-8 w-auto"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => setActiveSection(item.name)}
                        className={classNames(
                          activeSection === item.name
                            ? "bg-[#3c3c3c] text-white"
                            : "text-[#ededed] hover:bg-[#111111] hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
  
              {/* Right side icons */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-2">
                <div className="relative">
                  <button
                    type="button"
                    className="relative rounded-full p-1 text-[#ededed] hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-[#4d4d4d]"
                    onClick={() => setNotifOpen((v) => !v)}
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                    {achievements.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-2 py-1 shadow-lg animate-bounce z-50">
                        {achievements.length}
                      </span>
                    )}
                  </button>
                  {notifOpen && (
                    <div className="absolute right-0 top-10 w-80 bg-[#222] text-white px-4 py-2 rounded shadow-lg border border-pink-500 z-50 animate-fade-in max-h-96 overflow-y-auto">
                      <div className="font-bold mb-2">Achievements</div>
                      {achievements.length === 0 && <div className="text-gray-400">No achievements yet.</div>}
                      {achievements.slice().reverse().map((a: Achievement, i: number) => (
                        <div key={i} className="mb-2 border-b border-[#333] pb-1">
                          <div>{a.msg}</div>
                          <div className="text-xs text-gray-400">{a.date}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
  
          {/* Mobile menu */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="button"
                  onClick={() => setActiveSection(item.name)}
                  className={classNames(
                    activeSection === item.name
                      ? "bg-[#3c3c3c] text-white"
                      : "text-[#ededed] hover:bg-[#111111] hover:text-white",
                    "block rounded-md text-base font-medium"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>
  
        {/* MacOS-style achievement popup notification */}
        {/*
        <div className="fixed top-20 right-6 z-[9999] bg-[#222] text-white px-6 py-4 rounded-xl shadow-2xl border-2 border-pink-500 animate-fade-in-up flex items-center gap-3">
          <span className="text-2xl">🌟</span>
          <span className="font-semibold">Example Achievement: You found the secret demo!</span>
        </div>
        */}
        {showPopup && (
          <div className="fixed top-28 right-6 z-[9999] bg-[#222] text-white px-6 py-4 rounded-xl shadow-2xl border-2 border-pink-500 animate-fade-in-up flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <span className="font-semibold">{popupMsg}</span>
          </div>
        )}
        {/* Section content (conditionally rendered) */}
        <main className="p-6">
          {/* Pomodoro and Music are always mounted, just hidden when not active */}
          <div style={{ display: activeSection === "Focus" ? "block" : "none" }}>
            <Pomodoro />
          </div>
          <div style={{ display: activeSection === "Music" ? "block" : "none" }}>
            <MymusicPlaylist />
          </div>
          {activeSection === "Todo-List" && <TodoPage />}
          {/* {activeSection === "Dashboard" && <Dashboard />} */}
        </main>
      </>
    );
  }
  
  export default MyNavbar;
