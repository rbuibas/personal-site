<script lang="ts">
  import { tick } from 'svelte';

  type Message = {
    id: string;
    ts: string;
    nkClass: string;
    nk: string;
    txClass: string;
    tx: string;
    thinking?: boolean;
  };

  let counter = 0;
  function newId() { return String(counter++); }
  function now() {
    const d = new Date();
    return `[${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}]`;
  }

  let messages: Message[] = [
    { id: newId(), ts: '[18:32]', nkClass: 's', nk: '*', txClass: 's', tx: 'Now talking in #about-raul' },
    { id: newId(), ts: '[18:32]', nkClass: 's', nk: '*', txClass: 's', tx: 'Raul_AI has joined #about-raul' },
    { id: newId(), ts: '[18:32]', nkClass: 'b', nk: '<Raul_AI>', txClass: 'b', tx: "Hey! I'm Raul's AI assistant. Ask me anything about him — his background, work, the garden, Emma... I'll do my best." },
  ];

  const history: Array<{ role: string; content: string }> = [];
  let inputValue = '';
  let disabled = false;
  let status = 'Connected to raulbuibas.dev · #about-raul';
  let logEl: HTMLDivElement;

  async function scrollLog() {
    await tick();
    if (logEl) logEl.scrollTop = logEl.scrollHeight;
  }

  async function send() {
    const msg = inputValue.trim();
    if (!msg || disabled) return;
    inputValue = '';
    disabled = true;

    messages = [...messages, { id: newId(), ts: now(), nkClass: 'v', nk: '<visitor>', txClass: '', tx: msg }];
    history.push({ role: 'user', content: msg });
    await scrollLog();

    const thinkingId = newId();
    messages = [...messages, { id: thinkingId, ts: now(), nkClass: 'b', nk: '<Raul_AI>', txClass: 'b', tx: '', thinking: true }];
    status = 'Raul_AI is typing...';
    await scrollLog();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history }),
      });

      if (!res.ok) throw new Error('API error');
      const { reply } = await res.json();

      messages = messages.map(m =>
        m.id === thinkingId ? { ...m, tx: reply, thinking: false } : m
      );
      history.push({ role: 'assistant', content: reply });
      status = 'Connected to raulbuibas.dev · #about-raul';
    } catch {
      messages = messages.map(m =>
        m.id === thinkingId
          ? { ...m, nkClass: 's', txClass: 's', tx: '* Connection error — try again', thinking: false }
          : m
      );
      status = 'Connection error';
    }

    disabled = false;
    await scrollLog();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') send();
  }
</script>

