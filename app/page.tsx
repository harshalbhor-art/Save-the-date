"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, MapPin, Heart } from "lucide-react";
import RsvpForm from "./rsvp-form";
import {languages as languageOptions, isLanguage, type Language} from "@/lib/languages";
import {celebration} from "./celebration-content";
import PhotoGallery from "./photo-gallery";

const copy = {
  en: {
    invitation: "Together with our families", join: "A lifetime of love begins with a little celebration.",
    note: "With the blessings of our families, we invite you to share in the joy of our wedding. Your presence will make our beginning all the more beautiful.",
    date: "Date to be announced", venue: "Venue to be announced", rsvp: "Kindly RSVP", details: "The celebration", soon: "Some moments are worth waiting for.",
    detailsNote: "We’re bringing the finer details together. Our wedding date and venue will be shared here soon.", when: "When", where: "Where", names: ["Harshal", "Snehal"], and: "&",
    reply: "A place for you, in our celebration.", replyNote: "Let us know your plans, so we can welcome you with love.", love: "With love, always", planning: "Wedding planner", replay: "Open the envelope again", invitationLabel: "The wedding invitation", scroll: "Discover the celebration", open: "Open invitation", tap: "Click or tap the envelope to open", skip: "Skip animation", cover: "A little envelope. A lifetime of love.", forYou: "An invitation, just for you", opening: "Opening your invitation…", opened: "Your invitation is open", language: "Choose your language",
  },
  hi: {
    invitation: "हमारे परिवारों की ओर से सस्नेह आमंत्रण", join: "प्रेम के एक नए अध्याय में आपका स्वागत है।",
    note: "अपने परिवारों के आशीर्वाद के साथ, हम आपको अपने विवाह की खुशियों में शामिल होने के लिए सादर आमंत्रित करते हैं। आपकी उपस्थिति हमारे इस शुभ अवसर को और भी खास बनाएगी।",
    date: "तारीख जल्द घोषित होगी", venue: "स्थान जल्द घोषित होगा", rsvp: "अपनी उपस्थिति बताएँ", details: "विवाह समारोह", soon: "एक खूबसूरत दिन का इंतज़ार है।",
    detailsNote: "समारोह की तैयारियाँ चल रही हैं। विवाह की तारीख और स्थान की जानकारी जल्द यहीं साझा करेंगे।", when: "कब", where: "कहाँ", names: ["हर्षल", "स्नेहल"], and: "और",
    reply: "हमारी खुशियों में आपका स्वागत है।", replyNote: "अपनी योजना बताएँ, ताकि हम आपके स्वागत की तैयारी कर सकें।", love: "सप्रेम, सदैव", planning: "विवाह नियोजन", replay: "लिफ़ाफ़ा फिर से खोलें", invitationLabel: "विवाह निमंत्रण", scroll: "समारोह के बारे में जानें", open: "निमंत्रण खोलें", tap: "खोलने के लिए लिफ़ाफ़े पर क्लिक या टैप करें", skip: "सीधे निमंत्रण देखें", cover: "एक छोटा-सा लिफ़ाफ़ा, जीवन भर का प्यार।", forYou: "आपके लिए स्नेहभरा निमंत्रण", opening: "आपका निमंत्रण खुल रहा है…", opened: "आपका निमंत्रण खुल गया है", language: "अपनी भाषा चुनें",
  },
  mr: {
    invitation: "आमच्या परिवारातर्फे सस्नेह निमंत्रण", join: "प्रेमाच्या नव्या पर्वाची सुरुवात, आपल्या सोबतीने.",
    note: "आमच्या आयुष्यातील या मंगल क्षणी आपण सहकुटुंब उपस्थित राहून आम्हाला आशीर्वाद द्यावेत, ही नम्र विनंती. आपल्या उपस्थितीने सोहळ्याची शोभा वाढेल.",
    date: "तारीख लवकरच जाहीर करू", venue: "स्थळ लवकरच जाहीर करू", rsvp: "आपली उपस्थिती कळवा", details: "विवाह सोहळा", soon: "एका सुंदर दिवसाची आतुरतेने वाट पाहत आहोत.",
    detailsNote: "सोहळ्याची तयारी सुरू आहे. विवाहाची तारीख आणि स्थळाची माहिती लवकरच येथे कळवू.", when: "कधी", where: "कुठे", names: ["हर्षल", "स्नेहल"], and: "आणि",
    reply: "आपल्याशिवाय हा आनंद अपुरा.", replyNote: "आपला बेत कळवा, म्हणजे आपल्या स्वागताची तयारी करता येईल.", love: "सस्नेह, सदैव", planning: "विवाह नियोजन", replay: "लिफाफा पुन्हा उघडा", invitationLabel: "विवाह निमंत्रण", scroll: "सोहळ्याची माहिती पाहा", open: "निमंत्रण उघडा", tap: "उघडण्यासाठी लिफाफ्यावर क्लिक किंवा टॅप करा", skip: "थेट निमंत्रण पाहा", cover: "एक छोटासा लिफाफा, आयुष्यभराचे प्रेम.", forYou: "खास आपल्यासाठी सस्नेह निमंत्रण", opening: "आपले निमंत्रण उघडत आहे…", opened: "आपले निमंत्रण उघडले आहे", language: "आपली भाषा निवडा",
  },
  kn: {
    invitation: "ನಮ್ಮ ಕುಟುಂಬಗಳ ಪರವಾಗಿ ಪ್ರೀತಿಯ ಆಹ್ವಾನ", join: "ನಿಮ್ಮೊಂದಿಗೆ ನಮ್ಮ ಹೊಸ ಜೀವನದ ಆರಂಭ.",
    note: "ನಮ್ಮ ವಿವಾಹದ ಶುಭ ಸಂದರ್ಭದಲ್ಲಿ ನೀವು ಕುಟುಂಬ ಸಮೇತರಾಗಿ ಆಗಮಿಸಿ ಆಶೀರ್ವದಿಸಬೇಕೆಂದು ಪ್ರೀತಿಯಿಂದ ಆಹ್ವಾನಿಸುತ್ತೇವೆ. ನಿಮ್ಮ ಉಪಸ್ಥಿತಿ ನಮ್ಮ ಸಂತೋಷವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.",
    date: "27 ಜನವರಿ 2027", venue: "ಸ್ಥಳವನ್ನು ಶೀಘ್ರದಲ್ಲೇ ತಿಳಿಸುತ್ತೇವೆ", rsvp: "ನಿಮ್ಮ ಹಾಜರಾತಿ ತಿಳಿಸಿ", details: "ವಿವಾಹ ಸಂಭ್ರಮ", soon: "ಒಂದು ಸುಂದರ ದಿನದ ನಿರೀಕ್ಷೆಯಲ್ಲಿ.",
    detailsNote: "ಸ್ಥಳದ ವಿವರಗಳನ್ನು ಶೀಘ್ರದಲ್ಲೇ ತಿಳಿಸುತ್ತೇವೆ.", when: "ಯಾವಾಗ", where: "ಎಲ್ಲಿ", names: ["ಹರ್ಷಲ್", "ಸ್ನೇಹಲ್"], and: "ಮತ್ತು",
    reply: "ನಿಮ್ಮೊಂದಿಗೆ ನಮ್ಮ ಸಂತೋಷ ಪೂರ್ಣ.", replyNote: "ನಿಮ್ಮ ಆಗಮನದ ಯೋಜನೆಯನ್ನು ತಿಳಿಸಿ, ಸ್ವಾಗತಕ್ಕೆ ಸಿದ್ಧತೆ ಮಾಡಿಕೊಳ್ಳುತ್ತೇವೆ.", love: "ಸದಾ ಪ್ರೀತಿಯಿಂದ", planning: "ವಿವಾಹದ ಯೋಜನೆ", replay: "ಲಕೋಟೆಯನ್ನು ಮತ್ತೆ ತೆರೆಯಿರಿ", invitationLabel: "ವಿವಾಹ ಆಮಂತ್ರಣ", scroll: "ಕಾರ್ಯಕ್ರಮದ ವಿವರಗಳನ್ನು ನೋಡಿ", open: "ಆಮಂತ್ರಣವನ್ನು ತೆರೆಯಿರಿ", tap: "ತೆರೆಯಲು ಲಕೋಟೆಯನ್ನು ಕ್ಲಿಕ್ ಅಥವಾ ಟ್ಯಾಪ್ ಮಾಡಿ", skip: "ನೇರವಾಗಿ ಆಮಂತ್ರಣವನ್ನು ನೋಡಿ", cover: "ಒಂದು ಪುಟ್ಟ ಲಕೋಟೆ, ಜೀವನಪೂರ್ತಿ ಪ್ರೀತಿ.", forYou: "ನಿಮಗಾಗಿ ಪ್ರೀತಿಯ ಆಮಂತ್ರಣ", opening: "ನಿಮ್ಮ ಆಮಂತ್ರಣ ತೆರೆಯುತ್ತಿದೆ…", opened: "ನಿಮ್ಮ ಆಮಂತ್ರಣ ತೆರೆಯಲಾಗಿದೆ", language: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Language>("en");
  const [cover, setCover] = useState<"closed" | "opening" | "revealing" | "open">("closed");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const headline = useRef<HTMLHeadingElement>(null);
  const openButton = useRef<HTMLButtonElement>(null);
  const coverVisible = cover !== "open";
  const c = copy[lang];
  const d = celebration[lang];
  useEffect(() => {
    const linked = new URLSearchParams(location.search).get("lang");
    if (isLanguage(linked)) setLang(linked);
    else { try { const saved = localStorage.getItem("hs-language"); if (isLanguage(saved)) setLang(saved); } catch {} }
    // Always show the envelope on a normal visit, including returning guests.
    // Only explicit section links bypass the cover. Reduced motion is handled on activation.
    if (["#rsvp", "#celebration"].includes(location.hash)) {
      setCover("open");
      requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView());
    }
    return () => timers.current.forEach(clearTimeout);
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  function changeLanguage(value: Language) {
    setLang(value);
    try { localStorage.setItem("hs-language", value); } catch {}
  }
  function revealInvitation() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setCover("open");
    requestAnimationFrame(() => headline.current?.focus({ preventScroll: true }));
  }
  function openInvitation() {
    if (cover !== "closed") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { revealInvitation(); return; }
    setCover("opening");
    timers.current = [
      setTimeout(() => setCover("revealing"), 3000),
      setTimeout(revealInvitation, 3550),
    ];
  }
  function replayInvitation() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setCover("closed");
    history.replaceState(history.state, "", location.pathname + location.search);
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => openButton.current?.focus({ preventScroll: true }));
  }
  useEffect(() => {
    const context = (document as Document & { modelContext?: { registerTool: (tool: unknown, options: unknown) => void | Promise<void> } }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const tool = { name: "set_invitation_language", description: "Switch the invitation and RSVP form to English, Hindi, Marathi or Kannada. Does not submit an RSVP.", inputSchema: { type: "object", properties: { language: { type: "string", enum: ["en", "hi", "mr", "kn"] } }, required: ["language"], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute: async (input: unknown) => {
      const value = input as { language?: string };
      if (!value || Object.keys(value).length !== 1 || !["en", "hi", "mr", "kn"].includes(value.language || "")) throw new Error("Choose en, hi, mr or kn.");
      changeLanguage(value.language as Language);
      await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      return { language: value.language };
    } };
    try { Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {}); } catch {}
    return () => lifecycle.abort();
  }, []);
  const languages = <nav className="language-switch" aria-label={c.language}>{languageOptions.map(([value, label]) => <button key={value} onClick={() => changeLanguage(value)} lang={value} aria-pressed={lang === value}>{label}</button>)}</nav>;

  return <div className="wedding-page" lang={lang}>
    <header className="topbar"><a className="monogram" href="#invitation" onClick={() => { if (coverVisible) revealInvitation(); }} aria-label="Harshal and Snehal">H <span>&</span> S</a>{languages}{coverVisible ? <button className="header-rsvp skip-top" onClick={revealInvitation}>{c.skip}</button> : <a className="header-rsvp" href="#rsvp">{c.rsvp}</a>}</header>
    {coverVisible && <section className={"cover-stage " + (cover === "revealing" ? "cover-revealing" : "")} aria-label={c.invitationLabel}>
      <p className="eyebrow cover-greeting">{c.forYou}</p>
      <button ref={openButton} type="button" className="envelope" data-open={cover !== "closed"} onClick={openInvitation} aria-label={c.open} aria-describedby="envelope-hint" aria-disabled={cover !== "closed"}>
        <span className="envelope-back" aria-hidden="true" />
        <span className="envelope-lining" aria-hidden="true" />
        <span className="envelope-letter" aria-hidden="true">{lang === "en" ? <img src="/couple-wordmark-transparent.webp" alt="" width="1536" height="1024" /> : <span className="letter-names">{c.names[0]}<span>{c.and}</span>{c.names[1]}</span>}<span className="letter-caption">{c.invitationLabel}</span></span>
        <span className="envelope-front" aria-hidden="true" />
        <span className="envelope-flap" aria-hidden="true" />
        <span className="wax-seal" aria-hidden="true"><span>H<em>&</em>S</span></span>
        <span className="envelope-address" aria-hidden="true">{c.names[0]} <em>{c.and}</em> {c.names[1]}</span>
        <span className="envelope-hearts" aria-hidden="true">{[1, 2, 3].map(n => <span key={n} className={"floating-heart heart-" + n}><Heart fill="currentColor" strokeWidth={0} /></span>)}</span>
      </button>
      <h2 className="cover-line">{c.cover}</h2>
      <div className="cover-actions"><p id="envelope-hint" className="envelope-hint">{cover === "closed" ? c.tap : c.opening}</p><button className="skip-opening" onClick={revealInvitation}>{c.skip}</button></div>
      <span className="sr-only" role="status">{cover === "opening" ? c.opening : ""}</span>
    </section>}
    <div className={"invitation-content " + (cover === "revealing" ? "content-reveal" : "")} hidden={cover === "closed" || cover === "opening"} inert={coverVisible} aria-hidden={coverVisible || undefined}>
    <main>
      <section className="invitation-scene" id="invitation" aria-label={c.invitationLabel}>
        <div className="invitation-spread">
        <figure className="couple-portrait"><img src="/couple-portrait.webp" alt={d.portrait} width="941" height="1672" fetchPriority="high" /></figure>
        <article className="invitation-paper">
          <p className="eyebrow">{c.invitation}</p>
          <h1 ref={headline} className={lang === "en" ? "names-art" : "names-deva"} tabIndex={-1}>
            {lang === "en" ? <><span className="sr-only">Harshal & Snehal</span><img src="/couple-wordmark-transparent.webp" alt="" width="1536" height="1024" fetchPriority="high" /></> : <><span>{c.names[0]}</span><em>{c.and}</em><span>{c.names[1]}</span></>}
          </h1>
          <div className="paper-rule" aria-hidden="true"><span /></div>
          <p className="invitation-blessing">{c.join}</p>
          <p className="invitation-note">{c.note}</p>
          <div className="invitation-placeholders"><span>{d.date}</span><i aria-hidden="true">·</i><span>{c.venue}</span></div>
          <a className="primary-link" href="#rsvp">{c.rsvp}<ArrowDown size={16} /></a>
        </article></div>
        <a className="discover-link" href="#celebration">{c.scroll}<ArrowDown size={15} /></a>
      </section>
      <section className="family-section" aria-labelledby="family-title"><h2 id="family-title">{d.family}</h2><div className="family-pair">{[{role:d.bride,name:d.brideName,parents:d.brideParents},{role:d.groom,name:d.groomName,parents:d.groomParents}].map(person=><article key={person.name}><h3>{person.role}</h3><p className="family-name">{person.name}</p><p>{person.parents}</p><p className="family-more">{d.more}</p></article>)}</div></section>
      <section className="wedding-schedule" id="celebration" aria-labelledby="schedule-title"><h2 id="schedule-title">{d.heading}</h2><p className="schedule-note">{d.note}</p><div className="schedule-days">{d.days.map((day,i)=><article key={day}><h3>{day}</h3><ol>{d.events[i].map(event=><li key={event.title}><span className="event-time">{event.time}</span><div><h4>{event.title}</h4><p>{event.detail}</p></div></li>)}</ol></article>)}</div><p className="venue-note"><MapPin size={18} aria-hidden="true"/>{c.venue}</p></section>
      <PhotoGallery language={lang}/>
      <section className="rsvp-wrap" id="rsvp">
        <div className="rsvp-heading"><p className="eyebrow">{c.rsvp}</p><h2>{c.reply}</h2><div className="paper-rule" aria-hidden="true"><span /></div><p>{c.replyNote}</p><Heart size={22} aria-hidden="true" /></div>
        <div className="rsvp-section"><RsvpForm language={lang} /></div>
      </section>
    </main>
    <footer><span className="footer-names">{c.names[0]} <em>{c.and}</em> {c.names[1]}</span><span>{c.love}</span><div className="footer-links"><button onClick={replayInvitation}>{c.replay}</button><a href="/planning">{c.planning}</a></div></footer>
    </div>
  </div>;
}
