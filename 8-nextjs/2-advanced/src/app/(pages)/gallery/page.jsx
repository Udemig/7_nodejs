import Image from "next/image";

import localImage from "@/assets/ocean.jpg";

const remoteImage =
  "https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg?_gl=1*eqm6i6*_ga*MTczNjA5NzU2Mi4xNzQ0NDg2MDE1*_ga_8JE65Q40S6*czE3NTg0NTE0ODEkbzEzJGcxJHQxNzU4NDUxNjQzJGo0OCRsMCRoMA..";

const Page = () => {
  return (
    <div className="space-y-10">
      <div>
        <h1>Local Resim (Unoptimized)</h1>
        <Image src={localImage} alt="okyanus" unoptimized />
      </div>

      <div>
        <h1>Local Resim (Quality 30%)</h1>
        <Image src={localImage} quality={30} alt="okyanus" priority placeholder="blur" />
      </div>

      <div>
        <h1>Remote Resim (Url İle)</h1>
        <Image src={remoteImage} alt="doğa" width={1920} height={1080} />
      </div>

      <div>
        <h1>Remote Resim (Full Genişlik)</h1>

        <div className="relative h-[300px]">
          <Image src={remoteImage} alt="doğa" fill />
        </div>
      </div>
    </div>
  );
};

export default Page;
