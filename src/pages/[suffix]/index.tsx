import React from "react";

import { fbProvider } from "../../model/fbProvider";

export default function SuffixPage() {
  return <></>
}

export async function getServerSideProps(ctx) {
  
  const url = await fbProvider.url.urlSuffixed(ctx.params?.suffix as string).then((doc): string | undefined => {
    return doc.data()?.url
  })

  if (url) return {
    redirect: {
      destination: url,
      permanent: false,
    },
  }

  return {
    notFound: true,
    props: { suffix: ctx.params.suffix },
  }

}