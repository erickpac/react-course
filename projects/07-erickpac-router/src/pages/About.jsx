import { Link } from "../components/Link";

const i18n = {
  en: {
    title: "About",
    description: "Hey! I'm Erick, I'm building a React Router clone",
  },
  es: {
    title: "Acerca de",
    description: "¡Hola! Soy Erick, estoy construyendo un clon de React Router",
  },
};

const useI18n = (lang) => {
  return i18n[lang] || i18n.en;
};

export default function AboutPage({ routeParams }) { 
  const i18n = useI18n(routeParams.lang ?? "en");
  const { title, description } = i18n;
  
  return (
    <>
      <h1>{title}</h1>
      <div>
        <img
          src="https://pbs.twimg.com/profile_images/1396707036478545921/g6fu6Mph_400x400.jpg"
          alt="Erick Pac"
        />
        <p>{description}</p>
        <Link to="/">Home</Link>
      </div>
    </>
  );
}
