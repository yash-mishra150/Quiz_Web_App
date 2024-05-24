import Image from "next/image";
import dynamic from 'next/dynamic';
const Homepage = dynamic(() => import('../components/Homepage/Homepage'), { ssr: false });
export default function Home() {
  return (
    <main className="">
      <Homepage/>
    </main>
  );
}
