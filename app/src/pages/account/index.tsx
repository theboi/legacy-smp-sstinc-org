export default function AccountPage() {
  return <></>;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/account/profile",
      permanent: false,
    },
  };
}
