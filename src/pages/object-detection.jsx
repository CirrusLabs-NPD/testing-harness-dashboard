import { Helmet } from 'react-helmet-async';

import { ObjectDetectionView } from 'src/sections/object-detection/view';

// ----------------------------------------------------------------------

export default function ObjectDetectionPage() {
  return (
    <>
      <Helmet>
        <title> Object Detection | Testing Harness </title>
      </Helmet>

      <ObjectDetectionView />
    </>
  );
}
