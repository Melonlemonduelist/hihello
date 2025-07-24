"use client";

import {
  Heading,
  Text,
  Button,
  Column,
  Badge,
  Logo,
  Line,
  LetterFx,
} from "@once-ui-system/core";

import React, { useEffect, useRef } from "react";

export default function Home() {
  const [musicStarted, setMusicStarted] = React.useState(false);
  const handlePlayMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setMusicStarted(true);
    }
  };
  // Bubble Bobble theme background audio
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  }, []);
  // --- Gerald feeding logic ---
  const foodEmojis = ['🍓', '🍕', '🍪'];
  const [foods, setFoods] = React.useState([
    { id: 1, emoji: '🍓', available: true },
    { id: 2, emoji: '🍕', available: true },
    { id: 3, emoji: '🍪', available: true }
  ]);
  const [draggedFood, setDraggedFood] = React.useState(null);
  const [geraldHappy, setGeraldHappy] = React.useState(false);
  const [happyMsg, setHappyMsg] = React.useState("");

  // Regenerate food after 2-3 seconds if missing
  React.useEffect(() => {
    foods.forEach((food, idx) => {
      if (!food.available) {
        const timeout = setTimeout(() => {
          setFoods(f => f.map((item, i) => i === idx ? { ...item, available: true } : item));
        }, 2000 + Math.random() * 1000);
        return () => clearTimeout(timeout);
      }
    });
  }, [foods]);

  // Drag handlers
  const handleDragStart = (id) => setDraggedFood(id);
  const handleDragEnd = () => setDraggedFood(null);
  const handleDropOnGerald = () => {
    if (draggedFood != null) {
      setFoods(f => f.map(food => food.id === draggedFood ? { ...food, available: false } : food));
      setGeraldHappy(true);
      setHappyMsg("gerald is happy");
      setTimeout(() => {
        setGeraldHappy(false);
        setHappyMsg("");
      }, 1200);
      setDraggedFood(null);
    }
  };

  // SVG heart pattern as a data URI for background
  const heartSVG = `<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M20 36s-8.5-7.2-13.1-12.1C2.2 19.1 2.2 13.7 6.1 10.2c3.2-3 8.1-2.1 10.3 1.3C18.9 7.9 23.8 7.2 26.9 10.2c3.9 3.5 3.9 8.9-0.8 13.7C28.5 28.8 20 36 20 36z' fill='%23ff4d4f' stroke='%23d7263d' stroke-width='2'/></svg>`;
  const heartPattern = `url('data:image/svg+xml;utf8,${encodeURIComponent(heartSVG)}')`;

  // Custom pointer cursor with a star in the middle
  const starCursor = `url('data:image/svg+xml;utf8,<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="16,4 19,13 28,13 21,18 24,27 16,22 8,27 11,18 4,13 13,13" fill="%23ffd700" stroke="%23222" stroke-width="2"/></svg>') 16 16, pointer`;

  return (
    <>
      {/* Background looping audio */}
      <audio
        ref={audioRef}
        src="https://www.myinstants.com/media/sounds/bubble-bobble-theme.mp3"
        loop
        style={{ display: 'none' }}
      />
      {!musicStarted && (
        <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 10000 }}>
          <button
            onClick={handlePlayMusic}
            style={{
              background: '#fff0f0',
              color: '#d7263d',
              fontWeight: 700,
              fontSize: 18,
              border: '2px solid #d7263d',
              borderRadius: 12,
              padding: '10px 28px',
              boxShadow: '0 2px 12px #d7263d22',
              cursor: 'pointer',
              outline: 'none',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            ▶️ Play Music to give this some life :D
          </button>
        </div>
      )}
      <div style={{ position: 'relative', minHeight: '100vh', background: `${heartPattern}, linear-gradient(135deg, #ff4d4f 0%, #ffb6b9 100%)`, backgroundRepeat: 'repeat', cursor: starCursor }}>
      {/* Main content */}
      <Column fillWidth center padding="l" style={{ position: 'relative', zIndex: 1 }}>
        <Column maxWidth="s" horizontal="center" gap="l" align="center" style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 24, padding: 32, boxShadow: '0 8px 32px rgba(255,77,79,0.15)' }}>
          <Heading variant="display-strong-xl" style={{ color: '#d7263d', marginBottom: 8 }}>
            Zoe Ames Portfolio
          </Heading>
          <Text variant="heading-default-l" style={{ color: '#d7263d', fontWeight: 600, marginBottom: 16 }}>
            Welcome! I'm <b>Zoe Ames</b>.
          </Text>
          <Text variant="body-default-l" style={{ color: '#222', marginBottom: 16 }}>
            This summer, I'm part of the Summer Youth Employment Program, where I'm learning full stack web development and game development.
          </Text>
          <Text variant="body-default-l" style={{ color: '#222', marginBottom: 16 }}>
            In addition to coding, I love drawing—both digitally and traditionally. I'm also a gamer (Roblox, Minecraft, Pokémon, Mario Bros/Mario Kart) and a YouTuber sharing my experiences!
          </Text>
          <Column align="start" gap="xs" style={{ margin: '24px 0', width: '100%' }}>
            <Heading variant="heading-strong-m" style={{ color: '#d7263d' }}>About Me</Heading>
            <Text variant="body-default-m" style={{ color: '#222' }}><b>Program:</b> Summer Youth Employment</Text>
            <Text variant="body-default-m" style={{ color: '#222' }}><b>Focus:</b> Full Stack Web Development, Game Development</Text>
            <Text variant="body-default-m" style={{ color: '#222' }}><b>Role:</b> Student</Text>
            <Text variant="body-default-m" style={{ color: '#222' }}><b>Art:</b> Digital & Traditional Drawing</Text>
            <Text variant="body-default-m" style={{ color: '#222', marginBottom: 12 }}><b>Gamer:</b> Roblox, Minecraft, Pokémon, Mario Bros/Mario Kart, Bubble/Puzzle bobble</Text>
           <Text variant="body-default-m" style={{ color: '#222' }}><b>YouTuber:</b> I create content and share my journey on YouTube</Text>
            <Column align="center" gap="m" style={{ width: '100%' }}>
              <Column align="center" gap="xs">
                <img src="https://wallpaperaccess.com/full/21008.jpg" alt="Pokemon" style={{ width: '100%', maxWidth: 320, borderRadius: 16, boxShadow: '0 4px 16px rgba(215,38,61,0.15)' }} />
                <Text variant="body-default-m" style={{ color: '#d7263d', fontWeight: 700 }}>pokemon</Text>
              </Column>
              <Column align="center" gap="xs">
                <img src="https://wallpapercave.com/wp/wp2586787.jpg" alt="Minecraft" style={{ width: '100%', maxWidth: 320, borderRadius: 16, boxShadow: '0 4px 16px rgba(215,38,61,0.15)' }} />
                <Text variant="body-default-m" style={{ color: '#d7263d', fontWeight: 700 }}>minecraft</Text>
              </Column>
              <Column align="center" gap="xs">
                <img src="https://th.bing.com/th/id/R.05eab9a109c7b9663e036637fb325a26?rik=AFhM7orS7BslWg&pid=ImgRaw&r=0" alt="Roblox" style={{ width: '100%', maxWidth: 320, borderRadius: 16, boxShadow: '0 4px 16px rgba(215,38,61,0.15)' }} />
                <Text variant="body-default-m" style={{ color: '#d7263d', fontWeight: 700 }}>roblox</Text>
              </Column>
            </Column>
          </Column>
          <Column align="center" gap="xs" style={{ marginTop: 16 }}>
            <Text variant="body-default-m" style={{ color: '#d7263d', fontWeight: 600, marginBottom: 4 }}>
              my email if u wanna talk to me or request drawings hehe
            </Text>
            <a href="mailto:zoe.ames10@gmail.com" style={{ color: '#d7263d', fontSize: 20, fontWeight: 700, textDecoration: 'underline' }}>
              zoe.ames10@gmail.com
            </a>
          </Column>
          <style>{`
            .egg-zoe {
              display: inline-block;
              font-size: 64px;
              transition: transform 0.3s cubic-bezier(.68,-0.55,.27,1.55);
              cursor: pointer;
            }
            .egg-zoe:hover {
              transform: scale(1.2) rotate(-12deg);
            }
            .gerald-happy {
              opacity: 0;
              transition: opacity 0.2s;
              height: 0;
              font-size: 18px;
              color: #d7263d;
              font-weight: 700;
            }
            .egg-zoe:hover + .gerald-happy {
              opacity: 1;
              height: auto;
            }
          `}</style>
          {/* Food bowl and Gerald feeding UI */}
          <Column align="center" gap="xs" style={{ marginTop: 24 }}>
            {/* Label above Gerald */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
              <span style={{ color: '#d7263d', fontWeight: 700, fontSize: 16, background: '#fff0f0', borderRadius: 8, padding: '2px 10px', boxShadow: '0 2px 8px #d7263d22' }}>
                drag the food to feed gerald!
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 16 }}>
              {/* Bowl with draggable food */}
              <div style={{ background: '#fff0f0', borderRadius: '50%', width: 80, height: 48, boxShadow: '0 2px 8px #d7263d22', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 8, position: 'relative' }}>
                {foods.map(food => food.available && (
                  <span
                    key={food.id}
                    draggable
                    onDragStart={() => handleDragStart(food.id)}
                    onDragEnd={handleDragEnd}
                    style={{ fontSize: 32, cursor: 'grab', marginBottom: 8, userSelect: 'none' }}
                    aria-label={food.emoji}
                  >{food.emoji}</span>
                ))}
              </div>
              {/* Gerald drop target */}
              <div
                onDragOver={e => e.preventDefault()}
                onDrop={handleDropOnGerald}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 64, position: 'relative' }}
              >
                <span className="egg-zoe" role="img" aria-label="egg" style={{ fontSize: 64, transition: 'transform 0.3s cubic-bezier(.68,-0.55,.27,1.55)', cursor: 'pointer', transform: geraldHappy ? 'scale(1.2) rotate(-12deg)' : 'none' }}>🥚</span>
                <Text variant="body-default-m" style={{ color: '#d7263d', fontWeight: 600 }}>gerald</Text>
                {/* Message when Gerald is fed (popup handled below) */}
                {/* Popup for Gerald is happy */}
                {happyMsg && (
                  <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: '#fff0f0',
                    color: '#d7263d',
                    fontWeight: 700,
                    fontSize: 24,
                    borderRadius: 16,
                    boxShadow: '0 4px 24px #d7263d44',
                    padding: '24px 48px',
                    zIndex: 9999,
                    pointerEvents: 'none',
                    transition: 'opacity 0.3s',
                  }}>
                    {happyMsg}
                  </div>
                )}
              </div>
            </div>
          </Column>
        </Column>
      </Column>
      </div>
    </>
  );
}
