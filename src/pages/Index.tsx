import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/d04ca6d4-8f87-404a-9c40-32599fd747b5/files/5d4e8896-42f2-4acb-8d07-2ae52a030b81.jpg";
const OFFICE_IMG = "https://cdn.poehali.dev/projects/d04ca6d4-8f87-404a-9c40-32599fd747b5/files/8efbccde-69b1-4974-9231-71a0f2ffc8cd.jpg";
const TEAM_IMG = "https://cdn.poehali.dev/projects/d04ca6d4-8f87-404a-9c40-32599fd747b5/files/fb59a3ac-3d00-46e1-97dd-412518658507.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "О нас", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Товары", href: "#products" },
  { label: "Галерея", href: "#gallery" },
  { label: "Видео", href: "#video" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Briefcase", title: "Бизнес-консалтинг", desc: "Стратегический анализ и разработка плана развития вашего бизнеса" },
  { icon: "BarChart2", title: "Финансовый аудит", desc: "Полная проверка финансовой отчётности и оптимизация расходов" },
  { icon: "Users", title: "HR-решения", desc: "Подбор и обучение персонала, построение корпоративной культуры" },
  { icon: "Shield", title: "Юридическая защита", desc: "Сопровождение сделок и защита интересов в суде" },
  { icon: "Globe", title: "Выход на рынки", desc: "Анализ рынка и стратегия международной экспансии" },
  { icon: "Cpu", title: "IT-интеграция", desc: "Цифровизация процессов и внедрение корпоративных систем" },
];

const PRODUCTS = [
  { title: "Премиум-пакет", price: "85 000 ₽", desc: "Полное сопровождение бизнеса на 6 месяцев", badge: "Хит продаж" },
  { title: "Базовый пакет", price: "25 000 ₽", desc: "Консультации и аудит для малого бизнеса", badge: null },
  { title: "Корпоративный", price: "150 000 ₽", desc: "Индивидуальная программа для крупных компаний", badge: "Топ" },
];

const REVIEWS = [
  { name: "Александр Петров", role: "CEO, TechGroup", text: "Профессиональный подход, чёткое понимание бизнеса. Результаты превзошли ожидания уже в первый квартал.", stars: 5 },
  { name: "Мария Соколова", role: "Финансовый директор", text: "Аудит помог выявить скрытые потери. Благодаря команде сэкономили более 3 млн рублей за год.", stars: 5 },
  { name: "Дмитрий Волков", role: "Основатель, Волков & Partners", text: "Рекомендую всем, кто ценит своё время и деньги. Работают строго, профессионально, в срок.", stars: 5 },
];

