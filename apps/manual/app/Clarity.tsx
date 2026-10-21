import Script from "next/script";

// Microsoft Clarity: mapas de calor e gravações de sessão para entender o uso do manual.
// O ID do projeto vem de NEXT_PUBLIC_CLARITY_ID (variável de ambiente na Vercel) e entra no build.
// Sem a variável, nada é carregado.
const ID = process.env.NEXT_PUBLIC_CLARITY_ID?.trim();
export const clarityAtivo = !!ID && /^[a-z0-9]+$/i.test(ID);

export function Clarity() {
  if (!clarityAtivo) return null;
  return (
    <Script id="clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${ID}");`}
    </Script>
  );
}
