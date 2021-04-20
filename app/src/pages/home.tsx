export default function HomePage() {
  return <></>;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "https://sstinc.org",
      permanent: false,
    },
  };
}
