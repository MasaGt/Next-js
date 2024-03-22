import { Metadata } from 'next';

export async function generateMetadata() {
  return { title: 'customer' } satisfies Metadata;
}

const Page = () => {
  return <p>Customer Page</p>;
};

export default Page;