<section class="section" id="chat">
  <div class="section-inner">
    <div class="section-label reveal">Ask My AI</div>
    <p class="chat-intro reveal">
      Curious about something? This is an AI assistant that knows about me — my background,
      work, interests, the garden, Emma. Ask anything you'd ask over coffee.
    </p>

    <div class="irc-window reveal">

      <div class="irc-titlebar">
        <div class="irc-dots">
          <div class="irc-dot r"></div>
          <div class="irc-dot y"></div>
          <div class="irc-dot g"></div>
        </div>
        <div class="irc-title">mIRC — #about-raul @ raulbuibas.dev</div>
      </div>

      <div class="irc-menubar">
        <span>File</span><span>Edit</span><span>View</span><span>Favorites</span><span>Tools</span><span>Help</span>
      </div>

      <div class="irc-body">
        <div class="irc-sidebar">
          <div class="irc-sb-label">Channels</div>
          <div class="irc-ch active">about-raul</div>
          <div class="irc-ch">projects</div>
          <div class="irc-ch">garden</div>
          <div class="irc-divider"></div>
          <div class="irc-sb-label">Online</div>
          <div class="irc-user"><div class="dot"></div><span>Raul_AI</span></div>
          <div class="irc-user"><div class="dot away"></div><span>raul</span></div>
        </div>

        <div class="irc-main">
          <div class="irc-topic">
            Topic: <strong>Ask Raul's AI anything</strong> — powered by Claude | type and press Enter
          </div>

          <div class="irc-log" bind:this={logEl}>
            {#each messages as msg (msg.id)}
              <div class="irc-row" class:thinking={msg.thinking}>
                <span class="ts">{msg.ts}</span>
                <span class="nk {msg.nkClass}">{msg.nk}</span>
                <span class="tx {msg.txClass}">{msg.tx}</span>
              </div>
            {/each}
          </div>

          <div class="irc-status-bar">
            <span>{status}</span>
            <span>{inputValue.length} chars</span>
          </div>

          <div class="irc-input-row">
            <span class="irc-prompt">[visitor]&nbsp;</span>
            <input
              class="irc-input"
              type="text"
              placeholder="Ask something about Raul..."
              maxlength="400"
              autocomplete="off"
              bind:value={inputValue}
              on:keydown={handleKeydown}
              {disabled}
            />
            <button class="irc-btn" on:click={send} {disabled}>Send</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<style>
  .chat-intro {
    font-size: 14px;
    color: var(--ink-light);
    margin-bottom: 32px;
    max-width: 540px;
    line-height: 1.8;
  }
  .irc-window {
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 24px 80px rgba(0, 0, 0, .22);
    font-family: 'DM Mono', monospace;
    font-size: 13px;
  }

  /* Title bar */
  .irc-titlebar {
    background: #2a2a3a;
    padding: 9px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #1a1a28;
  }
  .irc-dots { display: flex; gap: 6px; }
  .irc-dot { width: 11px; height: 11px; border-radius: 50%; }
  .irc-dot.r { background: #ff5f57; }
  .irc-dot.y { background: #ffbd2e; }
  .irc-dot.g { background: #28c840; }
  .irc-title { flex: 1; text-align: center; font-size: 11px; color: #6b6b8a; letter-spacing: .05em; }

  /* Menu bar */
  .irc-menubar {
    background: #222232;
    padding: 5px 14px;
    display: flex;
    gap: 20px;
    border-bottom: 1px solid #1a1a28;
  }
  .irc-menubar span { font-size: 11px; color: #5a5a7a; letter-spacing: .05em; cursor: default; }
  .irc-menubar span:hover { color: #9090b0; }

  /* Body */
  .irc-body { display: flex; background: #16162a; height: 420px; }

  /* Sidebar */
  .irc-sidebar {
    width: 160px;
    flex-shrink: 0;
    background: #1c1c30;
    border-right: 1px solid #2a2a42;
    display: flex;
    flex-direction: column;
  }
  .irc-sb-label { padding: 8px 10px 4px; font-size: 10px; color: #4a4a6a; letter-spacing: .1em; text-transform: uppercase; }
  .irc-ch {
    padding: 5px 12px;
    font-size: 12px;
    color: #7070a0;
    cursor: pointer;
    transition: background .15s, color .15s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .irc-ch::before { content: '# '; color: #4a4a6a; }
  .irc-ch.active { background: #2a2a42; color: #c8c8f0; }
  .irc-ch:hover:not(.active) { background: #222238; color: #9090c0; }
  .irc-divider { height: 1px; background: #2a2a42; margin: 8px 0; }
  .irc-user { padding: 4px 12px; font-size: 12px; color: #5a5a7a; display: flex; align-items: center; gap: 6px; }
  .irc-user .dot { width: 6px; height: 6px; border-radius: 50%; background: #4caf7d; flex-shrink: 0; }
  .irc-user .dot.away { background: #4a4a6a; }
  .irc-user span { color: #8080b0; }

  /* Main panel */
  .irc-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .irc-topic {
    padding: 6px 14px;
    background: #1e1e32;
    border-bottom: 1px solid #2a2a42;
    font-size: 11px;
    color: #5a5a7a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .irc-topic strong { color: #7070a0; }

  /* Log */
  .irc-log {
    flex: 1;
    overflow-y: auto;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .irc-log::-webkit-scrollbar { width: 6px; }
  .irc-log::-webkit-scrollbar-track { background: #16162a; }
  .irc-log::-webkit-scrollbar-thumb { background: #2a2a42; border-radius: 3px; }

  .irc-row {
    padding: 2px 14px;
    display: flex;
    line-height: 1.5;
    transition: background .1s;
  }
  .irc-row:hover { background: rgba(255, 255, 255, .02); }
  .ts { color: #3a3a5a; flex-shrink: 0; margin-right: 8px; font-size: 11px; padding-top: 1px; }
  .nk { flex-shrink: 0; margin-right: 8px; }
  .nk.v { color: #7ec8c8; }
  .nk.b { color: #c8a87e; }
  .nk.s { color: #5a5a7a; font-style: italic; }
  .tx { color: #b0b0d0; flex: 1; word-break: break-word; }
  .tx.s { color: #4a4a6a; font-style: italic; }
  .tx.b { color: #c8c8f0; }
  .irc-row.thinking .tx::after {
    content: '▋';
    animation: blink 1s step-end infinite;
    color: #c8a87e;
  }

  /* Status bar */
  .irc-status-bar {
    background: #1c1c30;
    border-top: 1px solid #2a2a42;
    padding: 4px 14px;
    font-size: 10px;
    color: #3a3a5a;
    display: flex;
    justify-content: space-between;
  }

  /* Input row */
  .irc-input-row {
    display: flex;
    align-items: center;
    background: #1e1e32;
    border-top: 1px solid #2a2a42;
    padding: 0 14px;
  }
  .irc-prompt { color: #4a4a6a; margin-right: 8px; flex-shrink: 0; }
  .irc-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #c8c8f0;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    padding: 10px 0;
    caret-color: #c8a87e;
  }
  .irc-input::placeholder { color: #3a3a5a; }
  .irc-input:disabled { opacity: .5; }
  .irc-btn {
    background: #2a2a42;
    border: none;
    outline: none;
    color: #7070a0;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    padding: 5px 12px;
    border-radius: 3px;
    cursor: pointer;
    transition: background .15s, color .15s;
    letter-spacing: .05em;
  }
  .irc-btn:hover { background: #3a3a58; color: #c8c8f0; }
  .irc-btn:disabled { opacity: .4; cursor: not-allowed; }

  @media (max-width: 768px) {
    .irc-sidebar { display: none; }
    .irc-body { height: 380px; }
  }
</style>
