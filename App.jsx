import { useState, useEffect, useRef } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const canvasRef = useRef(null);

  const fullText = "Hola, soy Oscar Inaipil, estudiante de Ingeniería en Informática";

  const tecnologias = [
    { nombre: "Java", icono: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
    { nombre: "Spring Boot", icono: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" },
    { nombre: "Python", icono: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { nombre: "JavaScript", icono: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { nombre: "React", icono: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { nombre: "HTML5", icono: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
    { nombre: "CSS3", icono: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
    { nombre: "Kotlin", icono: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg" },
    { nombre: "SQL", icono: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
    { nombre: "Oracle PL/SQL", icono: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg" },
    { nombre: "MongoDB", icono: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" }
  ];

  const certificaciones = [
    {
      nombre: "Python PCEP",
      entidad: "Python Institute",
      estado: "Obtenida"
    },
    {
      nombre: "Azure Data Fundamentals (DP-900)",
      entidad: "Microsoft",
      estado: "Obtenida"
    },
    {
      nombre: "AWS Cloud Practitioner",
      entidad: "Amazon Web Services",
      estado: "Estudiando"
    }
  ];

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const colors = darkMode
      ? ["#22d3ee", "#4ade80", "#c084fc", "#fb923c"]
      : ["#0891b2", "#15803d", "#7e22ce", "#c2410c"];

    let lastPos = { x: 0, y: 0 };
    const minDistance = 28;

    const handleMouseMove = (event) => {
      const dx = event.clientX - lastPos.x;
      const dy = event.clientY - lastPos.y;
      const distance = Math.hypot(dx, dy);

      if (distance < minDistance) return;

      lastPos = { x: event.clientX, y: event.clientY };

      const count = 2;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const separationRadius = Math.random() * 18 + 14;

        particles.push({
          x: event.clientX + Math.cos(angle) * separationRadius,
          y: event.clientY + Math.sin(angle) * separationRadius,
          vx: (Math.random() - 0.5) * 1.0,
          vy: (Math.random() - 0.5) * 1.0,
          radius: Math.random() * 1.5 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.9,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
        p.radius = Math.max(0, p.radius - 0.02);

        if (p.alpha > 0 && p.radius > 0) {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      particles = particles.filter((p) => p.alpha > 0 && p.radius > 0);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  useEffect(() => {
    if (displayText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, 60);

      return () => clearTimeout(timeout);
    }
  }, [displayText]);

  return (
    <div className="relative min-h-screen bg-neutral-50 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-30"
      />

      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-mono font-bold text-lg tracking-wider">
            OI
          </span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xs uppercase tracking-wider font-mono px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer z-40 relative"
          >
            {darkMode ? "Modo Claro" : "Modo Oscuro"}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-24">
        <section className="py-12 relative z-40">
          <h1 className="text-3xl sm:text-4xl font-mono font-bold leading-tight">
            {displayText}
            <span className="inline-block w-2.5 h-6 ml-1 bg-neutral-800 dark:bg-neutral-100 animate-pulse align-middle" />
          </h1>
        </section>

        <section className="space-y-4 relative z-40">
          <h2 className="text-xl font-bold font-mono border-b border-neutral-200 dark:border-neutral-800 pb-2">
            Sobre Mí
          </h2>
          <div className="text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-4">
            <p>
              Soy estudiante de segundo año de Ingeniería en Informática en Duoc UC, sede San Joaquín, estudiando para la mención en Ciencia de Datos.
            </p>
            <p>
              Durante mi carrera he trabajado en desarrollo web: por la parte de Frontend he usado HTML, CSS, JavaScript y React, y en el Backend trabajé con Java y Spring Boot (incluyendo Spring Security y Mockito). También he trabajado con bases de datos relacionales usando SQL y Oracle PL/SQL, y actualmente estoy aprendiendo MongoDB. Además, he visto análisis de datos con Python usando Pandas, NumPy y Matplotlib, y desarrollo de aplicaciones móviles con Kotlin.
            </p>
          </div>
        </section>

        <section className="space-y-4 relative z-40">
          <h2 className="text-xl font-bold font-mono border-b border-neutral-200 dark:border-neutral-800 pb-2">
            Tecnologías
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {tecnologias.map((item) => (
              <div
                key={item.nombre}
                className="flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-800 rounded bg-white dark:bg-neutral-950 font-mono text-sm"
              >
                <div className="w-7 h-7 flex items-center justify-center rounded dark:bg-neutral-200 p-1 shrink-0">
                  <img
                    src={item.icono}
                    alt={item.nombre}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span>{item.nombre}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 relative z-40">
          <h2 className="text-xl font-bold font-mono border-b border-neutral-200 dark:border-neutral-800 pb-2">
            Certificaciones
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {certificaciones.map((cert) => (
              <div
                key={cert.nombre}
                className="border border-neutral-200 dark:border-neutral-800 rounded p-4 bg-white dark:bg-neutral-950 flex flex-col justify-between space-y-3"
              >
                <div>
                  <h3 className="font-bold font-mono text-sm">{cert.nombre}</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {cert.entidad}
                  </p>
                </div>
                <span className="inline-block w-fit text-xs font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  {cert.estado}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 relative z-40">
          <h2 className="text-xl font-bold font-mono border-b border-neutral-200 dark:border-neutral-800 pb-2">
            Proyectos
          </h2>
          <div className="border border-neutral-200 dark:border-neutral-800 rounded p-6 bg-white dark:bg-neutral-950 space-y-3">
            <span className="inline-block text-xs font-mono px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              En proceso
            </span>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Actualmente estoy armando y ordenando mis proyectos para publicarlos en esta sección. Mientras tanto, puedes revisar en lo que he estado trabajando directamente en mi GitHub.
            </p>
            <div>
              <a
                href="https://github.com/OscarInaipil"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono underline hover:text-neutral-500 dark:hover:text-neutral-300"
              >
                Ir a mi GitHub
              </a>
            </div>
          </div>
        </section>

        <section className="space-y-4 relative z-40">
          <h2 className="text-xl font-bold font-mono border-b border-neutral-200 dark:border-neutral-800 pb-2">
            Contacto
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 text-sm font-mono">
            <a
              href="https://github.com/OscarInaipil"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-neutral-500 dark:hover:text-neutral-300"
            >
              GitHub
            </a>
            <a
              href="mailto:oscarinaipil921@gmail.com"
              className="underline hover:text-neutral-500 dark:hover:text-neutral-300"
            >
              oscarinaipil921@gmail.com
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8 text-center text-xs text-neutral-500 font-mono relative z-40">
        Portafolio - Oscar Inaipil
      </footer>
    </div>
  );
}