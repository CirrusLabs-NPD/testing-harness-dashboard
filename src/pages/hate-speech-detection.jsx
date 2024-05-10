import { Helmet } from 'react-helmet-async';

import { HateSpeechDetectionView } from 'src/sections/hate-speech-detection/view';

// ----------------------------------------------------------------------

export default function HateSpeechDetectionPage() {
  return (
    <>
      <Helmet>
        <title> Hate Speech Detection | Testing Harness </title>
      </Helmet>

      <HateSpeechDetectionView />
    </>
  );
}
