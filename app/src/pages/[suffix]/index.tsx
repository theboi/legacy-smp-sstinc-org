import { provider } from "../../model/provider";

export default function SuffixPage() {
  return <></>;
}

export async function getServerSideProps(ctx) {
  const url = await provider.url
    .getURL(ctx.params?.suffix as string)
    .then((doc): string | undefined => doc.data()?.url);

  if (url) {
    return {
      redirect: {
        destination: url,
        permanent: false,
      },
    };
  }

  return {
    notFound: true,
    props: { suffix: ctx.params.suffix },
  };
}
