'use client';

import { useState, useEffect, useRef } from 'react';
import type { Message } from '@/lib/landing-data';
import { BRAND } from '@/lib/tokens';

interface IndustryChatProps {
  thread: Message[];
  tint: string;
}

export default function IndustryChat({ thread, tint }: IndustryChatProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto scroll chat body to the bottom when messages or typing indicator changes
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleCount, isTyping]);

  useEffect(() => {
    if (visibleCount === thread.length) {
      // Loop: wait 6 seconds and then restart
      const timer = setTimeout(() => {
        setVisibleCount(0);
        setIsTyping(false);
      }, 6000);
      return () => clearTimeout(timer);
    }

    const nextMsg = thread[visibleCount];
    const [dir] = nextMsg;

    if (dir === 'in') {
      // Customer typing (simulate a brief pause)
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      // Bot typing: delay a bit, show typing indicator, then reveal the message
      const typingStartTimer = setTimeout(() => {
        setIsTyping(true);
      }, 300);

      const revealTimer = setTimeout(() => {
        setIsTyping(false);
        setVisibleCount((prev) => prev + 1);
      }, 2000);

      return () => {
        clearTimeout(typingStartTimer);
        clearTimeout(revealTimer);
      };
    }
  }, [visibleCount, thread]);

  return (
    <div className="ind-chat">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes typingDot {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
        .ind-typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #5c5c5c;
          display: inline-block;
          animation: typingDot 1.4s infinite ease-in-out both;
        }
        .ind-typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .ind-typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        .ind-chat-body::-webkit-scrollbar {
          display: none;
        }
        .ind-chat-body {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
      <div className="ind-chat-head">
        <span className="ind-chat-avatar">C3</span>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 600 }}>Converse360 Agent</div>
          <div style={{ fontSize: '11.5px', color: tint }}>
            {isTyping ? 'typing...' : 'online · replies in seconds'}
          </div>
        </div>
      </div>
      <div ref={containerRef} className="ind-chat-body" style={{ scrollBehavior: 'smooth', height: '370px', overflowY: 'auto' }}>
        {thread.slice(0, visibleCount).map((m, i) => {
          const [dir, text, file, meta] = m as [string, string, string?, string?];
          return (
            <div key={i} className={`ind-bubble ind-bubble-${dir === 'in' ? 'in' : 'out'}`} style={{ animation: 'fadeIn 0.25s ease-out' }}>
              {text}
              {file && (
                <span className="ind-bubble-file">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={BRAND}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M14 3v5h5" />
                    <path d="M6 3h8l5 5v13H6z" />
                  </svg>
                  <span>
                    <strong style={{ display: 'block', fontWeight: 600 }}>{file}</strong>
                    <span style={{ color: 'var(--color-text-subtle)' }}>{meta}</span>
                  </span>
                </span>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="ind-bubble ind-bubble-out" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '12px 16px', minWidth: '45px' }}>
            <span className="ind-typing-dot" />
            <span className="ind-typing-dot" />
            <span className="ind-typing-dot" />
          </div>
        )}
      </div>
    </div>
  );
}
