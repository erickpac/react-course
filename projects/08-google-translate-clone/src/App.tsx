/* eslint-disable react/react-in-jsx-scope */
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import { useStore } from "./hooks/useStore";
import { AUTO_LANGUAGE, VOICE_LANGUAGES } from "./utils/constants";
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from "./components/Icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { SectionType } from "./types/types.d";
import { TextArea } from "./components/TextArea";
import { useEffect } from "react";
import { translate } from "./services/translate";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const {
    loading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
    swapLanguages,
  } = useStore();

  const debouncedFromText = useDebounce(fromText);

  useEffect(() => {
    if (debouncedFromText === "") return;

    translate(fromLanguage, toLanguage, debouncedFromText)
      .then((data) => {
        if (data === null) return;
        setResult(data);
      })
      .catch((error) => {
        setResult(
          `An error occurred while translating the text, please try again. ${error}`
        );
      });
  }, [debouncedFromText, fromLanguage, toLanguage]);

  const handleClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result);
    utterance.lang = VOICE_LANGUAGES[toLanguage];
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  return (
    <Container fluid>
      <h2>Google translate</h2>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>

        <Col xs="auto">
          <Button
            variant="link"
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={swapLanguages}
          >
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <div style={{ position: "relative" }}>
              <TextArea
                type={SectionType.To}
                value={result}
                loading={loading}
                onChange={setResult}
              />
              <div style={{ position: "absolute", left: 0, bottom: 0 }}>
                <Button variant="link" onClick={handleClipboard}>
                  <ClipboardIcon />
                </Button>
                <Button variant="link" onClick={handleSpeak}>
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
