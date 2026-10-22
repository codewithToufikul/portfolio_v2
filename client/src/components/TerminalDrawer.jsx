import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, CornerDownLeft, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function TerminalDrawer({
  isOpen,
  onClose,
  themes,
  onSelectTheme,
  portfolioData,
  onOpenSection,
}) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { text: 'TOUFIKUL-OS v2.0 (x86_64-apple-darwin)', type: 'system' },
    { text: 'Type "help" for a list of available system commands.', type: 'system' },
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyPointer, setHistoryPointer] = useState(-1);

  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmdText) => {
    const raw = cmdText.trim();
    if (!raw) return;

    setCmdHistory((prev) => [...prev, raw]);
    setHistoryPointer(-1);

    const parts = raw.split(' ');
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    const newOutputs = [{ text: `guest@toufikul-dev:~$ ${raw}`, type: 'input' }];

    switch (command) {
      case 'help':
        newOutputs.push({
          text: `AVAILABLE COMMANDS:
  help              - Display this command dictionary
  whoami            - Display operator bio and contact details
  skills            - List core technical proficiencies
  projects          - List shipped deployments
  open <section>    - Jump to a section (e.g. "open deployments", "open contact")
  theme <name>      - Switch theme (e.g. "theme matrix-green", "theme amber-crt")
  neofetch          - Render system telemetry & operator specs
  hire              - Trigger hire sequence & scroll to contact
  sudo hire toufikul- Secret root hiring protocol
  clear             - Clear terminal screen`,
          type: 'output',
        });
        break;

      case 'whoami':
        newOutputs.push({
          text: `NAME: Toufikul Islam
ROLE: Full Stack Developer / MERN Stack Engineer
LOCATION: Mohammadpur, Dhaka, Bangladesh
PHONE: +880 1709264924 | WHATSAPP: 01615685428
EMAIL: imranmeg2356@gmail.com
GITHUB: https://github.com/codewithToufikul
STATUS: Available for hire (Remote & Dhaka)`,
          type: 'output',
        });
        break;

      case 'skills':
        newOutputs.push({
          text: `CORE SERVICES & RUNTIMES:
  Frontend: React.js, Next.js, TypeScript, Tailwind CSS, Redux/RTK Query, Framer Motion
  Backend:  Node.js, Express.js, REST APIs, JWT, Prisma, Mongoose, Socket.io
  Data:     MongoDB, PostgreSQL, Redis, Firebase
  Mobile:   React Native (iOS & Android)
  Tools:    Git, Postman, Figma, Vercel, Render, Supabase`,
          type: 'output',
        });
        break;

      case 'projects':
      case 'ls':
        newOutputs.push({
          text: `DEPLOYMENTS:
  1. Fly-Book             [Mobile]     React Native, Firebase, Socket.io, Node
  2. Home Tutor Provider  [Full Stack] React, TS, Tailwind, Redis, Express, MongoDB
  3. Service Pro          [Full Stack] React, Vite, SSLCommerz, DaisyUI, Node
  4. Hidayah              [Web/AI]     React, Express, Node, MongoDB, AI Services`,
          type: 'output',
        });
        break;

      case 'open':
        if (!arg) {
          newOutputs.push({ text: 'Usage: open <deployments|skills|experience|contact|github>', type: 'error' });
        } else {
          const sectionId = arg.replace('#', '');
          const element = document.getElementById(sectionId);
          if (element) {
            newOutputs.push({ text: `Navigating to #${sectionId}...`, type: 'success' });
            element.scrollIntoView({ behavior: 'smooth' });
            onClose();
          } else {
            newOutputs.push({ text: `Section "${arg}" not found. Available: deployments, skills, experience, contact, github`, type: 'error' });
          }
        }
        break;

      case 'theme':
        if (!arg) {
          newOutputs.push({
            text: `Available themes: ${themes.map((t) => t.id).join(', ')}`,
            type: 'output',
          });
        } else {
          const matched = themes.find((t) => t.id === arg || t.name.toLowerCase() === arg);
          if (matched) {
            onSelectTheme(matched.id);
            newOutputs.push({ text: `Active theme set to "${matched.name}".`, type: 'success' });
          } else {
            newOutputs.push({
              text: `Unknown theme "${arg}". Choose from: ${themes.map((t) => t.id).join(', ')}`,
              type: 'error',
            });
          }
        }
        break;

      case 'neofetch':
        newOutputs.push({
          text: `
   ______   __  __   ______   __  __
  /\\__  _\\ /\\ \\/\\ \\ /\\  __ \\ /\\ \\/\\ \\
  \\/_/\\ \\/ \\ \\ \\_\\ \\\\ \\ \\/\\ \\\\ \\ \\_\\ \\
     \\ \\_\\  \\ \\_____\\\\ \\_____\\\\ \\_____\\
      \\/_/   \\/_____/ \\/_____/ \\/_____/

  operator@toufikul-dev
  ---------------------
  OS:        Toufikul-OS v2.0 (React 18 / Vite 5)
  Host:      Dhaka Node (Mohammadpur, Dhaka)
  Uptime:    Active Since 2024 (40+ shipped)
  Shell:     zsh 5.9 / agy-term
  Terminal:  IBM Plex Mono 12px
  Memory:    94MB / 512MB (V8 Heap)
  Contact:   imranmeg2356@gmail.com`,
          type: 'output',
        });
        break;

      case 'hire':
        newOutputs.push({
          text: 'Initiating hire sequence! Redirecting to POST /contact...',
          type: 'success',
        });
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          onClose();
        }, 800);
        break;

      case 'sudo':
        if (arg === 'hire toufikul' || arg === 'hire') {
          newOutputs.push({
            text: `[ROOT ACCESS GRANTED] Priority hiring protocol engaged. Welcome aboard!`,
            type: 'success',
          });
          try {
            confetti({
              particleCount: 150,
              spread: 100,
              origin: { y: 0.5 },
              colors: ['#5cc8e6', '#5fd38d', '#00ff66', '#ffffff'],
            });
          } catch (e) {}
          setTimeout(() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            onClose();
          }, 1000);
        } else {
          newOutputs.push({ text: `sudo: ${arg || 'command'}: permission denied. Try "sudo hire toufikul"`, type: 'error' });
        }
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        newOutputs.push({
          text: `command not found: "${raw}". Type "help" for a list of valid commands.`,
          type: 'error',
        });
    }

    setHistory((prev) => [...prev, ...newOutputs]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!cmdHistory.length) return;
      const nextPtr = historyPointer === -1 ? cmdHistory.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextPtr);
      setInputVal(cmdHistory[nextPtr] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextPtr = historyPointer + 1;
      if (nextPtr >= cmdHistory.length) {
        setHistoryPointer(-1);
        setInputVal('');
      } else {
        setHistoryPointer(nextPtr);
        setInputVal(cmdHistory[nextPtr]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-bg/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-surface border border-accent shadow-terminal flex flex-col h-[520px] max-h-[90vh] text-fg font-mono overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-surface-2 border-b border-line select-none">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-crit inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-warn inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-ok inline-block" />
            <span id="terminal-title" className="text-muted ml-2 text-[11px] font-semibold">
              guest@toufikul-dev:~ (tty1)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted hidden sm:inline">Press ESC to exit</span>
            <button
              onClick={onClose}
              aria-label="Close Terminal"
              className="p-1 hover:text-accent text-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Console Screen Output */}
        <div
          ref={scrollRef}
          className="flex-1 p-4 overflow-y-auto space-y-1.5 text-xs terminal-scroll bg-bg/90 select-text"
        >
          {history.map((item, idx) => (
            <div
              key={idx}
              className={`leading-relaxed whitespace-pre-wrap ${
                item.type === 'input'
                  ? 'text-accent font-semibold'
                  : item.type === 'error'
                  ? 'text-crit'
                  : item.type === 'success'
                  ? 'text-ok font-semibold'
                  : 'text-fg'
              }`}
            >
              {item.text}
            </div>
          ))}
        </div>

        {/* Input Line */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-2 border-t border-line">
          <span className="text-ok font-bold text-xs flex-none">guest@toufikul:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Terminal command input"
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent border-0 outline-none text-fg font-mono text-xs p-0 focus:ring-0"
          />
          <button
            onClick={() => {
              executeCommand(inputVal);
              setInputVal('');
            }}
            className="text-muted hover:text-accent p-1"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
