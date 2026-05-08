'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const HOTMART_LINK = 'https://go.hotmart.com/A105474958L?ap=88bf';
const PRICE_LOCAL = '($14 USD APROX = $55.900 COP / $299 MXN)';

const PAYMENT_BADGES = (
  <div className="mt-4 flex flex-col items-center gap-2">
    <div className="flex items-center gap-2.5 flex-wrap justify-center">
      <Image src="/assets/logo-visa.png" alt="Visa" width={48} height={30} className="h-[22px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
      <Image src="/assets/logo-mastercard.png" alt="Mastercard" width={48} height={30} className="h-[22px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
      <Image src="/assets/logo-oxxo.png" alt="OXXO" width={48} height={30} className="h-[22px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
      <Image src="/assets/logo-efecty.png" alt="Efecty" width={48} height={30} className="h-[22px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
      <Image src="/assets/logo-pse.png" alt="PSE" width={48} height={30} className="h-[22px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
      <Image src="/assets/logo-nequi.png" alt="Nequi" width={48} height={30} className="h-[22px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
      <Image src="/assets/logo-bancolombia.png" alt="Bancolombia" width={48} height={30} className="h-[22px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
    </div>
    <p className="text-center text-[10px] text-muted-foreground">🔒 Pago 100% seguro · Al tocar el botón verás siempre el precio en tu moneda local</p>
  </div>
);

function useCountdown(initialMinutes = 14, initialSeconds = 51) {
  const [time, setTime] = useState({ minutes: initialMinutes, seconds: initialSeconds });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) return { minutes: initialMinutes, seconds: initialSeconds };
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [initialMinutes, initialSeconds]);

  return time;
}

function useViewersCount() {
  const [count, setCount] = useState(212);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return count;
}

const NAMES = ['Carlos M.','Diego L.','Andrés R.','Miguel A.','Santiago P.','Sebastián G.','Mateo H.','Alejandro F.','Fernando T.','Roberto C.','Javier S.','Ricardo D.','Eduardo V.','Gonzalo M.','Nicolás B.','Pedro J.','Gabriel Q.','Luis R.','Felipe O.','Iván K.','David W.','Marcos N.','Rodrigo E.','Tomás I.','Daniel U.','Camilo Z.','Emilio Y.','Hugo X.','Pablo T.','Raúl G.'];
const CITIES = [{city:'Ciudad de México',flag:'🇲🇽'},{city:'Bogotá',flag:'🇨🇴'},{city:'Buenos Aires',flag:'🇦🇷'},{city:'Lima',flag:'🇵🇪'},{city:'Santiago',flag:'🇨🇱'},{city:'Quito',flag:'🇪🇨'},{city:'Caracas',flag:'🇻🇪'},{city:'Madrid',flag:'🇪🇸'},{city:'Barcelona',flag:'🇪🇸'},{city:'Guadalajara',flag:'🇲🇽'},{city:'Medellín',flag:'🇨🇴'},{city:'Cali',flag:'🇨🇴'},{city:'Córdoba',flag:'🇦🇷'},{city:'Rosario',flag:'🇦🇷'},{city:'Cusco',flag:'🇵🇪'},{city:'Arequipa',flag:'🇵🇪'},{city:'Valparaíso',flag:'🇨🇱'},{city:'Guayaquil',flag:'🇪🇨'},{city:'Maracaibo',flag:'🇻🇪'},{city:'Valencia',flag:'🇪🇸'},{city:'Sevilla',flag:'🇪🇸'},{city:'Monterrey',flag:'🇲🇽'},{city:'Puebla',flag:'🇲🇽'},{city:'Barranquilla',flag:'🇨🇴'},{city:'Mendoza',flag:'🇦🇷'},{city:'La Paz',flag:'🇧🇴'},{city:'Santa Cruz',flag:'🇧🇴'},{city:'Montevideo',flag:'🇺🇾'},{city:'San José',flag:'🇨🇷'},{city:'Panamá',flag:'🇵🇦'},{city:'San Salvador',flag:'🇸🇻'},{city:'Tegucigalpa',flag:'🇭🇳'},{city:'Guatemala',flag:'🇬🇹'},{city:'Santo Domingo',flag:'🇩🇴'},{city:'La Habana',flag:'🇨🇺'},{city:'San Juan',flag:'🇵🇷'},{city:'Asunción',flag:'🇵🇾'},{city:'Managua',flag:'🇳🇮'},{city:'Bilbao',flag:'🇪🇸'},{city:'Málaga',flag:'🇪🇸'}];
const TIMES_AGO = ['hace 1 min','hace 2 min','hace 3 min','hace 5 min','ahora mismo'];

