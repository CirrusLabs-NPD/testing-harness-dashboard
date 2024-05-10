import { Helmet } from 'react-helmet-async';

import { MachineTranslationView } from 'src/sections/machine-translation/view';

// ----------------------------------------------------------------------

export default function MachineTranslationPage() {
  return (
    <>
      <Helmet>
        <title> Machine Translation | Testing Harness </title>
      </Helmet>

      <MachineTranslationView />
    </>
  );
}
