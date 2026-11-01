import { useState } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data";

const logoPlaceholders = [
  { label: "Techmint", mark: "TM", tone: "violet" },
  { label: "Street Souk", mark: "SS", tone: "orange" },
  { label: "Project partner", mark: "P", tone: "blue" },
  { label: "Studio partner", mark: "S", tone: "lime" },
  { label: "Community partner", mark: "C", tone: "pink" },
  { label: "Client partner", mark: "A", tone: "gold" },
  { label: "Creative partner", mark: "✳", tone: "cyan" },
  { label: "Development partner", mark: "D", tone: "red" },
];

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const aiReplies = [
  "Interesting move. I’ll pretend you meant that.",
  "You call that a strategy? Let’s see.",
  "I saw that coming from a mile away.",
  "Bold move. Probably not a good one.",
  "My turn. Try to keep up.",
  "You’re making this way too easy for me.",
  "Not bad… for a warm-up.",
  "I’m starting to think you’re letting me win.",
];

function winnerOf(board) {
  for (const [a, b, c] of winningLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
}

function scorePosition(board, aiTurn, cache) {
  const winner = winnerOf(board);
  if (winner === "O") return 1;
  if (winner === "X") return -1;
  if (board.every(Boolean)) return 0;

  const key = `${board.map((mark) => mark || "-").join("")}:${aiTurn ? "O" : "X"}`;
  if (cache.has(key)) return cache.get(key);

  let bestScore = aiTurn ? -Infinity : Infinity;
  for (let index = 0; index < board.length; index += 1) {
    if (board[index]) continue;
    const next = [...board];
    next[index] = aiTurn ? "O" : "X";
    const score = scorePosition(next, !aiTurn, cache);
    bestScore = aiTurn ? Math.max(bestScore, score) : Math.min(bestScore, score);
  }
  cache.set(key, bestScore);
  return bestScore;
}

function chooseAiMove(board) {
  const cache = new Map();
  let bestScore = -Infinity;
  const bestMoves = [];
  for (let index = 0; index < board.length; index += 1) {
    if (board[index]) continue;
    const next = [...board];
    next[index] = "O";
    const score = scorePosition(next, false, cache);
    if (score > bestScore) {
      bestScore = score;
      bestMoves.length = 0;
      bestMoves.push(index);
    } else if (score === bestScore) {
      bestMoves.push(index);
    }
  }
  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [logoOffsets, setLogoOffsets] = useState({});
  const [board, setBoard] = useState(Array(9).fill(null));
  const [score, setScore] = useState({ you: 0, ai: 0 });
  const [thinking, setThinking] = useState(false);
  const [round, setRound] = useState(0);
  const [aiMessage, setAiMessage] = useState("Your move, emmaisbrazy. Try not to make it easy for me.");
  const winner = winnerOf(board);
  const draw = !winner && board.every(Boolean);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const nudgeLogos = (event) => {
    const pointer = { x: event.clientX, y: event.clientY };
    const offsets = {};
    event.currentTarget.querySelectorAll("[data-logo-index]").forEach((tile) => {
      const rect = tile.getBoundingClientRect();
      const dx = rect.left + rect.width / 2 - pointer.x;
      const dy = rect.top + rect.height / 2 - pointer.y;
      const distance = Math.hypot(dx, dy);
      const reach = 150;
      if (distance < reach) {
        const force = (reach - distance) / reach;
        const angle = Math.atan2(dy || 0.01, dx || 0.01);
        offsets[tile.dataset.logoIndex] = {
          x: Math.cos(angle) * force * 62,
          y: Math.sin(angle) * force * 62,
          rotate: Math.sign(dx || 1) * force * 11,
        };
      }
    });
    setLogoOffsets(offsets);
  };

  const play = (index) => {
    if (board[index] || winner || draw || thinking) return;
    const next = [...board];
    next[index] = "X";
    const userWon = winnerOf(next);
    if (userWon) {
      setBoard(next);
      setScore((current) => ({ ...current, you: current.you + 1 }));
      setAiMessage("Okay, beginner’s luck. Run it back?");
      return;
    }
    if (next.every(Boolean)) {
      setBoard(next);
      setAiMessage("A draw? I’ll allow it. One more round.");
      return;
    }
    setBoard(next);
    setThinking(true);
    setAiMessage("Hmm. Let me think… this might sting.");
    window.setTimeout(() => {
      const aiMove = chooseAiMove(next);
      if (aiMove === undefined) {
        setThinking(false);
        return;
      }
      const afterAi = [...next];
      afterAi[aiMove] = "O";
      setBoard(afterAi);
      if (winnerOf(afterAi) === "O") {
        setScore((current) => ({ ...current, ai: current.ai + 1 }));
        setAiMessage("That’s one for me. Don’t get comfortable.");
      } else if (afterAi.every(Boolean)) {
        setAiMessage("A draw? I’ll allow it. One more round.");
      } else {
        setAiMessage(aiReplies[Math.floor(Math.random() * aiReplies.length)]);
      }
      setThinking(false);
    }, 320);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setThinking(false);
    setRound((value) => value + 1);
    setAiMessage("Back again? I respect the confidence.");
  };

  return (
    <footer className="footer wrap">
      <section className="footer-playground" aria-label="Partners and a game of tic-tac-toe">
        <div className="footer-logo-side">
          <p className="footer-playground-prompt">Give the logos a nudge.</p>
          <div className="footer-logo-field" onPointerMove={nudgeLogos} onPointerLeave={() => setLogoOffsets({})}>
            {logoPlaceholders.map((logo, index) => {
              const offset = logoOffsets[index] || { x: 0, y: 0, rotate: 0 };
              return (
                <div
                  className={`footer-logo-placeholder footer-logo-${logo.tone}`}
                  data-logo-index={index}
                  key={logo.label}
                  style={{ "--nudge-x": `${offset.x}px`, "--nudge-y": `${offset.y}px`, "--nudge-rotate": `${offset.rotate}deg` }}
                  role="img"
                  aria-label={`${logo.label} logo placeholder`}
                  title={`${logo.label} logo placeholder`}
                >
                  <span>{logo.mark}</span>
                </div>
              );
            })}
          </div>
          <p className="footer-placeholder-note">Partner logo placeholders — yours can go here.</p>
        </div>

        <div className="footer-game">
          <div className="footer-game-score" aria-live="polite">
            <span>You {score.you} – {score.ai} AI</span>
            <span className="footer-game-status">{winner ? (winner === "X" ? "You win!" : "AI wins") : draw ? "Draw" : thinking ? "AI is thinking…" : "Your turn"}</span>
          </div>
          <p className="footer-game-bubble" aria-live="polite"><span className="footer-game-speaker">AI</span>{aiMessage}</p>
          <div className="footer-game-board" role="group" aria-label="Tic-tac-toe game">
            {board.map((mark, index) => (
              <button
                className={`footer-game-cell ${mark ? `is-${mark.toLowerCase()}` : ""} ${winner && winningLines.some((line) => line.includes(index) && line.every((cell) => board[cell] === winner)) ? "is-winning" : ""}`}
                key={`${round}-${index}`}
                onClick={() => play(index)}
                disabled={Boolean(mark || winner || draw || thinking)}
                aria-label={`Square ${index + 1}${mark ? `, ${mark}` : ", empty"}`}
              >
                {mark && <span aria-hidden="true">{mark}</span>}
              </button>
            ))}
          </div>
          {(winner || draw) && <button className="footer-game-retry" onClick={resetGame}>Play again</button>}
        </div>
      </section>

      <p className="footer-kicker">Have a project in mind?</p>
      <button className="footer-mail" onClick={copy} data-cursor={copied ? "Copied" : "Copy"}>
        {profile.email}
      </button>

      <div className="footer-row">
        <nav aria-label="Social links">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
          ))}
        </nav>
        <Link to="/contact">Send a message</Link>
        <span>© {new Date().getFullYear()} <span className="name-font">{profile.name}</span></span>
      </div>
    </footer>
  );
}
