"use client";
import { Counter } from "./_components/Counter";
import { Btn } from "./_components/Btn";
import { ResetBtn } from "./_components/ResetBtn";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Counter />
      <Btn />
      <ResetBtn />
    </main>
  );
}