const GALLERY_ITEMS = [HERO_IMG, OFFICE_IMG, TEAM_IMG, OFFICE_IMG, HERO_IMG, TEAM_IMG];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <section id={id} ref={ref} className={`py-24 px-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </section>
  );
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-14">
      <p className="text-xs tracking-[0.3em] uppercase font-body mb-3" style={{ color: "#4299E1" }}>{sub || "Раздел"}</p>
      <h2 className="font-display text-4xl md:text-5xl font-light text-white leading-tight gold-line">{children}</h2>
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "", message: "", date: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"contact" | "booking">("contact");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", phone: "", email: "", service: "", message: "", date: "" });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0d12", color: "#eae8e3" }}>

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3 backdrop-blur-md border-b" : "py-5"}`}
        style={{ backgroundColor: scrolled ? "rgba(10,13,18,0.95)" : "transparent", borderColor: scrolled ? "#1a2030" : "transparent" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="font-display text-2xl font-light tracking-widest" style={{ color: "#4299E1" }}>
            ПРОФИ<span className="text-white">ВИЗИТ</span>
          </a>
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="nav-link text-sm tracking-wider font-body text-gray-300 hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <a href="#contacts" className="hidden lg:inline-flex items-center gap-2 px-5 py-2 text-sm font-body font-medium transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: "#2B6CB0", color: "#fff", borderRadius: "2px" }}>
            Связаться
          </a>
          <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden px-6 pb-6 pt-4 flex flex-col gap-4 border-t" style={{ borderColor: "#1a2030", backgroundColor: "rgba(10,13,18,0.98)" }}>
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-sm tracking-wider font-body text-gray-300" onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <div id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://cdn.poehali.dev/projects/d04ca6d4-8f87-404a-9c40-32599fd747b5/bucket/f6eaa042-739b-423e-9313-878156cd149e.png" alt="Hero" className="w-full h-full object-cover" style={{ filter: "brightness(0.6)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,13,18,0.75) 0%, rgba(80,30,10,0.25) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
          <div className="max-w-2xl animate-fade-up opacity-0" style={{ animationFillMode: "forwards", animationDelay: "0.2s" }}>
            <p className="text-xs tracking-[0.4em] uppercase font-body mb-6" style={{ color: "#4299E1" }}>Профессиональный имидж</p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-none mb-8">
              Ваше имя —<br /><span style={{ color: "#4299E1" }}>ваш капитал</span>
            </h1>
            <p className="font-body text-lg text-gray-400 leading-relaxed mb-10 max-w-lg">
              Бизнес-визитка для тех, кто ценит доверие клиентов и профессиональный имидж. Контакты, услуги и товары — в одном месте.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#services" className="px-8 py-3 font-body font-medium text-sm tracking-wider transition-all hover:opacity-90"
                style={{ backgroundColor: "#2B6CB0", color: "#fff", borderRadius: "2px" }}>
                Наши услуги
              </a>
              <a href="#contacts" className="px-8 py-3 font-body font-medium text-sm tracking-wider border transition-all hover:bg-white hover:text-black"
                style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff", borderRadius: "2px" }}>
                Связаться
              </a>
              <a href="https://yoomoney.ru/to/410017253212598/0" target="_blank" rel="noopener noreferrer"
                className="px-8 py-3 font-body font-medium text-sm tracking-wider transition-all hover:opacity-90"
                style={{ backgroundColor: "#C05621", color: "#fff", borderRadius: "2px" }}>
                Монѣтопоток
              </a>
            </div>
          </div>
          <div className="absolute bottom-12 right-6 md:right-16 flex flex-col items-end gap-6">
            <div className="text-right animate-fade-up opacity-0 delay-300" style={{ animationFillMode: "forwards" }}>
              <p className="font-display text-5xl text-white">12+</p>
              <p className="font-body text-xs text-gray-500 tracking-widest uppercase mt-1">лет опыта</p>
            </div>
            <div className="text-right animate-fade-up opacity-0 delay-400" style={{ animationFillMode: "forwards" }}>
              <p className="font-display text-5xl text-white">500+</p>
              <p className="font-body text-xs text-gray-500 tracking-widest uppercase mt-1">клиентов</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} style={{ color: "#4299E1" }} />
        </div>
      </div>

      {/* О НАС */}
      <Section id="about">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle sub="О компании">О нас</SectionTitle>
              <p className="font-body text-gray-400 leading-relaxed mb-6">
                Мы — команда профессионалов с более чем 12-летним опытом в сфере бизнес-консалтинга, финансового анализа и юридической поддержки. Наш подход основан на глубоком понимании потребностей клиента.
              </p>
              <p className="font-body text-gray-400 leading-relaxed mb-10">
                Мы не просто решаем задачи — мы становимся надёжным партнёром вашего бизнеса, разделяя ответственность за результат.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[["12+", "лет опыта"], ["500+", "клиентов"], ["98%", "довольны"]].map(([num, label]) => (
                  <div key={label} className="border-l-2 pl-4" style={{ borderColor: "#2B6CB0" }}>
                    <p className="font-display text-3xl text-white">{num}</p>
                    <p className="font-body text-xs text-gray-500 uppercase tracking-wider mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={TEAM_IMG} alt="Команда" className="w-full object-cover" style={{ height: 420, borderRadius: "2px", filter: "brightness(0.85)" }} />
              <div className="absolute -bottom-6 -left-6 p-6 hidden md:block" style={{ backgroundColor: "#111520", borderLeft: "3px solid #2B6CB0" }}>
                <p className="font-display text-2xl text-white">Доверие</p>
                <p className="font-body text-xs text-gray-500 uppercase tracking-widest mt-1">— основа партнёрства</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* УСЛУГИ */}
      <Section id="services" className="border-t" style={{ borderColor: "#1a2030" } as React.CSSProperties}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle sub="Чем мы занимаемся">Услуги</SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="card-hover p-8 border cursor-pointer group" style={{ backgroundColor: "#111520", borderColor: "#1a2030", borderRadius: "2px" }}>
                <div className="w-12 h-12 flex items-center justify-center mb-6 transition-colors group-hover:bg-blue-900" style={{ backgroundColor: "#0a0d12" }}>
                  <Icon name={s.icon} size={22} style={{ color: "#4299E1" }} />
                </div>
                <h3 className="font-display text-xl text-white mb-3">{s.title}</h3>
                <p className="font-body text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-xs tracking-wider uppercase font-body transition-colors group-hover:text-blue-400" style={{ color: "#4299E1" }}>
                  Подробнее <Icon name="ArrowRight" size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ТОВАРЫ */}
      <Section id="products">
        <div className="max-w-7xl mx-auto">
          <SectionTitle sub="Наши предложения">Товары и пакеты</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {PRODUCTS.map((p, i) => (
              <div key={i} className={`card-hover relative p-10 flex flex-col border ${i === 0 ? "border-blue-700" : ""}`}
                style={{ backgroundColor: "#111520", borderColor: i === 0 ? "#2B6CB0" : "#1a2030", borderRadius: "2px" }}>
                {p.badge && (
                  <span className="absolute top-4 right-4 px-3 py-1 text-xs font-body font-medium uppercase tracking-widest"
                    style={{ backgroundColor: "#2B6CB0", color: "#fff", borderRadius: "1px" }}>{p.badge}</span>
                )}
                <h3 className="font-display text-2xl text-white mb-2">{p.title}</h3>
                <p className="font-body text-sm text-gray-500 mb-8 leading-relaxed">{p.desc}</p>
                <p className="font-display text-4xl mt-auto mb-6" style={{ color: "#4299E1" }}>{p.price}</p>
                <button className="w-full py-3 font-body text-sm tracking-wider uppercase font-medium border transition-all hover:bg-blue-900 hover:border-blue-700"
                  style={{ borderColor: "#2B6CB0", color: "#4299E1", borderRadius: "2px" }}>
                  Заказать
                </button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ГАЛЕРЕЯ */}
      <Section id="gallery" className="border-t" style={{ borderColor: "#1a2030" } as React.CSSProperties}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle sub="Наши работы">Галерея</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_ITEMS.map((img, i) => (
              <div key={i} className="overflow-hidden group cursor-pointer" style={{ borderRadius: "2px" }}>
                <img src={img} alt={`Фото ${i + 1}`} className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ height: i % 3 === 1 ? 280 : 200, filter: "brightness(0.75)" }} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ВИДЕО */}
      <Section id="video">
        <div className="max-w-7xl mx-auto">
          <SectionTitle sub="Смотрите">Видео</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map(v => (
              <div key={v} className="relative group cursor-pointer overflow-hidden border" style={{ borderColor: "#1a2030", borderRadius: "2px" }}>
                <img src={v === 1 ? OFFICE_IMG : TEAM_IMG} alt={`Видео ${v}`} className="w-full object-cover transition-all duration-500 group-hover:brightness-50"
                  style={{ height: 260, filter: "brightness(0.4)" }} />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110"
                    style={{ borderColor: "#4299E1", backgroundColor: "rgba(43,108,176,0.3)" }}>
                    <Icon name="Play" size={24} style={{ color: "#fff" }} />
                  </div>
                  <p className="font-display text-lg text-white">{v === 1 ? "О компании" : "Наш подход"}</p>
                  <p className="font-body text-xs text-gray-500">Нажмите, чтобы воспроизвести</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center font-body text-sm text-gray-600 mt-8">Добавьте ссылки на YouTube или загрузите свои видео — настроим вместе</p>
        </div>
      </Section>

      {/* ОТЗЫВЫ */}
      <Section id="reviews" className="border-t" style={{ borderColor: "#1a2030" } as React.CSSProperties}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle sub="Что говорят клиенты">Отзывы</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((r, i) => (
              <div key={i} className="p-8 border card-hover" style={{ backgroundColor: "#111520", borderColor: "#1a2030", borderRadius: "2px" }}>
                <div className="flex gap-1 mb-6">
                  {Array(r.stars).fill(0).map((_, j) => (
                    <Icon key={j} name="Star" size={14} style={{ color: "#4299E1" }} />
                  ))}
                </div>
                <p className="font-body text-gray-400 leading-relaxed mb-8 italic">«{r.text}»</p>
                <div className="flex items-center gap-3 pt-6 border-t" style={{ borderColor: "#1a2030" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-lg" style={{ backgroundColor: "#1a2d45", color: "#4299E1" }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-body text-sm text-white font-medium">{r.name}</p>
                    <p className="font-body text-xs text-gray-600">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* КОНТАКТЫ + ФОРМА */}
      <Section id="contacts">
        <div className="max-w-7xl mx-auto">
          <SectionTitle sub="Свяжитесь с нами">Контакты</SectionTitle>
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Контактные данные */}
            <div>
              <div className="space-y-8 mb-12">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (999) 123-45-67" },
                  { icon: "Mail", label: "Email", value: "info@company.ru" },
                  { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Деловая, 1" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00–18:00" },
                ].map(c => (
                  <div key={c.icon} className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#111520", border: "1px solid #1a2030" }}>
                      <Icon name={c.icon} size={18} style={{ color: "#4299E1" }} />
                    </div>
                    <div>
                      <p className="font-body text-xs text-gray-600 uppercase tracking-widest mb-1">{c.label}</p>
                      <p className="font-body text-white">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <p className="font-body text-xs text-gray-600 uppercase tracking-widest mb-4">Соцсети</p>
                <div className="flex gap-3">
                  {[
                    { icon: "Send", label: "Telegram" },
                    { icon: "MessageCircle", label: "WhatsApp" },
                    { icon: "Instagram", label: "Instagram" },
                  ].map(s => (
                    <button key={s.icon} className="w-10 h-10 flex items-center justify-center border transition-all hover:border-blue-700 hover:bg-blue-950"
                      style={{ borderColor: "#1a2030", borderRadius: "2px" }}>
                      <Icon name={s.icon} size={16} style={{ color: "#4299E1" }} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-12">
                <img src={OFFICE_IMG} alt="Офис" className="w-full object-cover" style={{ height: 200, borderRadius: "2px", filter: "brightness(0.6)" }} />
              </div>
            </div>

            {/* Форма */}
            <div className="p-8 border" style={{ backgroundColor: "#111520", borderColor: "#1a2030", borderRadius: "2px" }}>
              {/* Табы */}
              <div className="flex mb-8 border-b" style={{ borderColor: "#1a2030" }}>
                {(["contact", "booking"] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className="flex-1 pb-3 font-body text-sm tracking-wider uppercase transition-all"
                    style={{ color: activeTab === tab ? "#4299E1" : "#555", borderBottom: activeTab === tab ? "2px solid #4299E1" : "2px solid transparent", marginBottom: "-1px" }}>
                    {tab === "contact" ? "Обратная связь" : "Бронирование"}
                  </button>
                ))}
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full" style={{ backgroundColor: "#1a2d45" }}>
                    <Icon name="CheckCircle" size={28} style={{ color: "#4299E1" }} />
                  </div>
                  <p className="font-display text-2xl text-white">Отправлено!</p>
                  <p className="font-body text-sm text-gray-500 text-center">Мы свяжемся с вами в ближайшее время</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs text-gray-600 uppercase tracking-widest block mb-2">Имя *</label>
                      <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Иван Иванов"
                        className="w-full px-4 py-3 font-body text-sm bg-transparent border outline-none transition-all focus:border-blue-700 text-white placeholder-gray-700"
                        style={{ borderColor: "#1a2030", borderRadius: "2px" }} />
                    </div>
                    <div>
                      <label className="font-body text-xs text-gray-600 uppercase tracking-widest block mb-2">Телефон *</label>
                      <input required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+7 (999) 000-00-00"
                        className="w-full px-4 py-3 font-body text-sm bg-transparent border outline-none transition-all focus:border-blue-700 text-white placeholder-gray-700"
                        style={{ borderColor: "#1a2030", borderRadius: "2px" }} />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-xs text-gray-600 uppercase tracking-widest block mb-2">Email</label>
                    <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.ru" type="email"
                      className="w-full px-4 py-3 font-body text-sm bg-transparent border outline-none transition-all focus:border-blue-700 text-white placeholder-gray-700"
                      style={{ borderColor: "#1a2030", borderRadius: "2px" }} />
                  </div>
                  <div>
                    <label className="font-body text-xs text-gray-600 uppercase tracking-widest block mb-2">Услуга</label>
                    <select value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 font-body text-sm border outline-none transition-all focus:border-blue-700 text-white"
                      style={{ backgroundColor: "#0a0d12", borderColor: "#1a2030", borderRadius: "2px" }}>
                      <option value="">Выберите услугу</option>
                      {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                  {activeTab === "booking" && (
                    <div>
                      <label className="font-body text-xs text-gray-600 uppercase tracking-widest block mb-2">Дата и время</label>
                      <input type="datetime-local" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 font-body text-sm bg-transparent border outline-none transition-all focus:border-blue-700 text-white"
                        style={{ borderColor: "#1a2030", borderRadius: "2px", colorScheme: "dark" }} />
                    </div>
                  )}
                  <div>
                    <label className="font-body text-xs text-gray-600 uppercase tracking-widest block mb-2">Сообщение</label>
                    <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Опишите задачу..." rows={3}
                      className="w-full px-4 py-3 font-body text-sm bg-transparent border outline-none transition-all focus:border-blue-700 text-white placeholder-gray-700 resize-none"
                      style={{ borderColor: "#1a2030", borderRadius: "2px" }} />
                  </div>
                  <button type="submit" className="w-full py-4 font-body text-sm tracking-wider uppercase font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: "#2B6CB0", color: "#fff", borderRadius: "2px" }}>
                    {activeTab === "contact" ? "Отправить заявку" : "Забронировать время"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t" style={{ borderColor: "#1a2030" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-display text-xl tracking-widest" style={{ color: "#4299E1" }}>ПРОФИ<span className="text-white">ВИЗИТ</span></p>
          <div className="flex gap-8">
            {NAV_LINKS.slice(0, 5).map(l => (
              <a key={l.href} href={l.href} className="font-body text-xs text-gray-600 hover:text-gray-400 tracking-wider transition-colors">{l.label}</a>
            ))}
          </div>
          <p className="font-body text-xs text-gray-700">© 2026 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}