function useSocialProof() {
  const [proof, setProof] = useState<{name:string;city:string;flag:string;time:string}|null>(null);
  const [dismissed, setDismissed] = useState(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const getRandomProof = () => {
    const name = NAMES[Math.floor(Math.random()*NAMES.length)];
    const loc = CITIES[Math.floor(Math.random()*CITIES.length)];
    const time = TIMES_AGO[Math.floor(Math.random()*TIMES_AGO.length)];
    return { name, city: loc.city, flag: loc.flag, time };
  };
  useEffect(() => {
    if (dismissed) { timersRef.current.forEach(clearTimeout); return; }
    const cycle = () => {
      setProof(getRandomProof());
      const hideTimer = setTimeout(() => {
        setProof(null);
        const gap = 15000 + Math.random() * 15000;
        const nextTimer = setTimeout(cycle, gap);
        timersRef.current.push(nextTimer);
      }, 5000);
      timersRef.current.push(hideTimer);
    };
    cycle();
    return () => timersRef.current.forEach(clearTimeout);
  }, [dismissed]);
  return { proof, dismiss: () => setDismissed(true) };
}

export default function Home() {
  const { minutes, seconds } = useCountdown();
  const viewers = useViewersCount();
  const { proof, dismiss: dismissProof } = useSocialProof();
  const [showSoundOverlay, setShowSoundOverlay] = useState(true);
  const [soundActivated, setSoundActivated] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Top Bar - Timer */}
      <div className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2 sm:px-6 sm:py-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-base sm:text-lg">⚠️</span>
            <span className="hidden sm:inline">Tu precio de</span>
            <span className="line-through opacity-80">$170</span>
            <span className="hidden sm:inline">expira en:</span>
            <span className="sm:hidden">expira:</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 font-mono">
            <div className="countdown-box">
              <span className="countdown-number">{String(minutes).padStart(2, '0')}</span>
              <span className="countdown-label">MIN</span>
            </div>
            <span className="font-bold">:</span>
            <div className="countdown-box">
              <span className="countdown-number">{String(seconds).padStart(2, '0')}</span>
              <span className="countdown-label">SEG</span>
            </div>
          </div>
          <a href={HOTMART_LINK} className="hidden sm:inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-bold text-primary shadow hover:bg-white/90 transition-colors">
            DESCARGAR AHORA →
          </a>
          <a href={HOTMART_LINK} className="sm:hidden inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-[11px] font-bold text-primary">
            COMPRAR →
          </a>
        </div>
      </div>

      {/* Live Viewers Badge */}
      <div className="fixed left-2 top-14 z-[60] sm:left-4 sm:top-20">
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-background/95 px-2.5 py-1 shadow-md backdrop-blur sm:px-3 sm:py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </span>
          <span className="whitespace-nowrap text-[10px] font-semibold sm:text-xs">
            <span className="text-primary font-bold">{viewers}</span>{' '}
            <span className="text-muted-foreground">viendo ahora</span>
          </span>
        </div>
      </div>

      {/* Social Proof Notification */}
      {proof && (
        <div className="fixed bottom-16 left-2 right-2 z-[60] mx-auto max-w-[260px] social-proof-card sm:left-4 sm:right-auto sm:bottom-4">
          <div className="flex items-center gap-2 rounded-lg border border-border/60 p-2 shadow-lg" style={{ background: 'rgba(10,10,15,0.75)', backdropFilter: 'blur(8px)' }}>
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm">✅</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold leading-tight">{proof.name} <span className="text-muted-foreground font-normal text-[10px]">acaba de inscribirse</span></p>
              <p className="truncate text-[9px] text-muted-foreground leading-tight">{proof.city} {proof.flag} · {proof.time}</p>
            </div>
            <button aria-label="Cerrar" className="flex-shrink-0 text-muted-foreground/60 hover:text-foreground text-[10px] p-0.5" onClick={dismissProof}>✕</button>
          </div>
        </div>
      )}

      {/* ===== SECTION 1: HERO ===== */}
      <section className="px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          {/* Lead Magnet Bridge */}
          <div className="mx-auto mb-6 max-w-2xl rounded-2xl border border-primary/25 bg-primary/5 p-4 sm:p-5 text-center" style={{ boxShadow: '0 0 30px rgba(212,175,55,0.06)' }}>
            <p className="text-sm sm:text-base font-bold text-foreground leading-snug">
              📩 ¡Tu copia gratis de <span className="text-primary">&quot;Atracción Silenciosa&quot;</span> ya está en tu poder! Pero ojo...
            </p>
            <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Descargaste ese manual para <strong className="text-foreground">no mojarte los pies</strong>. Pero si quieres aprender a <strong className="text-primary">nadar en el océano de su obsesión</strong>, necesitas ser un <strong className="text-primary">&quot;Dominante Magnético&quot;</strong>.
            </p>
            <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Este es el paso avanzado de <strong className="text-foreground">ingeniería social</strong> que el <strong className="text-primary">99% de los hombres</strong> jamás conocerá.
            </p>
            <p className="mt-3 text-[11px] sm:text-xs tracking-wide text-primary/70 font-semibold">
              ↓ Sigue leyendo abajo para descubrir cómo funciona... ↓
            </p>
          </div>

          <div className="mb-4 flex justify-center">
            <span className="chip text-[10px] leading-tight sm:text-sm sm:whitespace-nowrap max-w-[92vw] text-center">
              🔥 Para hombres que quieren llevarse a las mujeres más deseadas
            </span>
          </div>
          <h1 className="text-center font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Son las 2 AM. Tu mensaje sigue en{' '}
            <span className="text-primary italic">&quot;visto&quot;</span>… y en su historia ella sale riéndose con OTRO.
          </h1>

          {/* ===== HERO VIDEO ===== */}
          <div className="relative w-full max-w-[420px] sm:max-w-[480px] mx-auto mt-6 sm:mt-8 mb-6 sm:mb-8">
            <div className="absolute -inset-4 rounded-2xl animate-video-glow" style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.06) 40%, transparent 70%)', filter: 'blur(20px)' }} />
            <div className="relative animate-float-video">
              <div className="absolute -inset-[2px] rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.05), rgba(212,175,55,0.25))' }} />
              <div className="relative rounded-2xl overflow-hidden">
                <video ref={videoRef} autoPlay muted playsInline disablePictureInPicture disableRemotePlayback preload="auto" onContextMenu={(e) => e.preventDefault()} onEnded={() => setVideoEnded(true)} style={{ width: '100%', display: 'block', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '14px' }}>
                  <source src="/assets/hero-video.mp4" type="video/mp4" />
                </video>
                {showSoundOverlay && (
                  <button aria-label="Activar sonido" className="absolute inset-0 flex flex-col items-center justify-center gap-2 cursor-pointer z-20" style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '14px', backdropFilter: 'blur(2px)' }} onClick={() => { if (videoRef.current) { videoRef.current.muted = false; videoRef.current.play(); } setShowSoundOverlay(false); setSoundActivated(true); }}>
                    <div className="flex items-center justify-center rounded-full animate-volume-pulse" style={{ width: '56px', height: '56px', background: 'rgba(212,175,55,0.15)', border: '1.5px solid rgba(212,175,55,0.4)', boxShadow: '0 0 20px rgba(212,175,55,0.2), 0 0 40px rgba(212,175,55,0.08)' }}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M11 5L6 9H2v6h4l5 4V5z" fill="#d4af37" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#d4af37" strokeWidth="1.8" strokeLinecap="round" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#d4af37" strokeWidth="1.8" strokeLinecap="round" /></svg>
                    </div>
                    <span className="text-[10px] sm:text-[11px] tracking-widest uppercase font-semibold" style={{ color: 'rgba(212,175,55,0.7)' }}>Toca para sonido</span>
                  </button>
                )}
                {(isPaused || videoEnded) && (
                  <button aria-label={videoEnded ? 'Ver de nuevo' : 'Continuar'} className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer z-20" style={{ background: 'rgba(0,0,0,0.45)', borderRadius: '14px', backdropFilter: 'blur(3px)' }} onClick={() => { if (videoRef.current) { if (videoEnded) { videoRef.current.currentTime = 0; setVideoEnded(false); } videoRef.current.play(); setIsPaused(false); } }}>
                    <div className="flex items-center justify-center rounded-full" style={{ width: '64px', height: '64px', background: 'rgba(212,175,55,0.2)', border: '2px solid rgba(212,175,55,0.5)', boxShadow: '0 0 30px rgba(212,175,55,0.25), 0 0 60px rgba(212,175,55,0.1)' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="#d4af37"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                    <span className="text-[11px] sm:text-xs tracking-widest uppercase font-semibold" style={{ color: 'rgba(212,175,55,0.7)' }}>{videoEnded ? 'Ver de nuevo' : 'Continuar'}</span>
                  </button>
                )}
                {!showSoundOverlay && !isPaused && !videoEnded && (
                  <button aria-label="Pausar video" className="absolute inset-0 z-10 cursor-pointer" style={{ borderRadius: '14px' }} onClick={(e) => { e.stopPropagation(); if (videoRef.current) { videoRef.current.pause(); setIsPaused(true); } }} />
                )}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-3xl space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
            <p>
              Y lo peor no es eso. Lo peor es esa voz en tu cabeza que te dice:{' '}
              <strong className="text-foreground">&quot;¿Qué tiene él que no tengo yo?&quot;</strong> Spoiler bro: no es la cara, no es la billetera, no es el carro.{' '}
              <strong className="text-primary">Es lo que él escribe. Y lo que tú NO sabes escribir.</strong>
            </p>
            <p>
              Llevas semanas — capaz meses — sintiéndote invisible. Mandando &quot;hola, ¿cómo estás?&quot; como si fuera la primera vez. Borrando y reescribiendo mensajes 10 veces. Y al final… nada. Otro visto. Otro silencio. Otra noche durmiendo solo, preguntándote qué carajos haces mal.
            </p>
            <p className="text-foreground font-semibold">
              ¿Cuántos &quot;vistos&quot; más vas a aguantar antes de decir{' '}
              <span className="text-primary">&quot;ya basta, hoy cambio esto para siempre&quot;?</span>
            </p>
          </div>

          {/* Hero Image */}
          <div className="mx-auto mt-10 max-w-2xl">
            <Image
              src="/assets/bundle-hero.png"
              alt="Bundle Dominación - 6 Ebooks por solo 14 USD"
              width={800}
              height={600}
              className="w-full rounded-2xl shadow-2xl"
              priority
            />
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-base sm:text-lg">
            <strong>6 ebooks en 1 solo bundle</strong> con +250 mensajes listos para copiar, pegar y hacer que ella{' '}
            <strong className="text-primary">NO PUEDA dejar de responderte.</strong>
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-center text-base text-muted-foreground">
            Pero esto NO es solo sobre mensajes. También aprenderás a{' '}
            <strong className="text-foreground">ser un hombre ALFA en la vida real</strong> — cómo proyectar seguridad, liderar una conversación cara a cara y generar respeto en cualquier círculo social.
          </p>

          {/* Benefits List */}
          <ul className="mx-auto mt-8 grid max-w-3xl gap-3 text-sm sm:text-base">
            {[
              '+250 mensajes que generan ATRACCIÓN real — no conversaciones aburridas',
              '6 ebooks completos por el precio de un café (valor real: $170 USD)',
              'Recupera su interés incluso si ya te ghosteó o te mandó al "amigo"',
              'De "visto" a "¿cuándo nos vemos?" — así de directo',
              'Mentalidad ALFA: cómo caminar, hablar y actuar como un hombre de alto valor',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
                <span className="mt-0.5 text-success">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-8 max-w-2xl text-center font-semibold text-base sm:text-lg">
            Mientras tú lo piensas, otro le está escribiendo MEJOR a ella. ¿Vas a dejar que te la gane?
          </p>

          <div className="mx-auto mt-6 max-w-md">
            <a href={HOTMART_LINK} className="cta-btn pulse-ring">
              🔥 QUIERO DEJAR DE SER IGNORADO — $14 USD
            </a>
            <p className="mt-3 text-center text-xs sm:text-sm text-muted-foreground">Hoy solo $14 USD</p>
            <p className="mt-1 text-center text-[11px] font-semibold text-primary">{PRICE_LOCAL}</p>
            {PAYMENT_BADGES}
          </div>

          {/* Social Proof Box */}
          <div className="mx-auto mt-8 max-w-md rounded-xl border border-border bg-muted/40 p-4 text-center">
            <p className="text-2xl">🧮</p>
            <p className="mt-2 text-sm">Inversión de $14 → citas reales. ¿Cuánto gastas en apps que no funcionan?</p>
            <p className="mt-1 text-[11px] text-muted-foreground">Hace un momento</p>
          </div>

          {/* Offer Box */}
          <div className="mx-auto mt-8 max-w-md rounded-xl border-2 border-primary bg-primary/5 p-5 text-center">
            <p className="text-sm font-bold text-primary">🔥 Oferta por tiempo limitado</p>
            <p className="mt-1 text-sm">Antes <span className="line-through">$170</span> · Hoy <span className="font-bold text-primary">$14</span></p>
            <div className="mt-4">
              <a href={HOTMART_LINK} className="cta-btn">DESCARGAR →</a>
            </div>
            <p className="mt-2 text-center text-[11px] font-semibold text-primary">{PRICE_LOCAL}</p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: Pain Points ===== */}
      <section className="px-4 py-14 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex justify-center">
            <span className="chip">¿Te identificas con alguna de estas?</span>
          </div>
          <h2 className="text-center font-display text-3xl sm:text-4xl font-bold">
            Si esto te suena familiar, estás a un mensaje de que ella te borre para siempre.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Cada mensaje equivocado te aleja más. Y lo peor: <strong>ni te das cuenta.</strong>
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { icon: '👁️', title: 'Visto sin respuesta', desc: 'Le escribes con todo… y ella le responde al otro en 5 minutos. A ti, ni el doble check azul.' },
              { icon: '🤝', title: 'Friendzone eterna', desc: 'Eres el \'mejor amigo\' que escucha sus dramas. Mientras OTRO se la lleva a la cama.' },
              { icon: '🧎', title: 'Mendigando atención', desc: 'Doble mensaje. \'¿Estás ahí?\'. Cada texto extra le quita un gramo más de respeto que te tenía.' },
              { icon: '👻', title: 'Invisible entre 200 chats', desc: 'Eres una notificación más que ella borra sin abrir. Así NUNCA vas a conquistar a nadie.' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="text-3xl">{item.icon}</div>
                <h3 className="mt-3 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border-l-4 border-primary bg-card p-6">
            <p className="font-bold">No es rechazo. Es falta de SISTEMA.</p>
            <p className="mt-2 text-sm text-muted-foreground">La atracción por mensaje tiene reglas. Si no las conoces, matas el interés sin saberlo.</p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: The Good Guy Problem ===== */}
      <section className="px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            La soledad del &quot;Hombre Bueno&quot;: ser lindo no te va a conseguir la cita que quieres.
          </h2>
          <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
            <p>Piensas que por ser atento, amable y respetuoso ella debería corresponderte…</p>
            <p>Pero la atracción no funciona con lógica. Funciona con emoción.</p>
            <p>Cuando no sabes generar tensión emocional por texto, tus mensajes se vuelven predecibles, aburridos e inofensivos. Y lo inofensivo no atrae. Lo inofensivo se ignora.</p>
            <p className="font-semibold text-foreground">La buena noticia: esto se corrige con los mensajes correctos.</p>
            <p>No necesitas cambiar quién eres. Solo necesitas cambiar lo que escribes — y cómo te comportas cuando la tienes enfrente.</p>
            <p>
              Un hombre ALFA no es el que grita más fuerte. Es el que{' '}
              <strong className="text-foreground">sabe comunicar seguridad, dirección y valor</strong>{' '}
              — por texto Y en persona.
            </p>
          </div>
          <p className="mt-8 text-center font-semibold text-primary">↓ Sigue leyendo porque aquí empieza el cambio ↓</p>
        </div>
      </section>

      {/* ===== SECTION 4: What You Get ===== */}
      <section className="px-4 py-14 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Si ella tiene que liderar la conversación, ya perdiste. Descubre cómo tomar el control.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Con el <strong className="text-foreground">Bundle Dominación</strong>, obtienes 6 ebooks con todo lo que necesitas para transformar completamente tu comunicación digital:
          </p>

          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { num: 1, title: '+250 mensajes listos para copiar y pegar', desc: 'Para WhatsApp, Instagram y apps de citas — sin pensar, sin dudar' },
              { num: 2, title: '27 Disparadores de Intriga', desc: 'Obliga a ella a iniciar la charla. Rompe el patrón del \'Hola, cómo estás\'' },
              { num: 3, title: 'Logística completa: del chat a la cama', desc: 'Las 5 fases de la cita perfecta con frases de escalada sexual' },
              { num: 4, title: 'Maniobras de Rescate 24h', desc: 'Recupera conversaciones muertas con tácticas de desfibrilador digital' },
              { num: 5, title: '100 errores fatales identificados', desc: 'Deja de sabotearte sin darte cuenta — filtra lo que mata la atracción' },
              { num: 6, title: '50 respuestas blindadas al rechazo', desc: 'Convierte un \'No\' en la puerta al \'Sí\' — mantén tu marco de valor' },
            ].map((item) => (
              <li key={item.num} className="relative rounded-2xl border border-border bg-card p-6 pl-16 shadow-sm">
                <span className="absolute left-4 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                  {item.num}
                </span>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-center">
            <p className="text-lg font-bold">No es teoría. No es motivación.</p>
            <p className="mt-2 text-muted-foreground">Son 6 armas tácticas que funcionan en la vida real.</p>
          </div>

          <div className="mt-8 rounded-2xl border-2 border-primary/30 bg-primary/5 p-6">
            <p className="text-xl font-bold">🦁 Pero hay más…</p>
            <p className="mt-3 text-base sm:text-lg">
              Este bundle también te enseña a{' '}
              <strong>ser un ALFA fuera del celular</strong>. Cómo proyectar confianza cuando la ves en persona. Cómo liderar una conversación real. Cómo hacer que te respeten en cualquier grupo social.{' '}
              <strong className="text-primary">Porque un hombre de alto valor no solo escribe bien — VIVE bien.</strong>
            </p>
          </div>

          <p className="mt-8 text-center text-muted-foreground">Personas normales. Conversaciones reales.<br />Resultados visibles desde los primeros mensajes.</p>
          <p className="mt-2 text-center font-semibold">Y tú puedes empezar hoy mismo por solo $14 USD.</p>
        </div>
      </section>

      {/* ===== SECTION 5: Before/After Messages ===== */}
      <section className="px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex justify-center">
            <span className="chip">📱 La diferencia es BRUTAL</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">
            De ser uno más en su bandeja… a ser el ÚNICO que ella espera responder.
          </h2>
          <p className="mt-4 text-center text-muted-foreground">3 escenarios reales. Mismo hombre. Misma chica. Lo único que cambió fue lo que escribió:</p>

          {/* Scenario 1 */}
          <div className="mt-12">
            <h3 className="text-xl sm:text-2xl font-bold">#1. El saludo desesperado vs. el gancho que engancha</h3>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border p-4 sm:p-5 shadow-sm border-border bg-muted/30">
                <div className="mb-3"><span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">ANTES 💀</span></div>
                <p className="mb-3 text-sm font-semibold">Lo que mandan el 93% de los hombres</p>
                <div className="whatsapp-chat">
                  <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-base">?</div>
                    <div className="leading-tight"><div className="text-sm font-semibold">Ella</div><div className="text-[10px] text-white/60">última vez hace 3 días</div></div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="chat-sent">Hola, ¿cómo estás? 😊</div>
                    <div className="chat-sent">Hermosa, ¿qué haces? 🌹</div>
                    <div className="chat-sent">Buenos días princesa 💕</div>
                    <div className="chat-sent">¿Estás ahí?</div>
                  </div>
                </div>
                <p className="mt-3 text-center text-xs font-semibold text-muted-foreground">Visto ✓✓ (sin respuesta) 💀</p>
              </div>
              <div className="rounded-2xl border p-4 sm:p-5 shadow-sm border-primary/30 bg-gradient-to-b from-primary/5 to-transparent">
                <div className="mb-3"><span className="text-xs font-bold uppercase tracking-wide text-primary">DESPUÉS 🔥</span></div>
                <p className="mb-3 text-sm font-semibold">Mensaje #14 del bundle aplicado</p>
                <div className="whatsapp-chat">
                  <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-base">💋</div>
                    <div className="leading-tight"><div className="text-sm font-semibold">Ella</div><div className="text-[10px] text-white/60">en línea ahora</div></div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="chat-sent">Te confieso algo… acabo de ver algo que me hizo pensar en ti. Pero no sé si estás lista para escucharlo 😏</div>
                    <div className="chat-received">Ay no, ahora me dejas con la duda… DIME 👀</div>
                    <div className="chat-sent">Tranquila, te lo cuento mejor el jueves. Conozco un lugar perfecto.</div>
                    <div className="chat-received">¿A qué hora pasas por mí? 🔥</div>
                  </div>
                </div>
                <p className="mt-3 text-center text-xs font-semibold text-success">Respondió en 2 min ✓✓</p>
              </div>
            </div>
          </div>

          {/* Scenario 2 */}
          <div className="mt-12">
            <h3 className="text-xl sm:text-2xl font-bold">#2. Pidiendo cita como mendigo vs. invitando como un alfa</h3>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border p-4 sm:p-5 shadow-sm border-border bg-muted/30">
                <div className="mb-3"><span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">ANTES 💀</span></div>
                <p className="mb-3 text-sm font-semibold">El 'porfa' que mata toda atracción</p>
                <div className="whatsapp-chat">
                  <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-base">?</div>
                    <div className="leading-tight"><div className="text-sm font-semibold">Ella</div><div className="text-[10px] text-white/60">última vez hace 3 días</div></div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="chat-sent">¿Te gustaría salir conmigo algún día? 🥺</div>
                    <div className="chat-sent">Solo si tú quieres eh, sin presión jaja</div>
                    <div className="chat-received">Mmm tal vez, ahora estoy ocupada</div>
                    <div className="chat-sent">¿Y la próxima semana? Porfa 🙏</div>
                  </div>
                </div>
                <p className="mt-3 text-center text-xs font-semibold text-muted-foreground">Visto ✓✓ (sin respuesta) 💀</p>
              </div>
              <div className="rounded-2xl border p-4 sm:p-5 shadow-sm border-primary/30 bg-gradient-to-b from-primary/5 to-transparent">
                <div className="mb-3"><span className="text-xs font-bold uppercase tracking-wide text-primary">DESPUÉS 🔥</span></div>
                <p className="mb-3 text-sm font-semibold">Frame de líder del bundle (módulo 3)</p>
                <div className="whatsapp-chat">
                  <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-base">💋</div>
                    <div className="leading-tight"><div className="text-sm font-semibold">Ella</div><div className="text-[10px] text-white/60">en línea ahora</div></div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="chat-sent">Acabo de descubrir un sitio brutal. Comida increíble y un trago que tienes que probar.</div>
                    <div className="chat-received">Suena bien… ¿dónde queda? 👀</div>
                    <div className="chat-sent">El jueves a las 8 paso por ti. Ponte algo que te haga sentir poderosa.</div>
                    <div className="chat-received">Okay 😍 ya estoy nerviosa jaja</div>
                  </div>
                </div>
                <p className="mt-3 text-center text-xs font-semibold text-success">Respondió en 2 min ✓✓</p>
              </div>
            </div>
          </div>

          {/* Scenario 3 */}
          <div className="mt-12">
            <h3 className="text-xl sm:text-2xl font-bold">#3. Después de la cita: el beso de mejilla vs. la noche que no olvida</h3>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border p-4 sm:p-5 shadow-sm border-border bg-muted/30">
                <div className="mb-3"><span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">ANTES 💀</span></div>
                <p className="mb-3 text-sm font-semibold">Lo que arruina el 80% de las citas</p>
                <div className="whatsapp-chat">
                  <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-base">?</div>
                    <div className="leading-tight"><div className="text-sm font-semibold">Ella</div><div className="text-[10px] text-white/60">última vez hace 3 días</div></div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="chat-sent">La pasé súper bien hoy 🥰</div>
                    <div className="chat-sent">Eres una mujer increíble</div>
                    <div className="chat-sent">¿Cuándo te puedo volver a ver?</div>
                    <div className="chat-sent">Avísame cuando llegues porfa</div>
                  </div>
                </div>
                <p className="mt-3 text-center text-xs font-semibold text-muted-foreground">Visto ✓✓ (sin respuesta) 💀</p>
              </div>
              <div className="rounded-2xl border p-4 sm:p-5 shadow-sm border-primary/30 bg-gradient-to-b from-primary/5 to-transparent">
                <div className="mb-3"><span className="text-xs font-bold uppercase tracking-wide text-primary">DESPUÉS 🔥</span></div>
                <p className="mb-3 text-sm font-semibold">Cierre de tensión (módulo 5 + bonus planner)</p>
                <div className="whatsapp-chat">
                  <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-base">💋</div>
                    <div className="leading-tight"><div className="text-sm font-semibold">Ella</div><div className="text-[10px] text-white/60">en línea ahora</div></div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="chat-sent">Hay algo de ti que se me quedó grabado esta noche. Y no es lo que crees 😏</div>
                    <div className="chat-received">Ay no… ahora dime QUÉ 🙈</div>
                    <div className="chat-sent">Te lo enseño la próxima. Pero ven preparada, no acepto 'tengo que madrugar'.</div>
                    <div className="chat-received">Jajaja okay alfa 🔥 ya estoy contando los días</div>
                  </div>
                </div>
                <p className="mt-3 text-center text-xs font-semibold text-success">Respondió en 2 min ✓✓</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <p className="text-base sm:text-lg">
              <strong>¿Notas el patrón?</strong> El primero <em>ROGABA</em> atención. El segundo{' '}
              <em>GENERÓ</em> deseo. Misma chica. Mismo hombre.{' '}
              <strong>Solo cambió lo que escribió.</strong>
            </p>
            <p className="mt-4 text-muted-foreground">
              Bro, no se trata de ser más guapo, más rico ni más alto. Se trata de saber QUÉ escribir en el momento exacto. Y eso es exactamente lo que aprendes en los 6 ebooks.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-md">
            <a href={HOTMART_LINK} className="cta-btn">
              🔥 QUIERO MENSAJES QUE SÍ FUNCIONEN — $14 USD
            </a>
            <p className="mt-3 text-center text-xs sm:text-sm text-muted-foreground">Acceso inmediato · 6 ebooks · Garantía 7 días</p>
            <p className="mt-1 text-center text-[11px] font-semibold text-primary">{PRICE_LOCAL}</p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: What's Inside ===== */}
      <section className="px-4 py-14 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex justify-center">
            <span className="chip">📦 Resumen Técnico</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">
            Lo que contiene el &quot;Bundle Dominación&quot;
          </h2>
          <p className="mt-3 text-center text-muted-foreground">6 ebooks en 1 — Todo el ecosistema de comunicación masculina</p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              {
                icon: '📕', value: '$47 USD', title: 'Libro Maestro: Método Conversación Magnética™',
                items: ['+100 páginas de estrategia pura', '12 capítulos: desde psicología de la atracción hasta el cierre de citas', 'Ejemplos reales de apertura, mantenimiento de interés y transiciones', 'Sistema "Push & Pull" aplicado a texto para tensión emocional constante'],
              },
              {
                badge: 'BONO ESTRELLA', icon: '⚡', value: '$27 USD', title: '27 Disparadores de Intriga',
                items: ['27 plantillas exactas de "Copy-Paste"', 'Rompe el patrón del "Hola, cómo estás"', 'Disparadores de curiosidad visual, de opinión y el famoso "Disparador de la Falsa Acusación"'],
              },
              {
                badge: 'BONO PROHIBIDO', icon: '🔞', value: '$37 USD', title: 'After Dark: Logística a la Cama',
                items: ['60 Frases de Escalada Sexual (del coqueteo sutil a la tensión directa)', 'Las 5 Fases de la Cita Perfecta: Bar → Caminata → Casa → Intimidad', 'Manejo de la LMR (Resistencia de Último Minuto) sin presión'],
              },
              {
                badge: 'BONO DE RESCATE', icon: '🚑', value: '$27 USD', title: 'Maniobras de Rescate 24h',
                items: ['20 tácticas de "Desfibrilador Digital"', 'Para situaciones de "Visto", respuestas secas y ghosting temporal', 'La técnica de la "Falsa Despedida" y el "Ping de Curiosidad Visual"'],
              },
              {
                badge: 'BONO DE BLINDAJE', icon: '🛡️', value: '$17 USD', title: 'Errores de Novato en WhatsApp',
                items: ['100 errores fatales que matan la atracción al instante', 'Análisis: ser \'demasiado bueno\', responder muy rápido, emojis excesivos', 'Filtra tu comunicación para proyectar solo estatus y confianza'],
              },
              {
                badge: 'BONO DE PODER', icon: '💪', value: '$15 USD', title: 'Manual de Respuestas al Rechazo',
                items: ['50 respuestas blindadas para situaciones de "No"', '"Tengo novio", "No estoy lista", "Solo amigos", "No quiero salir"', 'Responder bien a un \'No\' es lo que genera el \'Sí\' después'],
              },
            ].map((book, i) => (
              <div key={i} className="relative rounded-2xl border border-border bg-card p-6 shadow-sm">
                {book.badge && (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                    {book.badge}
                  </span>
                )}
                <div className="flex items-start justify-between gap-3">
                  <div className="text-3xl">{book.icon}</div>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">Valor: {book.value}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug">{book.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {book.items.map((item, j) => (
                    <li key={j} className="flex gap-2"><span className="text-success">✔</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Price Card */}
          <div className="mx-auto mt-10 max-w-md rounded-2xl border-2 border-primary bg-card p-6 text-center shadow-xl">
            <p className="text-sm text-muted-foreground">Valor total del bundle</p>
            <p className="mt-1 text-3xl font-bold text-muted-foreground line-through">$170 USD</p>
            <p className="mt-3 text-sm">Hoy te lo llevas todo por:</p>
            <p className="mt-1 font-display text-6xl font-bold text-primary">$14<span className="text-xl">USD</span></p>
            <p className="mt-3 text-xs text-muted-foreground">Pago único • Acceso instantáneo • Garantía 7 días</p>
            <p className="mt-1 text-center text-[11px] font-semibold text-primary">{PRICE_LOCAL}</p>
            {PAYMENT_BADGES}
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: Numbers ===== */}
      <section className="px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl sm:text-4xl font-bold">En Números</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
            {[
              { number: '250+', label: 'Mensajes Listos para Usar', desc: 'No tienes que pensar, solo copiar y adaptar' },
              { number: '5+', label: 'Años de Experiencia', desc: 'Estudiando lo que desean las mujeres y cómo piensan los hombres de alto valor' },
              { number: '6', label: 'Ebooks en 1', desc: 'Todo el ecosistema de comunicación masculina' },
              { number: '100%', label: 'Digital', desc: 'Acceso instantáneo en PDF desde cualquier dispositivo' },
            ].map((stat, i) => (
              <div key={i}>
                <span className="font-display text-5xl sm:text-6xl font-bold text-primary">{stat.number}</span>
                <h3 className="mt-2 text-base font-bold">{stat.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{stat.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center font-semibold text-primary">🔒 Garantía de 7 Días — Cero Riesgo</p>
        </div>
      </section>

      {/* ===== SECTION 8: What's Inside - Grid ===== */}
      <section className="px-4 py-14 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">Dentro del Bundle Dominación™</h2>
          <p className="mt-3 text-center text-muted-foreground">6 ebooks en 1 bundle. +100 páginas. Todo lo que necesitas para dominar el chat Y la vida real:</p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: '+250 mensajes listos para usar', desc: 'Para WhatsApp, Instagram y apps de citas. Solo copia, pega y adapta.' },
              { title: 'Guía de Conversación Magnética', desc: '12 capítulos de estrategia pura. Desde psicología de atracción hasta cierre de citas.' },
              { title: 'Sistema Push & Pull por texto', desc: 'Genera tensión emocional constante sin parecer necesitado ni desesperado.' },
              { title: 'Conversaciones completas de ejemplo', desc: 'Copia la estructura exacta que transforma un \'Hola\' en una cita real.' },
              { title: '60 frases de escalada sexual', desc: 'Del coqueteo sutil a la tensión directa. Aprende a cerrar la noche.' },
              { title: '100 errores fatales documentados', desc: 'Cada error que has cometido sin saberlo, explicado y corregido.' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
            <div className="rounded-2xl border-2 border-primary bg-primary/5 p-5 sm:col-span-2 lg:col-span-3">
              <h3 className="text-lg font-bold">🦁 Mentalidad Alfa en la vida real</h3>
              <p className="mt-2 text-sm sm:text-base">Cómo caminar con presencia, hablar con autoridad y actuar como un hombre que las mujeres RESPETAN fuera del celular.</p>
            </div>
          </div>

          <p className="mt-8 text-center text-base sm:text-lg">
            Todo esto por <span className="line-through text-muted-foreground">$170</span>{' '}
            <span className="font-bold text-primary">$14 USD</span> — un regalo, hermano.
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <a href={HOTMART_LINK} className="cta-btn">🔥 LO QUIERO TODO POR $14 USD</a>
            <p className="mt-2 text-center text-[11px] font-semibold text-primary">{PRICE_LOCAL}</p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 9: Bonuses ===== */}
      <section className="px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex justify-center">
            <span className="chip">Bonos Exclusivos de Lanzamiento</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">
            Nada duele más que una cita que iba &quot;bien&quot; y terminó en un beso en la mejilla.
          </h2>
          <p className="mt-3 text-center text-muted-foreground">Estos bonos te aseguran que eso nunca vuelva a pasar:</p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              { tag: '#1 — Bono', value: '$27 USD', title: '27 Disparadores de Intriga', desc: 'Plantillas copy-paste que obligan a ella a iniciar la charla. Incluye el \'Disparador de la Falsa Acusación\'.' },
              { tag: '#2 — Bono', value: '$37 USD', title: 'After Dark: Logística a la Cama', desc: '60 frases de escalada sexual + las 5 fases de la cita perfecta. Del bar a la intimidad.' },
              { tag: '#3 — Bono', value: '$27 USD', title: 'Maniobras de Rescate 24h', desc: '20 tácticas de desfibrilador digital. La \'Falsa Despedida\' y el \'Ping de Curiosidad Visual\'.' },
              { tag: '#4 — Bono de Poder', value: '$15 USD · GRATIS en el bundle', title: 'Manual de Respuestas al Rechazo', desc: '50 respuestas blindadas para "Tengo novio", "No estoy lista", "Solo amigos". A menudo, responder bien a un "No" es lo que termina generando el "Sí" después.' },
            ].map((bonus, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{bonus.tag}</span>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">Valor: {bonus.value}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold">{bonus.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{bonus.desc}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center">
            Bro, <strong>todos estos bonos solos valen más de $100 USD</strong>. Hoy te los regalo dentro del bundle.
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <a href={HOTMART_LINK} className="cta-btn">🎁 RECLAMAR MIS BONOS — $14 USD</a>
            <p className="mt-3 text-center text-xs sm:text-sm text-muted-foreground">Pago único · Acceso inmediato · Garantía 7 días</p>
            <p className="mt-1 text-center text-[11px] font-semibold text-primary">{PRICE_LOCAL}</p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 10: Free Bonus ===== */}
      <section className="px-4 py-14 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex justify-center">
            <span className="chip">🎁 Bonus Gratis — Solo por Hoy</span>
          </div>
          <div className="mx-auto max-w-3xl rounded-3xl border-2 border-gold/40 bg-card p-6 sm:p-10 shadow-xl">
            <div className="text-center">
              <p className="text-4xl">📑</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">PLANNER DE CITAS</h2>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-primary">Protocolo de Ejecución Táctica</p>
              <p className="mt-4 text-muted-foreground">Un sistema paso a paso para planificar, ejecutar y cerrar citas con confianza.</p>
            </div>
            <ul className="mx-auto mt-8 grid max-w-xl gap-3 text-sm">
              {['Checklist pre-cita para no improvisar', 'Temas de conversación probados', 'Estrategia de seguimiento post-cita', 'Cómo escalar de mensaje a cita real'].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><span className="text-success">✔</span><span>{item}</span></li>
              ))}
            </ul>
            <div className="mt-8 text-center">
              <p className="text-lg"><span className="line-through text-muted-foreground">Valor: $27 USD</span>{' '}<span className="font-bold text-primary">GRATIS</span></p>
              <p className="mt-1 text-xs text-muted-foreground">Incluido automáticamente con tu compra hoy</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 11: Final CTA 1 ===== */}
      <section className="px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">
            Bro, ella no te va a esperar. Mientras tú dudas, otro le está escribiendo.
          </h2>
          <p className="mt-4 text-center text-muted-foreground">6 ebooks. +250 mensajes. Funcionan incluso si la conversación está MUERTA, fría o ella ya te ghosteó.</p>
          <p className="mt-6 text-center text-2xl">
            <span className="line-through text-muted-foreground">$170 USD</span>{' '}
            <span className="font-bold text-primary">$14 USD</span>{' '}
            <span className="ml-2 rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">-92% OFF</span>
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <a href={HOTMART_LINK} className="cta-btn pulse-ring">
              🔥 YA NO QUIERO QUE ME IGNOREN — $14 USD
            </a>
            <p className="mt-3 text-center text-xs sm:text-sm text-muted-foreground">Acceso inmediato · Pago único · 6 ebooks · Garantía 7 días</p>
            <p className="mt-1 text-center text-[11px] font-semibold text-primary">{PRICE_LOCAL}</p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 12: Testimonial ===== */}
      <section className="px-4 py-14 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">Historias de hombres que dejaron de ser invisibles</h2>
          <p className="mt-3 text-center text-muted-foreground">No fue magia. Fue saber exactamente qué decir y cuándo decirlo.</p>

          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <p className="text-sm font-bold text-primary">🔥 Resucitó una conversación muerta</p>
            <p className="mt-4 text-base sm:text-lg italic leading-relaxed">
              &quot;Neta, llevaba como 4 meses en visto con una morra que me gustaba un chingo. Usé el disparador #7 del bundle y me respondió a los 3 minutos con un audio de 2 minutos. Casi me caigo de la silla, carnal.&quot;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Image
                src="/assets/testimonial-luis.jpg"
                alt="Foto de Luis G."
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-bold">Luis G.</p>
                <p className="text-xs text-muted-foreground">CDMX, México</p>
              </div>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">+1,200 hombres mexicanos ya transformaron su comunicación</p>
        </div>
      </section>

      {/* ===== SECTION 13: Final Offer ===== */}
      <section className="px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex justify-center">
            <span className="chip">⏰ Oferta de Lanzamiento — Se cierra sin aviso</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">
            Bro, esto NO es un precio. Es un regalo que te estoy haciendo antes de que suba a $47.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Sigue gastando $50 en salidas donde ella ni aparece, o invierte $14 UNA VEZ y nunca más quedes en visto. Tú decides, hermano.
          </p>

          <div className="mx-auto mt-10 max-w-xl rounded-3xl border-2 border-primary bg-card p-6 sm:p-8 shadow-2xl">
            <p className="text-center text-xs font-bold uppercase tracking-wider text-primary">Bundle Completo</p>
            <h3 className="mt-2 text-center font-display text-2xl sm:text-3xl font-bold">Bundle Dominación™</h3>
            <p className="text-center text-sm text-muted-foreground">6 ebooks + Planner de Citas</p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="text-xl text-muted-foreground line-through">$170 USD</span>
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">-92% OFF</span>
            </div>
            <p className="mt-2 text-center font-display text-6xl sm:text-7xl font-bold text-primary">$14<span className="text-2xl">USD</span></p>
            <p className="mt-2 text-center text-xs text-muted-foreground">Pago único • Sin suscripciones • Acceso de por vida</p>
            <p className="mt-1 text-center text-xs text-muted-foreground">En el formulario de pago se mostrará el precio en tu moneda local</p>

            <ul className="mt-6 space-y-2 text-sm">
              {[
                '📕 Libro Maestro: Método Conversación Magnética™ (+100 págs)',
                '⚡ 27 Disparadores de Intriga (copy-paste)',
                '🔞 After Dark: Logística a la Cama (60 frases)',
                '🚑 Maniobras de Rescate 24h (20 tácticas)',
                '🛡️ 100 Errores Fatales de WhatsApp',
                '💪 Manual de Respuestas al Rechazo (50 respuestas)',
                '📑 Planner de Citas: Protocolo de Ejecución Táctica',
                'Acceso inmediato y descarga digital',
                'Actualizaciones gratuitas de por vida',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 text-success">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <a href={HOTMART_LINK} className="cta-btn pulse-ring">
                🔥 QUIERO EL BUNDLE AHORA — SOLO $14 USD
              </a>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">🔒 Pago seguro · ✅ Garantía 7 días · 📱 Acceso inmediato</p>
            <p className="mt-1 text-center text-[11px] font-semibold text-primary">{PRICE_LOCAL}</p>
            {PAYMENT_BADGES}
          </div>
        </div>
      </section>

      {/* ===== SECTION 14: Guarantee ===== */}
      <section className="px-4 py-14 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl rounded-3xl border-2 border-success/40 bg-card p-6 sm:p-10">
            <div className="flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-3xl">🛡️</div>
            </div>
            <h2 className="mt-4 text-center font-display text-3xl sm:text-4xl font-bold">Cero riesgo. Si no funciona, te devuelvo cada centavo.</h2>
            <div className="mt-6 space-y-4 text-center text-base sm:text-lg text-muted-foreground">
              <p>Tienes 7 días completos para leer los 6 ebooks, aplicar los mensajes y ver los resultados. Si no notas un cambio REAL en cómo te responden las mujeres, te devuelvo el 100% de tu dinero. Sin preguntas. Sin dramas.</p>
              <p>El único riesgo real es seguir mandando los mismos mensajes aburridos que te tienen en &quot;Visto&quot; todas las noches.</p>
              <p className="font-semibold text-foreground">$14 USD. Cero riesgo. Todo por ganar. ¿Qué excusa te queda?</p>
            </div>
            <div className="mx-auto mt-8 max-w-md">
              <a href={HOTMART_LINK} className="cta-btn">
                🛡️ ME LO LLEVO SIN RIESGO — $14 USD
              </a>
              <p className="mt-3 text-center text-xs sm:text-sm text-muted-foreground">Si no te funciona como prometido, te devuelvo cada centavo</p>
              <p className="mt-1 text-center text-[11px] font-semibold text-primary">{PRICE_LOCAL}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 15: Final Push ===== */}
      <section className="px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">
            El tipo que se la lleva no es más guapo ni más rico.
          </h2>
          <div className="mx-auto mt-6 max-w-3xl space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
            <p>Ese tipo no nació sabiendo. <strong className="text-foreground">Aprendió.</strong> Tiene un sistema. Sabe qué decir para generar intriga. Sabe cuándo callar. Sabe cómo hacer que ELLA sea la que te busque.</p>
            <p>Y no solo eso — ese tipo <strong className="text-foreground">proyecta seguridad en persona</strong>. Cuando la ve, no tiembla. Sabe liderar la conversación, la cita, el momento. Eso es ser un ALFA de verdad. Y eso también se aprende.</p>
            <p>Y tú sigues ahí, mandando &quot;buenos días hermosa&quot; a una mina que ni te pela. 💀</p>
            <p>Bro, esto no es un insulto. Es el espejo que nadie se atreve a ponerte.</p>
            <p>Yo estuve EXACTAMENTE ahí. Mandando mensajes patéticos. Inventando excusas. Hasta que me harté, estudié lo que FUNCIONA, probé cientos de mensajes… <strong className="text-foreground">y encontré el código.</strong></p>
            <p>Hoy esos mensajes están en este bundle. <strong className="text-foreground">Los 6 ebooks.</strong> +250 mensajes que puedes copiar y pegar AHORA MISMO. Más las claves para convertirte en el hombre que las mujeres BUSCAN — no solo por chat, sino en la vida real.</p>
            <p>La pregunta no es si funciona.</p>
            <p className="text-foreground font-semibold">La pregunta es: ¿cuántos &quot;vistos&quot; más necesitas para ACTUAR?</p>
            <p>Puedes cerrar esta página. Volver a tu vida. Mandar otro &quot;hola, ¿cómo estás?&quot; y ROGAR que esta vez sea diferente.</p>
            <p>O puedes invertir $14 — menos que una pizza — y nunca más quedarte como un idiota frente al teléfono.</p>
            <p className="text-primary font-semibold">Cada minuto que pasa, otro hombre está usando estos mensajes con la chica que TÚ quieres. ¿Vas a seguir dejando que te la ganen?</p>
          </div>

          <div className="mx-auto mt-10 max-w-md">
            <a href={HOTMART_LINK} className="cta-btn pulse-ring">
              🔥 BASTA. LO QUIERO TODO POR $14 USD
            </a>
            <p className="mt-3 text-center text-xs sm:text-sm text-muted-foreground">Pago único · Acceso inmediato · Garantía 7 días</p>
            <p className="mt-1 text-center text-[11px] font-semibold text-primary">{PRICE_LOCAL}</p>
            {PAYMENT_BADGES}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border bg-muted/30 px-4 py-8 text-center text-xs text-muted-foreground">
        <p>© 2026 Bundle Dominación™ — Todos los derechos reservados.</p>
        <p className="mt-2 mx-auto max-w-2xl">Este producto es de carácter educativo. Los resultados varían según la aplicación individual. No garantizamos resultados específicos.</p>
      </footer>
    </div>
  );
}
