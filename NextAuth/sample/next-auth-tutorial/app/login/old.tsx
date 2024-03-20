// "use client";

// import React from "react";
// import { auth } from "@/auth";
// // import { signIn, signOut } from "@/auth";
// import { signIn, signOut } from "next-auth/react";
// import Link from "next/link";

// export const AppBar = async () => {
//   console.log(JSON.stringify(auth));

//   const session = await auth();
//   // console.log(`in Appbar ${JSON.stringify(session?.user)}`);

//   return (
//     <div className="p-2 flex gap-2">
//       <Link href={"/anotherPage"}>another page</Link>
//       <div className="ml-auto">
//         {session && session.user ? (
//           <div>
//             <p>{session.user.name}</p>
//             {/* <form
//               action={async () => {
//                 "use server";
//                 await signOut();
//               }}
//             >
//               <button type="submit">Sign Out</button>
//             </form> */}
//             <button type="button" onClick={() => signOut()}>
//               Sign Out
//             </button>
//           </div>
//         ) : (
//           <div>
//             {/* <form
//               action={async () => {
//                 "use server";
//                 await signIn();
//               }}
//             >
//               <button type="submit">Sign In</button>
//             </form> */}
//             <button type="button" onClick={() => signIn()}>
//               Sign In
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
