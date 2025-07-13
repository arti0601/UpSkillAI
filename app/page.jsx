//  "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();
//   useEffect(() => {
//     router.replace("/landing");
//   }, [router]);
//   return null;
// }
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/landing");
  }, [router]);

  return null;
}
